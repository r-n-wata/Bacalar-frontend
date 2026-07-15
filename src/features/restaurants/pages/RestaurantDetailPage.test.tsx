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
  it('renders the embedded map section when map data exists', async () => {
    await renderDetailRoute('/restaurants/rest-cielo')

    expect(await screen.findByText('Cielo de Maiz')).toBeVisible()
    expect(screen.getByRole('link', { name: 'View on map' })).toHaveAttribute(
      'href',
      'https://maps.google.com/?q=Avenida+3+210+Bacalar',
    )
    expect(screen.getByTitle('Cielo de Maiz map')).toBeVisible()
  })

  it('renders a placeholder hero image when the restaurant has no image', async () => {
    await renderDetailRoute()

    expect(await screen.findByText('Bruma Azul')).toBeVisible()
    expect(screen.getByRole('img', { name: 'Bruma Azul' })).toBeVisible()
    expect(screen.queryByRole('link', { name: 'View on map' })).not.toBeInTheDocument()
  })
})
