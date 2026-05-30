import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { useAuthStore } from '../../store/authStore'

interface Props {
  lightsOn: boolean
}

function Navbar({ lightsOn }: Props) {
  const totalItems = useCartStore(state => state.totalItems())
  const { user, fullName, signOut } = useAuthStore()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-700 ${lightsOn ? 'bg-[#e8e0d8] border-stone-300' : 'bg-white border-stone-200'}`}>
      <nav className="flex items-center justify-between px-8 h-14">

        <Link to="/" className="text-base font-semibold tracking-widest uppercase text-stone-900">
          Llum Studio
        </Link>

        <div className="flex items-center gap-10">
          <Link to="/shop" className="text-sm font-medium tracking-wide text-stone-900 hover:text-stone-500 transition-colors">
            Shop
          </Link>
          <Link to="/collections" className="text-sm font-medium tracking-wide text-stone-900 hover:text-stone-500 transition-colors">
            Collections
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm font-medium tracking-wide text-stone-900">{fullName}</span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium tracking-wide text-stone-900 hover:text-stone-500 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/sign-in" className="text-sm font-medium tracking-wide text-stone-900 hover:text-stone-500 transition-colors">
              Sign In
            </Link>
          )}
          <Link to="/cart" className="text-sm font-medium tracking-wide text-stone-900 hover:text-stone-500 transition-colors">
            Cart ({totalItems})
          </Link>
        </div>

      </nav>
    </header>
  )
}

export default Navbar