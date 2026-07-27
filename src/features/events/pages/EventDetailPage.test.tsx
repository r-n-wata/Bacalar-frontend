import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { defaultMockDelayMs } from '../../../test/msw/core'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { EventDetailPage } from './EventDetailPage'
import { server } from '../../../test/msw/server'
import {
  eventDetailErrorHandler,
  eventDetailNotFoundHandler,
} from '../mocks/handlers'

function renderDetailRoute(path = '/events/event-breathwork') {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppShell />,
        children: [
          {
            path: 'events/:id',
            element: <EventDetailPage />,
          },
        ],
      },
    ],
    {
      initialEntries: [path],
    },
  )

  return renderWithProviders(<RouterProvider router={router} />)
}

describe('EventDetailPage', () => {
  it('keeps the detail scaffold mounted during initial loading', async () => {
    await renderDetailRoute('/events/event-sunset-jazz')

    expect(screen.getByTestId('event-detail-hero-placeholder')).toBeVisible()
    expect(screen.getByTestId('event-detail-intro-placeholder')).toBeVisible()
    expect(screen.getByTestId('event-detail-layout-placeholder')).toBeVisible()

    expect(
      await screen.findByText('Sunset Jazz by the Lagoon', {}, {
        timeout: defaultMockDelayMs * 4,
      }),
    ).toBeVisible()
  })

  it('renders the embedded map section when map data exists', async () => {
    await renderDetailRoute('/events/event-sunset-jazz')

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Sunset Jazz by the Lagoon',
      }),
    ).toBeVisible()
    expect(screen.getByRole('link', { name: 'View on map' })).toHaveAttribute(
      'href',
      'https://maps.google.com/?q=Costera+12+Bacalar',
    )
    expect(screen.getByTitle('Sunset Jazz by the Lagoon map')).toBeVisible()
  })

  it('renders a placeholder hero image when the event has no image', async () => {
    await renderDetailRoute()

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Lagoon Breathwork Session',
      }),
    ).toBeVisible()
    expect(
      screen.getAllByRole('img', { name: 'Lagoon Breathwork Session' }).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText(
        'A softer sunrise plan that leans into Bacalar calm, ideal for visitors who want one restorative moment rather than another packed activity.',
      ).length,
    ).toBeGreaterThan(0)
    expect(screen.getByText('Sunday, 8:00 AM')).toBeVisible()
    expect(screen.getAllByText('Isla Yoga Garden').length).toBeGreaterThan(0)
  })

  it('shows an unavailable state for missing events', async () => {
    server.use(eventDetailNotFoundHandler('event-breathwork'))

    await renderDetailRoute()

    expect(
      await screen.findByText('This event is no longer available.'),
    ).toBeVisible()
    expect(screen.getByRole('link', { name: 'See all events' })).toHaveAttribute(
      'href',
      '/events',
    )
  })

  it('shows a retryable error state for server failures', async () => {
    server.use(eventDetailErrorHandler('event-breathwork', 'broken'))

    await renderDetailRoute()

    expect(
      await screen.findByText('We could not load upcoming events.'),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Try again' })).toBeVisible()
  })
})
