import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, clearCart, removeItem } = useCartStore()
  const total = items.reduce((sum, item) => sum + item.product.price_cents * item.quantity, 0)

  function handlePlaceOrder() {
    clearCart()
    navigate('/order-confirmation')
  }

  const inputClass = "w-full px-0 py-3 text-sm outline-none bg-transparent border-b transition-colors placeholder-[#2c181040]"
  const inputStyle = { borderColor: '#2c1810', color: '#2c1810' }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: '#f5f0eb' }}>
      <div className="max-w-5xl mx-auto px-8 flex gap-16">

        {/* Left - Form */}
        <div className="flex-1">
          <h1 className="text-2xl font-light tracking-widest uppercase mb-12" style={{ color: '#2c1810' }}>
            Checkout
          </h1>

          {/* Contact */}
          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: '#2c181080' }}>Contact</p>
            <input
              type="email"
              placeholder="Email"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          {/* Shipping */}
          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: '#2c181080' }}>Shipping Address</p>
            <div className="space-y-0">
              <div className="flex gap-6">
                <input type="text" placeholder="First name" className={inputClass} style={inputStyle} />
                <input type="text" placeholder="Last name" className={inputClass} style={inputStyle} />
              </div>
              <input type="text" placeholder="Address" className={inputClass} style={inputStyle} />
              <div className="flex gap-6">
                <input type="text" placeholder="City" className={inputClass} style={inputStyle} />
                <input type="text" placeholder="Postal code" className={inputClass} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#2c181080' }}>Payment</p>
            <p className="text-xs mb-6" style={{ color: '#2c181040' }}>This is a demo store — no real payments are processed.</p>
            <div className="space-y-0">
              <input type="text" placeholder="Card number" className={inputClass} style={inputStyle} />
              <div className="flex gap-6">
                <input type="text" placeholder="MM / YY" className={inputClass} style={inputStyle} />
                <input type="text" placeholder="CVC" className={inputClass} style={inputStyle} />
              </div>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-2 text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ backgroundColor: '#3d1a10', color: '#f5f0eb' }}
          >
            Place Order
          </button>
        </div>

        {/* Right - Order Summary */}
        <div className="w-80 shrink-0 pt-20">

          {/* Items */}
          <div className="mb-6">
            {items.map(item => (
              <div key={item.product.id} className="py-2">
                <div style={{ height: '1px', backgroundColor: '#2c1810' }} />
                <div className="flex items-center justify-between py-2 gap-2">
                  <p className="text-sm flex-1" style={{ color: '#2c1810' }}>{item.product.name}</p>
                  <p className="text-sm shrink-0" style={{ color: '#2c181080' }}>Qty: {item.quantity}</p>
                  <p className="text-sm shrink-0 ml-2" style={{ color: '#2c1810' }}>
                    €{(item.product.price_cents * item.quantity / 100).toLocaleString()}
                  </p>
                </div>
                <div style={{ height: '1px', backgroundColor: '#2c1810' }} />
                <div className="py-3 flex gap-4 items-start">
                  <div className="overflow-hidden shrink-0" style={{ width: '80px', height: '96px', backgroundColor: '#e8e0d8' }}>
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-xs transition-colors pt-1"
                    style={{ color: '#2c181060' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ height: '1px', backgroundColor: '#2c1810' }} />
          <div className="flex justify-between py-3">
            <span className="text-sm" style={{ color: '#2c181080' }}>Subtotal</span>
            <span className="text-sm" style={{ color: '#2c1810' }}>€{(total / 100).toLocaleString()}</span>
          </div>
          <div className="flex justify-between pb-3">
            <span className="text-sm" style={{ color: '#2c181080' }}>Shipping</span>
            <span className="text-sm" style={{ color: '#2c181060' }}>Free</span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#2c1810' }} />
          <div className="flex justify-between py-3">
            <span className="text-sm" style={{ color: '#2c1810' }}>Total</span>
            <span className="text-sm" style={{ color: '#2c1810' }}>€{(total / 100).toLocaleString()}</span>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CheckoutPage