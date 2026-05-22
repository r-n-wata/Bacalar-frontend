import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { TourDetail } from '../types/tour'

export const tourDetailApiPath = (id: string) => `/api/tours/${id}`

export const tourDetailQueryKey = (id: string, language: AppLanguage) =>
  queryKeys.tours.detail(id, language)

export function getTourDetail(id: string, language: AppLanguage) {
  return getJson<TourDetail>(tourDetailApiPath(id), { language })
}
