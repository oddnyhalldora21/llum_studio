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

  const inputClass = "w-full px-3 py-3 text-sm outline-none bg-transparent border transition-colors"
  const inputStyle = { borderColor: '#5c1a1a30', color: '#5c1a1a' }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0eb' }}>

      <div className="px-8 pt-24">
        <div className="border-t" style={{ borderColor: '#5c1a1a' }} />
      </div>

      <div className="flex flex-col md:flex-row px-8 gap-8 py-12">

        {/* Left - Form */}
        <div className="flex-1">
          <h1 className="text-xs tracking-widest uppercase mb-12" style={{ color: '#5c1a1a' }}>
            Checkout
          </h1>

          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#5c1a1a80' }}>Contact</p>
            <input type="email" placeholder="Email" className={inputClass} style={inputStyle} />
          </div>

          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#5c1a1a80' }}>Shipping Address</p>
            <div className="flex flex-col md:flex-row gap-3 mb-3">
              <input type="text" placeholder="First name" className={inputClass} style={inputStyle} />
              <input type="text" placeholder="Last name" className={inputClass} style={inputStyle} />
            </div>
            <input type="text" placeholder="Address" className={`${inputClass} mb-3`} style={inputStyle} />
            <div className="flex flex-col md:flex-row gap-3">
              <input type="text" placeholder="City" className={inputClass} style={inputStyle} />
              <input type="text" placeholder="Postal code" className={inputClass} style={inputStyle} />
            </div>
          </div>

          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#5c1a1a80' }}>Payment</p>
            <p className="text-xs mb-4" style={{ color: '#5c1a1a60' }}>This is a demo store — no real payments are processed.</p>
            <input type="text" placeholder="Card number" className={`${inputClass} mb-3`} style={inputStyle} />
            <div className="flex gap-3">
              <input type="text" placeholder="MM / YY" className={inputClass} style={inputStyle} />
              <input type="text" placeholder="CVC" className={inputClass} style={inputStyle} />
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ backgroundColor: '#3d1a10', color: '#f5f0eb' }}
          >
            Place Order
          </button>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full md:w-80 shrink-0 md:pt-20">
          {items.map(item => (
            <div key={item.product.id} className="py-2">
              <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />
              <div className="flex items-center justify-between py-2 gap-2">
                <p className="text-sm flex-1" style={{ color: '#5c1a1a' }}>{item.product.name}</p>
                <p className="text-sm shrink-0" style={{ color: '#5c1a1a80' }}>Qty: {item.quantity}</p>
                <p className="text-sm shrink-0 ml-2" style={{ color: '#5c1a1a' }}>
                  €{(item.product.price_cents * item.quantity / 100).toLocaleString()}
                </p>
              </div>
              <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />
              <div className="py-3 flex gap-4 items-start">
                <div className="overflow-hidden shrink-0" style={{ width: '80px', height: '96px', backgroundColor: '#e8e0d8' }}>
                  <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-xs transition-opacity hover:opacity-60 pt-1"
                  style={{ color: '#5c1a1a60' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />
          <div className="flex justify-between py-3">
            <span className="text-sm" style={{ color: '#5c1a1a80' }}>Subtotal</span>
            <span className="text-sm" style={{ color: '#5c1a1a' }}>€{(total / 100).toLocaleString()}</span>
          </div>
          <div className="flex justify-between pb-3">
            <span className="text-sm" style={{ color: '#5c1a1a80' }}>Shipping</span>
            <span className="text-sm" style={{ color: '#5c1a1a60' }}>Free</span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />
          <div className="flex justify-between py-3">
            <span className="text-sm font-medium" style={{ color: '#5c1a1a' }}>Total</span>
            <span className="text-sm font-medium" style={{ color: '#5c1a1a' }}>€{(total / 100).toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CheckoutPage