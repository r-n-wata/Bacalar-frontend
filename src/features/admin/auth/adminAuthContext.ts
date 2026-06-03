import { createContext } from 'react'
import type { AuthError } from '@supabase/supabase-js'
import type { AdminBrowserSession } from './supabase'

export type LoginResult = {
  session: AdminBrowserSession | null
  error: AuthError | null
}

export type AdminAuthContextValue = {
  session: AdminBrowserSession | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => Promise<void>
}

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)
