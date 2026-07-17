import { patchJson } from '../../../services/http'
import type {
  AdminPublishedContentDetailResponse,
  AdminPublishedContentType,
  UpdateAdminPublishedContentRequest,
} from '../types/admin'

export function updateAdminPublishedContent(
  type: AdminPublishedContentType,
  id: string,
  body: UpdateAdminPublishedContentRequest,
  token: string,
) {
  return patchJson<UpdateAdminPublishedContentRequest, AdminPublishedContentDetailResponse>(
    `/api/admin/content/${type}/${id}`,
    body,
    {
      init: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  )
}
