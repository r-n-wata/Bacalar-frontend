import { http } from 'msw'
import { jsonError, jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { eventsApiPath } from '../api/getEvents'
import { getEventsFixture } from './events.fixtures'

export const eventsHandlers = [
  http.get(eventsApiPath, async ({ request }) => {
    return jsonSuccess(getEventsFixture(resolveMockLanguage(request)))
  }),
]

export function eventsErrorHandler(message = 'Unable to fetch events') {
  return http.get(eventsApiPath, async () => {
    return jsonError({ message })
  })
}
