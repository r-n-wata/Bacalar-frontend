import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import posthog from '../../../services/posthog'
import { getSupabaseBrowserClient, type AdminBrowserSession } from './supabase'
import { AdminAuthContext } from './adminAuthContext'

export function AdminAuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AdminBrowserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const identifiedUserId = useRef<string | null>(null)

  const syncPostHogIdentity = useCallback(
    (nextSession: AdminBrowserSession | null) => {
      if (!nextSession) {
        if (identifiedUserId.current) {
          posthog.reset()
          identifiedUserId.current = null
        }
        return
      }

      const userId = nextSession.user.id

      if (identifiedUserId.current === userId) {
        return
      }

      if (identifiedUserId.current) {
        posthog.reset()
      }

      posthog.identify(userId, {
        ...(nextSession.user.email ? { email: nextSession.user.email } : {}),
      })
      identifiedUserId.current = userId
    },
    [],
  )

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    void supabase.auth.getSession().then(({ data }) => {
      syncPostHogIdentity(data.session)
      setSession(data.session)
      setIsLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      syncPostHogIdentity(nextSession)
      setSession(nextSession)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [syncPostHogIdentity])

  async function login(email: string, password: string) {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (data.session) {
      syncPostHogIdentity(data.session)
      setSession(data.session)
    }

    return {
      session: data.session,
      error,
    }
  }

  async function logout() {
    const supabase = getSupabaseBrowserClient()

    await supabase.auth.signOut()
    syncPostHogIdentity(null)
    setSession(null)
  }

  return (
    <AdminAuthContext.Provider
      value={{
        session,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}
