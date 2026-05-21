import { http } from 'msw'
import { jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { restaurantsApiPath } from '../api/getRestaurants'
import { getRestaurantsFixture } from './restaurants.fixtures'

export const restaurantsHandlers = [
  http.get(restaurantsApiPath, async ({ request }) => {
    return jsonSuccess(getRestaurantsFixture(resolveMockLanguage(request)))
  }),
]
