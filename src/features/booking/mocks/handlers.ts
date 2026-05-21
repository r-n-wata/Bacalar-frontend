import { http } from 'msw'
import { jsonSuccess } from '../../../test/msw/core'
import {
  bookingChecklistApiPath,
  type BookingChecklistItem,
} from '../api/getBookingChecklist'

const checklist: BookingChecklistItem[] = [
  { id: 'availability', label: 'Confirm live availability' },
  { id: 'guest-details', label: 'Collect guest and contact details' },
  { id: 'payment', label: 'Prepare deposit or full-payment handoff' },
]

export const bookingHandlers = [
  http.get(bookingChecklistApiPath, async () => {
    return jsonSuccess(checklist)
  }),
]
