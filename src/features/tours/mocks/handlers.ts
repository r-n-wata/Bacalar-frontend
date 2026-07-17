import { http } from 'msw'
import { jsonError, jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { tourSubmissionsApiPath } from '../api/createTourSubmission'
import { toursApiPath } from '../api/getTours'
import { tourSubmissionUploadApiPath } from '../api/prepareTourSubmissionUpload'
import { tourDetailApiPath } from '../api/getTourDetail'
import { getTourDetailFixture, getToursFixture } from './tours.fixtures'
import type { TourCategoryFilter } from '../types/tour'

export const toursHandlers = [
  http.get(toursApiPath, async ({ request }) => {
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const limit = Number.parseInt(url.searchParams.get('limit') ?? '10', 10)
    const category = (url.searchParams.get('category') ?? 'all') as TourCategoryFilter

    return jsonSuccess(
      getToursFixture(resolveMockLanguage(request), {
        category,
        cursor,
        limit: Number.isFinite(limit) ? limit : 10,
      }),
    )
  }),
  http.get('/api/tours/:id', async ({ request, params }) => {
    return jsonSuccess(
      getTourDetailFixture(resolveMockLanguage(request), String(params.id)),
    )
  }),
  http.post(tourSubmissionUploadApiPath, async ({ request }) => {
    const body = (await request.json()) as {
      filename?: string
    }

    return jsonSuccess(
      {
        provider: 'supabase',
        bucketName: 'event-submissions',
        objectKey: `tour-images/mock/${body.filename ?? 'image.jpg'}`,
        assetUrl: `https://assets.example.com/tour-images/${body.filename ?? 'image.jpg'}`,
        signedUploadUrl: `https://project.supabase.co/storage/v1/object/upload/sign/event-submissions/tour-images/mock/${body.filename ?? 'image.jpg'}?token=mock-token`,
        uploadToken: 'mock-token',
      },
      { status: 201 },
    )
  }),
  http.post(tourSubmissionsApiPath, async () => {
    return jsonSuccess(
      {
        id: 'tour-submission-123',
        status: 'PENDING',
        createdAt: '2026-05-25T12:00:00.000Z',
      },
      { status: 201 },
    )
  }),
]

export function tourDetailErrorHandler(
  id: string,
  message = 'Unable to fetch tour detail',
) {
  return http.get(tourDetailApiPath(id), async () => {
    return jsonError({ message })
  })
}

export function toursErrorHandler(message = 'Unable to fetch tours') {
  return http.get(toursApiPath, async () => {
    return jsonError({ message })
  })
}

export function emptyToursCategoryHandler(category: TourCategoryFilter) {
  return http.get(toursApiPath, async ({ request }) => {
    const url = new URL(request.url)
    const selectedCategory = (url.searchParams.get('category') ??
      'all') as TourCategoryFilter
    const limit = Number.parseInt(url.searchParams.get('limit') ?? '10', 10)

    return jsonSuccess(
      getToursFixture(resolveMockLanguage(request), {
        category: selectedCategory,
        cursor: url.searchParams.get('cursor'),
        limit: Number.isFinite(limit) ? limit : 10,
        forceEmpty: selectedCategory === category,
      }),
    )
  })
}

export function tourSubmissionErrorHandler(message = 'Unable to submit tour') {
  return http.post(tourSubmissionsApiPath, async () => {
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

export function tourSubmissionUploadErrorHandler(
  message = 'Unable to upload image',
) {
  return http.post(tourSubmissionUploadApiPath, async () => {
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
