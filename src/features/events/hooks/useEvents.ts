import { useInfiniteQuery } from '@tanstack/react-query'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { EVENTS_PAGE_SIZE, eventsQueryKey, getEvents } from '../api/getEvents'
import type { EventCategoryFilter } from '../types/event'

const EVENTS_STALE_TIME = 1000 * 60 * 2

export function useEvents(category: EventCategoryFilter) {
  const language = useAppLanguage()

  return useInfiniteQuery({
    queryKey: eventsQueryKey(language, category, EVENTS_PAGE_SIZE),
    queryFn: ({ pageParam }) =>
      getEvents(language, {
        cursor: typeof pageParam === 'string' ? pageParam : undefined,
        limit: EVENTS_PAGE_SIZE,
        category,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor ?? undefined,
    staleTime: EVENTS_STALE_TIME,
    refetchOnWindowFocus: false,
  })
}
