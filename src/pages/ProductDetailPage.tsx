function ProductDetailPage() {
    return (
      <div className="flex min-h-screen">
        {/* Left - Product Info */}
        <div className="w-1/2 px-12 py-12">
          <p className="text-sm text-stone-400 mb-8">Handcrafted lighting</p>
          <h1 className="font-serif text-4xl text-stone-900 mb-6">Cosmos Chandelier</h1>
  
          {/* Variant selectors */}
          <div className="border-t border-stone-200 mt-8">
            <div className="flex items-center justify-between py-4 border-b border-stone-200">
              <span className="text-sm text-stone-600">Finish</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-stone-400">Select</span>
                <span>↓</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-stone-200">
              <span className="text-sm text-stone-600">Size</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-stone-400">Select</span>
                <span>↓</span>
              </div>
            </div>
          </div>
  
          {/* Add to cart bar */}
          <div className="flex items-center border border-stone-300 mt-8">
            <div className="flex items-center gap-4 px-4 py-3 border-r border-stone-300">
              <span className="text-sm text-stone-600">Quantity</span>
              <button className="text-stone-400 hover:text-stone-900">−</button>
              <span className="text-sm">1</span>
              <button className="text-stone-400 hover:text-stone-900">+</button>
            </div>
            <div className="flex items-center justify-between flex-1 px-4 py-3">
              <span className="text-sm text-stone-900">From $8,000</span>
              <button className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
  
        {/* Right - Product Image */}
        <div className="w-1/2 bg-stone-100">
          <img
            src="https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Cosmos Chandelier"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    )
  }
  
  export default ProductDetailPage