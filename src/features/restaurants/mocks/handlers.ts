import { http } from 'msw'
import { jsonError, jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { restaurantsApiPath } from '../api/getRestaurants'
import { restaurantDetailApiPath } from '../api/getRestaurantDetail'
import {
  getRestaurantDetailFixture,
  getRestaurantsFixture,
} from './restaurants.fixtures'

export const restaurantsHandlers = [
  http.get(restaurantsApiPath, async ({ request }) => {
    return jsonSuccess(getRestaurantsFixture(resolveMockLanguage(request)))
  }),
  http.get('/api/restaurants/:id', async ({ request, params }) => {
    return jsonSuccess(
      getRestaurantDetailFixture(
        resolveMockLanguage(request),
        String(params.id),
      ),
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
