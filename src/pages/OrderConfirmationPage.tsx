import { Link } from 'react-router-dom'

function OrderConfirmationPage() {
  return (
    <div className="max-w-lg mx-auto px-8 py-24 text-center">
      
      {/* Checkmark */}
      <div className="w-16 h-16 rounded-full bg-stone-900 flex items-center justify-center mx-auto mb-8">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-medium tracking-wide text-stone-900 mb-4">
        Order Confirmed
      </h1>
      <p className="text-sm text-stone-500 mb-2">
        Thank you for your order!
      </p>
      <p className="text-sm text-stone-400 mb-12">
        This is a demo store — no real payment has been processed.
      </p>

      <div className="flex gap-4 justify-center">
        <Link
          to="/shop"
          className="px-8 py-3 bg-stone-900 text-white text-sm hover:bg-stone-700 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          to="/"
          className="px-8 py-3 border border-stone-300 text-sm text-stone-600 hover:border-stone-900 transition-colors"
        >
          Back to Home
        </Link>
      </div>

    </div>
  )
}

export default OrderConfirmationPage