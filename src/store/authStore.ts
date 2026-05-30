import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

type AuthStore = {
  user: User | null
  fullName: string | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
  initialize: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  fullName: null,
  loading: true,

  signIn: async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return error.message
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', data.user.id)
        .single()
      set({ fullName: profile?.full_name ?? null })
    }
    return null
  },

  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) return error.message
    return null
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, fullName: null })
  },

  initialize: () => {
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user ?? null
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single()
        set({ user, fullName: profile?.full_name ?? null, loading: false })
      } else {
        set({ user, loading: false })
      }
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null })
    })
  },
}))