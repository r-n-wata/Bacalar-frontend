import { cleanup, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { EventsPage } from '../../events/pages/EventsPage'
import { EventDetailPage } from '../../events/pages/EventDetailPage'
import { RestaurantsPage } from '../../restaurants/pages/RestaurantsPage'
import { RestaurantDetailPage } from '../../restaurants/pages/RestaurantDetailPage'
import { server } from '../../../test/msw/server'
import { jsonSuccess } from '../../../test/msw/core'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { ToursPage } from '../../tours/pages/ToursPage'
import { TourDetailPage } from '../../tours/pages/TourDetailPage'
import { homeErrorHandler } from '../mocks/handlers'
import { getHomeFixture } from '../mocks/home.fixtures'
import { HomePage } from './HomePage'


afterEach(() => {
  cleanup()
})

describe('HomePage', () => {
  function renderHomeRoute(language?: 'en' | 'es') {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <AppShell />,
          children: [
            {
              index: true,
              element: <HomePage />,
            },
            {
              path: 'events',
              element: <EventsPage />,
            },
            {
              path: 'events/:id',
              element: <EventDetailPage />,
            },
            {
              path: 'restaurants',
              element: <RestaurantsPage />,
            },
            {
              path: 'restaurants/:id',
              element: <RestaurantDetailPage />,
            },
            {
              path: 'tours',
              element: <ToursPage />,
            },
            {
              path: 'tours/:id',
              element: <TourDetailPage />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/'],
      },
    )

    return renderWithProviders(<RouterProvider router={router} />, {
      language,
    })
  }

  it('renders homepage content from the home API and refetches on language change', async () => {
    await renderHomeRoute()

    expect(
      await screen.findByText(
        'A calmer way to tour Bacalar',
      ),
    ).toBeVisible()

    expect(screen.getAllByRole('link', { name: 'See all tours' })).toHaveLength(
      2,
    )

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    expect(
      await screen.findByText(
        'Una forma mas tranquila de vivir Bacalar',
      ),
    ).toBeVisible()
  })

  it('routes a homepage card into the feature-owned detail page', async () => {
    await renderHomeRoute()

    await userEvent.click(
      await screen.findByRole('link', { name: /Private Sailing at Sunrise/i }),
    )

    expect(
      await screen.findByRole('heading', {
        name: 'Private Sailing at Sunrise',
      }),
    ).toBeVisible()
    expect(screen.getAllByRole('link', { name: 'See all tours' })).toHaveLength(1)
  })

  it('renders cards even when image metadata is missing', async () => {
    server.use(
      http.get('/api/home', async () =>
        jsonSuccess({
          hero: {
            eyebrow: 'Fallback',
            title: 'Image-optional homepage',
            description: 'Cards should still render cleanly without images.',
          },
          spotlight: {
            actions: [{ key: 'tours', label: 'Tours' }],
            entries: {
              tours: {
                title: 'Tour spotlight',
                description: 'Still visible.',
                route: '/tours',
                cta: 'Browse tours',
                metrics: [{ label: 'Best for', value: 'Fallback' }],
              },
            },
          },
          featuredTours: {
            intro: {
              eyebrow: 'Tours',
              title: 'Fallback tours',
              description: 'Testing text-first rendering.',
            },
            items: [
              {
                id: 'tour-kayak',
                title: 'Guided Mangrove Kayak',
                subtitle: 'Fallback lagoon route',
                description: 'Text only card',
                meta: '2 hours',
                route: '/tours/tour-kayak',
              },
            ],
          },
          diningMoments: {
            intro: {
              eyebrow: 'Food',
              title: 'Fallback dining',
              description: 'Still works',
            },
            items: [],
          },
          weeklyHappenings: {
            intro: {
              eyebrow: 'Events',
              title: 'Fallback events',
              description: 'Still works',
            },
            items: [],
          },
        }),
      ),
    )

    await renderHomeRoute()

    expect(await screen.findByText('Image-optional homepage')).toBeVisible()
    expect(screen.getByText('Text only card')).toBeVisible()
    expect(
      screen.getByRole('img', { name: 'Guided Mangrove Kayak' }),
    ).toBeVisible()
  })

  it('renders the denser card anatomy for all homepage groups', async () => {
    await renderHomeRoute()

    expect(await screen.findByText('Lagoon, Bacalar')).toBeVisible()
    expect(screen.getByText('Garden breakfast spot')).toBeVisible()
    expect(screen.getByText('Casa Laguna Deck')).toBeVisible()
    expect(
      screen.getByText('Private crew, sunrise light, slower pace.'),
    ).toBeVisible()
    expect(screen.getByText('Vegetarian · $$')).toBeVisible()
    expect(screen.getByRole('img', { name: 'Lagoon Breathwork Session' })).toBeVisible()
  })

  it('removes the browse-quickly section, keeps navigation visible, and renders the footer', async () => {
    await renderHomeRoute()

    expect(
      await screen.findByText(
        'A calmer way to tour Bacalar',
      ),
    ).toBeVisible()
    expect(screen.queryByText('Browse quickly')).not.toBeInTheDocument()
    expect(screen.queryByText('Pick the next right move')).not.toBeInTheDocument()
    expect(screen.queryByText('How to use this page')).not.toBeInTheDocument()
    expect(screen.queryByText('Start here')).not.toBeInTheDocument()

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeVisible()
    expect(screen.getAllByRole('img', { name: 'Sueno Bacalar' })).toHaveLength(2)
    expect(screen.getByText('Helping you discover the best of Bacalar without the endless searching')).toBeVisible()
    expect(screen.getAllByRole('link', { name: 'Overview' })).toHaveLength(2)
  })

  it('renders at most 10 cards per homepage rail', async () => {
    const fixture = getHomeFixture('en')
    const expandedTours = Array.from({ length: 12 }, (_, index) => ({
      ...fixture.featuredTours.items[index % fixture.featuredTours.items.length],
      id: `tour-${index + 1}`,
      title: `Tour Card ${index + 1}`,
      route: `/tours/tour-${index + 1}`,
    }))

    server.use(
      http.get('/api/home', async () =>
        jsonSuccess({
          ...fixture,
          featuredTours: {
            ...fixture.featuredTours,
            items: expandedTours,
          },
        }),
      ),
    )

    await renderHomeRoute()

    const toursSection = await screen.findByRole('region', {
      name: 'Our favourite lagoon tours',
    })

    expect(
      within(toursSection).getAllByRole('link', { name: /Tour Card/i }),
    ).toHaveLength(10)
    expect(screen.queryByRole('link', { name: 'Tour Card 11' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Tour Card 12' })).not.toBeInTheDocument()
  })

  it('shows a localized homepage error state when the handler fails', async () => {
    server.use(homeErrorHandler('broken'))

    await renderHomeRoute('es')

    expect(
      await screen.findByText(
        'No pudimos cargar la pagina principal en este momento. Intentalo de nuevo.',
      ),
    ).toBeVisible()
  })
})
