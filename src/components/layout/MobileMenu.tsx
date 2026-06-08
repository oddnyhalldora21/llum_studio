import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface Props {
  onClose: () => void
  onSearchOpen: () => void
}

function MobileMenu({ onClose, onSearchOpen }: Props) {
  const { user, fullName, signOut } = useAuthStore()
  const navigate = useNavigate()
  const [shopExpanded, setShopExpanded] = useState(false)
  const [collectionsExpanded, setCollectionsExpanded] = useState(false)

  async function handleSignOut() {
    await signOut()
    navigate('/')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col pt-14 overflow-y-auto" style={{ backgroundColor: '#5c1a1a' }}>
      <div className="flex flex-col px-8 py-8">

       

        {/* Shop expandable */}
        <div>
          <button
            onClick={() => setShopExpanded(!shopExpanded)}
            className="w-full flex items-center justify-between py-3 border-t text-2xl font-light tracking-wide"
            style={{ color: '#f5f0eb', borderColor: '#f5f0eb' }}
          >
            <span>Shop</span>
            <span className="text-xl">{shopExpanded ? '−' : '+'}</span>
          </button>
          {shopExpanded && (
            <div className="flex flex-col pb-2">
              {['All Lighting', 'Chandelier', 'Pendant', 'Sconce', 'Table Lamp', 'Floor Lamp'].map(cat => (
                <Link
                  key={cat}
                  to={cat === 'All Lighting' ? '/shop' : `/shop?genre=${encodeURIComponent(cat)}`}
                  className="py-3 border-t text-base font-light"
                  style={{ color: '#f5f0eb', borderColor: '#f5f0eb20' }}
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Collections expandable */}
        <div>
          <button
            onClick={() => setCollectionsExpanded(!collectionsExpanded)}
            className="w-full flex items-center justify-between py-3 border-t text-2xl font-light tracking-wide"
            style={{ color: '#f5f0eb', borderColor: '#f5f0eb' }}
          >
            <span>Collections</span>
            <span className="text-xl">{collectionsExpanded ? '−' : '+'}</span>
          </button>
          {collectionsExpanded && (
            <div className="flex flex-col pb-2">
              {['Lido', 'Saga', 'Flora', 'Core', 'Dune', 'Strata', 'Terra'].map(col => (
                <Link
                  key={col}
                  to={`/collections/detail#${col.toLowerCase()}`}
                  className="py-3 border-t text-base font-light"
                  style={{ color: '#f5f0eb', borderColor: '#f5f0eb20' }}
                >
                  {col}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* About */}
        <Link
          to="/about"
          className="w-full flex items-center justify-between py-3 border-t text-2xl font-light tracking-wide"
          style={{ color: '#f5f0eb', borderColor: '#f5f0eb' }}
        >
          About
        </Link>

        {/* Bottom links */}
        <button
          onClick={() => { onClose(); onSearchOpen() }}
          className="mt-11 py-3 border-t text-sm text-left tracking-wide"
          style={{ color: '#f5f0eb80', borderColor: '#f5f0eb40' }}
        >
          Search
        </button>

        {user ? (
          <>
            <Link
              to="/profile"
              className="py-4 border-t text-sm tracking-wide"
              style={{ color: '#f5f0eb80', borderColor: '#f5f0eb40' }}
            >
              {fullName}
            </Link>
            <button
              onClick={handleSignOut}
              className="py-4 border-t border-b text-sm text-left tracking-wide"
              style={{ color: '#f5f0eb80', borderColor: '#f5f0eb40' }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            to="/sign-in"
            className="py-4 border-t border-b text-sm tracking-wide"
            style={{ color: '#f5f0eb80', borderColor: '#f5f0eb40' }}
          >
            Sign In
          </Link>
        )}

      </div>
    </div>
  )
}

export default MobileMenu