import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'

const lightingCategories = ["All Lighting", "Chandelier", "Pendant", "Sconce", "Table Lamp", "Floor Lamp"]
const collectionSlugs = ["Lido", "Saga", "Flora", "Core", "Dune", "Strata", "Terra"]

interface Props {
  lightsOn: boolean
  setLightsOn: (value: boolean) => void
}

function ShopPage({ lightsOn, setLightsOn }: Props) {
  const { products, loading, error } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState("All Lighting")
  const [visible, setVisible] = useState(true)
  const [displayedCategory, setDisplayedCategory] = useState("All Lighting")
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const collectionParam = searchParams.get('collection') || ''

  useEffect(() => {
    return () => setLightsOn(false)
  }, [])

  useEffect(() => {
    if (collectionParam) {
      handleCategoryChange(collectionParam.charAt(0).toUpperCase() + collectionParam.slice(1))
    }
  }, [collectionParam])

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
      selectedCategory === "All Lighting" ||
      (!isCollection && p.genre === selectedCategory) ||
      (isCollection && p.collection?.toLowerCase() === selectedCategory.toLowerCase())
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) return <div className="flex items-center justify-center min-h-screen text-sm" style={{ color: '#5c1a1a' }}>Loading...</div>
  if (error) return <div className="flex items-center justify-center min-h-screen text-sm" style={{ color: '#5c1a1a' }}>{error}</div>

  const allCategories = [...lightingCategories, ...collectionSlugs]

  return (
    <div className={`min-h-screen transition-colors duration-700 ${lightsOn ? 'bg-[#e8e0d8]' : 'bg-[#f5f0eb]'}`}>

      {/* Top strip — light toggle */}
      <div className="flex justify-end items-center px-8 pt-24 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-widest uppercase" style={{ color: '#5c1a1a' }}>Light</span>
          <button
            onClick={() => setLightsOn(!lightsOn)}
            className={`relative w-12 h-6 rounded-full border transition-colors duration-500 ${
              lightsOn ? 'bg-[#3d1a10] border-[#3d1a10]' : 'bg-transparent border-[#3d1a10]'
            }`}
          >
            <span className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all duration-600 ${
              lightsOn ? 'left-7 bg-[#f5f0eb]' : 'left-1 bg-[#3d1a10]'
            }`} />
          </button>
        </div>
      </div>

      {/* Divider line */}
      <div className="flex gap-4 px-8">
        <div className="hidden md:block w-56 shrink-0 border-t" style={{ borderColor: '#5c1a1a' }} />
        <div className="flex-1 border-t" style={{ borderColor: '#5c1a1a' }} />
      </div>

      {/* Mobile filter bar */}
      <div
        className="md:hidden flex gap-4 px-8 py-4 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className="shrink-0 text-xs tracking-wide px-3 py-1.5 border transition-colors"
            style={{
              color: selectedCategory === cat ? '#f5f0eb' : '#5c1a1a',
              backgroundColor: selectedCategory === cat ? '#5c1a1a' : 'transparent',
              borderColor: '#5c1a1a'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="flex">

        {/* Sidebar — desktop only */}
        <aside className="hidden md:block w-56 shrink-0 px-8 py-6">
          <p className="text-sm mb-1" style={{ color: '#5c1a1a' }}>Lighting</p>
          <ul className="space-y-0.1 mb-4">
            {lightingCategories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => handleCategoryChange(cat)}
                  className="text-sm text-left w-full relative"
                  style={{ color: '#5c1a1a', paddingLeft: '16px' }}
                >
                  <span
                    key={selectedCategory === cat ? 'active' : 'inactive'}
                    className={`absolute left-0 top-0 ${selectedCategory === cat ? 'dot-drop' : 'opacity-0'}`}
                  >●</span>{cat}
                </button>
              </li>
            ))}
          </ul>

          <p className="text-sm mb-1" style={{ color: '#5c1a1a' }}>Collections</p>
          <ul className="space-y-0.1">
            {collectionSlugs.map((col) => (
              <li key={col}>
                <button
                  onClick={() => handleCategoryChange(col)}
                  className="text-sm text-left w-full relative"
                  style={{ color: '#5c1a1a', paddingLeft: '16px' }}
                >
                  <span
                    key={selectedCategory === col ? 'active' : 'inactive'}
                    className={`absolute left-0 top-0 ${selectedCategory === col ? 'dot-drop' : 'opacity-0'}`}
                  >●</span>{col}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-10">
          <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <h1 className="text-xl md:text-2xl mb-6 md:mb-8" style={{ color: '#5c1a1a' }}>
              {displayedCategory}<sup className="text-xs ml-0.5" style={{ color: '#5c1a1a' }}>{filtered.length}</sup>
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {filtered.map((product) => (
                <Link key={product.id} to={`/products/${product.slug}`} className="group">
                  <div
                    className="overflow-hidden mb-3 relative transition-colors duration-700"
                    style={{ aspectRatio: '3/4', backgroundColor: lightsOn ? '#ddd5cb' : '#ebe6e0' }}
                  >
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
                  <p className="text-xs md:text-sm" style={{ color: '#5c1a1a' }}>{product.name}</p>
                  <p className="text-xs md:text-sm" style={{ color: '#5c1a1a80' }}>
                    From €{(product.price_cents / 100).toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-sm mt-12" style={{ color: '#5c1a1a60' }}>No products found for "{search}"</p>
            )}
          </div>
        </main>

      </div>
    </div>
  )
}

export default ShopPage