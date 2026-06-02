import { http } from 'msw'
import { jsonError, jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { restaurantSubmissionsApiPath } from '../api/createRestaurantSubmission'
import { restaurantsApiPath } from '../api/getRestaurants'
import { restaurantDetailApiPath } from '../api/getRestaurantDetail'
import { restaurantSubmissionUploadApiPath } from '../api/prepareRestaurantSubmissionUpload'
import {
  getRestaurantDetailFixture,
  getRestaurantsFixture,
} from './restaurants.fixtures'
import type { RestaurantCategoryFilter } from '../types/restaurant'

export const restaurantsHandlers = [
  http.get(restaurantsApiPath, async ({ request }) => {
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const limit = Number.parseInt(url.searchParams.get('limit') ?? '2', 10)
    const category = (url.searchParams.get('category') ??
      'all') as RestaurantCategoryFilter

    return jsonSuccess(
      getRestaurantsFixture(resolveMockLanguage(request), {
        category,
        cursor,
        limit: Number.isFinite(limit) ? limit : 2,
      }),
    )
  }),
  http.get('/api/restaurants/:id', async ({ request, params }) => {
    return jsonSuccess(
      getRestaurantDetailFixture(
        resolveMockLanguage(request),
        String(params.id),
      ),
    )
  }),
  http.post(restaurantSubmissionUploadApiPath, async ({ request }) => {
    const body = (await request.json()) as {
      filename?: string
    }

    return jsonSuccess(
      {
        provider: 'supabase',
        bucketName: 'event-submissions',
        objectKey: `restaurant-images/mock/${body.filename ?? 'image.jpg'}`,
        assetUrl: `https://assets.example.com/restaurant-images/${body.filename ?? 'image.jpg'}`,
        signedUploadUrl: `https://project.supabase.co/storage/v1/object/upload/sign/event-submissions/restaurant-images/mock/${body.filename ?? 'image.jpg'}?token=mock-token`,
        uploadToken: 'mock-token',
      },
      { status: 201 },
    )
  }),
  http.post(restaurantSubmissionsApiPath, async () => {
    return jsonSuccess(
      {
        id: 'restaurant-submission-123',
        status: 'PENDING',
        createdAt: '2026-05-25T12:00:00.000Z',
      },
      { status: 201 },
    )
  }),
]

export function restaurantDetailErrorHandler(
  id: string,
  message = 'Unable to fetch restaurant detail',
) {
  return http.get(restaurantDetailApiPath(id), async () => {
    return jsonError({ message })
  })
}

export function restaurantsErrorHandler(
  message = 'Unable to fetch restaurants',
) {
  return http.get(restaurantsApiPath, async () => {
    return jsonError({ message })
  })
}

export function emptyRestaurantsCategoryHandler(
  category: RestaurantCategoryFilter,
) {
  return http.get(restaurantsApiPath, async ({ request }) => {
    const url = new URL(request.url)
    const selectedCategory = (url.searchParams.get('category') ??
      'all') as RestaurantCategoryFilter
    const limit = Number.parseInt(url.searchParams.get('limit') ?? '2', 10)

    return jsonSuccess(
      getRestaurantsFixture(resolveMockLanguage(request), {
        category: selectedCategory,
        cursor: url.searchParams.get('cursor'),
        limit: Number.isFinite(limit) ? limit : 2,
        forceEmpty: selectedCategory === category,
      }),
    )
  })
}

export function restaurantSubmissionErrorHandler(
  message = 'Unable to submit restaurant',
) {
  return http.post(restaurantSubmissionsApiPath, async () => {
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

export function restaurantSubmissionUploadErrorHandler(
  message = 'Unable to upload image',
) {
  return http.post(restaurantSubmissionUploadApiPath, async () => {
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
