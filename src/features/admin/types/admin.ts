import type { EventSubmissionMedia } from '../../events/types/submission'
import type { RestaurantMoment } from '../../restaurants/types/restaurant'
import type { RestaurantSubmissionMedia } from '../../restaurants/types/submission'
import type { TourSubmissionMedia } from '../../tours/types/submission'

export type AdminSubmissionFilter = 'all' | 'events' | 'restaurants' | 'tours'
export type AdminSubmissionType = Exclude<AdminSubmissionFilter, 'all'>
export type AdminPublishedContentType = AdminSubmissionType
export type AdminSubmissionStatusFilter =
  | 'all'
  | 'pending'
  | 'approved'
  | 'rejected'
export type AdminSubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export type AdminSession = {
  email: string
  userId: string
}

export type AdminSubmissionThumbnail = {
  id: string
  source: 'UPLOADED' | 'EXTERNAL_URL'
  url: string
  objectKey?: string
  mimeType?: string
  originalFilename?: string
  sortOrder: number
}

type AdminSubmissionListBase = {
  id: string
  type: AdminSubmissionType
  status: AdminSubmissionStatus
  submittedLocale: 'en' | 'es'
  createdAt: string
  updatedAt: string
  thumbnail?: AdminSubmissionThumbnail
}

type AdminSubmissionDetailBase = AdminSubmissionListBase & {
  contactName: string
  contactMethod: string
  address?: string
  mapUrl?: string
  mapEmbedUrl?: string
  instagram?: string
  whatsapp?: string
  images: AdminSubmissionThumbnail[]
}

export type AdminEventSubmissionListItem = AdminSubmissionListBase & {
  type: 'events'
  title: string
  startsAt: string
  location: string
  category: 'music' | 'wellness' | 'food'
}

export type AdminRestaurantSubmissionListItem = AdminSubmissionListBase & {
  type: 'restaurants'
  name: string
  cuisine: string
  moment: 'breakfast' | 'lunch' | 'dinner'
  priceBand: '$' | '$$' | '$$$'
}

export type AdminTourSubmissionListItem = AdminSubmissionListBase & {
  type: 'tours'
  name: string
  category: string
  durationHours: number
  priceFrom: number
}

export type AdminSubmissionListItem =
  | AdminEventSubmissionListItem
  | AdminRestaurantSubmissionListItem
  | AdminTourSubmissionListItem

export type AdminEventSubmissionDetail = AdminSubmissionDetailBase & {
  type: 'events'
  title: string
  startsAt: string
  location: string
  category: 'music' | 'wellness' | 'food'
  description: string
}

export type AdminRestaurantSubmissionDetail = AdminSubmissionDetailBase & {
  type: 'restaurants'
  name: string
  cuisine: string
  moment: 'breakfast' | 'lunch' | 'dinner'
  priceBand: '$' | '$$' | '$$$'
  description: string
}

export type AdminTourSubmissionDetail = AdminSubmissionDetailBase & {
  type: 'tours'
  name: string
  category: string
  durationHours: number
  priceFrom: number
  description: string
}

export type AdminSubmissionDetail =
  | AdminEventSubmissionDetail
  | AdminRestaurantSubmissionDetail
  | AdminTourSubmissionDetail

export type AdminSubmissionsResponse = {
  items: AdminSubmissionListItem[]
}

export type AdminSubmissionDetailResponse = {
  item: AdminSubmissionDetail
}

export type ModerationResult = {
  id: string
  type: AdminSubmissionType
  status: 'APPROVED' | 'REJECTED'
  reviewedAt: string
  reviewedBy: string
  publishedRecordId?: string
}

type AdminPublishedContentBase = {
  id: string
  type: AdminPublishedContentType
  title: string
  route: string
  isFeatured: boolean
  featuredOrder?: number
  image?: {
    src: string
    alt: string
  }
}

export type AdminPublishedEventItem = AdminPublishedContentBase & {
  type: 'events'
  category: 'music' | 'wellness' | 'food'
  subtitle: string
}

export type AdminPublishedRestaurantItem = AdminPublishedContentBase & {
  type: 'restaurants'
  moments: Array<'breakfast' | 'lunch' | 'dinner'>
  subtitle: string
}

