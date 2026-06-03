import {
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import { getSupabaseBrowserClient, type AdminBrowserSession } from './supabase'
import { AdminAuthContext } from './adminAuthContext'

export function AdminAuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AdminBrowserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setIsLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function login(email: string, password: string) {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (data.session) {
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
