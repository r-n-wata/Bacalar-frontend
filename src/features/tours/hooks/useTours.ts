import { useFetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { getTours, toursQueryKey } from '../api/getTours'

const TOURS_STALE_TIME = 1000 * 60 * 8

export function useTours() {
  const language = useAppLanguage()

  return useFetchApi({
    queryKey: toursQueryKey(language),
    queryFn: () => getTours(language),
    staleTime: TOURS_STALE_TIME,
    refetchOnWindowFocus: false,
  })
}
