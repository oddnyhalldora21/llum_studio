import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.webp'
import { supabase } from '../lib/supabase'

type Product = {
  id: number
  name: string
  image_url: string
  slug: string
}

const catalogCollections = [
  { name: '', slug: 'lido', image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/lido-collection-section.png" },
  { name: '', slug: 'saga', image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/saga-collection-section.png" },
  { name: '', slug: 'flora', image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/flora-collection-section.png" },
  { name: '', slug: 'core', image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/core-collection-section.png" },
  { name: '', slug: 'strata', image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/strata-collection-section.png" },
  { name: '', slug: 'terra', image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/terra-collection-section.png" },
]

function HomePage() {
  const catalogScrollRef = useRef<HTMLDivElement>(null)
  const featuredScrollRef = useRef<HTMLDivElement>(null)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, image_url, slug')
        .eq('shop_id', '6b98e9ae-4667-4100-8203-4fbd00a36157')
        .limit(10)
        .order('created_at', { ascending: false })
      if (!error && data) {
        const shuffled = [...data].sort(() => Math.random() - 0.5)
        setFeaturedProducts(shuffled)
      }
    }
    fetchFeatured()
  }, [])

  function handleSubscribe() {
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <div style={{ backgroundColor: '#f5f0eb' }}>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden -mt-14">
        <img src={heroImage} alt="Llum Studio" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-between px-8 md:px-12">
          <h1 className="text-3xl md:text-6xl font-medium tracking-widest uppercase text-[#f5f0eb] w-1/2">
            Llum Studio
          </h1>
          <p className="hidden md:block text-[#f5f0eb]/80 text-lg font-light max-w-xs text-right">
            Handcrafted lighting for contemporary spaces.
          </p>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-16 flex">

        <div className="hidden md:flex w-56 shrink-0 px-8 flex-col justify-between py-2">
          <div>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: '#5c1a1a' }}>Our Catalog</p>            <p className="text-sm leading-relaxed" style={{ color: '#5c1a1a' }}>
              Since our founding in 2018, our catalog has grown to include eight collections and over 27 products — suitable for both residential and commercial projects.
            </p>
          </div>
          <div className="mt-12">
            <Link to="/shop" className="text-sm tracking-wide hover:opacity-60 transition-opacity" style={{ color: '#5c1a1a' }}>
              Shop All Lights
            </Link>
          </div>
        </div>

        <div className="flex-1 px-4 md:px-10 overflow-hidden">
          <p className="md:hidden text-xs tracking-widest uppercase mb-4 pt-4" style={{ color: '#5c1a1a' }}>Our Catalog</p>
          <div ref={catalogScrollRef} className="flex gap-4 md:gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {catalogCollections.map((col) => (
              <Link key={col.slug} to={`/shop?collection=${col.slug}`} className="shrink-0 w-48 md:w-72 group cursor-pointer">
                <div className="overflow-hidden mb-4" style={{ aspectRatio: '4/5' }}>
                  <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="text-lg md:text-2xl font-light" style={{ color: '#5c1a1a' }}>{col.name}</h3>
              </Link>
            ))}
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <span className="cursor-pointer hover:opacity-60 transition-opacity text-lg" style={{ color: '#5c1a1a' }} onClick={() => catalogScrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}>←</span>
            <span className="cursor-pointer hover:opacity-60 transition-opacity text-lg" style={{ color: '#5c1a1a' }} onClick={() => catalogScrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}>→</span>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 flex">
        <div className="absolute left-0 right-0 flex gap-4 px-8" style={{ marginTop: '-4rem' }}>
          <div className="w-56 shrink-0 border-t" style={{ borderColor: '#5c1a1a' }} />
          <div className="flex-1 border-t" style={{ borderColor: '#5c1a1a' }} />
        </div>

        <div className="hidden md:block w-56 shrink-0 px-8 py-2">
          <p className="text-xs tracking-widest uppercase" style={{ color: '#5c1a1a' }}>Newsletter</p>
        </div>

        <div className="flex-1 px-4 md:px-10 flex items-center justify-center py-16 md:py-18">
          <div className="max-w-xl w-full">
            <p className="md:hidden text-xs tracking-widest uppercase mb-4" style={{ color: '#5c1a1a' }}>Newsletter</p>
            <p className="text-xl md:text-2xl font-light mb-8 leading-snug" style={{ color: '#5c1a1a' }}>
              Subscribe to our newsletter to stay in the know and up to date on the latest news and happenings.
            </p>
            <div className="flex" style={{ border: '1px solid #5c1a1a' }}>
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
                style={{ color: '#5c1a1a' }}
              />
              <button onClick={handleSubscribe} className="px-4 md:px-6 py-3 text-sm tracking-wide transition-opacity hover:opacity-60" style={{ color: '#5c1a1a', borderLeft: '1px solid #5c1a1a' }}>
                {subscribed ? 'Thank you!' : 'Subscribe'}
              </button>
            </div>
            {subscribed && (
              <p className="text-xs mt-3 font-medium" style={{ color: '#5c1a1a' }}>
                Thanks for signing up!
              </p>
            )}
            {!subscribed && (
              <p className="text-xs mt-3" style={{ color: '#5c1a1a' }}>
                By signing up you are agreeing to our{' '}
                <span>Privacy Policy</span>
              </p>
            )}
          </div>
        </div>
      </section>

    
        {/* Editorial Split Section */}
        <section className="overflow-hidden px-8 py-8 flex flex-col md:flex-row md:h-[80vh] gap-4">
        <div className="relative w-full md:w-1/2 overflow-hidden group" style={{ minHeight: '250px', height: '50vw' }}>            <img src="https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/lido-collection-detail/Screenshot%202026-06-04%20at%2016.34.10.png" alt="Lido Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#f5f0eb90' }}>Lido Collection</p>
              <Link to="/collections/lido" className="text-lg md:text-2xl font-light hover:opacity-70 transition-opacity" style={{ color: '#f5f0eb' }}>
                Warm Light for Warm Spaces →
              </Link>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 overflow-hidden group" style={{ minHeight: '250px', height: '50vw' }}>            <img src="https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/saga-collection-detail/Screenshot%202026-06-04%20at%2016.38.05.png" alt="Saga Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#f5f0eb90' }}>Saga Collection</p>
              <Link to="/collections/saga" className="text-lg md:text-2xl font-light hover:opacity-70 transition-opacity" style={{ color: '#f5f0eb' }}>
                Sculptural Forms, Lasting Light →
              </Link>
            </div>
          </div>
        </section>

      {/* Featured Products Section */}
      <section className="py-16 flex">

        <div className="hidden md:flex w-56 shrink-0 px-8 flex-col justify-between py-2">
          <div>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: '#5c1a1a' }}>Featured Products</p>            <p className="text-sm leading-relaxed" style={{ color: '#5c1a1a' }}>
              A selection of our most loved pieces — each one crafted to bring warmth and character to any space.
            </p>
          </div>
          <div className="mt-12">
            <Link to="/shop" className="text-sm tracking-wide hover:opacity-60 transition-opacity" style={{ color: '#5c1a1a' }}>
              View All Products
            </Link>
          </div>
        </div>

        <div className="flex-1 px-4 md:px-10 overflow-hidden">
          <p className="md:hidden text-xs tracking-widest uppercase mb-4 pt-4" style={{ color: '#5c1a1a' }}>Featured Products</p>
          <div ref={featuredScrollRef} className="flex gap-4 md:gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.slug}`} className="shrink-0 w-48 md:w-72 group cursor-pointer">
                <div className="overflow-hidden mb-4" style={{ aspectRatio: '4/5' }}>
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="text-xs md:text-sm tracking-wide" style={{ color: '#5c1a1a' }}>{product.name}</h3>
              </Link>
            ))}
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <span className="cursor-pointer hover:opacity-60 transition-opacity text-lg" style={{ color: '#5c1a1a' }} onClick={() => featuredScrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}>←</span>
            <span className="cursor-pointer hover:opacity-60 transition-opacity text-lg" style={{ color: '#5c1a1a' }} onClick={() => featuredScrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}>→</span>
          </div>
        </div>
      </section>

    </div>
  )
}

export default HomePage