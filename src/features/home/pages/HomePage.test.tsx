import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
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
import { HomePage } from './HomePage'

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
        'Start with the water, then layer in food and what is happening this week.',
      ),
    ).toBeVisible()

    expect(screen.getAllByRole('link', { name: 'See all tours' })).toHaveLength(
      2,
    )

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    expect(
      await screen.findByText(
        'Empieza por el agua y despues suma comida y lo que esta pasando esta semana.',
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
    expect(screen.getAllByRole('link', { name: 'See all tours' })).toHaveLength(
      3,
    )
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
          planningCallout: {
            eyebrow: 'Fallback',
            title: 'Still structured',
            description: 'No image should not break the homepage.',
            items: ['One item'],
          },
          featuredExperiences: {
            intro: {
              eyebrow: 'Tours',
              title: 'Fallback tours',
              description: 'Testing text-first rendering.',
            },
            items: [
              {
                id: 'tour-kayak',
                title: 'Guided Mangrove Kayak',
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

    expect(await screen.findByText('Guided Mangrove Kayak')).toBeVisible()
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
