import { http } from 'msw'
import { jsonError, jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { toursApiPath } from '../api/getTours'
import { tourDetailApiPath } from '../api/getTourDetail'
import { getTourDetailFixture, getToursFixture } from './tours.fixtures'

export const toursHandlers = [
  http.get(toursApiPath, async ({ request }) => {
    return jsonSuccess(getToursFixture(resolveMockLanguage(request)))
  }),
  http.get('/api/tours/:id', async ({ request, params }) => {
    return jsonSuccess(
      getTourDetailFixture(resolveMockLanguage(request), String(params.id)),
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
