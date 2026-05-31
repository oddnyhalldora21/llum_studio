import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

interface Props {
  open: boolean
  onClose: () => void
}

function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  return (
    <div
      className={`fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-500 ease-in-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ width: '420px', backgroundColor: '#f5f0eb' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <h2 className="text-sm tracking-widest uppercase" style={{ color: '#2c1810' }}>Your Cart</h2>
        <button
          onClick={onClose}
          className="text-sm transition-colors"
          style={{ color: '#2c181060' }}
        >
          Close
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-sm" style={{ color: '#2c181060' }}>Your cart is empty</p>
            <button
              onClick={onClose}
              className="text-sm transition-colors"
              style={{ color: '#2c1810' }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            {items.map((item) => (
              <div key={item.product.id} className="py-2">

                {/* Top border */}
                <div style={{ height: '1px', backgroundColor: '#2c1810' }} />

                {/* Name row */}
                <div className="flex items-center justify-between py-2 gap-2">
                  <p className="text-sm flex-1" style={{ color: '#2c1810' }}>
                    {item.product.name}
                  </p>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="text-sm" style={{ color: '#2c181060' }}
                    >−</button>
                    <span className="text-sm" style={{ color: '#2c1810' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="text-sm" style={{ color: '#2c181060' }}
                    >+</button>
                  </div>
                  <p className="text-sm shrink-0 ml-2" style={{ color: '#2c1810' }}>
                    €{(item.product.price_cents * item.quantity / 100).toLocaleString()}
                  </p>
                </div>

                {/* Bottom border */}
                <div style={{ height: '1px', backgroundColor: '#2c1810' }} />

                {/* Image + Remove below border */}
                <div className="py-4 flex gap-4 items-start">
                  <div className="overflow-hidden shrink-0" style={{ width: '100px', height: '120px', backgroundColor: '#e8e0d8' }}>
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
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="px-6 py-6">
          <div style={{ height: '1px', backgroundColor: '#2c1810' }} />
          <div className="flex justify-between py-3">
            <span className="text-sm" style={{ color: '#2c181080' }}>Subtotal</span>
            <span className="text-sm" style={{ color: '#2c1810' }}>
              €{(totalPrice() / 100).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between pb-4">
            <span className="text-sm" style={{ color: '#2c181080' }}>Shipping</span>
            <span className="text-sm" style={{ color: '#2c181060' }}>Calculated at checkout</span>
          </div>
          <Link
            to="/checkout"
            onClick={onClose}
            className="block w-full py-2 text-center text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ backgroundColor: '#3d1a10', color: '#f5f0eb' }}
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartDrawer