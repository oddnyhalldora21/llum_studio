import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'

const categories = ["All Products", "Chandelier", "Pendant", "Sconce", "Table Lamp", "Floor Lamp"]

function ShopPage() {
  const { products, loading, error } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState("All Products")

  const filtered = selectedCategory === "All Products"
    ? products
    : products.filter(p => p.genre === selectedCategory)

  if (loading) return <div className="flex items-center justify-center min-h-screen text-sm text-stone-400">Loading...</div>
  if (error) return <div className="flex items-center justify-center min-h-screen text-sm text-red-400">{error}</div>

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 px-8 py-12 border-r border-stone-200">
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm transition-colors ${
                  selectedCategory === cat
                    ? 'text-stone-900 font-medium'
                    : 'text-stone-400 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 px-8 py-12">
        <h1 className="font-serif text-3xl text-stone-900 mb-8">
          {selectedCategory} <span className="text-lg text-stone-400 font-sans">{filtered.length}</span>
        </h1>
        <div className="grid grid-cols-4 gap-6">
          {filtered.map((product) => (
            <Link key={product.id} to={`/products/${product.slug}`} className="group">
              <div className="aspect-square overflow-hidden bg-stone-100 mb-3">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-sm text-stone-900">{product.name}</p>
              <p className="text-sm text-stone-500">
                From ${(product.price_cents / 100).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ShopPage