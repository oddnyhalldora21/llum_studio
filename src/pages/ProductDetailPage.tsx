import { useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { product, loading, error } = useProduct(id || '')

  if (loading) return <div className="flex items-center justify-center min-h-screen text-sm text-stone-400">Loading...</div>
  if (error || !product) return <div className="flex items-center justify-center min-h-screen text-sm text-red-400">Product not found</div>

  return (
    <div className="flex min-h-screen">
      {/* Left - Product Info */}
      <div className="w-1/2 px-12 py-12">
        <p className="text-sm text-stone-400 mb-8">{product.genre}</p>
        <h1 className="font-serif text-4xl text-stone-900 mb-6">{product.name}</h1>
        <p className="text-sm text-stone-500 mb-8">{product.description}</p>

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
            <span className="text-sm text-stone-900">
              From ${(product.price_cents / 100).toLocaleString()}
            </span>
            <button className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Right - Product Image */}
      <div className="w-1/2 bg-stone-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default ProductDetailPage