import { getJson } from '../../../services/http'
import type { AdminSession } from '../types/admin'

export const adminSessionApiPath = '/api/admin/session'

export function getAdminSession(token: string) {
  return getJson<AdminSession>(adminSessionApiPath, {
    init: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
}
