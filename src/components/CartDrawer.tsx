import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

interface Props {
  open: boolean
  onClose: () => void
}

function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-500 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '420px', backgroundColor: '#f5f0eb' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: '#2c181020' }}>
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
        <div className="flex-1 overflow-y-auto px-8 py-6">
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
                <div
                  key={item.product.id}
                  className="flex gap-4 py-6 border-b"
                  style={{ borderColor: '#2c181015' }}
                >
                  {/* Image */}
                  <div className="w-20 h-20 shrink-0 overflow-hidden" style={{ backgroundColor: '#e8e0d8' }}>
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1" style={{ color: '#2c1810' }}>{item.product.name}</p>
                    <p className="text-xs mb-3" style={{ color: '#2c181060' }}>{item.product.genre}</p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="text-sm transition-colors"
                        style={{ color: '#2c181060' }}
                      >−</button>
                      <span className="text-sm" style={{ color: '#2c1810' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="text-sm transition-colors"
                        style={{ color: '#2c181060' }}
                      >+</button>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="text-right shrink-0">
                    <p className="text-sm mb-2" style={{ color: '#2c1810' }}>
                      €{(item.product.price_cents * item.quantity / 100).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-xs transition-colors"
                      style={{ color: '#2c181040' }}
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
          <div className="px-8 py-6 border-t" style={{ borderColor: '#2c181020' }}>
            <div className="flex justify-between mb-2">
              <span className="text-sm" style={{ color: '#2c181080' }}>Subtotal</span>
              <span className="text-sm" style={{ color: '#2c1810' }}>
                €{(totalPrice() / 100).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-sm" style={{ color: '#2c181080' }}>Shipping</span>
              <span className="text-sm" style={{ color: '#2c181060' }}>Calculated at checkout</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full py-4 text-center text-sm tracking-widest uppercase transition-colors"
              style={{ backgroundColor: '#2c1810', color: '#f5f0eb' }}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer