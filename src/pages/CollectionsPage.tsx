import { useRef } from 'react'
import { Link } from 'react-router-dom'

const collections = [
  {
    name: '',
    slug: 'lido',
    image: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionpage-photos2/lido-cl.png',
  },
  {
    name: '',
    slug: 'saga',
    image: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionpage-photos2/saga-cl.png',
  },
  {
    name: '',
    slug: 'flora',
    image: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionpage-photos2/flora-cl.png',
  },
  {
    name: '',
    slug: 'core',
    image: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionpage-photos2/core-cl.png',
  },
  {
    name: '',
    slug: 'dune',
    image: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionpage-photos2/dune-cl.png',
  },
  {
    name: '',
    slug: 'strata',
    image: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionpage-photos2/strata-cl.png',
  },
  {
    name: '',
    slug: 'terra',
    image: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/terra-collection-section.png',
  },
]

function CollectionsCarouselPage() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.offsetWidth / 4
    scrollRef.current.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c1810' }}>
      <div className="px-12 pt-38 pb-16">

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto mb-8"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
        >
          {collections.map((col) => (
            <Link
              key={col.slug}
              to={`/collections/detail#${col.slug}`}
              className="relative overflow-hidden group cursor-pointer flex-shrink-0"
              style={{ width: 'calc(25% - 12px)', scrollSnapAlign: 'start', aspectRatio: '3/4' }}
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-[#f5f0eb] text-3xl font-light tracking-widest">{col.name}</h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <p className="text-sm max-w-md" style={{ color: '#f5f0eb80' }}>
            Our lights are organized into singular lighting collections, each deriving from a conceptual foundation and realized through distinct forms, materials, and craft-based engineering.
          </p>
          <div className="flex gap-4 items-center">
            <Link to="/collections/detail" className="text-sm hover:opacity-100 transition-opacity tracking-wide mr-4" style={{ color: '#f5f0eb60' }}>
              → Explore All
            </Link>
            <button onClick={() => scroll('left')} className="text-xl opacity-60 hover:opacity-100 transition-opacity" style={{ color: '#f5f0eb' }}>←</button>
            <button onClick={() => scroll('right')} className="text-xl opacity-60 hover:opacity-100 transition-opacity" style={{ color: '#f5f0eb' }}>→</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CollectionsCarouselPage