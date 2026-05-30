import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { useAuthStore } from '../../store/authStore'

function Navbar() {
  const totalItems = useCartStore(state => state.totalItems())
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200">
      <nav className="flex items-center justify-between px-8 h-14">
        
        {/* Left - Brand */}
        <Link to="/" className="font-serif text-lg tracking-wide text-stone-900">
          Llum Studio
        </Link>

        {/* Center - Nav links */}
        <div className="flex items-center gap-8">
          <Link to="/shop" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            Shop
          </Link>
          <Link to="/collections" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            Collections
          </Link>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm text-stone-400">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/sign-in" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              Sign In
            </Link>
          )}
          <Link to="/cart" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            Cart ({totalItems})
          </Link>
        </div>

      </nav>
    </header>
  )
}

export default Navbar