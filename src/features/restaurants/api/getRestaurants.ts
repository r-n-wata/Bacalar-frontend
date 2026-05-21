import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { Restaurant } from '../types/restaurant'

export const restaurantsApiPath = '/api/restaurants'

export const restaurantsQueryKey = queryKeys.restaurants.list()

export function getRestaurants() {
  return getJson<Restaurant[]>(restaurantsApiPath)
}
