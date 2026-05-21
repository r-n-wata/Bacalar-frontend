import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { ToursContent } from '../types/tours-content'

export const toursApiPath = '/api/tours'

export const toursQueryKey = (language: AppLanguage) =>
  queryKeys.tours.list(language)

export function getTours(language: AppLanguage) {
  return getJson<ToursContent>(toursApiPath, { language })
}
