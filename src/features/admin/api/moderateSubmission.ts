import { postJson } from '../../../services/http'
import type { AdminSubmissionType, ModerationResult } from '../types/admin'

export function moderateSubmission(
  type: AdminSubmissionType,
  submissionId: string,
  action: 'approve' | 'reject',
  token: string,
) {
  return postJson<Record<string, never>, ModerationResult>(
    `/api/admin/submissions/${type}/${submissionId}/${action}`,
    {},
    {
      init: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  )
}
