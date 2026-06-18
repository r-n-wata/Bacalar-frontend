import { fireEvent, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { server } from '../../../test/msw/server'
import { renderWithProviders } from '../../../test/renderWithProviders'
import {
  emptyRestaurantsCategoryHandler,
  restaurantsErrorHandler,
} from '../mocks/handlers'
import { RestaurantsPage } from './RestaurantsPage'

describe('RestaurantsPage', () => {
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

  function renderRestaurantsRoute(language?: 'en' | 'es') {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <AppShell />,
          children: [
            {
              path: 'restaurants',
              element: <RestaurantsPage />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/restaurants'],
      },
    )

    return renderWithProviders(<RouterProvider router={router} />, {
      language,
    })
  }

  it('renders hero, featured strip, filters, and list in order', async () => {
    setViewportPosition()
    await renderRestaurantsRoute()

    const heroTitle = await screen.findByText('Where to eat in Bacalar')
    const featuredTitle = screen.getByText('Start with the strongest meal picks')
    const categoryFilter = screen.getByRole('button', { name: 'All' })
    const restaurantList = screen.getByLabelText('Restaurants list')

    expect(heroTitle.compareDocumentPosition(featuredTitle)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(featuredTitle.compareDocumentPosition(categoryFilter)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(categoryFilter.compareDocumentPosition(restaurantList)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )

    const featuredSection = screen.getByLabelText('Featured restaurants')
    expect(within(featuredSection).getAllByRole('link')).toHaveLength(3)
    expect(within(featuredSection).getByText('Cielo de Maiz')).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'Submit a restaurant' }),
    ).toHaveAttribute('href', '/restaurants/submit')
  })

  it('renders localized restaurants, paginates, and refetches when the language changes', async () => {
    setViewportPosition()
    await renderRestaurantsRoute()

    const restaurantsList = await screen.findByLabelText('Restaurants list')
    expect(within(restaurantsList).getByText('Cielo de Maiz')).toBeVisible()
    expect(within(restaurantsList).queryByText('Orilla Comedor')).not.toBeInTheDocument()

    await scrollToPageBottom()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Load more restaurants' }),
    )

    expect(await screen.findByText('Bruma Azul')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    const localizedRestaurantsList = await screen.findByLabelText(
      'Lista de restaurantes',
    )
    expect(
      within(localizedRestaurantsList).getByText('Favorito local casual'),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Desayuno' })).toBeVisible()
    expect(
      screen.getByText('Conoces un restaurante que deberiamos destacar?'),
    ).toBeVisible()
  })

  it('keeps featured restaurants global while filters change the main list', async () => {
    setViewportPosition()
    await renderRestaurantsRoute()

    await userEvent.click(screen.getByRole('button', { name: 'Dinner' }))

    const featuredSection = await screen.findByLabelText('Featured restaurants')
    expect(within(featuredSection).getByText('Cielo de Maiz')).toBeVisible()
    const restaurantsList = await screen.findByLabelText('Restaurants list')
    expect(within(restaurantsList).getByText('Nao')).toBeVisible()
    expect(within(restaurantsList).getByText('Orilla Comedor')).toBeVisible()
    expect(within(restaurantsList).queryByText('Ixchel Cocina')).not.toBeInTheDocument()
  })

  it('resets paginated results when the category changes', async () => {
    setViewportPosition()
    await renderRestaurantsRoute()

    await scrollToPageBottom()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Load more restaurants' }),
    )
    expect(await screen.findByText('Bruma Azul')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'Breakfast' }))

    const restaurantsList = await screen.findByLabelText('Restaurants list')
    expect(within(restaurantsList).getByText('Cielo de Maiz')).toBeVisible()
    expect(within(restaurantsList).getByText('Bruma Azul')).toBeVisible()
    expect(within(restaurantsList).queryByText('Orilla Comedor')).not.toBeInTheDocument()
  })

  it('shows an empty state for a category with no results', async () => {
    server.use(emptyRestaurantsCategoryHandler('lunch'))

    setViewportPosition()
    await renderRestaurantsRoute()
    await userEvent.click(screen.getByRole('button', { name: 'Lunch' }))

    expect(
      await screen.findByText('No restaurants match this moment right now.'),
    ).toBeVisible()
    expect(
      screen.getByText(
        'Try another category or come back later for more Lunch options.',
      ),
    ).toBeVisible()
  })

  it('shows a translated error state when the handler fails', async () => {
    server.use(restaurantsErrorHandler('broken'))

    await renderRestaurantsRoute('es')

    expect(
      await screen.findByText(
        'No pudimos cargar los restaurantes en este momento. Actualiza o prueba otro idioma.',
      ),
    ).toBeVisible()
  })
})
