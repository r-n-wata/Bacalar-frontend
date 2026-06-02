import type { AppLanguage } from '../../../app/i18n/config'
import { postJson } from '../../../services/http'
import type {
  CreateRestaurantSubmissionRequest,
  CreateRestaurantSubmissionResponse,
} from '../types/submission'

export const restaurantSubmissionsApiPath = '/api/restaurant-submissions'

export function createRestaurantSubmission(
  language: AppLanguage,
  payload: CreateRestaurantSubmissionRequest,
) {
  return postJson<
    CreateRestaurantSubmissionRequest,
    CreateRestaurantSubmissionResponse
  >(restaurantSubmissionsApiPath, payload, { language })
}
