import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { Tour } from '../types/tour'

export const toursApiPath = '/api/tours'

export const toursQueryKey = queryKeys.tours.list()

export function getTours() {
  return getJson<Tour[]>(toursApiPath)
}
