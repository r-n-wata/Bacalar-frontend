import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'

export type BookingChecklistItem = {
  id: string
  label: string
}

export const bookingChecklistApiPath = '/api/booking/checklist'

export const bookingChecklistQueryKey = queryKeys.booking.checklist()

export function getBookingChecklist() {
  return getJson<BookingChecklistItem[]>(bookingChecklistApiPath)
}
