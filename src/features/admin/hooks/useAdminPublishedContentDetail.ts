import { useFetchApi } from '../../../app/hooks/fetchApi'
import { queryKeys } from '../../../lib/queryKeys'
import { getAdminPublishedContentDetail } from '../api/getAdminPublishedContentDetail'
import type { AdminPublishedContentType } from '../types/admin'

export function useAdminPublishedContentDetail(
  type: AdminPublishedContentType,
  id: string,
  token: string | null,
) {
  return useFetchApi({
    queryKey: queryKeys.admin.contentDetail(type, id),
    queryFn: () => getAdminPublishedContentDetail(type, id, token ?? ''),
    enabled: Boolean(token && id),
    staleTime: 10_000,
  })
}
