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
      style={{ width: '100%', maxWidth: '420px', backgroundColor: '#f5f0eb' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: '#5c1a1a20' }}>
        <h2 className="text-sm tracking-widests uppercase" style={{ color: '#5c1a1a' }}>Your Cart</h2>
        <button
          onClick={onClose}
          className="text-sm tracking-wide border px-4 py-1.5 transition-opacity hover:opacity-60"
          style={{ color: '#5c1a1a', borderColor: '#5c1a1a' }}
        >
          Close
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-sm" style={{ color: '#5c1a1a60' }}>Your cart is empty</p>
            <button onClick={onClose} className="text-sm transition-colors" style={{ color: '#5c1a1a' }}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            {items.map((item, index) => (
              <div key={`${item.product.id}-${item.size}-${item.hardware}-${index}`}>

                {/* Name + price + qty row */}
                <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />
                <div className="flex items-center justify-between py-2 gap-2">
                  <p className="text-sm flex-1" style={{ color: '#5c1a1a' }}>{item.product.name}</p>
                  <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => updateQuantity(item.product.id, item.size, item.hardware, item.quantity - 1)} className="text-sm" style={{ color: '#5c1a1a60' }}>−</button>
                    <span className="text-sm" style={{ color: '#5c1a1a' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.size, item.hardware, item.quantity + 1)} className="text-sm" style={{ color: '#5c1a1a60' }}>+</button>
                  </div>
                  <p className="text-sm shrink-0 ml-2" style={{ color: '#5c1a1a' }}>
                    €{(item.product.price_cents * item.quantity / 100).toLocaleString()}
                  </p>
                </div>
                <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />

                {/* Image left + details right */}
                <div className="py-4 flex gap-4 items-start">
                  <div className="overflow-hidden shrink-0" style={{ width: '100px', height: '120px', backgroundColor: '#e8e0d8' }}>
                    <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 pt-1">
                    <p className="text-xs" style={{ color: '#5c1a1a' }}>{item.size}</p>
                    <p className="text-xs" style={{ color: '#5c1a1a' }}>{item.hardware}</p>
                    <p className="text-xs" style={{ color: '#5c1a1a' }}>{item.color}</p>
                    <button
                      onClick={() => removeItem(item.product.id, item.size, item.hardware)}
                      className="text-xs mt-2 text-left transition-opacity hover:opacity-60"
                      style={{ color: '#5c1a1a60' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="px-6 py-6">
          <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />
          <div className="flex justify-between py-3">
            <span className="text-sm" style={{ color: '#5c1a1a80' }}>Subtotal</span>
            <span className="text-sm" style={{ color: '#5c1a1a' }}>€{(totalPrice() / 100).toLocaleString()}</span>
          </div>
          <div className="flex justify-between pb-4">
            <span className="text-sm" style={{ color: '#5c1a1a80' }}>Shipping</span>
            <span className="text-sm" style={{ color: '#5c1a1a60' }}>Calculated at checkout</span>
          </div>
          <Link
            to="/checkout"
            onClick={onClose}
            className="block w-full py-3 text-center text-sm tracking-widests uppercase transition-opacity hover:opacity-70"
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