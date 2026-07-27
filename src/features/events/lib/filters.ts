import type { EventFilters } from '../api/getEvents'
import type { EventCategoryFilter } from '../types/event'

export type EventFilterState = {
  search: string
  category: EventCategoryFilter
}

const MIN_SEARCH_FILTER_LENGTH = 3

export const initialEventFilterState: EventFilterState = {
  search: '',
  category: 'all',
}

function normalizeSearchFilter(value: string) {
  const trimmed = value.trim()
  return trimmed.length >= MIN_SEARCH_FILTER_LENGTH ? trimmed : undefined
}

export function toEventFilters(state: EventFilterState): EventFilters {
  return {
    search: normalizeSearchFilter(state.search),
    category: state.category,
  }
}

export function hasActiveEventFilters(state: EventFilterState) {
  return Boolean(normalizeSearchFilter(state.search) || state.category !== 'all')
}
