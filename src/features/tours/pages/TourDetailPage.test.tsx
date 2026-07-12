import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { server } from '../../../test/msw/server'
import { http } from 'msw'
import { jsonSuccess } from '../../../test/msw/core'
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
  it('renders the full operator and contact section on the detail page', async () => {
    await renderDetailRoute()

    expect(await screen.findByText('Private Sailing at Sunrise')).toBeVisible()
    expect(screen.getByText('Provided by: Laguna Vela')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Tour operator' })).toBeVisible()
    expect(screen.getAllByText('WhatsApp')).toHaveLength(2)
    expect(screen.getByText('+52 983 123 4567')).toBeVisible()
    expect(screen.getByText('@lagunavela')).toBeVisible()
    expect(screen.getByText('https://lagunavela.example.com')).toBeVisible()
    expect(screen.getByText('What is included')).toBeVisible()
    expect(screen.getByText('Meeting point')).toBeVisible()
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
          route: '/tours/tour-kayak',
        }),
      ),
    )

    await renderDetailRoute('/tours/tour-kayak')

    expect(await screen.findByText('Guided Mangrove Kayak')).toBeVisible()
    expect(screen.getByText('Provided by: Manglar Guides')).toBeVisible()
    expect(screen.queryByText('WhatsApp')).not.toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Guided Mangrove Kayak' }),
    ).toBeVisible()
    expect(screen.queryByLabelText('Tour gallery')).not.toBeInTheDocument()
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
          route: '/tours/tour-pontoon',
        }),
      ),
    )

    await renderDetailRoute('/tours/tour-pontoon')

    expect(await screen.findByText('Family Pontoon Loop')).toBeVisible()
    expect(screen.getByRole('img', { name: 'Family Pontoon Loop' })).toHaveAttribute(
      'src',
      'https://images.example.com/pontoon-hero.jpg',
    )
    expect(screen.getByRole('img', { name: 'Family Pontoon Loop 2' })).toHaveAttribute(
      'src',
      'https://images.example.com/pontoon-gallery.jpg',
    )
  })
})
