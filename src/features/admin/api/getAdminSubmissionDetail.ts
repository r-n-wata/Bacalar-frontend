import { getJson } from '../../../services/http'
import type {
  AdminSubmissionDetailResponse,
  AdminSubmissionType,
} from '../types/admin'

export function getAdminSubmissionDetail(
  type: AdminSubmissionType,
  submissionId: string,
  token: string,
) {
  return getJson<AdminSubmissionDetailResponse>(
    `/api/admin/submissions/${type}/${submissionId}`,
    {
      init: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  )
}
