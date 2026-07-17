export type RestaurantMoment = 'breakfast' | 'lunch' | 'dinner'
export type RestaurantCategoryFilter = 'all' | RestaurantMoment

export type Restaurant = {
  id: string
  name: string
  cuisine: string
  vibe: string
  priceBand: '$' | '$$' | '$$$'
  moments: RestaurantMoment[]
  route: string
  image?: {
    src: string
    alt: string
  }
}

export type RestaurantDetail = {
  id: string
  name: string
  cuisine: string
  vibe: string
  priceBand: '$' | '$$' | '$$$'
  moments: RestaurantMoment[]
  address?: string
  mapUrl?: string
  mapEmbedUrl?: string
  description: string
  route: string
  image?: {
    src: string
    alt: string
  }
}
