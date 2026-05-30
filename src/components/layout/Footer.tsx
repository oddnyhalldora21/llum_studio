function Footer() {
    return (
      <footer style={{ backgroundColor: '#2c1810' }} className="text-white/70 px-12 py-16">
        
        {/* Newsletter */}
        <div className="flex items-center justify-between border-b border-white/20 pb-12 mb-12">
          <p className="text-sm tracking-wide text-white">Stay in the loop</p>
          <div className="flex gap-0">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent border-b border-white/40 text-sm text-white placeholder-white/40 px-0 py-2 w-64 outline-none focus:border-white transition-colors"
            />
            <button className="text-sm text-white ml-6 hover:text-white/60 transition-colors tracking-wide">
              Subscribe
            </button>
          </div>
        </div>
  
        {/* Links */}
        <div className="grid grid-cols-3 gap-12 mb-16">
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              {['Pendants', 'Sconces', 'Table Lamps', 'Floor Lamps', 'Chandeliers'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-4">Info</h4>
            <ul className="space-y-2">
              {['About', 'Sustainability', 'Trade Program', 'Showroom', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm">hello@llumstudio.com</li>
              <li className="text-sm">+354 123 4567</li>
              <li className="text-sm mt-4">Reykjavík, Iceland</li>
            </ul>
          </div>
        </div>
  
        {/* Bottom */}
        <div className="flex items-center justify-between border-t border-white/20 pt-8">
          <span className="text-base font-semibold tracking-widest uppercase text-white">Llum Studio</span>
          <span className="text-xs text-white/40">© 2026 Llum Studio. All rights reserved.</span>
        </div>
  
      </footer>
    )
  }
  
  export default Footer