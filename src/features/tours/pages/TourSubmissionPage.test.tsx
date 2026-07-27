import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { server } from '../../../test/msw/server'
import { ToursPage } from './ToursPage'
import { TourSubmissionPage } from './TourSubmissionPage'
import { tourSubmissionsApiPath } from '../api/createTourSubmission'
import {
  tourSubmissionErrorHandler,
  tourSubmissionUploadErrorHandler,
} from '../mocks/handlers'
import type { CreateTourSubmissionRequest } from '../types/submission'

vi.mock('../api/uploadSubmissionImage', () => ({
  uploadSubmissionImage: vi.fn().mockResolvedValue(undefined),
}))

function renderToursRouter(initialEntries: string[]) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppShell />,
        children: [
          {
            path: 'tours',
            element: <ToursPage />,
          },
          {
            path: 'tours/submit',
            element: <TourSubmissionPage />,
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
  await userEvent.type(screen.getByLabelText('Tour name'), 'Sunrise Sail')
  await userEvent.selectOptions(screen.getByLabelText('Category'), 'premium')
  await userEvent.type(screen.getByLabelText('Duration in hours'), '4')
  await userEvent.type(screen.getByLabelText('Starting price'), '2100')
  await userEvent.type(
    screen.getByLabelText('Description'),
    'A private sunrise sailing tour with a calm route and a polished crew handoff.',
  )
  await userEvent.type(screen.getByLabelText('Contact name'), 'Maya Cruz')
  await userEvent.type(
    screen.getByLabelText('Primary contact method'),
    'maya@example.com',
  )
}

describe('TourSubmissionPage', () => {
  it('lets users reach the dedicated submission route from the tours page CTA', async () => {
    await renderToursRouter(['/tours'])

    await userEvent.click(
      await screen.findByRole('link', { name: 'Submit a tour' }),
    )

    expect(
      await screen.findByRole('heading', { name: 'Submit a tour' }),
    ).toBeVisible()
  })

  it('submits mixed media and keeps the submission pending review', async () => {
    let capturedBody: CreateTourSubmissionRequest | null = null

    server.use(
      http.post(tourSubmissionsApiPath, async ({ request }) => {
        capturedBody = (await request.json()) as CreateTourSubmissionRequest

        return Response.json(
          {
            id: 'tour-submission-456',
            status: 'PENDING',
            createdAt: '2026-05-25T12:00:00.000Z',
          },
          { status: 201 },
        )
      }),
    )

    await renderToursRouter(['/tours/submit'])
    await fillRequiredFields()
    await userEvent.type(screen.getByLabelText('What is included 1'), 'Fresh fruit')
    await userEvent.click(screen.getByRole('button', { name: '+ Add item' }))
    await userEvent.type(screen.getByLabelText('What is included 2'), 'Snorkel gear')

    const file = new File(['mock-image'], 'sunrise-deck.jpg', {
      type: 'image/jpeg',
    })
    await userEvent.upload(screen.getByLabelText('Upload images'), file)
    await userEvent.type(
      screen.getByLabelText('External image URLs'),
      'https://images.example.com/tour.webp',
    )
    await userEvent.click(screen.getByRole('button', { name: 'Add URL' }))
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(
      await screen.findByText(
        'Your submission is pending review and has not been published.',
      ),
    ).toBeVisible()
    expect(capturedBody?.submittedLocale).toBe('en')
    expect(capturedBody?.category).toBe('premium')
    expect(capturedBody?.durationHours).toBe(4)
    expect(capturedBody?.priceFrom).toBe(2100)
    expect(capturedBody?.includedItems).toEqual(['Fresh fruit', 'Snorkel gear'])
    expect(capturedBody?.media).toHaveLength(2)
    expect(capturedBody?.media[0]).toMatchObject({
      kind: 'uploaded',
      filename: 'sunrise-deck.jpg',
    })
    expect(capturedBody?.media[1]).toEqual({
      kind: 'external',
      url: 'https://images.example.com/tour.webp',
    })
  })

  it('shows client and request errors for media problems', async () => {
    server.use(tourSubmissionUploadErrorHandler('Upload service unavailable'))

    await renderToursRouter(['/tours/submit'])
    await fillRequiredFields()

    const file = new File(['mock-image'], 'sunrise-deck.jpg', {
      type: 'image/jpeg',
    })
    await userEvent.upload(screen.getByLabelText('Upload images'), file)
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(await screen.findByText('Upload service unavailable')).toBeVisible()

    server.use(tourSubmissionErrorHandler('Submission failed'))
    await userEvent.clear(screen.getByLabelText('Tour name'))
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(await screen.findByText('This field is required.')).toBeVisible()
  })

  it('focuses the first invalid field on submit', async () => {
    await renderToursRouter(['/tours/submit'])

    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    const nameInput = screen.getByLabelText('Tour name')
    expect(await screen.findAllByText('This field is required.')).not.toHaveLength(0)
    await waitFor(() => {
      expect(nameInput).toHaveFocus()
    })
  })

  it('renders server-side submission errors when the final save fails', async () => {
    server.use(tourSubmissionErrorHandler('Submission failed'))

    await renderToursRouter(['/tours/submit'])
    await fillRequiredFields()
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(await screen.findByText('Submission failed')).toBeVisible()
  })
})
