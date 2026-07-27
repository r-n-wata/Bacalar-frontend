import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { defaultMockDelayMs } from '../../../test/msw/core'
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
  it('keeps the detail scaffold mounted during initial loading', async () => {
    await renderDetailRoute('/restaurants/rest-cielo')

    expect(
      screen.getByTestId('restaurant-detail-hero-placeholder'),
    ).toBeVisible()
    expect(
      screen.getByTestId('restaurant-detail-intro-placeholder'),
    ).toBeVisible()
    expect(
      screen.getByTestId('restaurant-detail-layout-placeholder'),
    ).toBeVisible()

    expect(
      await screen.findByText('Cielo de Maiz', {}, {
        timeout: defaultMockDelayMs * 4,
      }),
    ).toBeVisible()
  })

  it('renders the embedded map section when map data exists', async () => {
    await renderDetailRoute('/restaurants/rest-cielo')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Cielo de Maiz' }),
    ).toBeVisible()
    expect(screen.getAllByText('Cielo de Maiz').length).toBeGreaterThan(0)
    expect(
      screen.getByText(
        'Contact the operator directly for pricing, availability and questions',
      ),
    ).toBeVisible()
    expect(screen.getAllByTitle('Cielo de Maiz map').length).toBeGreaterThan(0)
  })

  it('renders a placeholder hero image when the restaurant has no image', async () => {
    await renderDetailRoute()

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Bruma Azul' }),
    ).toBeVisible()
    expect(
      screen.getAllByRole('img', { name: 'Bruma Azul' }).length,
    ).toBeGreaterThan(0)
  })
})
