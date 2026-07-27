import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { server } from '../../../test/msw/server'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { restaurantsErrorHandler } from '../mocks/handlers'
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

  async function openFilters() {
    await userEvent.click(await screen.findByRole('button', { name: 'Filters' }))
    return screen.findByRole('dialog', { name: 'Filter restaurants' })
  }

  it('renders hero, featured strip, compact filter controls, and list in order', async () => {
    setViewportPosition()
    await renderRestaurantsRoute()

    const heroTitle = await screen.findByText('Where to eat in Bacalar')
    const featuredTitle = screen.getByText('Start with the strongest meal picks')
    const searchInput = await screen.findByRole('textbox', {
      name: 'Search restaurants',
    })
    const filtersButton = screen.getByRole('button', { name: 'Filters' })
    const restaurantList = screen.getByLabelText('Restaurants list')

    expect(heroTitle.compareDocumentPosition(featuredTitle)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(featuredTitle.compareDocumentPosition(searchInput)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(searchInput.compareDocumentPosition(filtersButton)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(filtersButton.compareDocumentPosition(restaurantList)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )

    expect((await screen.findAllByText('Showing 2 restaurants'))[0]).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'Submit a restaurant' }),
    ).toHaveAttribute('href', '/restaurants/submit')
  })

  it('renders localized restaurants and localized filter controls after language change', async () => {
    setViewportPosition()
    await renderRestaurantsRoute()

    expect(await screen.findByText('Bruma Azul')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    const localizedRestaurantsList = await screen.findByLabelText(
      'Lista de restaurantes',
    )
    expect(
      within(localizedRestaurantsList).getByText('Pausa lenta de media manana'),
    ).toBeVisible()
    expect(
      screen.getByRole('textbox', { name: 'Buscar restaurantes' }),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Filtros' })).toBeVisible()
  })

  it('keeps featured restaurants global while filters change the main list', async () => {
    setViewportPosition()
    await renderRestaurantsRoute()

    const dialog = await openFilters()
    const selects = within(dialog).getAllByRole('combobox')
    await userEvent.selectOptions(selects[0], 'dinner')
    await userEvent.click(
      await within(dialog).findByRole('button', { name: 'Show 1 restaurant' }),
    )

    const featuredSection = await screen.findByLabelText('Featured restaurants')
    expect(within(featuredSection).getByText('Cielo de Maiz')).toBeVisible()

    const restaurantsList = await screen.findByLabelText('Restaurants list')
    expect(within(restaurantsList).getByText('Orilla Comedor')).toBeVisible()
    expect(within(restaurantsList).queryByText('Bruma Azul')).not.toBeInTheDocument()
    expect((await screen.findAllByText('Showing 1 restaurant'))[0]).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'Remove filter Dinner' }),
    ).toBeVisible()
  })

  it('filters restaurants automatically once the query reaches three characters', async () => {
    setViewportPosition()
    await renderRestaurantsRoute()

    const searchInput = await screen.findByRole('textbox', {
      name: 'Search restaurants',
    })
    await userEvent.type(searchInput, 'wo')

    let restaurantsList = await screen.findByLabelText('Restaurants list')
    expect(within(restaurantsList).getByText('Bruma Azul')).toBeVisible()
    expect(within(restaurantsList).getByText('Orilla Comedor')).toBeVisible()

    await userEvent.type(searchInput, 'od-fired')

    await screen.findByRole('button', { name: 'Remove filter Search: wood-fired' })

    restaurantsList = await screen.findByLabelText('Restaurants list')
    expect(within(restaurantsList).getByText('Orilla Comedor')).toBeVisible()
    expect(within(restaurantsList).queryByText('Bruma Azul')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Remove filter Search: wood-fired' }))

    expect(await screen.findByText('Bruma Azul')).toBeVisible()
    expect((await screen.findAllByText('Showing 2 restaurants'))[0]).toBeVisible()
  })

  it('shows a filtered empty state when no restaurants match the active filters', async () => {
    setViewportPosition()
    await renderRestaurantsRoute()
    await screen.findByLabelText('Restaurants list')

    const dialog = await openFilters()
    const selects = within(dialog).getAllByRole('combobox')
    await userEvent.selectOptions(selects[0], 'lunch')
    await userEvent.selectOptions(selects[1], '$$$')
    await userEvent.click(
      await within(dialog).findByRole('button', { name: 'Show 0 restaurants' }),
    )

    expect(
      await screen.findByText('No restaurants match these filters right now.'),
    ).toBeVisible()
    expect(
      screen.getByText(
        'Try widening your search or clearing one of the active filters.',
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
