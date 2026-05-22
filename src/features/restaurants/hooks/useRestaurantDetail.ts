import { useFetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import {
  getRestaurantDetail,
  restaurantDetailQueryKey,
} from '../api/getRestaurantDetail'

const RESTAURANT_DETAIL_STALE_TIME = 1000 * 60 * 15

export function useRestaurantDetail(id: string | undefined) {
  const language = useAppLanguage()

  return useFetchApi({
    queryKey: restaurantDetailQueryKey(id ?? 'missing', language),
    queryFn: () => getRestaurantDetail(id ?? '', language),
    staleTime: RESTAURANT_DETAIL_STALE_TIME,
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  })
}
