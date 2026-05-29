import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-sm text-stone-400">Your cart is empty</p>
        <Link to="/shop" className="text-sm text-stone-900 hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <h1 className="font-serif text-3xl text-stone-900 mb-12">Your Cart</h1>

      {/* Cart Items */}
      <div className="border-t border-stone-200">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-6 py-8 border-b border-stone-200">
            <div className="w-24 h-24 bg-stone-100 shrink-0">
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-stone-900 mb-1">{item.product.name}</p>
              <p className="text-sm text-stone-400 mb-4">{item.product.genre}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="text-stone-400 hover:text-stone-900"
                >−</button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="text-stone-400 hover:text-stone-900"
                >+</button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-stone-900">
                ${(item.product.price_cents * item.quantity / 100).toLocaleString()}
              </p>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-xs text-stone-400 hover:text-stone-900 mt-2"
              >Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-12 max-w-sm ml-auto">
        <div className="flex justify-between py-3 border-b border-stone-200">
          <span className="text-sm text-stone-600">Subtotal</span>
          <span className="text-sm text-stone-900">
            ${(totalPrice() / 100).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between py-3 border-b border-stone-200">
          <span className="text-sm text-stone-600">Shipping</span>
          <span className="text-sm text-stone-400">Calculated at checkout</span>
        </div>
        <div className="flex justify-between py-4">
          <span className="text-sm font-medium text-stone-900">Total</span>
          <span className="text-sm font-medium text-stone-900">
            ${(totalPrice() / 100).toLocaleString()}
          </span>
        </div>
        <Link
          to="/checkout"
          className="block w-full py-3 bg-stone-900 text-white text-sm hover:bg-stone-700 transition-colors mt-4 text-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default CartPage