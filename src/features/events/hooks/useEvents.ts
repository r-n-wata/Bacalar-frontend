import { useQuery } from '@tanstack/react-query'
import { eventsQueryKey, getEvents } from '../api/getEvents'

export function useEvents() {
  return useQuery({
    queryKey: eventsQueryKey,
    queryFn: getEvents,
  })
}
