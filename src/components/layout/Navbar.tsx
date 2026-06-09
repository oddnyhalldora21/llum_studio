import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { useAuthStore } from '../../store/authStore'
import MobileMenu from './MobileMenu'

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
  const [menuClosing, setMenuClosing] = useState(false)

  function closeMenu() {
    setMenuClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setMenuClosing(false)
    }, 300)
  }

  useEffect(() => {
    if (!isTranslucentPage) return
    function handleScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTranslucentPage])

  useEffect(() => {
    closeMenu()
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
  const showLogo = !isTranslucentPage || scrolled || hovered || menuOpen

  const headerClass = `fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
    onCollections || menuOpen
      ? 'bg-[#5c1a1a] border-transparent'
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
      ? 'text-[#f5f0eb] hover:opacity-70'
      : isTranslucent
        ? 'text-[#f5f0eb] hover:text-[#f5f0eb]/70'
        : 'text-[#5c1a1a] hover:opacity-60'
  }`

  const logoClass = `text-base font-semibold tracking-widest uppercase transition-all duration-500 hover:opacity-70 ${
    onCollections || menuOpen
      ? 'text-[#f5f0eb]'
      : isTranslucent
        ? 'text-[#f5f0eb]'
        : 'text-[#5c1a1a]'
  } ${!showLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`

 const hamburgerColor = onCollections || isTranslucent || menuOpen ? '#f5f0eb' : '#5c1a1a'

  return (
    <>
      <header
        className={headerClass}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <nav className="flex items-center justify-between px-8 h-14">

         

          {/* Desktop nav */}
          <div className="hidden md:flex flex-1">
            <Link to="/" className={logoClass}>
              Llum Studio
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/shop" className={linkClass}>Shop</Link>
            <Link to="/collections" className={linkClass}>Collections</Link>
            <Link to="/about" className={linkClass}>About</Link>
            <button onClick={() => setSearchOpen(!searchOpen)} className={`${linkClass} cursor-pointer`}>
              Search
            </button>
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-6">
            {user ? (
              <>
                <Link to="/profile" className={`text-sm font-medium tracking-wide transition-colors duration-500 hover:opacity-60 ${
                  onCollections || isTranslucent ? 'text-[#f5f0eb]' : 'text-[#5c1a1a]'
                }`}>
                  {fullName}
                </Link>
                <button onClick={handleSignOut} className={linkClass}>Sign Out</button>
              </>
            ) : (
              <Link to="/sign-in" className={linkClass}>Sign In</Link>
            )}
            <button onClick={onCartOpen} className={linkClass}>
              Cart ({totalItems})
            </button>
          </div>

        {/* Mobile right: cart + menu */}
        <div className="flex md:hidden items-center gap-0">
        <button
          onClick={onCartOpen}
          className="text-sm font-medium px-4 py-1.5 border-t border-b border-l"
          style={{ color: hamburgerColor, borderColor: hamburgerColor }}
        >
          {totalItems}
        </button>
        <button
              onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)}
              className="text-sm font-medium px-4 py-1.5 border"
              style={{ color: hamburgerColor, borderColor: hamburgerColor }}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
      </div>

        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <MobileMenu
          onClose={closeMenu}
          onSearchOpen={() => setSearchOpen(true)}
          closing={menuClosing}
        />
      )}

      {/* Search popup */}
      {searchOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setSearchOpen(false)} />
          <div
            className="fixed top-14 left-1/2 -translate-x-1/2 z-50 border shadow-lg w-[90vw] md:w-[480px]"
            style={{ ...searchBg, borderColor: '#5c1a1a20' }}
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
                style={{ color: '#5c1a1a' }}
              />
              <button
                onClick={handleSearch}
                className="text-sm font-medium transition-opacity hover:opacity-60 px-4 py-2 border"
                style={{ color: '#5c1a1a', borderColor: '#5c1a1a40' }}
              >
                Search
              </button>
              <button
                onClick={() => setSearchOpen(false)}
                className="transition-opacity hover:opacity-60"
                style={{ color: '#5c1a1a' }}
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