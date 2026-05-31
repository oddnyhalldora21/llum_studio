interface Props {
    lightsOn: boolean
  }
  
  function Footer({ lightsOn }: Props) {
    return (
      <footer 
        className="px-12 py-16 transition-colors duration-700"
        style={{ backgroundColor: lightsOn ? '#e8e0d8' : 'oklch(0.96 0.008 60)' }}
      >
        
        {/* Newsletter */}
        <div className="flex items-center justify-between border-b border-stone-300 pb-12 mb-12">
          <p className="text-sm tracking-wide text-stone-900">Stay in the loop</p>
          <div className="flex gap-0">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent border-b border-stone-400 text-sm text-stone-900 placeholder-stone-400 px-0 py-2 w-64 outline-none focus:border-stone-900 transition-colors"
            />
            <button className="text-sm text-stone-900 ml-6 hover:text-stone-500 transition-colors tracking-wide">
              Subscribe
            </button>
          </div>
        </div>
  
        {/* Links */}
        <div className="grid grid-cols-3 gap-12 mb-16">
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-900 mb-4">Shop</h4>
            <ul className="space-y-2">
              {['Pendants', 'Sconces', 'Table Lamps', 'Floor Lamps', 'Chandeliers'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-900 mb-4">Info</h4>
            <ul className="space-y-2">
              {['About', 'Sustainability', 'Trade Program', 'Showroom', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-900 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-stone-500">hello@llumstudio.com</li>
              <li className="text-sm text-stone-500">+354 123 4567</li>
              <li className="text-sm text-stone-500 mt-4">Reykjavík, Iceland</li>
            </ul>
          </div>
        </div>
  
        {/* Bottom */}
        <div className="flex items-center justify-between border-t border-stone-300 pt-8">
          <span className="text-base font-semibold tracking-widest uppercase text-stone-900">Llum Studio</span>
          <span className="text-xs text-stone-400">© 2026 Llum Studio. All rights reserved.</span>
        </div>
  
      </footer>
    )
  }
  
  export default Footer