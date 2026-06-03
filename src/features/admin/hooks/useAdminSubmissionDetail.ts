import { useFetchApi } from '../../../app/hooks/fetchApi'
import { queryKeys } from '../../../lib/queryKeys'
import { getAdminSubmissionDetail } from '../api/getAdminSubmissionDetail'
import type { AdminSubmissionType } from '../types/admin'

export function useAdminSubmissionDetail(
  type: AdminSubmissionType | null,
  submissionId: string,
  token: string | null,
) {
  return useFetchApi({
    queryKey: queryKeys.admin.submissionDetail(type ?? 'events', submissionId),
    queryFn: () =>
      getAdminSubmissionDetail(type ?? 'events', submissionId, token ?? ''),
    enabled: Boolean(token && submissionId && type),
    staleTime: 10_000,
  })
}
