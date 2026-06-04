import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { collectionsData } from '../data/collectionsData'

function CollectionDetailPage() {
  const { slug } = useParams()
  const [activeSlug, setActiveSlug] = useState(collectionsData[0]?.slug ?? '')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    if (slug) {
      const el = sectionRefs.current[slug]
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
      setActiveSlug(slug)
    }
  }, [slug])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const setup = () => {
      collectionsData.forEach(collection => {
        const el = sectionRefs.current[collection.slug]
        if (!el) return
        const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveSlug(collection.slug) },
          { threshold: 0.1, rootMargin: '-20% 0px -60% 0px' }
        )
        observer.observe(el)
        observers.push(observer)
      })
    }
    const timer = setTimeout(setup, 200)
    return () => { clearTimeout(timer); observers.forEach(o => o.disconnect()) }
  }, [])

  const scrollTo = (s: string) => {
    const el = sectionRefs.current[s]
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c1810' }}>
      <div className="flex">

        {/* Sticky sidebar */}
        <div className="w-48 flex-shrink-0">
          <div className="sticky top-24 px-12 py-16">
            <ul className="space-y-3">
              {collectionsData.map(c => (
                <li key={c.slug}>
                  <button
                    onClick={() => scrollTo(c.slug)}
                    className="text-sm text-left transition-colors w-full"
                    style={{ color: '#e8d5b7' }}
                  >
                    {c.slug === activeSlug ? '● ' : ''}{c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {collectionsData.map((collection) => (
            <section
              key={collection.slug}
              id={collection.slug}
              ref={el => { sectionRefs.current[collection.slug] = el }}
            >

              {/* Hero */}
              <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
                <img
                  src={collection.heroImage}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-end px-16 pb-12">
<h2 className="font-light tracking-widest" style={{ fontSize: '5rem', color: '#e8d5b7' }}>                    {collection.name}
                  </h2>
                </div>
              </div>

              {/* Tagline */}
              {collection.tagline && (
                <div className="px-16 py-12">
                  <p className="text-base leading-relaxed max-w-xl" style={{ color: '#e8d5b7' }}>
                    {collection.tagline}
                  </p>
                </div>
              )}

              {/* Editorial photo layout — if photos exist */}
              {collection.photos && collection.photos.length > 0 && (
                <>
                  {/* Row 1: big left + two stacked right + text */}
                  <div className="flex gap-4 px-16 py-12">
                    <div className="flex-1 overflow-hidden" style={{ aspectRatio: '2/3' }}>
                      <img src={collection.photos[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-80 flex flex-col gap-4">
                      {collection.photos[1] && (
                        <div className="flex-1 overflow-hidden">
                          <img src={collection.photos[1]} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      {collection.photos[2] && (
                        <div className="flex-1 overflow-hidden">
                          <img src={collection.photos[2]} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="w-72 flex items-center">
                      {collection.sections[0] && (
                        <p className="text-sm leading-relaxed" style={{ color: '#e8d5b7' }}>
                          {collection.sections[0].text}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: text left + two photos right */}
                  {collection.photos.length > 3 && (
                    <div className="flex gap-4 px-16 pb-12">
                      <div className="w-72 flex items-center">
                        {collection.sections[1] && (
                          <p className="text-sm leading-relaxed" style={{ color: '#e8d5b7' }}>
                            {collection.sections[1].text}
                          </p>
                        )}
                      </div>
                      <div className="flex-1 flex gap-4">
                        {collection.photos[3] && (
                          <div className="flex-1 overflow-hidden" style={{ aspectRatio: '3/4' }}>
                            <img src={collection.photos[3]} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        {collection.photos[4] && (
                          <div className="flex-1 overflow-hidden" style={{ aspectRatio: '3/4' }}>
                            <img src={collection.photos[4]} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Fallback: alternating layout for collections without photos */}
              {(!collection.photos || collection.photos.length === 0) && collection.sections.map((section, i) => (
                <div
                  key={i}
                  className={`flex ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-1/2 overflow-hidden" style={{ minHeight: '480px' }}>
                    <img src={section.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-1/2 flex items-center px-16 py-16">
                    <p className="text-base leading-relaxed max-w-md" style={{ color: '#e8d5b7' }}>
                      {section.text}
                    </p>
                  </div>
                </div>
              ))}

              {/* Shop link */}
              <div className="px-16 py-8">
                <Link
                  to={`/shop?collection=${collection.slug}`}
                  className="text-sm tracking-wide transition-opacity hover:opacity-60"
                  style={{ color: '#e8d5b7' }}
                >
                  Shop {collection.name} →
                </Link>
              </div>

            </section>
          ))}
        </div>

      </div>
    </div>
  )
}

export default CollectionDetailPage