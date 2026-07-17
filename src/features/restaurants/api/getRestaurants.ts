import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { RestaurantsContent } from '../types/restaurants-content'
import type { RestaurantCategoryFilter } from '../types/restaurant'

export const restaurantsApiPath = '/api/restaurants'
export const RESTAURANTS_PAGE_SIZE = 10

export const restaurantsQueryKey = (
  language: AppLanguage,
  category: RestaurantCategoryFilter,
  limit = RESTAURANTS_PAGE_SIZE,
) => queryKeys.restaurants.list(language, category, limit)

type GetRestaurantsOptions = {
  cursor?: string | null
  limit?: number
  category?: RestaurantCategoryFilter
}

export function getRestaurants(
  language: AppLanguage,
  {
    cursor,
    limit = RESTAURANTS_PAGE_SIZE,
    category = 'all',
  }: GetRestaurantsOptions = {},
) {
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('category', category)

  if (cursor) {
    params.set('cursor', cursor)
  }

  return getJson<RestaurantsContent>(`${restaurantsApiPath}?${params.toString()}`, {
    language,
  })
}
