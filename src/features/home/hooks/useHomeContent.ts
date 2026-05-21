import { useFetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { getHomeContent, homeQueryKey } from '../api/getHomeContent'

const HOME_STALE_TIME = 1000 * 60 * 15

export function useHomeContent() {
  const language = useAppLanguage()

  return useFetchApi({
    queryKey: homeQueryKey(language),
    queryFn: () => getHomeContent(language),
    staleTime: HOME_STALE_TIME,
    refetchOnWindowFocus: false,
  })
}
