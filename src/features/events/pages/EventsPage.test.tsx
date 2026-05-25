import { fireEvent, screen } from '@testing-library/react'
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

  it('renders localized events, paginates, and refetches when the language changes', async () => {
    setViewportPosition()
    await renderEventsRoute()

    expect(await screen.findByText('Sunset Jazz by the Lagoon')).toBeVisible()
    expect(screen.getByText('Lagoon Salsa Night')).toBeVisible()
    expect(
      screen.queryByRole('button', { name: 'Load more events' }),
    ).not.toBeInTheDocument()

    await scrollToPageBottom()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Load more events' }),
    )

    expect(await screen.findByText('Courtyard Vinyl Jam')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    expect(
      await screen.findByText('Jazz al atardecer junto a la laguna'),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Musica' })).toBeVisible()
    expect(
      screen.queryByText('Sesion de vinilos en el patio'),
    ).not.toBeInTheDocument()
  })

  it('filters events by category and paginates within the active category', async () => {
    setViewportPosition()
    await renderEventsRoute()

    await userEvent.click(screen.getByRole('button', { name: 'Music' }))

    expect(await screen.findByText('Sunset Jazz by the Lagoon')).toBeVisible()
    expect(screen.getByText('Rooftop DJ Session')).toBeVisible()
    expect(screen.getByText('Moonlight Cinema by the Water')).toBeVisible()
    expect(screen.queryByText('Local Market Brunch Crawl')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Load more events' })).not.toBeInTheDocument()
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

    expect(await screen.findByText('Local Market Brunch Crawl')).toBeVisible()
    expect(screen.getByText('Lagoon Taco Walk')).toBeVisible()
    expect(screen.getByText('Ceviche Lab Pop-Up')).toBeVisible()
    expect(screen.queryByText('Courtyard Vinyl Jam')).not.toBeInTheDocument()
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
