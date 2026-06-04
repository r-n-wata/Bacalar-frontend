import { getJson } from '../../../services/http'
import type {
  AdminPublishedContentResponse,
  AdminPublishedContentType,
} from '../types/admin'

export const adminPublishedContentApiPath = '/api/admin/content'

export function getAdminPublishedContent(
  type: AdminPublishedContentType,
  token: string,
) {
  const params = new URLSearchParams({ type })

  return getJson<AdminPublishedContentResponse>(
    `${adminPublishedContentApiPath}?${params.toString()}`,
    {
      init: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  )
}
