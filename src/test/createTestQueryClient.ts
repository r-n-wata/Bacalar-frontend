import { createAppQueryClient } from '../app/providers/createAppQueryClient'

export function createTestQueryClient() {
  const queryClient = createAppQueryClient()

  queryClient.setDefaultOptions({
    queries: {
      retry: false,
      staleTime: 0,
      gcTime: 0,
      refetchOnWindowFocus: false,
    },
  })

  return queryClient
}
