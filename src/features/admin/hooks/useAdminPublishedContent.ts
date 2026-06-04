import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { useFetchApi } from '../../../app/hooks/fetchApi'
import { queryKeys } from '../../../lib/queryKeys'
import { getAdminPublishedContent } from '../api/getAdminPublishedContent'
import type { AdminPublishedContentType } from '../types/admin'

export function useAdminPublishedContent(
  type: AdminPublishedContentType,
  token: string | null,
) {
  const language = useAppLanguage()

  return useFetchApi({
    queryKey: queryKeys.admin.content(language, type),
    queryFn: () => getAdminPublishedContent(type, token ?? ''),
    enabled: Boolean(token),
    staleTime: 10_000,
  })
}
