import type { AppLanguage } from '../../../app/i18n/config'
import type { RestaurantMoment } from './restaurant'

export const MAX_SUBMISSION_IMAGES = 6
export const MAX_SUBMISSION_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
export const SUBMISSION_IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp'
export const SUBMISSION_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const

export type SubmissionImageMimeType =
  (typeof SUBMISSION_IMAGE_MIME_TYPES)[number]

export type RestaurantSubmissionUploadedImage = {
  kind: 'uploaded'
  url: string
  objectKey: string
  mimeType: SubmissionImageMimeType
  filename: string
}

export type RestaurantSubmissionExternalImage = {
  kind: 'external'
  url: string
}

export type RestaurantSubmissionMedia =
  | RestaurantSubmissionUploadedImage
  | RestaurantSubmissionExternalImage

export type CreateRestaurantSubmissionRequest = {
  name: string
  cuisine: string
  moment: RestaurantMoment
  priceBand: '$' | '$$' | '$$$'
  description: string
  contactName: string
  contactMethod: string
  instagram?: string
  whatsapp?: string
  submittedLocale: AppLanguage
  media: RestaurantSubmissionMedia[]
}

export type CreateRestaurantSubmissionResponse = {
  id: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

export type PrepareRestaurantSubmissionUploadRequest = {
  filename: string
  mimeType: SubmissionImageMimeType
  fileSize: number
}

export type PrepareRestaurantSubmissionUploadResponse = {
  provider: 'supabase'
  bucketName: string
  objectKey: string
  assetUrl: string
  signedUploadUrl: string
  uploadToken: string
}
