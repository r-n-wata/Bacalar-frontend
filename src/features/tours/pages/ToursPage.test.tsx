import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { server } from '../../../test/msw/server'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { defaultMockDelayMs } from '../../../test/msw/core'
import {
  emptyToursCategoryHandler,
  toursErrorHandler,
} from '../mocks/handlers'
import { ToursPage } from './ToursPage'

async function openFilters() {
  await userEvent.click(await screen.findByRole('button', { name: 'Filters' }))
  expect(
    await screen.findByRole('dialog', { name: 'Filter tours' }),
  ).toBeVisible()
}

async function applyCategoryFilter(category: string, applyLabel = /Show \d+ tours?/) {
  await openFilters()
  await userEvent.selectOptions(screen.getByLabelText('Category'), category)
  await userEvent.click(await screen.findByRole('button', { name: applyLabel }))
}

describe('ToursPage', () => {
  function setViewportPosition({
    scrollY = 0,
    scrollHeight = 2000,
    innerHeight = 800,
  } = {}) {
    Object.defineProperty(window, 'scrollY', {
      value: scrollY,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', {
      value: innerHeight,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: scrollHeight,
      configurable: true,
    })
  }

  function renderToursRoute(language?: 'en' | 'es') {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <AppShell />,
          children: [
            {
              path: 'tours',
              element: <ToursPage />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/tours'],
      },
    )

    return renderWithProviders(<RouterProvider router={router} />, {
      language,
    })
  }

  it('renders hero, featured strip, filters, list, and submit cta in order', async () => {
    setViewportPosition()
    await renderToursRoute()

    const heroTitle = await screen.findByText(
      'Discover the best tours in Bacalar',
    )
    const featuredTitle = screen.getByText('Our top recommendations')
    const filterControls = screen.getByLabelText('Tour search and filters')
    const toursList = screen.getByLabelText('Tours list')
    const submitTitle = screen.getByText('Know a tour we should feature?')

    expect(heroTitle.compareDocumentPosition(featuredTitle)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(featuredTitle.compareDocumentPosition(filterControls)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(filterControls.compareDocumentPosition(toursList)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(toursList.compareDocumentPosition(submitTitle)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )

    expect(screen.getByRole('textbox', { name: 'Search tours' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Filters' })).toBeVisible()
    const featuredSection = screen.getByLabelText('Featured tours')
    expect(within(featuredSection).getAllByRole('link')).toHaveLength(3)
    expect(within(featuredSection).getByText('Private Sailing at Sunrise')).toBeVisible()
    expect(within(featuredSection).getByText('Provided by Laguna Vela')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Submit a tour' })).toHaveAttribute(
      'href',
      '/tours/submit',
    )
  })

  it('keeps intro, featured, and list placeholders mounted during initial loading', async () => {
    setViewportPosition()
    await renderToursRoute()

    expect(screen.getByTestId('tours-page-intro-placeholder')).toBeVisible()
    expect(screen.getByTestId('tours-featured-placeholder')).toBeVisible()
    expect(screen.getByTestId('tours-list-placeholder')).toBeVisible()

    expect(
      await screen.findByText('Discover the best tours in Bacalar', {}, {
        timeout: defaultMockDelayMs * 4,
      }),
    ).toBeVisible()
  })

  it('renders localized tours, paginates, and refetches when the language changes', async () => {
    setViewportPosition()
    await renderToursRoute()

    const toursList = await screen.findByLabelText('Tours list')
    expect(within(toursList).getByText('Lagoon Birdwatching Drift')).toBeVisible()
    expect(within(toursList).getByText('Shallow Snorkel Circuit')).toBeVisible()
    expect(within(toursList).getByText('Provided by Aves Bacalar')).toBeVisible()
    expect(
      screen.queryByRole('button', { name: 'Load more tours' }),
    ).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    const localizedToursList = await screen.findByLabelText('Lista de tours')
    expect(
      within(localizedToursList).getByText('Paseo de avistamiento en la laguna'),
    ).toBeVisible()
    expect(screen.getByRole('textbox', { name: 'Buscar tours' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Filtros' })).toBeVisible()
    expect(screen.getByText('Nuestras recomendaciones principales')).toBeVisible()
    expect(screen.queryByText('Lagoon Birdwatching Drift')).not.toBeInTheDocument()
  })

  it('keeps featured tours global while filters change the main list', async () => {
    setViewportPosition()
    await renderToursRoute()

    await applyCategoryFilter('Boat Tour')

    const featuredSection = await screen.findByLabelText('Featured tours')
    expect(within(featuredSection).getByText('Private Sailing at Sunrise')).toBeVisible()
    const toursList = await screen.findByLabelText('Tours list')
    expect(within(toursList).getByText('Lagoon Birdwatching Drift')).toBeVisible()
    expect(within(toursList).queryByText('Family Pontoon Loop')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove filter Boat Tour' })).toBeVisible()
  })

  it('applies search filters automatically once the query reaches three characters', async () => {
    setViewportPosition()
    await renderToursRoute()

    const searchInput = await screen.findByRole('textbox', { name: 'Search tours' })
    await userEvent.type(searchInput, 'bi')

    let toursList = await screen.findByLabelText('Tours list')
    expect(within(toursList).getByText('Lagoon Birdwatching Drift')).toBeVisible()
    expect(within(toursList).getByText('Shallow Snorkel Circuit')).toBeVisible()

    await userEvent.type(searchInput, 'rdwatching')

    await screen.findByRole('button', { name: 'Remove filter Search: birdwatching' })

    toursList = await screen.findByLabelText('Tours list')
    expect(within(toursList).getByText('Lagoon Birdwatching Drift')).toBeVisible()
    expect(within(toursList).queryByText('Shallow Snorkel Circuit')).not.toBeInTheDocument()
    expect(screen.getAllByText('Showing 1 tour').length).toBeGreaterThan(0)

    const updatedSearchInput = await screen.findByRole('textbox', {
      name: 'Search tours',
    })
    await userEvent.clear(updatedSearchInput)
    await screen.findAllByText('Showing 2 tours')

    toursList = await screen.findByLabelText('Tours list')
    expect(within(toursList).getByText('Lagoon Birdwatching Drift')).toBeVisible()
    expect(within(toursList).getByText('Shallow Snorkel Circuit')).toBeVisible()
  })

  it('shows an empty state for a category with no results', async () => {
    server.use(emptyToursCategoryHandler('Kayak Tour'))

    setViewportPosition()
    await renderToursRoute()
    await applyCategoryFilter('Kayak Tour', /Show \d+ tours?/)

    expect(
      await screen.findByText('No tours match this category right now.'),
    ).toBeVisible()
    expect(
      screen.getByText(
        'Try widening your search or clearing one of the active filters.',
      ),
    ).toBeVisible()
  })

  it('shows a translated error state when the handler fails', async () => {
    server.use(toursErrorHandler('broken'))

    await renderToursRoute('es')

    expect(
      await screen.findByText(
        'No pudimos cargar los tours en este momento. Actualiza o prueba otro idioma.',
      ),
    ).toBeVisible()
  })
})
