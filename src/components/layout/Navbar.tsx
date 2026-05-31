import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { useAuthStore } from '../../store/authStore'


interface Props {
    lightsOn: boolean
    onCartOpen: () => void
  }

function Navbar({ lightsOn, onCartOpen }: Props) {
  const totalItems = useCartStore(state => state.totalItems())
  const { user, fullName, signOut } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const onCollections = location.pathname === '/collections'
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  function handleSearch() {
    if (searchQuery.trim()) {
      setSearchOpen(false)
      setSearchQuery('')
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch()
    if (e.key === 'Escape') setSearchOpen(false)
  }

  const searchBg = { backgroundColor: 'oklch(0.96 0.008 60)' }

  const linkClass = `text-sm font-medium tracking-wide transition-colors ${
    onCollections ? 'text-white/70 hover:text-white' : 'text-stone-900 hover:text-stone-500'
  }`

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-700 ${
  onCollections
    ? 'bg-[#2c1810] border-transparent'
    : lightsOn
      ? 'bg-[#e8e0d8] border-stone-300'
      : 'bg-[#f5f0eb] border-transparent'
}`}>
        <nav className="flex items-center justify-between px-8 h-14">

          <Link to="/" className={`text-base font-semibold tracking-widest uppercase transition-colors duration-700 ${onCollections ? 'text-white' : 'text-stone-900'}`}>
            Llum Studio
          </Link>

          <div className="flex items-center gap-10">
            <Link to="/shop" className={linkClass}>Shop</Link>
            <Link to="/collections" className={linkClass}>Collections</Link>
            <button onClick={() => setSearchOpen(!searchOpen)} className={linkClass}>
              Search
            </button>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <span className={`text-sm font-medium tracking-wide ${onCollections ? 'text-white/70' : 'text-stone-900'}`}>
                  {fullName}
                </span>
                <button onClick={handleSignOut} className={linkClass}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/sign-in" className={linkClass}>Sign In</Link>
            )}
            <button onClick={onCartOpen} className={linkClass}>
            Cart ({totalItems})
            </button>
          </div>

        </nav>
      </header>

      {/* Search popup */}
      {searchOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setSearchOpen(false)}
          />
          <div
            className="fixed top-14 left-1/2 -translate-x-1/2 z-50 border border-stone-200 shadow-lg w-[480px]"
            style={searchBg}
          >
            <div className="flex items-center p-4 gap-4">
              <input
                type="text"
                placeholder="Search for..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1 text-sm outline-none placeholder-stone-400 text-stone-900 bg-transparent"
              />
              <button
                onClick={handleSearch}
                className="text-sm font-medium text-stone-900 hover:text-stone-500 transition-colors px-4 py-2 border border-stone-200 hover:border-stone-400"
              >
                Search
              </button>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar