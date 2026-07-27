import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { RestaurantsContent } from '../types/restaurants-content'
import type { RestaurantCategoryFilter } from '../types/restaurant'

export const restaurantsApiPath = '/api/restaurants'
export const RESTAURANTS_PAGE_SIZE = 10

export type RestaurantFilters = {
  category?: RestaurantCategoryFilter
  search?: string
  priceBand?: '$' | '$$' | '$$$'
}

export const restaurantsQueryKey = (
  language: AppLanguage,
  filters: RestaurantFilters,
  limit = RESTAURANTS_PAGE_SIZE,
) => queryKeys.restaurants.list(language, filters, limit)

type GetRestaurantsOptions = {
  cursor?: string | null
  limit?: number
  filters?: RestaurantFilters
}

export function getRestaurants(
  language: AppLanguage,
  { cursor, limit = RESTAURANTS_PAGE_SIZE, filters = {} }: GetRestaurantsOptions = {},
) {
  const params = new URLSearchParams()
  params.set('limit', String(limit))

  if (filters.category && filters.category !== 'all') {
    params.set('category', filters.category)
  }

  if (filters.search?.trim()) {
    params.set('search', filters.search.trim())
  }

  if (filters.priceBand) {
    params.set('priceBand', filters.priceBand)
  }

  if (cursor) {
    params.set('cursor', cursor)
  }

  return getJson<RestaurantsContent>(`${restaurantsApiPath}?${params.toString()}`, {
    language,
  })
}
