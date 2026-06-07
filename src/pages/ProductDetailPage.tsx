import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { useCartStore } from '../store/cartStore'

interface Props {
  lightsOn: boolean
  setLightsOn: (value: boolean) => void
}

function ProductDetailPage({ lightsOn, setLightsOn }: Props) {
  const { id } = useParams<{ id: string }>()
  const { product, loading, error } = useProduct(id || '')
  const addItem = useCartStore(state => state.addItem)
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState('Select')
  const [selectedHardware, setSelectedHardware] = useState('Select')
  const [selectedColor, setSelectedColor] = useState('Original')
  const [variantError, setVariantError] = useState<string | null>(null)

  if (loading) return <div className="flex items-center justify-center min-h-screen text-sm" style={{ color: '#5c1a1a60', backgroundColor: '#f5f0eb' }}>Loading...</div>
  if (error || !product) return <div className="flex items-center justify-center min-h-screen text-sm" style={{ color: '#c0392b', backgroundColor: '#f5f0eb' }}>Product not found</div>

  function handleAddToCart() {
    if (!product) return
    if (selectedSize === 'Select') {
      setVariantError('Please select a size')
      return
    }
    if (selectedHardware === 'Select') {
      setVariantError('Please select a hardware finish')
      return
    }
    setVariantError(null)
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const sizeOptions = ['Small', 'Medium']
  const hardwareOptions = ['Brass', 'Blackened Brass', 'Pewter']
  const colorOptions = ['Original']

  function DropdownRow({ label, options, selected, setSelected, name }: {
    label: string
    options: string[]
    selected: string
    setSelected: (v: string) => void
    name: string
  }) {
    const isOpen = openDropdown === name
    return (
      <div style={{ borderBottom: '1px solid #5c1a1a40' }}>
        <button
          className="w-full flex items-center justify-between py-2"
          onClick={() => setOpenDropdown(isOpen ? null : name)}
        >
          <span className="text-sm" style={{ color: '#5c1a1a' }}>{label}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: selected === 'Select' ? '#5c1a1a60' : '#5c1a1a' }}>
              {selected}
            </span>
            <span style={{ color: '#5c1a1a60', fontSize: '10px' }}>{isOpen ? '∧' : '∨'}</span>
          </div>
        </button>
        {isOpen && (
          <div className="pb-2">
            {options.map(option => (
              <button
                key={option}
                className="w-full text-left py-1.5 px-2 text-sm transition-opacity hover:opacity-60"
                style={{ color: '#5c1a1a' }}
                onClick={() => {
                  setSelected(option)
                  setOpenDropdown(null)
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen transition-colors duration-700" style={{ backgroundColor: lightsOn ? '#e8e0d8' : '#f5f0eb' }}>

      {/* Image — top on mobile, right on desktop */}
      <div className="w-full md:w-1/2 md:order-2 relative" style={{ backgroundColor: '#e8e0d8', minHeight: '60vw' }}>

        {/* Light toggle */}
        {product.image_url_2 && (
          <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
            <span className="text-xs tracking-widest uppercase" style={{ color: '#5c1a1a80' }}>Light</span>
            <button
              onClick={() => setLightsOn(!lightsOn)}
              className="relative rounded-full border transition-colors duration-500"
              style={{
                width: '40px', height: '20px',
                backgroundColor: lightsOn ? '#3d1a10' : 'transparent',
                borderColor: lightsOn ? '#3d1a10' : '#5c1a1a60',
              }}
            >
              <span className="absolute rounded-full transition-all duration-500" style={{
                top: '2px', width: '14px', height: '14px',
                left: lightsOn ? '22px' : '2px',
                backgroundColor: lightsOn ? 'white' : '#5c1a1a60',
              }} />
            </button>
          </div>
        )}

        <img
          src={product.image_url}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: lightsOn ? 0 : 1, transition: 'opacity 0.8s ease' }}
        />
        {product.image_url_2 && (
          <img
            src={product.image_url_2}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: lightsOn ? 1 : 0, transition: 'opacity 0.8s ease' }}
          />
        )}
        <div className="md:hidden" style={{ paddingTop: '120%' }} />
        <div className="hidden md:block" style={{ minHeight: '100vh' }} />
      </div>

      {/* Info — bottom on mobile, left on desktop */}
      <div className="w-full md:w-1/2 md:order-1 px-8 md:px-12 pt-8 md:pt-32 pb-16 flex flex-col">

        <p className="text-sm mb-4" style={{ color: '#5c1a1a70' }}>
          {product.description}
        </p>
        <div style={{ height: '1px', backgroundColor: '#5c1a1a40', marginBottom: '32px' }} />

        <h1 className="text-3xl md:text-4xl font-light mb-8 md:mb-16" style={{ color: '#5c1a1a' }}>
          {product.name}
        </h1>

        <div style={{ borderTop: '1px solid #5c1a1a40' }}>
          <DropdownRow label="Size" options={sizeOptions} selected={selectedSize} setSelected={setSelectedSize} name="size" />
          <DropdownRow label="Hardware" options={hardwareOptions} selected={selectedHardware} setSelected={setSelectedHardware} name="hardware" />
          <DropdownRow label="Color" options={colorOptions} selected={selectedColor} setSelected={setSelectedColor} name="color" />
        </div>

        {variantError && (
          <p className="text-xs mt-4 mb-2" style={{ color: '#c0392b' }}>{variantError}</p>
        )}
        <div className="flex items-center mt-2" style={{ border: '1px solid #5c1a1a50' }}>
          <div className="flex items-center gap-3 px-4 py-2" style={{ borderRight: '1px solid #5c1a1a50' }}>
            <span className="text-sm" style={{ color: '#5c1a1a80' }}>Qty</span>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="transition-opacity hover:opacity-50" style={{ color: '#5c1a1a' }}>−</button>
            <span className="text-sm" style={{ color: '#5c1a1a' }}>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="transition-opacity hover:opacity-50" style={{ color: '#5c1a1a' }}>+</button>
          </div>
          <div className="flex items-center justify-between flex-1 px-4 py-2">
            <span className="text-sm" style={{ color: '#5c1a1a' }}>
              From €{(product.price_cents / 100).toLocaleString()}
            </span>
            <button
              onClick={handleAddToCart}
              className="text-sm transition-opacity hover:opacity-50"
              style={{ color: added ? '#5c1a1a60' : '#5c1a1a' }}
            >
              {added ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ProductDetailPage