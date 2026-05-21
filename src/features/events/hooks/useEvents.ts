import { fetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { eventsQueryKey, getEvents } from '../api/getEvents'

export function useEvents() {
  const language = useAppLanguage()

  return fetchApi({
    queryKey: eventsQueryKey(language),
    queryFn: () => getEvents(language),
  })
}
