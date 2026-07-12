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
  it('renders a placeholder hero image when the restaurant has no image', async () => {
    await renderDetailRoute()

    expect(await screen.findByText('Bruma Azul')).toBeVisible()
    expect(screen.getByRole('img', { name: 'Bruma Azul' })).toBeVisible()
  })
})
