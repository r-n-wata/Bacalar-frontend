import type { AppLanguage } from '../../../app/i18n/config'
import type { EventCategory } from './event'

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

export type EventSubmissionUploadedImage = {
  kind: 'uploaded'
  url: string
  objectKey: string
  mimeType: SubmissionImageMimeType
  filename: string
}

export type EventSubmissionExternalImage = {
  kind: 'external'
  url: string
}

export type EventSubmissionMedia =
  | EventSubmissionUploadedImage
  | EventSubmissionExternalImage

export type CreateEventSubmissionRequest = {
  title: string
  startsAt: string
  location: string
  category: EventCategory
  description: string
  contactName: string
  contactMethod: string
  instagram?: string
  whatsapp?: string
  submittedLocale: AppLanguage
  media: EventSubmissionMedia[]
}

export type CreateEventSubmissionResponse = {
  id: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

export type PrepareEventSubmissionUploadRequest = {
  filename: string
  mimeType: SubmissionImageMimeType
  fileSize: number
}

export type PrepareEventSubmissionUploadResponse = {
  provider: 'supabase'
  bucketName: string
  objectKey: string
  assetUrl: string
  signedUploadUrl: string
  uploadToken: string
}
