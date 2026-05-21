import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'
import type { ApiError } from '../../services/http'

type FetchApiOptions<TData, TQueryKey extends QueryKey> = Omit<
  UseQueryOptions<TData, ApiError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
> & {
  queryKey: TQueryKey
  queryFn: () => Promise<TData>
}

export function useFetchApi<TData, TQueryKey extends QueryKey>({
  queryKey,
  queryFn,
  ...options
}: FetchApiOptions<TData, TQueryKey>) {
  return useQuery<TData, ApiError, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...options,
  })
}
