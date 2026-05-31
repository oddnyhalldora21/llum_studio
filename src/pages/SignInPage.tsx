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
  const { signIn, signUp } = useAuthStore()
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

  const inputClass = "w-full px-0 py-3 text-sm outline-none bg-transparent border-b transition-colors placeholder-[#2c181040]"
  const inputStyle = { borderColor: '#2c1810', color: '#2c1810' }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-start justify-center" style={{ backgroundColor: '#f5f0eb' }}>
      <div className="w-full max-w-sm px-8">

        <h1 className="text-2xl font-light tracking-widest uppercase mb-2" style={{ color: '#2c1810' }}>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h1>
        <p className="text-sm mb-12" style={{ color: '#2c181060' }}>
          {isSignUp ? 'Join Llum Studio' : 'Welcome back to Llum Studio'}
        </p>

        {error && (
          <p className="text-sm mb-6" style={{ color: '#c0392b' }}>{error}</p>
        )}

        <div className="space-y-0 mb-12">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className={inputClass}
              style={inputStyle}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 text-sm tracking-widest uppercase transition-opacity hover:opacity-70 disabled:opacity-40 mb-6"
          style={{ backgroundColor: '#3d1a10', color: '#f5f0eb' }}
        >
          {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>

        <p className="text-sm text-center" style={{ color: '#2c181060' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="transition-colors"
            style={{ color: '#2c1810' }}
          >
            {isSignUp ? 'Sign in' : 'Create one'}
          </button>
        </p>

      </div>
    </div>
  )
}

export default SignInPage