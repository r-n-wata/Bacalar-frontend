export type RestaurantMoment = 'breakfast' | 'lunch' | 'dinner'
export type RestaurantCategoryFilter = 'all' | RestaurantMoment

export type ContactInfo = {
  providerName: string
  whatsapp?: string
  phone?: string
  website?: string
  instagram?: string
  facebook?: string
  email?: string
  mapsUrl?: string
}

export type Restaurant = {
  id: string
  name: string
  cuisine: string
  vibe: string
  priceBand: '$' | '$$' | '$$$'
  moments: RestaurantMoment[]
  description: string
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
  contact?: ContactInfo
  image?: {
    src: string
    alt: string
  }
}
