import { useRef } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.webp'

const catalogCollections = [
  {
    name: '',
    slug: 'lido',
    image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/lido-collection-section.png",
  },
  {
    name: '',
    slug: 'saga',
    image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/saga-collection-section.png",
  },
  {
    name: '',
    slug: 'flora',
    image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/flora-collection-section.png",
  },
  {
    name: '',
    slug: 'core',
    image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/core-collection-section.png",
  },
  {
    name: '',
    slug: 'strata',
    image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/strata-collection-section.png",
  },
  {
    name: '',
    slug: 'terra',
    image: "https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/homepage_coll_section/terra-collection-section.png",
  },
]

function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ backgroundColor: '#f5f0eb' }}>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden -mt-14">
        <img
          src={heroImage}
          alt="Llum Studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
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

        {/* Two lines with break — same as shop page */}
        <div className="absolute left-0 right-0 flex gap-4 px-8" style={{ marginTop: '-4rem' }}>
          <div className="w-56 shrink-0 border-t" style={{ borderColor: '#2c1810' }} />
          <div className="flex-1 border-t" style={{ borderColor: '#2c1810' }} />
        </div>

        {/* Left column */}
        <div className="w-56 shrink-0 px-8 flex flex-col justify-between py-2">
          <div>
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: '#2c181080' }}>Our Catalog</p>
            <p className="text-sm leading-relaxed" style={{ color: '#2c1810' }}>
              Since our founding in 2018, our catalog has grown to include eight collections and over 27 products — suitable for both residential and commercial projects.
            </p>
          </div>
          <div className="mt-12">
            <Link
              to="/shop"
              className="text-sm tracking-wide hover:opacity-60 transition-opacity"
              style={{ color: '#2c1810' }}
            >
              Shop All Lights
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px shrink-0" style={{ backgroundColor: '#2c181020' }} />

        {/* Right: scrollable cards + arrows */}
        <div className="flex-1 px-10 overflow-hidden">

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {catalogCollections.map((col) => (
              <Link
                key={col.name}
                to={`/shop?collection=${col.slug}`}
                className="shrink-0 w-72 group cursor-pointer"
              >
                <div className="overflow-hidden mb-4" style={{ aspectRatio: '4/5' }}>
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-light" style={{ color: '#2c1810' }}>{col.name}</h3>
              </Link>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex justify-end gap-4 mt-6">
            <span
              className="cursor-pointer hover:opacity-60 transition-opacity text-lg"
              style={{ color: '#2c1810' }}
              onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
            >←</span>
            <span
              className="cursor-pointer hover:opacity-60 transition-opacity text-lg"
              style={{ color: '#2c1810' }}
              onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
            >→</span>
          </div>

        </div>

      </section>

    </div>
  )
}

export default HomePage