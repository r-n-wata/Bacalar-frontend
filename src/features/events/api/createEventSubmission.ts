import type { AppLanguage } from '../../../app/i18n/config'
import { postJson } from '../../../services/http'
import type {
  CreateEventSubmissionRequest,
  CreateEventSubmissionResponse,
} from '../types/submission'

export const eventSubmissionsApiPath = '/api/event-submissions'

export function createEventSubmission(
  language: AppLanguage,
  payload: CreateEventSubmissionRequest,
) {
  return postJson<CreateEventSubmissionRequest, CreateEventSubmissionResponse>(
    eventSubmissionsApiPath,
    payload,
    { language },
  )
}
