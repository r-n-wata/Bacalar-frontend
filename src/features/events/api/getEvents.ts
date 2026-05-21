import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { EventsContent } from '../types/event'

export const eventsApiPath = '/api/events'

export const eventsQueryKey = (language: AppLanguage) =>
  queryKeys.events.list(language)

export function getEvents(language: AppLanguage) {
  return getJson<EventsContent>(eventsApiPath, { language })
}
