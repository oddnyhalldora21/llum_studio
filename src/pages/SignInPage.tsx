import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'

function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp, refreshProfile } = useAuthStore()
  const navigate = useNavigate()

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    if (isSignUp) {
      const errorMsg = await signUp(email, password)
      if (errorMsg) {
        setError(errorMsg)
        setLoading(false)
        return
      }
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('profiles').insert({
          id: user.id,
          email: email,
          full_name: fullName,
        })
        await refreshProfile()
      }
    } else {
      const errorMsg = await signIn(email, password)
      if (errorMsg) {
        setError(errorMsg)
        setLoading(false)
        return
      }
    }

    navigate('/')
    setLoading(false)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0eb' }}>

      <div className="flex gap-4 px-8 pt-24">
        <div className="w-full md:w-1/2 shrink-0 border-t" style={{ borderColor: '#5c1a1a' }} />
        <div className="flex-1 border-t hidden md:block" style={{ borderColor: '#5c1a1a' }} />
      </div>

      <div className="flex flex-col md:flex-row">

        <div className="w-full md:w-1/2 shrink-0 px-8 md:px-16 py-8 md:py-12">
          <p className="text-xs tracking-widest uppercase" style={{ color: '#5c1a1a' }}>Account</p>
        </div>

        <div className="flex-1 px-8 md:px-16 pb-12 md:py-12">
          <p className="text-xl md:text-2xl leading-relaxed mb-12" style={{ color: '#5c1a1a' }}>
            {isSignUp
              ? 'Create an account to track orders and check out faster.'
              : 'Log in to check order status, order history, and make checking out faster. No account? Sign up below.'}
          </p>

          {error && (
            <p className="text-sm mb-6" style={{ color: '#c0392b' }}>{error}</p>
          )}

          <div className="mb-6">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3 py-3 text-sm outline-none bg-transparent border mb-3"
                style={{ borderColor: '#5c1a1a40', color: '#5c1a1a' }}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-3 text-sm outline-none bg-transparent border mb-3"
              style={{ borderColor: '#5c1a1a40', color: '#5c1a1a' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-3 text-sm outline-none bg-transparent border"
              style={{ borderColor: '#5c1a1a40', color: '#5c1a1a' }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-70 disabled:opacity-40 mb-3"
            style={{ backgroundColor: '#3d1a10', color: '#f5f0eb' }}
          >
            {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-70 border"
            style={{ borderColor: '#5c1a1a40', color: '#5c1a1a', backgroundColor: 'transparent' }}
          >
            {isSignUp ? 'Sign In Instead' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignInPage