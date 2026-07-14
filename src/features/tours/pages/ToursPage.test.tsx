import { fireEvent, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { server } from '../../../test/msw/server'
import { renderWithProviders } from '../../../test/renderWithProviders'
import {
  emptyToursCategoryHandler,
  toursErrorHandler,
} from '../mocks/handlers'
import { ToursPage } from './ToursPage'

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

  async function scrollToPageBottom() {
    setViewportPosition({
      scrollY: 1400,
      scrollHeight: 2000,
      innerHeight: 800,
    })

    fireEvent.scroll(window)
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
    const categoryFilter = screen.getByRole('button', { name: 'All' })
    const toursList = screen.getByLabelText('Tours list')
    const submitTitle = screen.getByText('Know a tour we should feature?')

    expect(heroTitle.compareDocumentPosition(featuredTitle)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(featuredTitle.compareDocumentPosition(categoryFilter)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(categoryFilter.compareDocumentPosition(toursList)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(toursList.compareDocumentPosition(submitTitle)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )

    const featuredSection = screen.getByLabelText('Featured tours')
    expect(within(featuredSection).getAllByRole('link')).toHaveLength(3)
    expect(within(featuredSection).getByText('Private Sailing at Sunrise')).toBeVisible()
    expect(within(featuredSection).getByText('Provided by Laguna Vela')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Submit a tour' })).toHaveAttribute(
      'href',
      '/tours/submit',
    )
  })

  it('renders localized tours, paginates, and refetches when the language changes', async () => {
    setViewportPosition()
    await renderToursRoute()

    const toursList = await screen.findByLabelText('Tours list')
    expect(within(toursList).getByText('Private Sailing at Sunrise')).toBeVisible()
    expect(within(toursList).getByText('Family Pontoon Loop')).toBeVisible()
    expect(within(toursList).getByText('Provided by Casa Ponton')).toBeVisible()
    expect(
      screen.queryByRole('button', { name: 'Load more tours' }),
    ).not.toBeInTheDocument()

    await scrollToPageBottom()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Load more tours' }),
    )

    expect(await screen.findByText('Guided Mangrove Kayak')).toBeVisible()
    expect(screen.getByRole('img', { name: 'Guided Mangrove Kayak' })).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    const localizedToursList = await screen.findByLabelText('Lista de tours')
    expect(
      within(localizedToursList).getByText('Vela privada al amanecer'),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Boat Tour' })).toBeVisible()
    expect(screen.getByText('Nuestras recomendaciones principales')).toBeVisible()
    expect(screen.queryByText('Guided Mangrove Kayak')).not.toBeInTheDocument()
  })

  it('keeps featured tours global while filters change the main list', async () => {
    setViewportPosition()
    await renderToursRoute()

    await userEvent.click(
      await screen.findByRole('button', { name: 'Kayak Tour' }),
    )

    const featuredSection = await screen.findByLabelText('Featured tours')
    expect(within(featuredSection).getByText('Private Sailing at Sunrise')).toBeVisible()
    const toursList = await screen.findByLabelText('Tours list')
    expect(within(toursList).getByText('Guided Mangrove Kayak')).toBeVisible()
    expect(within(toursList).queryByText('Family Pontoon Loop')).not.toBeInTheDocument()
  })

  it('resets paginated results when the category changes', async () => {
    setViewportPosition()
    await renderToursRoute()

    await scrollToPageBottom()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Load more tours' }),
    )
    expect(await screen.findByText('Guided Mangrove Kayak')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'Boat Tour' }))

    const toursList = await screen.findByLabelText('Tours list')
    expect(within(toursList).getByText('Family Pontoon Loop')).toBeVisible()
    expect(within(toursList).queryByText('Guided Mangrove Kayak')).not.toBeInTheDocument()
  })

  it('shows an empty state for a category with no results', async () => {
    server.use(emptyToursCategoryHandler('Kayak Tour'))

    setViewportPosition()
    await renderToursRoute()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Kayak Tour' }),
    )

    expect(
      await screen.findByText('No tours match this category right now.'),
    ).toBeVisible()
    expect(
      screen.getByText(
        'Try another category or come back later for more Kayak Tour options.',
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
