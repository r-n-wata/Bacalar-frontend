import { adminHandlers } from '../../features/admin/mocks/handlers'
import { baseHandlers } from './baseHandlers'
import { eventsHandlers } from '../../features/events/mocks/handlers'
import { homeHandlers } from '../../features/home/mocks/handlers'
import { restaurantsHandlers } from '../../features/restaurants/mocks/handlers'
import { toursHandlers } from '../../features/tours/mocks/handlers'

export const handlers = [
  ...baseHandlers,
  ...adminHandlers,
  ...homeHandlers,
  ...eventsHandlers,
  ...restaurantsHandlers,
  ...toursHandlers,
]
