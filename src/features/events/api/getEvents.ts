import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { EventCategoryFilter, EventsContent } from '../types/event'

export const eventsApiPath = '/api/events'
export const EVENTS_PAGE_SIZE = 10

export const eventsQueryKey = (
  language: AppLanguage,
  category: EventCategoryFilter,
  limit = EVENTS_PAGE_SIZE,
) => queryKeys.events.list(language, category, limit)

type GetEventsOptions = {
  cursor?: string | null
  limit?: number
  category?: EventCategoryFilter
}

export function getEvents(
  language: AppLanguage,
  { cursor, limit = EVENTS_PAGE_SIZE, category = 'all' }: GetEventsOptions = {},
) {
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('category', category)

  if (cursor) {
    params.set('cursor', cursor)
  }

  return getJson<EventsContent>(`${eventsApiPath}?${params.toString()}`, {
    language,
  })
}
