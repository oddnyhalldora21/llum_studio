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
  const [visible, setVisible] = useState(true)
  const [displayedCategory, setDisplayedCategory] = useState("All Products")
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''

  useEffect(() => {
    return () => setLightsOn(false)
  }, [])

  function handleCategoryChange(cat: string) {
    setVisible(false)
    setTimeout(() => {
      setSelectedCategory(cat)
      setDisplayedCategory(cat)
      setVisible(true)
    }, 300)
  }

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
              lightsOn ? 'bg-[#3d1a10] border-[#3d1a10]' : 'bg-transparent border-[#3d1a10]'
            }`}
          >
            <span className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all duration-600 ${
              lightsOn ? 'left-7 bg-white' : 'left-1 bg-[#3d1a10]'
            }`} />
          </button>
        </div>
      </div>

      {/* Divider line */}
      <div className="flex gap-4 px-8">
        <div className="w-56 shrink-0 border-t" style={{ borderColor: '#2c1810' }} />
        <div className="flex-1 border-t" style={{ borderColor: '#2c1810' }} />
      </div>

      {/* Main layout */}
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-56 shrink-0 px-8 py-6">

          {/* All Products */}
          <ul className="space-y-0.5 mb-4">
            <li>
              <button
                onClick={() => handleCategoryChange("All Products")}
                className="text-sm text-left w-full transition-all duration-300"
                style={{ color: '#2c1810' }}
              >
                <span
                  className="inline-block transition-all duration-300"
                  style={{ opacity: selectedCategory === "All Products" ? 1 : 0, marginRight: selectedCategory === "All Products" ? '4px' : '0px' }}
                >●</span>All Products
              </button>
            </li>
          </ul>

          {/* Lighting section */}
          <p className="text-sm mb-1" style={{ color: '#2c1810' }}>Lighting</p>
          <ul className="space-y-0.5 mb-4">
            {lightingCategories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => handleCategoryChange(cat)}
                  className="text-sm text-left w-full transition-all duration-300"
                  style={{ color: '#2c1810', paddingLeft: '12px' }}
                >
                  <span
                    className="inline-block transition-all duration-300"
                    style={{ opacity: selectedCategory === cat ? 1 : 0, marginRight: selectedCategory === cat ? '4px' : '0px' }}
                  >●</span>{cat}
                </button>
              </li>
            ))}
          </ul>

          {/* Collections section */}
          <p className="text-sm mb-1" style={{ color: '#2c1810' }}>Collections</p>
          <ul className="space-y-0.5">
            {collectionSlugs.map((col) => (
              <li key={col}>
                <button
                  onClick={() => handleCategoryChange(col)}
                  className="text-sm text-left w-full transition-all duration-300"
                  style={{ color: '#2c1810', paddingLeft: '12px' }}
                >
                  <span
                    className="inline-block transition-all duration-300"
                    style={{ opacity: selectedCategory === col ? 1 : 0, marginRight: selectedCategory === col ? '4px' : '0px' }}
                  >●</span>{col}
                </button>
              </li>
            ))}
          </ul>

        </aside>

        {/* Products */}
        <main className="flex-1 px-8 py-10">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <h1 className="text-2xl mb-8" style={{ color: '#2c1810' }}>
              {displayedCategory} <span className="text-base" style={{ color: '#2c181060' }}>{filtered.length}</span>
            </h1>

            <div className="grid grid-cols-4 gap-6">
              {filtered.map((product) => (
                <Link key={product.id} to={`/products/${product.slug}`} className="group">
                  <div className={`overflow-hidden mb-3 relative transition-colors duration-700 ${lightsOn ? 'bg-stone-200' : 'bg-stone-100'}`} style={{ aspectRatio: '3/4' }}>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ opacity: lightsOn ? 0 : 1, transition: 'opacity 0.8s ease, transform 0.5s ease' }}
                    />
                    {product.image_url_2 && (
                      <img
                        src={product.image_url_2}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ opacity: lightsOn ? 1 : 0, transition: 'opacity 0.8s ease, transform 0.5s ease' }}
                      />
                    )}
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
          </div>
        </main>

      </div>
    </div>
  )
}

export default ShopPage