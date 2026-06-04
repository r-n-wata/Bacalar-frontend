export type RestaurantMoment = 'breakfast' | 'lunch' | 'dinner'
export type RestaurantCategoryFilter = 'all' | RestaurantMoment

export type Restaurant = {
  id: string
  name: string
  cuisine: string
  vibe: string
  priceBand: '$' | '$$' | '$$$'
  moment: RestaurantMoment
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
  moment: RestaurantMoment
  description: string
  route: string
  image?: {
    src: string
    alt: string
  }
}
