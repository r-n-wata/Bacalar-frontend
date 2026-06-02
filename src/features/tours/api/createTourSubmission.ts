import type { AppLanguage } from '../../../app/i18n/config'
import { postJson } from '../../../services/http'
import type {
  CreateTourSubmissionRequest,
  CreateTourSubmissionResponse,
} from '../types/submission'

export const tourSubmissionsApiPath = '/api/tour-submissions'

export function createTourSubmission(
  language: AppLanguage,
  payload: CreateTourSubmissionRequest,
) {
  return postJson<CreateTourSubmissionRequest, CreateTourSubmissionResponse>(
    tourSubmissionsApiPath,
    payload,
    { language },
  )
}
