import { http } from 'msw'
import { jsonError, jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { eventsApiPath } from '../api/getEvents'
import { eventDetailApiPath } from '../api/getEventDetail'
import { getEventDetailFixture, getEventsFixture } from './events.fixtures'
import type { EventCategoryFilter } from '../types/event'

export const eventsHandlers = [
  http.get(eventsApiPath, async ({ request }) => {
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const limit = Number.parseInt(url.searchParams.get('limit') ?? '10', 10)
    const category = (url.searchParams.get('category') ?? 'all') as EventCategoryFilter

    return jsonSuccess(
      getEventsFixture(resolveMockLanguage(request), {
        category,
        cursor,
        limit: Number.isFinite(limit) ? limit : 10,
      }),
    )
  }),
  http.get('/api/events/:id', async ({ request, params }) => {
    return jsonSuccess(
      getEventDetailFixture(resolveMockLanguage(request), String(params.id)),
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

    return jsonSuccess(
      getEventsFixture(resolveMockLanguage(request), {
        category: selectedCategory,
        cursor: url.searchParams.get('cursor'),
        limit: Number.isFinite(limit) ? limit : 10,
        forceEmpty: selectedCategory === category,
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
