export type Tour = {
  id: string
  name: string
  category: string
  durationHours: number
  priceFrom: number
  route: string
}

export type TourDetail = {
  id: string
  name: string
  category: string
  durationHours: number
  priceFrom: number
  description: string
  route: string
  image?: {
    src: string
    alt: string
  }
}
