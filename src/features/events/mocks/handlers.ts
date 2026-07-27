import { http } from 'msw'
import { jsonError, jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { eventSubmissionsApiPath } from '../api/createEventSubmission'
import { eventsApiPath } from '../api/getEvents'
import { eventSubmissionUploadApiPath } from '../api/prepareEventSubmissionUpload'
import { eventDetailApiPath } from '../api/getEventDetail'
import { getEventDetailFixture, getEventsFixture } from './events.fixtures'
import type { EventCategoryFilter } from '../types/event'

export const eventsHandlers = [
  http.get(eventsApiPath, async ({ request }) => {
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const limit = Number.parseInt(url.searchParams.get('limit') ?? '10', 10)
    const category = (url.searchParams.get('category') ?? 'all') as EventCategoryFilter
    const search = url.searchParams.get('search') ?? undefined

    return jsonSuccess(
      getEventsFixture(resolveMockLanguage(request), {
        category,
        cursor,
        limit: Number.isFinite(limit) ? limit : 10,
        search,
      }),
    )
  }),
  http.get('/api/events/:id', async ({ request, params }) => {
    return jsonSuccess(
      getEventDetailFixture(resolveMockLanguage(request), String(params.id)),
    )
  }),
  http.post(eventSubmissionUploadApiPath, async ({ request }) => {
    const body = (await request.json()) as {
      filename?: string
      mimeType?: string
      fileSize?: number
    }

    return jsonSuccess(
      {
        provider: 'supabase',
        bucketName: 'event-submissions',
        objectKey: `event-submissions/mock/${body.filename ?? 'image.jpg'}`,
        assetUrl: `https://assets.example.com/event-submissions/${body.filename ?? 'image.jpg'}`,
        signedUploadUrl: `https://project.supabase.co/storage/v1/object/upload/sign/event-submissions/event-submissions/mock/${body.filename ?? 'image.jpg'}?token=mock-token`,
        uploadToken: 'mock-token',
      },
      { status: 201 },
    )
  }),
  http.put('https://project.supabase.co/storage/v1/object/upload/sign/*', async () => {
    return Response.json({ Key: 'event-submissions/mock/uploaded.jpg' }, { status: 200 })
  }),
  http.post('https://project.supabase.co/storage/v1/object/upload/sign/*', async () => {
    return Response.json({ Key: 'event-submissions/mock/uploaded.jpg' }, { status: 200 })
  }),
  http.post('/storage/v1/object/upload/sign/*', async () => {
    return Response.json({ Key: 'event-submissions/mock/uploaded.jpg' }, { status: 200 })
  }),
  http.post(eventSubmissionsApiPath, async () => {
    return jsonSuccess(
      {
        id: 'submission-123',
        status: 'PENDING',
        createdAt: '2026-05-25T12:00:00.000Z',
      },
      { status: 201 },
    )
  }),
]

export function eventsErrorHandler(message = 'Unable to fetch events') {
  return http.get(eventsApiPath, async () => {
    return jsonError({ message })
  })
}

export function emptyEventsCategoryHandler(category: EventCategoryFilter) {
  return http.get(eventsApiPath, async ({ request }) => {
    const url = new URL(request.url)
    const selectedCategory = (url.searchParams.get('category') ??
      'all') as EventCategoryFilter
    const limit = Number.parseInt(url.searchParams.get('limit') ?? '10', 10)
    const search = url.searchParams.get('search') ?? undefined

    return jsonSuccess(
      getEventsFixture(resolveMockLanguage(request), {
        category: selectedCategory,
        cursor: url.searchParams.get('cursor'),
        limit: Number.isFinite(limit) ? limit : 10,
        forceEmpty: selectedCategory === category,
        search,
      }),
    )
  })
}

export function eventDetailErrorHandler(
  id: string,
  message = 'Unable to fetch event detail',
) {
  return http.get(eventDetailApiPath(id), async () => {
    return jsonError({ message })
  })
}

export function eventDetailNotFoundHandler(id: string) {
  return http.get(eventDetailApiPath(id), async () => {
    return Response.json(
      {
        error: {
          code: 'NOT_FOUND',
          message: 'Content not found',
        },
      },
      { status: 404 },
    )
  })
}

export function eventSubmissionErrorHandler(
  message = 'Unable to submit event',
) {
  return http.post(eventSubmissionsApiPath, async () => {
    return Response.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message,
        },
      },
      { status: 500 },
    )
  })
}

export function eventSubmissionUploadErrorHandler(
  message = 'Unable to upload image',
) {
  return http.post(eventSubmissionUploadApiPath, async () => {
    return Response.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message,
        },
      },
      { status: 500 },
    )
  })
}
