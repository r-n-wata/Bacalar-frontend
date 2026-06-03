import { getJson } from '../../../services/http'
import type {
  AdminSubmissionFilter,
  AdminSubmissionsResponse,
} from '../types/admin'

export const adminSubmissionsApiPath = '/api/admin/submissions'

export function getPendingSubmissions(
  filter: AdminSubmissionFilter,
  token: string,
) {
  const url =
    filter === 'all'
      ? adminSubmissionsApiPath
      : `${adminSubmissionsApiPath}?type=${filter}`

  return getJson<AdminSubmissionsResponse>(url, {
    init: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
}
