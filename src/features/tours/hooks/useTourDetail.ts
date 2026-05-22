import { useFetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { getTourDetail, tourDetailQueryKey } from '../api/getTourDetail'

const TOUR_DETAIL_STALE_TIME = 1000 * 60 * 8

export function useTourDetail(id: string | undefined) {
  const language = useAppLanguage()

  return useFetchApi({
    queryKey: tourDetailQueryKey(id ?? 'missing', language),
    queryFn: () => getTourDetail(id ?? '', language),
    staleTime: TOUR_DETAIL_STALE_TIME,
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  })
}
