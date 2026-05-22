import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { EventDetail } from '../types/event'

export const eventDetailApiPath = (id: string) => `/api/events/${id}`

export const eventDetailQueryKey = (id: string, language: AppLanguage) =>
  queryKeys.events.detail(id, language)

export function getEventDetail(id: string, language: AppLanguage) {
  return getJson<EventDetail>(eventDetailApiPath(id), { language })
}
