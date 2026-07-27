import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { getTours, TOURS_PAGE_SIZE, toursQueryKey, type TourFilters } from '../api/getTours'

const TOURS_STALE_TIME = 1000 * 60 * 8

export function useTours(filters: TourFilters) {
  const language = useAppLanguage()

  return useInfiniteQuery({
    queryKey: toursQueryKey(language, filters, TOURS_PAGE_SIZE),
    queryFn: ({ pageParam }) =>
      getTours(language, {
        cursor: typeof pageParam === 'string' ? pageParam : undefined,
        limit: TOURS_PAGE_SIZE,
        filters,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
    staleTime: TOURS_STALE_TIME,
    refetchOnWindowFocus: false,
  })
}
