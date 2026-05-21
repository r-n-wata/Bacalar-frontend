import { baseHandlers } from './baseHandlers'
import { bookingHandlers } from '../../features/booking/mocks/handlers'
import { eventsHandlers } from '../../features/events/mocks/handlers'
import { restaurantsHandlers } from '../../features/restaurants/mocks/handlers'
import { toursHandlers } from '../../features/tours/mocks/handlers'

export const handlers = [
  ...baseHandlers,
  ...eventsHandlers,
  ...restaurantsHandlers,
  ...toursHandlers,
  ...bookingHandlers,
]
