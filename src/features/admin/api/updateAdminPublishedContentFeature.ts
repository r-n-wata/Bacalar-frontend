import { getJson } from '../../../services/http'
import type {
  AdminPublishedContentResponse,
  AdminPublishedContentType,
} from '../types/admin'

export function updateAdminPublishedContentFeature(
  type: AdminPublishedContentType,
  id: string,
  isFeatured: boolean,
  token: string,
) {
  return getJson<AdminPublishedContentResponse>(
    `/api/admin/content/${type}/${id}/feature`,
    {
      init: {
        method: isFeatured ? 'POST' : 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  )
}
