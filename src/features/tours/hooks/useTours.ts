import { useInfiniteQuery } from '@tanstack/react-query'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { getTours, TOURS_PAGE_SIZE, toursQueryKey } from '../api/getTours'
import type { TourCategoryFilter } from '../types/tour'

const TOURS_STALE_TIME = 1000 * 60 * 8

export function useTours(category: TourCategoryFilter) {
  const language = useAppLanguage()

  return useInfiniteQuery({
    queryKey: toursQueryKey(language, category, TOURS_PAGE_SIZE),
    queryFn: ({ pageParam }) =>
      getTours(language, {
        cursor: typeof pageParam === 'string' ? pageParam : undefined,
        limit: TOURS_PAGE_SIZE,
        category,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor ?? undefined,
    staleTime: TOURS_STALE_TIME,
    refetchOnWindowFocus: false,
  })
}
