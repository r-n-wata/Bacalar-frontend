import { http } from 'msw'
import { jsonError, jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { homeApiPath } from '../api/getHomeContent'
import { getHomeFixture } from './home.fixtures'

export const homeHandlers = [
  http.get(homeApiPath, async ({ request }) => {
    return jsonSuccess(getHomeFixture(resolveMockLanguage(request)))
  }),
]

export function homeErrorHandler(message = 'Unable to fetch homepage') {
  return http.get(homeApiPath, async () => {
    return jsonError({ message })
  })
}
