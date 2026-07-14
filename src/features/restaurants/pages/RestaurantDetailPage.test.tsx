import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { RestaurantDetailPage } from './RestaurantDetailPage'

function renderDetailRoute(path = '/restaurants/rest-bruma') {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppShell />,
        children: [
          {
            path: 'restaurants/:id',
            element: <RestaurantDetailPage />,
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

describe('RestaurantDetailPage', () => {
  it('renders a placeholder hero image with the compact intro layout', async () => {
    await renderDetailRoute()

    expect(await screen.findByText('Bruma Azul')).toBeVisible()
    expect(screen.getAllByRole('img', { name: 'Bruma Azul' }).length).toBeGreaterThan(0)
    expect(screen.getAllByText('A lighter breakfast or coffee stop when the morning wants something low-lift before heading back toward the lagoon.')).toHaveLength(1)
    expect(screen.getByText('Cafe plates')).toBeVisible()
    expect(screen.getAllByText('Breakfast').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'See all restaurants' })).toHaveAttribute(
      'href',
      '/restaurants',
    )
  })
})
