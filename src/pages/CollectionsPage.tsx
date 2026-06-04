import { useRef } from 'react'
import { Link } from 'react-router-dom'

const collections = [
  {
    name: 'Lido',
    slug: 'lido',
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Saga',
    slug: 'saga',
    image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Flora',
    slug: 'flora',
    image: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Core',
    slug: 'core',
    image: 'https://images.pexels.com/photos/6489103/pexels-photo-6489103.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Dune',
    slug: 'dune',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Strata',
    slug: 'strata',
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Curio',
    slug: 'curio',
    image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Terra',
    slug: 'terra',
    image: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=800',
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
                <h2 className="text-white text-3xl font-light tracking-widest">{col.name}</h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <p className="text-sm text-white/60 max-w-md">
            Our lights are organized into singular lighting collections, each deriving from a conceptual foundation and realized through distinct forms, materials, and craft-based engineering.
          </p>
          <div className="flex gap-4 items-center">
            <Link to="/collections/detail" className="text-sm text-white/60 hover:text-white transition-colors tracking-wide mr-4">
              → Explore All
            </Link>
            <button onClick={() => scroll('left')} className="text-white text-xl opacity-60 hover:opacity-100 transition-opacity">←</button>
            <button onClick={() => scroll('right')} className="text-white text-xl opacity-60 hover:opacity-100 transition-opacity">→</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CollectionsCarouselPage