import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { ToursContent } from '../types/tours-content'
import type { TourCategoryFilter } from '../types/tour'

export const toursApiPath = '/api/tours'
export const TOURS_PAGE_SIZE = 2

export const toursQueryKey = (
  language: AppLanguage,
  category: TourCategoryFilter,
  limit = TOURS_PAGE_SIZE,
) => queryKeys.tours.list(language, category, limit)

type GetToursOptions = {
  cursor?: string | null
  limit?: number
  category?: TourCategoryFilter
}

export function getTours(
  language: AppLanguage,
  { cursor, limit = TOURS_PAGE_SIZE, category = 'all' }: GetToursOptions = {},
) {
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('category', category)

  if (cursor) {
    params.set('cursor', cursor)
  }

  return getJson<ToursContent>(`${toursApiPath}?${params.toString()}`, {
    language,
  })
}
