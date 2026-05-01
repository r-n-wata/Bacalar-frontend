import { queryKeys } from '../../../lib/queryKeys'
import { simulateRequest } from '../../../services/http'
import type { Event } from '../types/event'

const events: Event[] = [
  {
    id: 'event-sunset-jazz',
    title: 'Sunset Jazz by the Lagoon',
    dateLabel: 'Friday, 7:00 PM',
    venue: 'Casa Laguna Deck',
    category: 'music',
  },
  {
    id: 'event-market-brunch',
    title: 'Local Market Brunch Crawl',
    dateLabel: 'Saturday, 10:30 AM',
    venue: 'Centro Bacalar',
    category: 'food',
  },
  {
    id: 'event-breathwork',
    title: 'Lagoon Breathwork Session',
    dateLabel: 'Sunday, 8:00 AM',
    venue: 'Isla Yoga Garden',
    category: 'wellness',
  },
]

export const eventsQueryKey = queryKeys.events.list()

export function getEvents() {
  return simulateRequest(events)
}
