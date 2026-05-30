import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'

const categories = ["All Products", "Chandelier", "Pendant", "Sconce", "Table Lamp", "Floor Lamp"]

function ShopPage() {
  const { products, loading, error } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [lightsOn, setLightsOn] = useState(false)

  const filtered = selectedCategory === "All Products"
    ? products
    : products.filter(p => p.genre === selectedCategory)

  if (loading) return <div className="flex items-center justify-center min-h-screen text-sm text-stone-400">Loading...</div>
  if (error) return <div className="flex items-center justify-center min-h-screen text-sm text-red-400">{error}</div>

  return (
    <div className={`flex transition-colors duration-700 ${lightsOn ? 'bg-[#e8e0d8]' : 'bg-white'}`}>

      {/* Sidebar */}
      <aside className={`w-56 shrink-0 px-8 py-12 border-r transition-colors duration-700 ${lightsOn ? 'border-stone-300' : 'border-stone-200'}`}>
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

        {/* Header row with title and toggle */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl text-stone-900">
            {selectedCategory} <span className="text-lg text-stone-400">{filtered.length}</span>
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-widest uppercase text-[#3d1a10]">
              Light
            </span>
            <button
              onClick={() => setLightsOn(!lightsOn)}
              className={`relative w-12 h-6 rounded-full border transition-colors duration-500 ${lightsOn ? 'bg-[#3d1a10] border-[#3d1a10]' : 'bg-transparent border-stone-400'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-500 ${lightsOn ? 'left-7 bg-white' : 'left-1 bg-stone-400'}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {filtered.map((product) => (
            <Link key={product.id} to={`/products/${product.slug}`} className="group">
              <div className={`aspect-square overflow-hidden mb-3 transition-colors duration-700 ${lightsOn ? 'bg-stone-200' : 'bg-stone-100'}`}>
                <img
                  src={lightsOn ? (product.image_url_2 || product.image_url) : product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-sm text-stone-900">
                {product.name}
              </p>
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