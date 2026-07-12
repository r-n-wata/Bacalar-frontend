import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { EventDetailPage } from './EventDetailPage'

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
  it('renders a placeholder hero image when the event has no image', async () => {
    await renderDetailRoute()

    expect(await screen.findByText('Lagoon Breathwork Session')).toBeVisible()
    expect(
      screen.getByRole('img', { name: 'Lagoon Breathwork Session' }),
    ).toBeVisible()
  })
})
