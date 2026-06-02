export type TourCategory = 'premium' | 'group' | 'adventure'
export type TourCategoryFilter = 'all' | TourCategory

export type Tour = {
  id: string
  name: string
  category: TourCategory
  categoryLabel: string
  durationHours: number
  priceFrom: number
  route: string
}

export type TourDetail = {
  id: string
  name: string
  category: TourCategory
  categoryLabel: string
  durationHours: number
  priceFrom: number
  description: string
  route: string
  image?: {
    src: string
    alt: string
  }
}
