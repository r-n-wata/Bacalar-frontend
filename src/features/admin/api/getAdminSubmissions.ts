import { getJson } from '../../../services/http'
import type {
  AdminSubmissionFilter,
  AdminSubmissionStatusFilter,
  AdminSubmissionsResponse,
} from '../types/admin'

export const adminSubmissionsApiPath = '/api/admin/submissions'

export function getAdminSubmissions(
  status: AdminSubmissionStatusFilter,
  type: AdminSubmissionFilter,
  token: string,
) {
  const params = new URLSearchParams()

  if (status !== 'pending') {
    params.set('status', status)
  }

  if (type !== 'all') {
    params.set('type', type)
  }

  const query = params.toString()
  const url = query.length > 0 ? `${adminSubmissionsApiPath}?${query}` : adminSubmissionsApiPath

  return getJson<AdminSubmissionsResponse>(url, {
    init: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
}
