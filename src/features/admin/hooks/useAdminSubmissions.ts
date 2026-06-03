import { useFetchApi } from '../../../app/hooks/fetchApi'
import { queryKeys } from '../../../lib/queryKeys'
import { getAdminSubmissions } from '../api/getAdminSubmissions'
import type {
  AdminSubmissionFilter,
  AdminSubmissionStatusFilter,
} from '../types/admin'

export function useAdminSubmissions(
  status: AdminSubmissionStatusFilter,
  type: AdminSubmissionFilter,
  token: string | null,
) {
  return useFetchApi({
    queryKey: queryKeys.admin.submissions(status, type),
    queryFn: () => getAdminSubmissions(status, type, token ?? ''),
    enabled: Boolean(token),
    staleTime: 10_000,
  })
}
