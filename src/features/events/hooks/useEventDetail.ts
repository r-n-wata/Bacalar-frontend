import { useFetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import {
  eventDetailQueryKey,
  getEventDetail,
} from '../api/getEventDetail'

const EVENT_DETAIL_STALE_TIME = 1000 * 60 * 2

export function useEventDetail(id: string | undefined) {
  const language = useAppLanguage()

  return useFetchApi({
    queryKey: eventDetailQueryKey(id ?? 'missing', language),
    queryFn: () => getEventDetail(id ?? '', language),
    staleTime: EVENT_DETAIL_STALE_TIME,
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  })
}
