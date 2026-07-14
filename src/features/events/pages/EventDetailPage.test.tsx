import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
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
  it('renders a placeholder hero image with intro details below the hero', async () => {
    await renderDetailRoute()

    expect(await screen.findByText('Lagoon Breathwork Session')).toBeVisible()
    expect(
      screen.getAllByRole('img', { name: 'Lagoon Breathwork Session' }).length,
    ).toBeGreaterThan(0)
    expect(screen.getAllByText('A softer sunrise plan that leans into Bacalar calm, ideal for visitors who want one restorative moment rather than another packed activity.')).toHaveLength(1)
    expect(screen.getByText('Sunday, 8:00 AM')).toBeVisible()
    expect(screen.getByText('Isla Yoga Garden')).toBeVisible()
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
