import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { RestaurantsContent } from '../types/restaurants-content'

export const restaurantsApiPath = '/api/restaurants'

export const restaurantsQueryKey = (language: AppLanguage) =>
  queryKeys.restaurants.list(language)

export function getRestaurants(language: AppLanguage) {
  return getJson<RestaurantsContent>(restaurantsApiPath, { language })
}
