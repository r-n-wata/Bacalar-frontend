import type { AppLanguage } from '../../../app/i18n/config'
import type { TourCategory } from './tour'

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

export type TourSubmissionUploadedImage = {
  kind: 'uploaded'
  url: string
  objectKey: string
  mimeType: SubmissionImageMimeType
  filename: string
}

export type TourSubmissionExternalImage = {
  kind: 'external'
  url: string
}

export type TourSubmissionMedia =
  | TourSubmissionUploadedImage
  | TourSubmissionExternalImage

export type CreateTourSubmissionRequest = {
  name: string
  category: TourCategory
  durationHours: number
  priceFrom: number
  description: string
  contactName: string
  contactMethod: string
  instagram?: string
  whatsapp?: string
  submittedLocale: AppLanguage
  media: TourSubmissionMedia[]
}

export type CreateTourSubmissionResponse = {
  id: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

export type PrepareTourSubmissionUploadRequest = {
  filename: string
  mimeType: SubmissionImageMimeType
  fileSize: number
}

export type PrepareTourSubmissionUploadResponse = {
  provider: 'supabase'
  bucketName: string
  objectKey: string
  assetUrl: string
  signedUploadUrl: string
  uploadToken: string
}
