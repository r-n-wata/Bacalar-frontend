import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { ToursContent } from '../types/tours-content'
import type { TourCategoryFilter } from '../types/tour'

export const toursApiPath = '/api/tours'
export const TOURS_PAGE_SIZE = 10

export type TourFilters = {
  category?: TourCategoryFilter
  search?: string
  priceMin?: number
  priceMax?: number
  durationHours?: number[]
}

export const toursQueryKey = (
  language: AppLanguage,
  filters: TourFilters,
  limit = TOURS_PAGE_SIZE,
) => queryKeys.tours.list(language, filters, limit)

type GetToursOptions = {
  cursor?: string | null
  limit?: number
  filters?: TourFilters
}

export function getTours(
  language: AppLanguage,
  { cursor, limit = TOURS_PAGE_SIZE, filters = {} }: GetToursOptions = {},
) {
  const params = new URLSearchParams()
  params.set('limit', String(limit))

  if (filters.category && filters.category !== 'all') {
    params.set('category', filters.category)
  }

  if (filters.search?.trim()) {
    params.set('search', filters.search.trim())
  }

  if (typeof filters.priceMin === 'number') {
    params.set('priceMin', String(filters.priceMin))
  }

  if (typeof filters.priceMax === 'number') {
    params.set('priceMax', String(filters.priceMax))
  }

  for (const durationHours of filters.durationHours ?? []) {
    params.append('durationHours', String(durationHours))
  }

  if (cursor) {
    params.set('cursor', cursor)
  }

  return getJson<ToursContent>(`${toursApiPath}?${params.toString()}`, {
    language,
  })
}
