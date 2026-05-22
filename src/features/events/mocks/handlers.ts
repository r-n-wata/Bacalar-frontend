import { http } from 'msw'
import { jsonError, jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { eventsApiPath } from '../api/getEvents'
import { eventDetailApiPath } from '../api/getEventDetail'
import { getEventDetailFixture, getEventsFixture } from './events.fixtures'

export const eventsHandlers = [
  http.get(eventsApiPath, async ({ request }) => {
    return jsonSuccess(getEventsFixture(resolveMockLanguage(request)))
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

export function eventDetailErrorHandler(
  id: string,
  message = 'Unable to fetch event detail',
) {
  return http.get(eventDetailApiPath(id), async () => {
    return jsonError({ message })
  })
}
