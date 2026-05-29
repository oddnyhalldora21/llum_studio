import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuthStore()
  const navigate = useNavigate()

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    const errorMsg = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password)

    if (errorMsg) {
      setError(errorMsg)
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto px-8 py-24">
      <h1 className="font-serif text-3xl text-stone-900 mb-2">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h1>
      <p className="text-sm text-stone-400 mb-10">
        {isSignUp ? 'Join Llum Studio' : 'Welcome back to Llum Studio'}
      </p>

      {error && (
        <p className="text-sm text-red-500 mb-4">{error}</p>
      )}

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-stone-900 text-white text-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>
      </div>

      <p className="text-sm text-stone-400 mt-6 text-center">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-stone-900 hover:underline"
        >
          {isSignUp ? 'Sign in' : 'Create one'}
        </button>
      </p>
    </div>
  )
}

export default SignInPage