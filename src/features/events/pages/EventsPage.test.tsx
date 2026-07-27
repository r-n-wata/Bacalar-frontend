import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { server } from '../../../test/msw/server'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { EventsPage } from './EventsPage'
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

  async function openFilters() {
    await userEvent.click(await screen.findByRole('button', { name: 'Filters' }))
    return screen.findByRole('dialog', { name: 'Filter events' })
  }

  it('renders hero, featured strip, compact filter controls, list, and submit cta in order', async () => {
    setViewportPosition()
    await renderEventsRoute()

    const heroTitle = await screen.findByText('Events happening this week')
    const featuredTitle = screen.getByText('Our top picks for this week.')
    const searchInput = await screen.findByRole('textbox', { name: 'Search events' })
    const filtersButton = screen.getByRole('button', { name: 'Filters' })
    const eventsList = screen.getByLabelText('Events list')
    const submitTitle = screen.getByText('Submit an event for review')

    expect(heroTitle.compareDocumentPosition(featuredTitle)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(featuredTitle.compareDocumentPosition(searchInput)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(searchInput.compareDocumentPosition(filtersButton)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(filtersButton.compareDocumentPosition(eventsList)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(eventsList.compareDocumentPosition(submitTitle)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )

    expect((await screen.findAllByText('Showing 7 events'))[0]).toBeVisible()
  })

  it('renders localized events and localized filter controls after language change', async () => {
    setViewportPosition()
    await renderEventsRoute()

    expect(await screen.findByText('Sunrise Paddle Meditation')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    const localizedEventsList = await screen.findByLabelText('Lista de eventos')
    expect(
      within(localizedEventsList).getByText('Meditacion al amanecer en paddle'),
    ).toBeVisible()
    expect(screen.getByRole('textbox', { name: 'Buscar eventos' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Filtros' })).toBeVisible()
  })

  it('keeps featured events global while filters change the main list', async () => {
    setViewportPosition()
    await renderEventsRoute()

    const dialog = await openFilters()
    const categorySelect = within(dialog).getByRole('combobox')
    await userEvent.selectOptions(categorySelect, 'music')
    await userEvent.click(
      await within(dialog).findByRole('button', { name: 'Show 3 events' }),
    )

    const featuredSection = await screen.findByLabelText('Featured events')
    expect(within(featuredSection).getByText('Local Market Brunch Crawl')).toBeVisible()

    const eventsList = await screen.findByLabelText('Events list')
    expect(within(eventsList).getByText('Moonlight Cinema by the Water')).toBeVisible()
    expect(within(eventsList).getByText('Lagoon Salsa Night')).toBeVisible()
    expect(within(eventsList).queryByText('Ceviche Lab Pop-Up')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Remove filter Music' }),
    ).toBeVisible()
  })

  it('filters events automatically once the query reaches three characters', async () => {
    setViewportPosition()
    await renderEventsRoute()

    const searchInput = await screen.findByRole('textbox', { name: 'Search events' })
    await userEvent.type(searchInput, 'sa')

    let eventsList = await screen.findByLabelText('Events list')
    expect(within(eventsList).getByText('Sunrise Paddle Meditation')).toBeVisible()
    expect(within(eventsList).getByText('Lagoon Salsa Night')).toBeVisible()

    await userEvent.type(searchInput, 'lsa')

    await screen.findByRole('button', { name: 'Remove filter Search: salsa' })

    eventsList = await screen.findByLabelText('Events list')
    expect(within(eventsList).getByText('Lagoon Salsa Night')).toBeVisible()
    expect(
      within(eventsList).queryByText('Sunrise Paddle Meditation'),
    ).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Remove filter Search: salsa' }))

    expect(await screen.findByText('Sunrise Paddle Meditation')).toBeVisible()
    expect((await screen.findAllByText('Showing 7 events'))[0]).toBeVisible()
  })

  it('shows the filtered empty state with a submit CTA when no events match', async () => {
    setViewportPosition()
    await renderEventsRoute()
    await screen.findByLabelText('Events list')

    const searchInput = screen.getByRole('textbox', { name: 'Search events' })
    await userEvent.type(searchInput, 'zzz-no-match{enter}')

    expect(
      await screen.findByText('No events match these filters right now.'),
    ).toBeVisible()
    expect(
      screen.getByText(
        'Try widening your search or clearing one of the active filters.',
      ),
    ).toBeVisible()
    expect(screen.getByRole('link', { name: 'Submit an event' })).toHaveAttribute(
      'href',
      '/events/submit',
    )
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
