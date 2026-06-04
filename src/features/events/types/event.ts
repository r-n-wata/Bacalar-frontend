export type EventCategory = 'music' | 'wellness' | 'food'
export type EventCategoryFilter = 'all' | EventCategory

export type Event = {
  id: string
  title: string
  dateLabel: string
  venue: string
  category: EventCategory
  startsAt?: string
  endsAt?: string
  route: string
  image?: {
    src: string
    alt: string
  }
}

export type EventsPagination = {
  hasMore: boolean
  nextCursor: string | null
}

export type EventsContent = {
  eyebrow: string
  title: string
  description: string
  featuredItems: Event[]
  items: Event[]
  pagination: EventsPagination
}

export type EventDetail = {
  id: string
  title: string
  category: EventCategory
  dateLabel: string
  venue: string
  description: string
  startsAt?: string
  endsAt?: string
  route: string
  image?: {
    src: string
    alt: string
  }
}
