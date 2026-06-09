import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'
import { useCartStore } from './cartStore'

type AuthStore = {
  user: User | null
  fullName: string | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
  initialize: () => void
  refreshProfile: () => Promise<void>
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
      set({ user: data.user, fullName: profile?.full_name ?? null })
    }
    return null
  },

  signUp: async (email, password) => {
    const { error, data } = await supabase.auth.signUp({ email, password })
    if (error) return error.message
    if (data.user) {
      set({ user: data.user })
    }
    return null
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, fullName: null })
    useCartStore.getState().clearCart()
  },

  refreshProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()
      set({ user, fullName: profile?.full_name ?? null })
    }
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