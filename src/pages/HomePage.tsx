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
<section className="relative h-screen w-full overflow-hidden">
  <img
    src="https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1800"
    alt="Llum Studio"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/20" />
  <div className="absolute inset-0 flex items-center justify-between px-12">
    <h1 className="text-6xl font-medium tracking-widest uppercase text-white w-1/2">
      Llum Studio
    </h1>
    <p className="text-white/80 text-lg font-light max-w-xs text-right">
      Handcrafted lighting for contemporary spaces.
    </p>
  </div>
</section>
  
        {/* Collections Section */}
        <section className="py-24 px-8">
          <h2 className="text-3xl font-medium tracking-wide text-stone-900 mb-12">Collections</h2>
          <div className="grid grid-cols-4 gap-4">
            {collections.map((collection) => (
              <div key={collection.name} className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-2xl font-light tracking-wide text-white">{collection.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
  
  export default HomePage