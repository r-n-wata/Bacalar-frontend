export type EventCategory = 'music' | 'wellness' | 'food'

export type Event = {
  id: string
  title: string
  dateLabel: string
  venue: string
  category: EventCategory
}
