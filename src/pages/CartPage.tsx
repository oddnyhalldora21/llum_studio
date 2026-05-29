function CartPage() {
    return (
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="font-serif text-3xl text-stone-900 mb-12">Your Cart</h1>
  
        {/* Cart Items */}
        <div className="border-t border-stone-200">
          {/* Single cart item */}
          <div className="flex gap-6 py-8 border-b border-stone-200">
            <div className="w-24 h-24 bg-stone-100 shrink-0">
              <img
                src="https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="Cosmos Chandelier"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-stone-900 mb-1">Cosmos Chandelier</p>
              <p className="text-sm text-stone-400 mb-4">Finish: Brass</p>
              <div className="flex items-center gap-4">
                <button className="text-stone-400 hover:text-stone-900">−</button>
                <span className="text-sm">1</span>
                <button className="text-stone-400 hover:text-stone-900">+</button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-stone-900">$8,000</p>
              <button className="text-xs text-stone-400 hover:text-stone-900 mt-2">Remove</button>
            </div>
          </div>
        </div>
  
        {/* Order Summary */}
        <div className="mt-12 max-w-sm ml-auto">
          <div className="flex justify-between py-3 border-b border-stone-200">
            <span className="text-sm text-stone-600">Subtotal</span>
            <span className="text-sm text-stone-900">$8,000</span>
          </div>
          <div className="flex justify-between py-3 border-b border-stone-200">
            <span className="text-sm text-stone-600">Shipping</span>
            <span className="text-sm text-stone-400">Calculated at checkout</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-sm font-medium text-stone-900">Total</span>
            <span className="text-sm font-medium text-stone-900">$8,000</span>
          </div>
          <button className="w-full py-3 bg-stone-900 text-white text-sm hover:bg-stone-700 transition-colors mt-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    )
  }
  
  export default CartPage