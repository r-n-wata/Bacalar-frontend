import { useFetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import {
  getRestaurants,
  restaurantsQueryKey,
} from '../api/getRestaurants'

const RESTAURANTS_STALE_TIME = 1000 * 60 * 15

export function useRestaurants() {
  const language = useAppLanguage()

  return useFetchApi({
    queryKey: restaurantsQueryKey(language),
    queryFn: () => getRestaurants(language),
    staleTime: RESTAURANTS_STALE_TIME,
    refetchOnWindowFocus: false,
  })
}
