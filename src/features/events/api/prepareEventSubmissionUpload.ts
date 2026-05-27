import type { AppLanguage } from '../../../app/i18n/config'
import { postJson } from '../../../services/http'
import type {
  PrepareEventSubmissionUploadRequest,
  PrepareEventSubmissionUploadResponse,
} from '../types/submission'

export const eventSubmissionUploadApiPath = '/api/event-submissions/upload'

export function prepareEventSubmissionUpload(
  language: AppLanguage,
  payload: PrepareEventSubmissionUploadRequest,
) {
  return postJson<
    PrepareEventSubmissionUploadRequest,
    PrepareEventSubmissionUploadResponse
  >(eventSubmissionUploadApiPath, payload, {
    language,
  })
}
