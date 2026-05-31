import { fireEvent, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { server } from '../../../test/msw/server'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { EventsPage } from './EventsPage'
import {
  emptyEventsCategoryHandler,
  eventsErrorHandler,
} from '../mocks/handlers'

describe('EventsPage', () => {
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

  function renderEventsRoute(language?: 'en' | 'es') {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <AppShell />,
          children: [
            {
              path: 'events',
              element: <EventsPage />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/events'],
      },
    )

    return renderWithProviders(<RouterProvider router={router} />, {
      language,
    })
  }

  it('renders hero, featured strip, filters, list, and submit cta in order', async () => {
    setViewportPosition()
    await renderEventsRoute()

    const heroTitle = await screen.findByText(
      'See what feels current in Bacalar this week',
    )
    const featuredTitle = screen.getByText('Start with the strongest event picks')
    const categoryFilter = screen.getByRole('button', { name: 'All' })
    const eventsList = screen.getByLabelText('Events list')
    const submitTitle = screen.getByText('Submit an event for review')

    expect(heroTitle.compareDocumentPosition(featuredTitle)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(featuredTitle.compareDocumentPosition(categoryFilter)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(categoryFilter.compareDocumentPosition(eventsList)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(eventsList.compareDocumentPosition(submitTitle)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )

    const featuredSection = screen.getByLabelText('Featured events')
    expect(within(featuredSection).getAllByRole('link')).toHaveLength(5)
    expect(within(featuredSection).getByText('Local Market Brunch Crawl')).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'Submit an event' }),
    ).toHaveAttribute('href', '/events/submit')
  })

  it('renders localized events, paginates, and refetches when the language changes', async () => {
    setViewportPosition()
    await renderEventsRoute()

    const eventsList = await screen.findByLabelText('Events list')
    expect(within(eventsList).getByText('Sunset Jazz by the Lagoon')).toBeVisible()
    expect(within(eventsList).getByText('Lagoon Salsa Night')).toBeVisible()
    expect(
      screen.queryByRole('button', { name: 'Load more events' }),
    ).not.toBeInTheDocument()

    await scrollToPageBottom()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Load more events' }),
    )

    expect(await screen.findByText('Courtyard Vinyl Jam')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    const localizedEventsList = await screen.findByLabelText('Lista de eventos')
    expect(
      within(localizedEventsList).getByText('Jazz al atardecer junto a la laguna'),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Musica' })).toBeVisible()
    expect(screen.getByText('Empieza con los eventos mas fuertes del momento')).toBeVisible()
    expect(
      screen.queryByText('Sesion de vinilos en el patio'),
    ).not.toBeInTheDocument()
  })

  it('keeps featured events global while filters change the main list', async () => {
    setViewportPosition()
    await renderEventsRoute()

    await userEvent.click(screen.getByRole('button', { name: 'Music' }))

    const featuredSection = await screen.findByLabelText('Featured events')
    expect(within(featuredSection).getByText('Local Market Brunch Crawl')).toBeVisible()
    const eventsList = await screen.findByLabelText('Events list')
    expect(within(eventsList).getByText('Sunset Jazz by the Lagoon')).toBeVisible()
    expect(within(eventsList).getByText('Rooftop DJ Session')).toBeVisible()
    expect(within(eventsList).getByText('Moonlight Cinema by the Water')).toBeVisible()
    expect(within(eventsList).queryByText('Lagoon Taco Walk')).not.toBeInTheDocument()
  })

  it('resets paginated results when the category changes', async () => {
    setViewportPosition()
    await renderEventsRoute()

    await scrollToPageBottom()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Load more events' }),
    )
    expect(await screen.findByText('Courtyard Vinyl Jam')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'Food' }))

    const eventsList = await screen.findByLabelText('Events list')
    expect(within(eventsList).getByText('Local Market Brunch Crawl')).toBeVisible()
    expect(within(eventsList).getByText('Lagoon Taco Walk')).toBeVisible()
    expect(within(eventsList).getByText('Ceviche Lab Pop-Up')).toBeVisible()
    expect(within(eventsList).queryByText('Courtyard Vinyl Jam')).not.toBeInTheDocument()
  })

  it('shows an empty state for a category with no results', async () => {
    server.use(emptyEventsCategoryHandler('wellness'))

    setViewportPosition()
    await renderEventsRoute()
    await userEvent.click(screen.getByRole('button', { name: 'Wellness' }))

    expect(
      await screen.findByText('No events in this category right now.'),
    ).toBeVisible()
    expect(
      screen.getByText(
        'Try another category or come back later for more Wellness plans.',
      ),
    ).toBeVisible()
  })

  it('shows a translated error state when the handler fails', async () => {
    server.use(eventsErrorHandler('broken'))

    await renderEventsRoute('es')

    expect(
      await screen.findByText(
        'No pudimos cargar los eventos en este momento. Actualiza o prueba otro idioma.',
      ),
    ).toBeVisible()
  })
})
