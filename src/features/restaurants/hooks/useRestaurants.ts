import { useInfiniteQuery } from '@tanstack/react-query'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import {
  RESTAURANTS_PAGE_SIZE,
  getRestaurants,
  restaurantsQueryKey,
} from '../api/getRestaurants'
import type { RestaurantCategoryFilter } from '../types/restaurant'

const RESTAURANTS_STALE_TIME = 1000 * 60 * 8

export function useRestaurants(category: RestaurantCategoryFilter) {
  const language = useAppLanguage()

  return useInfiniteQuery({
    queryKey: restaurantsQueryKey(language, category, RESTAURANTS_PAGE_SIZE),
    queryFn: ({ pageParam }) =>
      getRestaurants(language, {
        cursor: typeof pageParam === 'string' ? pageParam : undefined,
        limit: RESTAURANTS_PAGE_SIZE,
        category,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor ?? undefined,
    staleTime: RESTAURANTS_STALE_TIME,
    refetchOnWindowFocus: false,
  })
}
