import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { eventsQueryKey, getEvents } from '../api/getEvents'

export function useEvents() {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en'

  return useQuery({
    queryKey: eventsQueryKey(language),
    queryFn: () => getEvents(language),
  })
}
