import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { server } from '../../../test/msw/server'
import { restaurantSubmissionsApiPath } from '../api/createRestaurantSubmission'
import { RestaurantsPage } from './RestaurantsPage'
import { RestaurantSubmissionPage } from './RestaurantSubmissionPage'
import {
  restaurantSubmissionErrorHandler,
  restaurantSubmissionUploadErrorHandler,
} from '../mocks/handlers'
import type { CreateRestaurantSubmissionRequest } from '../types/submission'

vi.mock('../api/uploadSubmissionImage', () => ({
  uploadSubmissionImage: vi.fn().mockResolvedValue(undefined),
}))

function renderRestaurantsRouter(initialEntries: string[]) {
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
          {
            path: 'restaurants/submit',
            element: <RestaurantSubmissionPage />,
          },
        ],
      },
    ],
    {
      initialEntries,
    },
  )

  return renderWithProviders(<RouterProvider router={router} />)
}

async function fillRequiredFields() {
  await userEvent.type(screen.getByLabelText('Restaurant name'), 'Bruma Azul')
  await userEvent.type(screen.getByLabelText('Cuisine'), 'Cafe plates')
  await userEvent.selectOptions(screen.getByLabelText('Dining moment'), 'breakfast')
  await userEvent.selectOptions(screen.getByLabelText('Price band'), '$$')
  await userEvent.type(
    screen.getByLabelText('Description'),
    'A calm breakfast and coffee stop that works well for travelers easing into the lagoon day.',
  )
  await userEvent.type(screen.getByLabelText('Contact name'), 'Maya Cruz')
  await userEvent.type(
    screen.getByLabelText('Primary contact method'),
    'maya@example.com',
  )
}

describe('RestaurantSubmissionPage', () => {
  it('lets users reach the dedicated submission route from the restaurants page CTA', async () => {
    await renderRestaurantsRouter(['/restaurants'])

    await userEvent.click(
      await screen.findByRole('link', { name: 'Submit a restaurant' }),
    )

    expect(
      await screen.findByRole('heading', { name: 'Submit a restaurant' }),
    ).toBeVisible()
  })

  it('submits mixed media and keeps the submission pending review', async () => {
    let capturedBody: CreateRestaurantSubmissionRequest | null = null

    server.use(
      http.post(restaurantSubmissionsApiPath, async ({ request }) => {
        capturedBody = (await request.json()) as CreateRestaurantSubmissionRequest

        return Response.json(
          {
            id: 'restaurant-submission-456',
            status: 'PENDING',
            createdAt: '2026-05-25T12:00:00.000Z',
          },
          { status: 201 },
        )
      }),
    )

    await renderRestaurantsRouter(['/restaurants/submit'])
    await fillRequiredFields()

    const file = new File(['mock-image'], 'brunch-room.jpg', {
      type: 'image/jpeg',
    })
    await userEvent.upload(screen.getByLabelText('Upload images'), file)
    await userEvent.type(
      screen.getByLabelText('External image URLs'),
      'https://images.example.com/restaurant.webp',
    )
    await userEvent.click(screen.getByRole('button', { name: 'Add URL' }))
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(
      await screen.findByText(
        'Your submission is pending review and has not been published.',
      ),
    ).toBeVisible()
    expect(capturedBody?.submittedLocale).toBe('en')
    expect(capturedBody?.media).toHaveLength(2)
    expect(capturedBody?.media[0]).toMatchObject({
      kind: 'uploaded',
      filename: 'brunch-room.jpg',
    })
    expect(capturedBody?.media[1]).toEqual({
      kind: 'external',
      url: 'https://images.example.com/restaurant.webp',
    })
  })

  it('shows client and request errors for media problems', async () => {
    server.use(restaurantSubmissionUploadErrorHandler('Upload service unavailable'))

    await renderRestaurantsRouter(['/restaurants/submit'])
    await fillRequiredFields()

    const file = new File(['mock-image'], 'brunch-room.jpg', {
      type: 'image/jpeg',
    })
    await userEvent.upload(screen.getByLabelText('Upload images'), file)
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(await screen.findByText('Upload service unavailable')).toBeVisible()

    server.use(restaurantSubmissionErrorHandler('Submission failed'))
    await userEvent.clear(screen.getByLabelText('Restaurant name'))
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(await screen.findByText('This field is required.')).toBeVisible()
  })

  it('renders server-side submission errors when the final save fails', async () => {
    server.use(restaurantSubmissionErrorHandler('Submission failed'))

    await renderRestaurantsRouter(['/restaurants/submit'])
    await fillRequiredFields()
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(await screen.findByText('Submission failed')).toBeVisible()
  })
})
