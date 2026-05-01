import { useQuery } from '@tanstack/react-query'
import {
  getRestaurants,
  restaurantsQueryKey,
} from '../api/getRestaurants'

export function useRestaurants() {
  return useQuery({
    queryKey: restaurantsQueryKey,
    queryFn: getRestaurants,
  })
}
