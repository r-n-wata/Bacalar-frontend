import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { server } from '../../../test/msw/server'
import { eventSubmissionsApiPath } from '../api/createEventSubmission'
import { EventSubmissionPage } from './EventSubmissionPage'
import { EventsPage } from './EventsPage'
import {
  eventSubmissionErrorHandler,
  eventSubmissionUploadErrorHandler,
} from '../mocks/handlers'
import type { CreateEventSubmissionRequest } from '../types/submission'

vi.mock('../api/uploadSubmissionImage', () => ({
  uploadSubmissionImage: vi.fn().mockResolvedValue(undefined),
}))

function renderEventsRouter(initialEntries: string[]) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppShell />,
        children: [
          {
            path: 'events',
            element: <EventsPage />,
          },
          {
            path: 'events/submit',
            element: <EventSubmissionPage />,
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
  await userEvent.type(screen.getByLabelText('Event title'), 'Lagoon Story Night')
  await userEvent.type(screen.getByLabelText('Date and time'), '2026-06-12T19:30')
  await userEvent.type(screen.getByLabelText('Location'), 'Casa del Agua')
  await userEvent.selectOptions(screen.getByLabelText('Category'), 'music')
  await userEvent.type(
    screen.getByLabelText('Description'),
    'A small storytelling night with live music and a clear local contact for follow-up.',
  )
  await userEvent.type(screen.getByLabelText('Contact name'), 'Maya Cruz')
  await userEvent.type(
    screen.getByLabelText('Primary contact method'),
    'maya@example.com',
  )
}

describe('EventSubmissionPage', () => {
  it('lets users reach the dedicated submission route from the events page CTA', async () => {
    await renderEventsRouter(['/events'])

    await userEvent.click(await screen.findByRole('link', { name: 'Submit an event' }))

    expect(await screen.findByRole('heading', { name: 'Submit an event' })).toBeVisible()
  })

  it('submits mixed media and keeps the submission in pending review', async () => {
    let capturedBody: CreateEventSubmissionRequest | null = null

    server.use(
      http.post(eventSubmissionsApiPath, async ({ request }) => {
        capturedBody = (await request.json()) as CreateEventSubmissionRequest

        return Response.json(
          {
            id: 'submission-456',
            status: 'PENDING',
            createdAt: '2026-05-25T12:00:00.000Z',
          },
          { status: 201 },
        )
      }),
    )

    await renderEventsRouter(['/events/submit'])
    await fillRequiredFields()

    const file = new File(['mock-image'], 'lagoon-night.jpg', {
      type: 'image/jpeg',
    })
    await userEvent.upload(screen.getByLabelText('Upload images'), file)
    await userEvent.type(
      screen.getByLabelText('External image URLs'),
      'https://images.example.com/event.webp',
    )
    await userEvent.click(screen.getByRole('button', { name: 'Add URL' }))
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(await screen.findByText('Your submission is pending review and has not been published.')).toBeVisible()
    expect(capturedBody?.submittedLocale).toBe('en')
    expect(capturedBody?.media).toHaveLength(2)
    expect(capturedBody?.media[0]).toMatchObject({
      kind: 'uploaded',
      filename: 'lagoon-night.jpg',
    })
    expect(capturedBody?.media[1]).toEqual({
      kind: 'external',
      url: 'https://images.example.com/event.webp',
    })
  })

  it('shows client and request errors for media problems', async () => {
    server.use(eventSubmissionUploadErrorHandler('Upload service unavailable'))

    await renderEventsRouter(['/events/submit'])
    await fillRequiredFields()

    const file = new File(['mock-image'], 'lagoon-night.jpg', {
      type: 'image/jpeg',
    })
    await userEvent.upload(screen.getByLabelText('Upload images'), file)
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(await screen.findByText('Upload service unavailable')).toBeVisible()

    server.use(eventSubmissionErrorHandler('Submission failed'))
    await userEvent.clear(screen.getByLabelText('Event title'))
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(await screen.findByText('This field is required.')).toBeVisible()
  })

  it('renders server-side submission errors when the final save fails', async () => {
    server.use(eventSubmissionErrorHandler('Submission failed'))

    await renderEventsRouter(['/events/submit'])
    await fillRequiredFields()
    await userEvent.click(screen.getByRole('button', { name: 'Send submission' }))

    expect(await screen.findByText('Submission failed')).toBeVisible()
  })
})
