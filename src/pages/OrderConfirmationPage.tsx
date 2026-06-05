import { Link } from 'react-router-dom'

function OrderConfirmationPage() {
  return (
    <div className="min-h-screen px-8 py-16" style={{ backgroundColor: '#f5f0eb' }}>

      {/* Top divider line */}
      <div className="w-full border-t mb-16" style={{ borderColor: '#2c181030' }} />

      <p className="text-xs tracking-widest uppercase mb-16" style={{ color: '#2c181060' }}>
        Order Confirmed
      </p>

      <div className="max-w-xl">

        {/* Burgundy checkmark */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
          style={{ backgroundColor: '#2c1810' }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f5f0eb' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-light mb-6" style={{ color: '#2c1810' }}>
          Thank you for your order.
        </h1>
        <p className="text-sm leading-relaxed mb-2" style={{ color: '#2c181080' }}>
          Your order has been received and is being processed.
        </p>
        <p className="text-sm leading-relaxed mb-16" style={{ color: '#2c181060' }}>
          This is a demo store — no real payment has been processed.
        </p>

        <div className="flex gap-4">
          <Link
            to="/shop"
            className="px-8 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ backgroundColor: '#2c1810', color: '#f5f0eb' }}
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="px-8 py-3 text-sm tracking-widests uppercase transition-opacity hover:opacity-70"
            style={{ border: '1px solid #2c181040', color: '#2c1810' }}
          >
            Back to Home
          </Link>
        </div>

      </div>

    </div>
  )
}

export default OrderConfirmationPage