import { useQuery } from '@tanstack/react-query'
import { getTours, toursQueryKey } from '../api/getTours'

export function useTours() {
  return useQuery({
    queryKey: toursQueryKey,
    queryFn: getTours,
  })
}
