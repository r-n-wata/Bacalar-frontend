import { queryKeys } from '../../../lib/queryKeys'
import { simulateRequest } from '../../../services/http'

export type BookingChecklistItem = {
  id: string
  label: string
}

const checklist: BookingChecklistItem[] = [
  { id: 'availability', label: 'Confirm live availability' },
  { id: 'guest-details', label: 'Collect guest and contact details' },
  { id: 'payment', label: 'Prepare deposit or full-payment handoff' },
]

export const bookingChecklistQueryKey = queryKeys.booking.checklist()

export function getBookingChecklist() {
  return simulateRequest(checklist)
}
