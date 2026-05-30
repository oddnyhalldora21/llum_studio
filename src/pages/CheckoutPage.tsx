import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const total = items.reduce((sum, item) => sum + item.product.price_cents * item.quantity, 0)

  function handlePlaceOrder() {
    clearCart()
    navigate('/order-confirmation')
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-16 flex gap-16">
      
      {/* Left - Form */}
      <div className="flex-1">
        <h1 className="font-serif text-3xl text-stone-900 mb-12">Checkout</h1>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-stone-900 mb-4">Contact</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
          />
        </div>

        {/* Shipping */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-stone-900 mb-4">Shipping address</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First name"
                className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="City"
                className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
              />
              <input
                type="text"
                placeholder="Postal code"
                className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-stone-900 mb-4">Payment</h2>
          <p className="text-xs text-stone-400 mb-3">This is a demo store — no real payments are processed.</p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card number"
              className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM / YY"
                className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
              />
              <input
                type="text"
                placeholder="CVC"
                className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full py-4 bg-stone-900 text-white text-sm hover:bg-stone-700 transition-colors"
        >
          Place Order
        </button>
      </div>

      {/* Right - Order Summary */}
      <div className="w-80 shrink-0">
        <h2 className="text-sm font-medium text-stone-900 mb-6">Order summary</h2>
        <div className="space-y-4 mb-6">
          {items.map(item => (
            <div key={item.product.id} className="flex gap-4">
              <div className="w-16 h-16 bg-stone-100 shrink-0">
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-stone-900">{item.product.name}</p>
                <p className="text-sm text-stone-400">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm text-stone-900">
                ${(item.product.price_cents * item.quantity / 100).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-200 pt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-stone-600">Subtotal</span>
            <span className="text-sm text-stone-900">${(total / 100).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-stone-600">Shipping</span>
            <span className="text-sm text-stone-400">Free</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-stone-200">
            <span className="text-sm font-medium text-stone-900">Total</span>
            <span className="text-sm font-medium text-stone-900">${(total / 100).toLocaleString()}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CheckoutPage