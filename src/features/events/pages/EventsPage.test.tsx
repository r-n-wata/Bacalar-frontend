import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { server } from '../../../test/msw/server'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { EventsPage } from './EventsPage'
import {
  emptyEventsCategoryHandler,
} from '../mocks/handlers'
import { http } from 'msw'
import { jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { getEventsFixture } from '../mocks/events.fixtures'
import { eventsApiPath } from '../api/getEvents'

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
      'Events happening this week',
    )
    const featuredTitle = screen.getByText('Our top picks for this week.')
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
      within(featuredSection).getByRole('img', { name: 'Lagoon Breathwork Session' }),
    ).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'Submit an event' }),
    ).toHaveAttribute('href', '/events/submit')
  })

  it('renders localized events, paginates, and refetches when the language changes', async () => {
    setViewportPosition()
    await renderEventsRoute()

    const eventsList = await screen.findByLabelText('Events list')
    expect(within(eventsList).getByText('Sunrise Paddle Meditation')).toBeVisible()
    expect(within(eventsList).getByText('Lagoon Salsa Night')).toBeVisible()
    expect(
      screen.queryByRole('button', { name: 'Load more events' }),
    ).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    const localizedEventsList = await screen.findByLabelText('Lista de eventos')
    expect(
      within(localizedEventsList).getByText('Meditacion al amanecer en paddle'),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Musica' })).toBeVisible()
    expect(
      screen.getByText('Nuestras mejores recomendaciones de esta semana.'),
    ).toBeVisible()
    expect(screen.queryByText('Sunrise Paddle Meditation')).not.toBeInTheDocument()
  })

  it('keeps featured events global while filters change the main list', async () => {
    setViewportPosition()
    await renderEventsRoute()

    await userEvent.click(screen.getByRole('button', { name: 'Music' }))

    const featuredSection = await screen.findByLabelText('Featured events')
    expect(within(featuredSection).getByText('Local Market Brunch Crawl')).toBeVisible()
    const eventsList = await screen.findByLabelText('Events list')
    expect(within(eventsList).getByText('Moonlight Cinema by the Water')).toBeVisible()
    expect(within(eventsList).getByText('Lagoon Salsa Night')).toBeVisible()
    expect(within(eventsList).queryByText('Lagoon Taco Walk')).not.toBeInTheDocument()
  })

  it('resets paginated results when the category changes', async () => {
    setViewportPosition()
    await renderEventsRoute()

    await userEvent.click(screen.getByRole('button', { name: 'Music' }))
    expect(await screen.findByText('Lagoon Salsa Night')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'Food' }))

    const eventsList = await screen.findByLabelText('Events list')
    expect(within(eventsList).getByText('Ceviche Lab Pop-Up')).toBeVisible()
    expect(within(eventsList).queryByText('Lagoon Salsa Night')).not.toBeInTheDocument()
  })

  it('shows the upcoming-events empty state with a submit CTA when the API succeeds with no results', async () => {
    server.use(emptyEventsCategoryHandler('wellness'))

    setViewportPosition()
    await renderEventsRoute()
    await userEvent.click(screen.getByRole('button', { name: 'Wellness' }))

    expect(
      await screen.findByText('There are currently no upcoming events.'),
    ).toBeVisible()
    expect(
      screen.getByText(
        'Check back soon for new listings, or submit an event for review.',
      ),
    ).toBeVisible()
    const submitLinks = screen.getAllByRole('link', { name: 'Submit an event' })
    expect(submitLinks).toHaveLength(1)
    expect(submitLinks[0]).toHaveAttribute('href', '/events/submit')
    expect(
      screen.queryByText('Submit an event for review'),
    ).not.toBeInTheDocument()
  })

  it('shows an error state with retry when the handler fails', async () => {
    let attempts = 0

    server.use(
      http.get(eventsApiPath, async ({ request }) => {
        attempts += 1

        if (attempts === 1) {
          return Response.json(
            {
              error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'broken',
              },
            },
            { status: 500 },
          )
        }

        return jsonSuccess(
          getEventsFixture(resolveMockLanguage(request), {
            category: 'all',
            cursor: null,
            limit: 10,
          }),
        )
      }),
    )

    await renderEventsRoute()

    expect(
      await screen.findByText('We could not load upcoming events.'),
    ).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'Try again' }))

    const eventsList = await screen.findByLabelText('Events list')
    expect(
      within(eventsList).getByText('Sunrise Paddle Meditation'),
    ).toBeVisible()
  })
})
