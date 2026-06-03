import { useFetchApi } from '../../../app/hooks/fetchApi'
import { queryKeys } from '../../../lib/queryKeys'
import { getAdminSession } from '../api/getAdminSession'

export function useAdminSession(token: string | null) {
  return useFetchApi({
    queryKey: queryKeys.admin.session(token ?? 'anonymous'),
    queryFn: () => getAdminSession(token ?? ''),
    enabled: Boolean(token),
    retry: false,
    staleTime: 30_000,
  })
}
