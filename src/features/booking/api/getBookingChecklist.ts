import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { BookingContent } from '../types/booking-content'

export type BookingChecklistItem = {
  id: string
  label: string
}

export const bookingChecklistApiPath = '/api/booking/checklist'

export const bookingChecklistQueryKey = (language: AppLanguage) =>
  queryKeys.booking.checklist(language)

export function getBookingChecklist(language: AppLanguage) {
  return getJson<BookingContent>(bookingChecklistApiPath, { language })
}
