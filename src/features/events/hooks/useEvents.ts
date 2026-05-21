import { useFetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { eventsQueryKey, getEvents } from '../api/getEvents'

const EVENTS_STALE_TIME = 1000 * 60 * 2

export function useEvents() {
  const language = useAppLanguage()

  return useFetchApi({
    queryKey: eventsQueryKey(language),
    queryFn: () => getEvents(language),
    staleTime: EVENTS_STALE_TIME,
    refetchOnWindowFocus: false,
  })
}
