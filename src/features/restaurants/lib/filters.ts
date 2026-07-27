import type { RestaurantFilters } from '../api/getRestaurants'
import type { RestaurantCategoryFilter } from '../types/restaurant'

export type RestaurantFilterState = {
  search: string
  category: RestaurantCategoryFilter
  priceBand: '' | '$' | '$$' | '$$$'
}

const MIN_SEARCH_FILTER_LENGTH = 3

export const initialRestaurantFilterState: RestaurantFilterState = {
  search: '',
  category: 'all',
  priceBand: '',
}

function normalizeSearchFilter(value: string) {
  const trimmed = value.trim()
  return trimmed.length >= MIN_SEARCH_FILTER_LENGTH ? trimmed : undefined
}

export function toRestaurantFilters(
  state: RestaurantFilterState,
): RestaurantFilters {
  return {
    search: normalizeSearchFilter(state.search),
    category: state.category,
    priceBand: state.priceBand || undefined,
  }
}

export function hasActiveRestaurantFilters(state: RestaurantFilterState) {
  return Boolean(normalizeSearchFilter(state.search) || state.category !== 'all' || state.priceBand)
}
