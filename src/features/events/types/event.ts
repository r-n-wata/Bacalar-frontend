export type EventCategory = 'music' | 'wellness' | 'food'

export type Event = {
  id: string
  title: string
  dateLabel: string
  venue: string
  category: EventCategory
  route: string
}

export type EventsContent = {
  eyebrow: string
  title: string
  description: string
  items: Event[]
}

export type EventDetail = {
  id: string
  title: string
  category: EventCategory
  dateLabel: string
  venue: string
  description: string
  route: string
  image?: {
    src: string
    alt: string
  }
}
