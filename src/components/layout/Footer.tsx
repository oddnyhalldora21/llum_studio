import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface Props {
  lightsOn: boolean
}

function Footer({ lightsOn }: Props) {
  const location = useLocation()
  const isAbout = location.pathname === '/about'
  const isCollections = location.pathname === '/collections' || location.pathname.startsWith('/collections/')
  const isHome = location.pathname === '/'
  const { user } = useAuthStore()
  const textColor = isCollections ? '#f5f0eb' : '#5c1a1a'
  const borderColor = isCollections ? '#f5f0eb' : '#5c1a1a'
  const [footerEmail, setFooterEmail] = useState('')
  const [footerSubscribed, setFooterSubscribed] = useState(false)

  function handleFooterSubscribe() {
    if (footerEmail) {
      setFooterSubscribed(true)
      setFooterEmail('')
      setTimeout(() => setFooterSubscribed(false), 3000)
    }
  }

  return (
    <footer
      className="px-8 py-12 transition-colors duration-700"
      style={{ backgroundColor: isCollections ? '#5c1a1a' : lightsOn || isAbout ? '#e8e0d8' : '#f5f0eb' }}
    >

      {/* Newsletter — hidden on homepage */}
      {!isHome && (
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-8 mb-8" style={{ borderColor }}>
      <p className="text-sm tracking-wide" style={{ color: textColor }}>Stay in the loop</p>
      {footerSubscribed ? (
        <p className="text-sm font-medium" style={{ color: textColor }}>Thanks for signing up!</p>
      ) : (
        <div className="flex">
          <input
            type="email"
            placeholder="Your email"
            value={footerEmail}
            onChange={e => setFooterEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleFooterSubscribe()}
            className="bg-transparent border-b text-sm px-0 py-2 w-full md:w-64 outline-none"
            style={{ borderColor, color: textColor }}
          />
          <button
            onClick={handleFooterSubscribe}
            className="text-sm ml-6 tracking-wide transition-opacity hover:opacity-60 shrink-0"
            style={{ color: textColor }}
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
      )}

      {/* Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10">
        <div>
          <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: textColor }}>Shop</h4>
          <ul className="space-y-1.5">
            <li><Link to="/shop" className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>All Lighting</Link></li>
            <li><Link to="/shop?genre=Pendant" className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>Pendants</Link></li>
            <li><Link to="/shop?genre=Sconce" className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>Sconces</Link></li>
            <li><Link to="/shop?genre=Table+Lamp" className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>Table Lamps</Link></li>
            <li><Link to="/shop?genre=Floor+Lamp" className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>Floor Lamps</Link></li>
            <li><Link to="/shop?genre=Chandelier" className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>Chandeliers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: textColor }}>Info</h4>
          <ul className="space-y-1.5">
            <li><Link to="/about" className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>About</Link></li>
            <li><Link to="/collections" className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>Collections</Link></li>
            <li><Link to={user ? '/profile' : '/sign-in'} className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>Account</Link></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: textColor }}>Contact</h4>
          <ul className="space-y-1.5">
            <li className="text-sm" style={{ color: textColor }}>hello@llumstudio.com</li>
            <li className="text-sm" style={{ color: textColor }}>+354 123 4567</li>
            <li className="text-sm mt-2" style={{ color: textColor }}>Reykjavík, Iceland</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-t pt-6" style={{ borderColor }}>
        <span className="text-base font-semibold tracking-widest uppercase" style={{ color: textColor }}>Llum Studio</span>
        <span className="text-xs opacity-50" style={{ color: textColor }}>© 2026 Llum Studio. All rights reserved.</span>
      </div>

    </footer>
  )
}

export default Footer