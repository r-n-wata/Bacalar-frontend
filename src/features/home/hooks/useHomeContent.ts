import { fetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { getHomeContent, homeQueryKey } from '../api/getHomeContent'

export function useHomeContent() {
  const language = useAppLanguage()

  return fetchApi({
    queryKey: homeQueryKey(language),
    queryFn: () => getHomeContent(language),
  })
}
