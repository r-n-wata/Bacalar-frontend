import { deleteJson } from '../../../services/http'
import type {
  AdminPublishedContentType,
  ArchiveAdminPublishedContentResponse,
} from '../types/admin'

export function archiveAdminPublishedContent(
  type: AdminPublishedContentType,
  id: string,
  token: string,
) {
  return deleteJson<ArchiveAdminPublishedContentResponse>(`/api/admin/content/${type}/${id}`, {
    init: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
}
