import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthCtx {
  user: User | null
  session: Session | null
  loading: boolean
  orgId: string | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [orgId,   setOrgId]   = useState<string | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      if (data.session?.user) loadOrgId(data.session.user.id)
      else setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        await ensureProfile(session.user)
        await loadOrgId(session.user.id)
      } else {
        setOrgId(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function ensureProfile(user: User) {
    const { data: existing } = await supabase
      .from('profiles').select('id').eq('id', user.id).maybeSingle()

    if (!existing) {
      // Get or create org
      const { data: anyProfile } = await supabase
        .from('profiles').select('org_id').limit(1).maybeSingle()

      let org_id: string
      if (anyProfile?.org_id) {
        org_id = anyProfile.org_id
      } else {
        const { data: newOrg } = await supabase
          .from('orgs').insert({ name: 'Honey Touch', slug: 'honey-touch' }).select('id').single()
        org_id = newOrg!.id
      }

      await supabase.from('profiles').insert({
        id: user.id, org_id,
        email: user.email!,
        full_name: user.user_metadata?.full_name ?? null,
        avatar_url: user.user_metadata?.avatar_url ?? null,
        role: 'member',
      })
    }
  }

  async function loadOrgId(userId: string) {
    const { data } = await supabase
      .from('profiles').select('org_id').eq('id', userId).single()
    setOrgId(data?.org_id ?? null)
    setLoading(false)
  }

  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, orgId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
