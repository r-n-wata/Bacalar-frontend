import { useState, type PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createTestQueryClient } from './createTestQueryClient'

export function TestProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => createTestQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
