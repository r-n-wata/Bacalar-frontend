import type { AppLanguage } from '../../../app/i18n/config'
import { postJson } from '../../../services/http'
import type {
  PrepareTourSubmissionUploadRequest,
  PrepareTourSubmissionUploadResponse,
} from '../types/submission'

export const tourSubmissionUploadApiPath = '/api/tour-submissions/upload'

export function prepareTourSubmissionUpload(
  language: AppLanguage,
  payload: PrepareTourSubmissionUploadRequest,
) {
  return postJson<
    PrepareTourSubmissionUploadRequest,
    PrepareTourSubmissionUploadResponse
  >(tourSubmissionUploadApiPath, payload, {
    language,
  })
}
