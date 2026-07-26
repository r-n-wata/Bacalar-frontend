import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { server } from '../../../test/msw/server'
import { http } from 'msw'
import { defaultMockDelayMs, jsonSuccess } from '../../../test/msw/core'
import { TourDetailPage } from './TourDetailPage'
import { tourDetailApiPath } from '../api/getTourDetail'

function renderDetailRoute(path = '/tours/tour-sailing') {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppShell />,
        children: [
          {
            path: 'tours/:id',
            element: <TourDetailPage />,
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

describe('TourDetailPage', () => {
  it('keeps the detail scaffold mounted during initial loading', async () => {
    await renderDetailRoute()

    expect(screen.getByTestId('tour-detail-hero-placeholder')).toBeVisible()
    expect(screen.getByTestId('tour-detail-intro-placeholder')).toBeVisible()
    expect(screen.getByTestId('tour-detail-layout-placeholder')).toBeVisible()

    expect(
      await screen.findByText('Private Sailing at Sunrise', {}, {
        timeout: defaultMockDelayMs * 4,
      }),
    ).toBeVisible()
  })

  it('renders the editorial intro and shared contact actions on the detail page', async () => {
    await renderDetailRoute()

    expect(await screen.findByText('Private Sailing at Sunrise')).toBeVisible()
    expect(screen.getByText('Provided by')).toBeVisible()
    expect(screen.getAllByText('Laguna Vela').length).toBeGreaterThan(0)
    expect(screen.getByText('From MXN 2,800')).toBeVisible()
    expect(screen.getByText('4 hours')).toBeVisible()
    expect(screen.getAllByRole('link', { name: 'WhatsApp' })[0]).toHaveAttribute(
      'href',
      'https://wa.me/529831234567?text=Hi%21+I+found+your+business+on+Sue%C3%B1o+Bacalar+and+would+like+more+information.',
    )
    expect(screen.getAllByRole('link', { name: 'Instagram' })[0]).toHaveAttribute(
      'href',
      'https://instagram.com/lagunavela',
    )
    expect(screen.getAllByRole('link', { name: 'Website' })[0]).toHaveAttribute(
      'href',
      'https://lagunavela.example.com',
    )
    expect(screen.getAllByRole('link', { name: 'Google Maps' })[0]).toHaveAttribute(
      'href',
      'https://maps.google.com/?q=Boulevard+Costero+17+Bacalar',
    )
    expect(screen.getByText('What is included')).toBeVisible()
    expect(screen.getByText('Meeting point')).toBeVisible()
    expect(screen.getByRole('link', { name: 'View on map' })).toHaveAttribute(
      'href',
      'https://maps.google.com/?q=Boulevard+Costero+17+Bacalar',
    )
    expect(screen.getByTitle('Private Sailing at Sunrise map')).toBeVisible()
  })

  it('handles missing optional contact fields and missing images', async () => {
    server.use(
      http.get(tourDetailApiPath('tour-kayak'), async () =>
        jsonSuccess({
          id: 'tour-kayak',
          name: 'Guided Mangrove Kayak',
          category: 'Kayak Tour',
          duration: '2 hours',
          priceFrom: 'From MXN 900',
          privateOrShared: 'Shared',
          bestFor: 'Nature',
          difficulty: 'Moderate',
          suitableForKids: 'Older kids',
          description: 'A shorter paddle.',
          imageUrls: [],
          operatorName: 'Manglar Guides',
          operatorPrimaryContactMethod: 'Instagram',
          contact: {
            providerName: 'Manglar Guides',
          },
          route: '/tours/tour-kayak',
        }),
      ),
    )

    await renderDetailRoute('/tours/tour-kayak')

    expect(await screen.findByText('Guided Mangrove Kayak')).toBeVisible()
    expect(screen.getByText('Provided by')).toBeVisible()
    expect(screen.getAllByText('Manglar Guides').length).toBeGreaterThan(0)
    expect(screen.queryByText('WhatsApp')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Contact')).not.toBeInTheDocument()
    expect(
      screen.getAllByRole('img', { name: 'Guided Mangrove Kayak' }).length,
    ).toBeGreaterThan(0)
    expect(screen.getAllByText('A shorter paddle.')).toHaveLength(1)
  })

  it('uses the first gallery image as the hero when image is missing', async () => {
    server.use(
      http.get(tourDetailApiPath('tour-pontoon'), async () =>
        jsonSuccess({
          id: 'tour-pontoon',
          name: 'Family Pontoon Loop',
          category: 'Boat Tour',
          duration: '3 hours',
          priceFrom: 'From MXN 1,600',
          privateOrShared: 'Shared',
          bestFor: 'Families',
          difficulty: 'Easy',
          suitableForKids: 'Yes',
          description: 'A relaxed midday circuit.',
          imageUrls: [
            'https://images.example.com/pontoon-hero.jpg',
            'https://images.example.com/pontoon-gallery.jpg',
          ],
          operatorName: 'Casa Ponton',
          contact: {
            providerName: 'Casa Ponton',
          },
          route: '/tours/tour-pontoon',
        }),
      ),
    )

    await renderDetailRoute('/tours/tour-pontoon')

    expect(await screen.findByText('Family Pontoon Loop')).toBeVisible()
    expect(
      screen
        .getAllByRole('img', { name: 'Family Pontoon Loop' })
        .some((image) =>
          image.getAttribute('src') === 'https://images.example.com/pontoon-hero.jpg',
        ),
    ).toBe(true)
    expect(
      screen
        .getAllByRole('img', { name: 'Family Pontoon Loop 2' })
        .some((image) =>
          image.getAttribute('src') === 'https://images.example.com/pontoon-gallery.jpg',
        ),
    ).toBe(true)
  })
})
