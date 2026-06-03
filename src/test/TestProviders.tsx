import { useState, type PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { AdminAuthProvider } from '../features/admin/auth/AdminAuthProvider'
import { createTestQueryClient } from './createTestQueryClient'

export function TestProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => createTestQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </QueryClientProvider>
  )
}
