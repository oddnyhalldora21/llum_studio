import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'

const lightingCategories = ["All Lighting", "Chandelier", "Pendant", "Sconce", "Table Lamp", "Floor Lamp"]
const collectionSlugs = ["Lido", "Saga", "Flora", "Core", "Dune", "Strata", "Curio", "Terra"]

interface Props {
  lightsOn: boolean
  setLightsOn: (value: boolean) => void
}

function ShopPage({ lightsOn, setLightsOn }: Props) {
  const { products, loading, error } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''

  useEffect(() => {
    return () => setLightsOn(false)
  }, [])

  const isCollection = collectionSlugs.map(c => c.toLowerCase()).includes(selectedCategory.toLowerCase())

  const filtered = products.filter(p => {
    const matchesCategory =
    selectedCategory === "All Products" ||
    selectedCategory === "All Lighting" ||
    (!isCollection && p.genre === selectedCategory) ||
    (isCollection && p.collection?.toLowerCase() === selectedCategory.toLowerCase())
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) return <div className="flex items-center justify-center min-h-screen text-sm text-stone-400">Loading...</div>
  if (error) return <div className="flex items-center justify-center min-h-screen text-sm text-red-400">{error}</div>

  return (
    <div className={`min-h-screen transition-colors duration-700 ${lightsOn ? 'bg-[#e8e0d8]' : 'bg-[#f5f0eb]'}`}>

      {/* Top strip — light toggle */}
      <div className="flex justify-end items-center px-8 pt-24 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-widest uppercase" style={{ color: '#2c1810' }}>
            Light
          </span>
          <button
            onClick={() => setLightsOn(!lightsOn)}
            className={`relative w-12 h-6 rounded-full border transition-colors duration-500 ${
              lightsOn ? 'bg-[#3d1a10] border-[#3d1a10]' : 'bg-transparent border-stone-400'
            }`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-500 ${
              lightsOn ? 'left-7 bg-white' : 'left-1 bg-stone-400'
            }`} />
          </button>
        </div>
      </div>

      {/* Divider line */}
      <div className="border-t" style={{ borderColor: '#2c1810' }} />

      {/* Main layout */}
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-56 shrink-0 px-8 py-10">

          {/* All Products */}
          <ul className="space-y-1 mb-6">
            <li>
              <button
                onClick={() => setSelectedCategory("All Products")}
                className="text-sm text-left w-full transition-all duration-300"
                style={{
                  color: '#2c1810',
                  opacity: selectedCategory === "All Products" ? 1 : 0.4,
                  transform: selectedCategory === "All Products" ? 'translateX(4px)' : 'translateX(0px)',
                }}
              >
                {selectedCategory === "All Products" ? '● ' : ''}All Products
              </button>
            </li>
          </ul>

          {/* Lighting section */}
          <p className="text-sm mb-2" style={{ color: '#2c1810' }}>Lighting</p>
          <ul className="space-y-1 mb-6">
            {lightingCategories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className="text-sm text-left w-full transition-all duration-300"
                  style={{
                    color: '#2c1810',
                    opacity: selectedCategory === cat ? 1 : 0.4,
                    transform: selectedCategory === cat ? 'translateX(4px)' : 'translateX(0px)',
                  }}
                >
                  {selectedCategory === cat ? '● ' : ''}{cat}
                </button>
              </li>
            ))}
          </ul>

          {/* Collections section */}
          <p className="text-sm mb-2" style={{ color: '#2c1810' }}>Collections</p>
          <ul className="space-y-1">
          {collectionSlugs.map((col) => (
          <li key={col}>
            <button
              onClick={() => setSelectedCategory(col)}
              className="text-sm text-left w-full transition-all duration-300"
              style={{
                color: '#2c1810',
                opacity: selectedCategory === col ? 1 : 0.4,
                transform: selectedCategory === col ? 'translateX(4px)' : 'translateX(0px)',
              }}
            >
              {selectedCategory === col ? '● ' : ''}{col}
            </button>
          </li>
        ))}
          </ul>

        </aside>

        {/* Products */}
        <main className="flex-1 px-8 py-10">
          <h1 className="text-2xl mb-8" style={{ color: '#2c1810' }}>
            {selectedCategory} <span className="text-base" style={{ color: '#2c181060' }}>{filtered.length}</span>
          </h1>

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
                <p className="text-sm" style={{ color: '#2c1810' }}>{product.name}</p>
                <p className="text-sm" style={{ color: '#2c181080' }}>
                From €{(product.price_cents / 100).toLocaleString()}
                </p>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-stone-400 mt-12">No products found for "{search}"</p>
          )}
        </main>

      </div>
    </div>
  )
}

export default ShopPage