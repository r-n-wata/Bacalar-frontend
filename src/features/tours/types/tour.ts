export type TourCategory = string
export type TourCategoryFilter = 'all' | TourCategory

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

export type Tour = {
  id: string
  name: string
  category: TourCategory
  duration: string
  priceFrom: string
  bestFor: string
  operatorName: string
  route: string
  image?: {
    src: string
    alt: string
  }
}

export type TourDetail = {
  id: string
  name: string
  category: TourCategory
  duration: string
  priceFrom: string
  privateOrShared: string
  bestFor: string
  difficulty: string
  suitableForKids: string
  description: string
  included?: string
  whatToBring?: string
  meetingPoint?: string
  address?: string
  mapUrl?: string
  mapEmbedUrl?: string
  imageUrls: string[]
  operatorName: string
  operatorDescription?: string
  operatorWhatsapp?: string
  operatorInstagram?: string
  operatorWebsite?: string
  operatorPrimaryContactMethod?: string
  route: string
  contact?: ContactInfo
  image?: {
    src: string
    alt: string
  }
}
