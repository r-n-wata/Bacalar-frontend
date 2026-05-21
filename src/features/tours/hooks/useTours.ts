import { fetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { getTours, toursQueryKey } from '../api/getTours'

export function useTours() {
  const language = useAppLanguage()

  return fetchApi({
    queryKey: toursQueryKey(language),
    queryFn: () => getTours(language),
  })
}
