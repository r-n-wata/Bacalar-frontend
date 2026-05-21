import { http } from 'msw'
import { jsonSuccess, resolveMockLanguage } from '../../../test/msw/core'
import { bookingChecklistApiPath } from '../api/getBookingChecklist'
import { getBookingFixture } from './booking.fixtures'

export const bookingHandlers = [
  http.get(bookingChecklistApiPath, async ({ request }) => {
    return jsonSuccess(getBookingFixture(resolveMockLanguage(request)))
  }),
]
