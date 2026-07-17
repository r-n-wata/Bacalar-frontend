import { getJson } from '../../../services/http'
import type {
  AdminPublishedContentDetailResponse,
  AdminPublishedContentType,
} from '../types/admin'

export function getAdminPublishedContentDetail(
  type: AdminPublishedContentType,
  id: string,
  token: string,
) {
  return getJson<AdminPublishedContentDetailResponse>(`/api/admin/content/${type}/${id}`, {
    init: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
}
