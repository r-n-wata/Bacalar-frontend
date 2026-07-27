import type { Restaurant } from './restaurant'

export type RestaurantsPagination = {
  hasMore: boolean
  nextCursor: string | null
}

export type RestaurantsContent = {
  eyebrow: string
  title: string
  description: string
  featuredItems: Restaurant[]
  items: Restaurant[]
  totalCount: number
  pagination: RestaurantsPagination
}