export type AdminPublishedTourItem = AdminPublishedContentBase & {
  type: 'tours'
  category: string
  subtitle: string
}

export type AdminPublishedContentItem =
  | AdminPublishedEventItem
  | AdminPublishedRestaurantItem
  | AdminPublishedTourItem

export type AdminPublishedContentResponse = {
  items: AdminPublishedContentItem[]
  featuredCount: number
  featuredCap: number
}

type AdminPublishedTranslationFields<TFields> = {
  en: TFields
  es: TFields
}

type AdminPublishedContentDetailBase = {
  id: string
  type: AdminPublishedContentType
  route: string
  isFeatured: boolean
  featuredOrder?: number
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
}

export type AdminPublishedEventDetail = AdminPublishedContentDetailBase & {
  type: 'events'
  category: 'music' | 'wellness' | 'food'
  startsAt: string
  address?: string
  mapUrl?: string
  mapEmbedUrl?: string
  media: AdminSubmissionThumbnail[]
  translations: AdminPublishedTranslationFields<{
    title: string
    dateLabel: string
    venue: string
    description: string
  }>
}

export type AdminPublishedRestaurantDetail = AdminPublishedContentDetailBase & {
  type: 'restaurants'
  priceBand: '$' | '$$' | '$$$'
  moments: RestaurantMoment[]
  address?: string
  mapUrl?: string
  mapEmbedUrl?: string
  media: AdminSubmissionThumbnail[]
  translations: AdminPublishedTranslationFields<{
    name: string
    cuisine: string
    vibe: string
    description: string
  }>
}

export type AdminPublishedTourDetail = AdminPublishedContentDetailBase & {
  type: 'tours'
  category: string
  durationHours: number
  priceFrom: number
  privateOrShared: string
  bestFor: string
  difficulty: string
  suitableForKids: string
  meetingPoint?: string
  address?: string
  mapUrl?: string
  mapEmbedUrl?: string
  operatorName: string
  operatorWhatsapp?: string
  operatorInstagram?: string
  operatorWebsite?: string
  operatorPrimaryContactMethod?: string
  media: AdminSubmissionThumbnail[]
  translations: AdminPublishedTranslationFields<{
    name: string
    description: string
    included?: string
    whatToBring?: string
    operatorDescription?: string
  }>
}

export type AdminPublishedContentDetail =
  | AdminPublishedEventDetail
  | AdminPublishedRestaurantDetail
  | AdminPublishedTourDetail

export type AdminPublishedContentDetailResponse = {
  item: AdminPublishedContentDetail
}

export type UpdateAdminPublishedEventRequest = {
  category: 'music' | 'wellness' | 'food'
  startsAt: string
  address?: string
  mapUrl?: string
  mapEmbedUrl?: string
  media: EventSubmissionMedia[]
  translations: AdminPublishedEventDetail['translations']
}

export type UpdateAdminPublishedRestaurantRequest = {
  priceBand: '$' | '$$' | '$$$'
  moments: RestaurantMoment[]
  address?: string
  mapUrl?: string
  mapEmbedUrl?: string
  media: RestaurantSubmissionMedia[]
  translations: AdminPublishedRestaurantDetail['translations']
}

export type UpdateAdminPublishedTourRequest = {
  category: string
  durationHours: number
  priceFrom: number
  privateOrShared: string
  bestFor: string
  difficulty: string
  suitableForKids: string
  meetingPoint?: string
  address?: string
  mapUrl?: string
  mapEmbedUrl?: string
  operatorName: string
  operatorWhatsapp?: string
  operatorInstagram?: string
  operatorWebsite?: string
  operatorPrimaryContactMethod?: string
  media: TourSubmissionMedia[]
  translations: AdminPublishedTourDetail['translations']
}

export type UpdateAdminPublishedContentRequest =
  | UpdateAdminPublishedEventRequest
  | UpdateAdminPublishedRestaurantRequest
  | UpdateAdminPublishedTourRequest

export type UpdateAdminPublishedContentResponse = {
  item: AdminPublishedContentDetail
}

export type ArchiveAdminPublishedContentResponse = {
  id: string
  type: AdminPublishedContentType
  status: 'ARCHIVED'
}
