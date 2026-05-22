import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { RestaurantDetail } from '../types/restaurant'

export const restaurantDetailApiPath = (id: string) =>
  `/api/restaurants/${id}`

export const restaurantDetailQueryKey = (
  id: string,
  language: AppLanguage,
) => queryKeys.restaurants.detail(id, language)

export function getRestaurantDetail(id: string, language: AppLanguage) {
  return getJson<RestaurantDetail>(restaurantDetailApiPath(id), { language })
}
