import heroImage from '../assets/hero.webp'

const collections = [
  {
    name: "Pendant",
    image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Sconce",
    image: "https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Table",
    image: "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Floor",
    image: "https://images.pexels.com/photos/6489103/pexels-photo-6489103.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
]

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden -mt-14">
        <img
          src={heroImage}
          alt="Llum Studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-between px-12">
        <h1 className="text-6xl font-medium tracking-widest uppercase text-[#f5f0eb] w-1/2">            Llum Studio
          </h1>
          <p className="text-[#f5f0eb]/80 text-lg font-light max-w-xs text-right">            Handcrafted lighting for contemporary spaces.
          </p>
        </div>
      </section>

      {/* Collections Section */}
<section className="py-16 flex gap-8 px-8">
  
  {/* Left label column */}
  <div className="w-40 shrink-0">
    <p className="text-xs tracking-widest uppercase text-stone-400">Our Catalog</p>
  </div>

  {/* Right scrollable content */}
  <div className="flex-1 overflow-hidden">
    <p className="text-sm text-stone-500 max-w-md mb-10">
      Handcrafted lighting designed for contemporary residential and commercial spaces.
    </p>
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
      {collections.map((collection) => (
        <div key={collection.name} className="shrink-0 w-64 cursor-pointer group">
          <div className="aspect-[3/4] overflow-hidden mb-3">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="text-sm font-medium text-stone-900">{collection.name}</h3>
          <p className="text-xs text-stone-400 mt-1">Shop</p>
        </div>
      ))}
    </div>
  </div>

</section>
    </div>
  )
}

export default HomePage