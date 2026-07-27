import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { EventCategoryFilter, EventsContent } from '../types/event'

export const eventsApiPath = '/api/events'
export const EVENTS_PAGE_SIZE = 10

export type EventFilters = {
  category?: EventCategoryFilter
  search?: string
}

export const eventsQueryKey = (
  language: AppLanguage,
  filters: EventFilters,
  limit = EVENTS_PAGE_SIZE,
) => queryKeys.events.list(language, filters, limit)

type GetEventsOptions = {
  cursor?: string | null
  limit?: number
  filters?: EventFilters
}

export function getEvents(
  language: AppLanguage,
  { cursor, limit = EVENTS_PAGE_SIZE, filters = {} }: GetEventsOptions = {},
) {
  const params = new URLSearchParams()
  params.set('limit', String(limit))

  if (filters.category && filters.category !== 'all') {
    params.set('category', filters.category)
  }

  if (filters.search?.trim()) {
    params.set('search', filters.search.trim())
  }

  if (cursor) {
    params.set('cursor', cursor)
  }

  return getJson<EventsContent>(`${eventsApiPath}?${params.toString()}`, {
    language,
  })
}
