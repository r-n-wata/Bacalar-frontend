export type AdminSubmissionFilter = 'all' | 'events' | 'restaurants' | 'tours'
export type AdminSubmissionType = Exclude<AdminSubmissionFilter, 'all'>

export type AdminSession = {
  email: string
  userId: string
}

type AdminSubmissionBase = {
  id: string
  type: AdminSubmissionType
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  submittedLocale: 'en' | 'es'
  contactName: string
  contactMethod: string
  instagram?: string
  whatsapp?: string
  createdAt: string
  updatedAt: string
  images: Array<{
    id: string
    source: 'UPLOADED' | 'EXTERNAL_URL'
    url: string
    objectKey?: string
    mimeType?: string
    originalFilename?: string
    sortOrder: number
  }>
}

export type AdminEventSubmission = AdminSubmissionBase & {
  type: 'events'
  title: string
  startsAt: string
  location: string
  category: 'music' | 'wellness' | 'food'
  description: string
}

export type AdminRestaurantSubmission = AdminSubmissionBase & {
  type: 'restaurants'
  name: string
  cuisine: string
  moment: 'breakfast' | 'lunch' | 'dinner'
  priceBand: '$' | '$$' | '$$$'
  description: string
}

export type AdminTourSubmission = AdminSubmissionBase & {
  type: 'tours'
  name: string
  category: 'premium' | 'group' | 'adventure'
  durationHours: number
  priceFrom: number
  description: string
}

export type AdminSubmission =
  | AdminEventSubmission
  | AdminRestaurantSubmission
  | AdminTourSubmission

export type AdminSubmissionsResponse = {
  items: AdminSubmission[]
}

export type ModerationResult = {
  id: string
  type: AdminSubmissionType
  status: 'APPROVED' | 'REJECTED'
  reviewedAt: string
  reviewedBy: string
  publishedRecordId?: string
}
