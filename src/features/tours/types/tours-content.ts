import type { Tour } from './tour'

export type ToursPagination = {
  hasMore: boolean
  nextCursor: string | null
}

export type ToursContent = {
  eyebrow: string
  title: string
  description: string
  featuredItems: Tour[]
  items: Tour[]
  pagination: ToursPagination
}
