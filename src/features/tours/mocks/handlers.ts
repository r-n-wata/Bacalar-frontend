import { http } from 'msw'
import { jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { toursApiPath } from '../api/getTours'
import { getToursFixture } from './tours.fixtures'

export const toursHandlers = [
  http.get(toursApiPath, async ({ request }) => {
    return jsonSuccess(getToursFixture(resolveMockLanguage(request)))
  }),
]
