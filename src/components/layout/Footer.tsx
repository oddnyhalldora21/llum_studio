import { useLocation } from 'react-router-dom'

interface Props {
  lightsOn: boolean
}

function Footer({ lightsOn }: Props) {
  const location = useLocation()
  const isAbout = location.pathname === '/about'
  const isCollections = location.pathname === '/collections' || location.pathname.startsWith('/collections/')

  const textColor = isCollections ? '#f5f0eb' : '#2c1810'
  const borderColor = isCollections ? '#f5f0eb30' : '#2c181030'

  return (
    <footer
      className="px-12 py-12 transition-colors duration-700"
      style={{ backgroundColor: isCollections ? '#2c1810' : lightsOn || isAbout ? '#e8e0d8' : '#f5f0eb' }}
    >

      {/* Newsletter */}
      <div className="flex items-center justify-between border-b pb-8 mb-8" style={{ borderColor }}>
        <p className="text-sm tracking-wide" style={{ color: textColor }}>Stay in the loop</p>
        <div className="flex gap-0">
          <input
            type="email"
            placeholder="Your email"
            className="bg-transparent border-b text-sm px-0 py-2 w-64 outline-none transition-colors placeholder-opacity-50"
            style={{ borderColor: isCollections ? '#f5f0eb60' : '#2c181060', color: textColor }}
          />
          <button
            className="text-sm ml-6 tracking-wide transition-opacity hover:opacity-60"
            style={{ color: textColor }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-3 gap-12 mb-10">
        <div>
          <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: textColor }}>Shop</h4>
          <ul className="space-y-1.5">
            {['Pendants', 'Sconces', 'Table Lamps', 'Floor Lamps', 'Chandeliers'].map(item => (
              <li key={item}>
                <a href="#" className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: textColor }}>Info</h4>
          <ul className="space-y-1.5">
            {['About', 'Sustainability', 'Trade Program', 'Showroom', 'Contact'].map(item => (
              <li key={item}>
                <a href="#" className="text-sm transition-opacity hover:opacity-60" style={{ color: textColor }}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: textColor }}>Contact</h4>
          <ul className="space-y-1.5">
            <li className="text-sm" style={{ color: textColor }}>hello@llumstudio.com</li>
            <li className="text-sm" style={{ color: textColor }}>+354 123 4567</li>
            <li className="text-sm mt-2" style={{ color: textColor }}>Reykjavík, Iceland</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between border-t pt-6" style={{ borderColor }}>
        <span className="text-base font-semibold tracking-widest uppercase" style={{ color: textColor }}>Llum Studio</span>
        <span className="text-xs opacity-50" style={{ color: textColor }}>© 2026 Llum Studio. All rights reserved.</span>
      </div>

    </footer>
  )
}

export default Footer