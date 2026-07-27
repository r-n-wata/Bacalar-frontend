import type { TourFilters } from '../api/getTours'

export type TourFilterState = {
  search: string
  category: string
  priceMin: string
  priceMax: string
  durationHours: number[]
}

const MIN_SEARCH_FILTER_LENGTH = 3

export const initialTourFilterState: TourFilterState = {
  search: '',
  category: '',
  priceMin: '',
  priceMax: '',
  durationHours: [],
}

function parsePositiveInteger(value: string) {
  const parsed = Number.parseInt(value.trim(), 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
}

function normalizeSearchFilter(value: string) {
  const trimmed = value.trim()
  return trimmed.length >= MIN_SEARCH_FILTER_LENGTH ? trimmed : undefined
}

export function toTourFilters(state: TourFilterState): TourFilters {
  return {
    search: normalizeSearchFilter(state.search),
    category: state.category || undefined,
    priceMin: parsePositiveInteger(state.priceMin),
    priceMax: parsePositiveInteger(state.priceMax),
    durationHours:
      state.durationHours.length > 0
        ? [...state.durationHours].sort((left, right) => left - right)
        : undefined,
  }
}

export function hasActiveTourFilters(state: TourFilterState) {
  return Boolean(
    normalizeSearchFilter(state.search) ||
      state.category ||
      state.priceMin.trim() ||
      state.priceMax.trim() ||
      state.durationHours.length > 0,
  )
}

export function hasInvalidTourPriceRange(state: TourFilterState) {
  const priceMin = parsePositiveInteger(state.priceMin)
  const priceMax = parsePositiveInteger(state.priceMax)

  return (
    typeof priceMin === 'number' &&
    typeof priceMax === 'number' &&
    priceMin > priceMax
  )
}
