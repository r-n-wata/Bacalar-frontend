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
  category: 'premium' | 'group' | 'adventure'
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
  category: 'premium' | 'group' | 'adventure'
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
  moment: 'breakfast' | 'lunch' | 'dinner'
  subtitle: string
}

export type AdminPublishedTourItem = AdminPublishedContentBase & {
  type: 'tours'
  category: 'premium' | 'group' | 'adventure'
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
