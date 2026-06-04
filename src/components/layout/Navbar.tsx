import { useState, useEffect } from 'react'
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
  const onCollections = location.pathname === '/collections' || location.pathname.startsWith('/collections/')
  const isHome = location.pathname === '/'
  const isAbout = location.pathname === '/about'
  const isTranslucentPage = isHome || isAbout
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!isTranslucentPage) return
    function handleScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTranslucentPage])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

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

  const searchBg = { backgroundColor: '#f5f0eb' }
  const isTranslucent = isTranslucentPage && !scrolled
  const showLogo = !isTranslucentPage || scrolled || hovered

  const headerClass = `fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
    onCollections
      ? 'bg-[#2c1810] border-transparent'
      : isTranslucent
        ? 'bg-transparent border-transparent'
        : isAbout
          ? 'bg-[#e8e0d8] border-transparent'
          : lightsOn
            ? 'bg-[#e8e0d8] border-transparent'
            : 'bg-[#f5f0eb] border-transparent'
  }`

  const linkClass = `text-sm font-medium tracking-wide transition-colors duration-500 ${
    onCollections
      ? 'text-[#f5f0eb]/70 hover:text-[#f5f0eb]'
      : isTranslucent
        ? 'text-[#f5f0eb] hover:text-[#f5f0eb]/70'
        : 'text-[#2c1810] hover:opacity-60'
  }`

  const logoClass = `text-base font-semibold tracking-widest uppercase transition-all duration-500 hover:opacity-70 ${
    onCollections
      ? 'text-[#f5f0eb]'
      : isTranslucent
        ? 'text-[#f5f0eb]'
        : 'text-[#2c1810]'
  } ${!showLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`

  const hamburgerColor = onCollections || isTranslucent ? '#f5f0eb' : '#2c1810'

  return (
    <>
      <header
        className={headerClass}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <nav className="flex items-center justify-between px-8 h-14">

          <Link to="/" className={logoClass}>
            Llum Studio
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/shop" className={linkClass}>Shop</Link>
            <Link to="/collections" className={linkClass}>Collections</Link>
            <Link to="/about" className={linkClass}>About</Link>
            <button onClick={() => setSearchOpen(!searchOpen)} className={linkClass}>
              Search
            </button>
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <span className={`text-sm font-medium tracking-wide transition-colors duration-500 ${
                  onCollections ? 'text-[#f5f0eb]/70' : isTranslucent ? 'text-[#f5f0eb]' : 'text-[#2c1810]'
                }`}>
                  {fullName}
                </span>
                <button onClick={handleSignOut} className={linkClass}>Sign Out</button>
              </>
            ) : (
              <Link to="/sign-in" className={linkClass}>Sign In</Link>
            )}
            <button onClick={onCartOpen} className={linkClass}>
              Cart ({totalItems})
            </button>
          </div>

          {/* Mobile right: cart + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={onCartOpen} className="text-sm font-medium" style={{ color: hamburgerColor }}>
              Cart ({totalItems})
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-1">
              <span className="block w-6 h-px transition-all duration-300" style={{ backgroundColor: hamburgerColor }} />
              <span className="block w-6 h-px transition-all duration-300" style={{ backgroundColor: hamburgerColor }} />
              <span className="block w-6 h-px transition-all duration-300" style={{ backgroundColor: hamburgerColor }} />
            </button>
          </div>

        </nav>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-14" style={{ backgroundColor: '#f5f0eb' }}>
          <div className="flex flex-col px-8 py-10 gap-6">
            <Link to="/shop" className="text-2xl font-light tracking-wide" style={{ color: '#2c1810' }}>Shop</Link>
            <Link to="/collections" className="text-2xl font-light tracking-wide" style={{ color: '#2c1810' }}>Collections</Link>
            <Link to="/about" className="text-2xl font-light tracking-wide" style={{ color: '#2c1810' }}>About</Link>
            <div className="border-t pt-6 mt-4 flex flex-col gap-4" style={{ borderColor: '#2c181020' }}>
              {user ? (
                <>
                  <span className="text-sm" style={{ color: '#2c181080' }}>{fullName}</span>
                  <button onClick={handleSignOut} className="text-sm text-left" style={{ color: '#2c1810' }}>Sign Out</button>
                </>
              ) : (
                <Link to="/sign-in" className="text-sm" style={{ color: '#2c1810' }}>Sign In</Link>
              )}
              <button
                onClick={() => { setMenuOpen(false); setSearchOpen(true) }}
                className="text-sm text-left"
                style={{ color: '#2c1810' }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search popup */}
      {searchOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setSearchOpen(false)} />
          <div
            className="fixed top-14 left-1/2 -translate-x-1/2 z-50 border shadow-lg w-[90vw] md:w-[480px]"
            style={{ ...searchBg, borderColor: '#2c181020' }}
          >
            <div className="flex items-center p-4 gap-4">
              <input
                type="text"
                placeholder="Search for..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: '#2c1810' }}
              />
              <button
                onClick={handleSearch}
                className="text-sm font-medium transition-opacity hover:opacity-60 px-4 py-2 border"
                style={{ color: '#2c1810', borderColor: '#2c181040' }}
              >
                Search
              </button>
              <button
                onClick={() => setSearchOpen(false)}
                className="transition-opacity hover:opacity-60"
                style={{ color: '#2c1810' }}
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