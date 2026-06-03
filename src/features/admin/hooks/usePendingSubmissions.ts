import { useFetchApi } from '../../../app/hooks/fetchApi'
import { queryKeys } from '../../../lib/queryKeys'
import { getPendingSubmissions } from '../api/getPendingSubmissions'
import type { AdminSubmissionFilter } from '../types/admin'

export function usePendingSubmissions(
  filter: AdminSubmissionFilter,
  token: string | null,
) {
  return useFetchApi({
    queryKey: queryKeys.admin.submissions(filter),
    queryFn: () => getPendingSubmissions(filter, token ?? ''),
    enabled: Boolean(token),
    staleTime: 10_000,
  })
}
