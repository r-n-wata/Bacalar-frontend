import type { AppLanguage } from '../../../app/i18n/config'
import { postJson } from '../../../services/http'
import type {
  PrepareRestaurantSubmissionUploadRequest,
  PrepareRestaurantSubmissionUploadResponse,
} from '../types/submission'

export const restaurantSubmissionUploadApiPath =
  '/api/restaurant-submissions/upload'

export function prepareRestaurantSubmissionUpload(
  language: AppLanguage,
  payload: PrepareRestaurantSubmissionUploadRequest,
) {
  return postJson<
    PrepareRestaurantSubmissionUploadRequest,
    PrepareRestaurantSubmissionUploadResponse
  >(restaurantSubmissionUploadApiPath, payload, {
    language,
  })
}
