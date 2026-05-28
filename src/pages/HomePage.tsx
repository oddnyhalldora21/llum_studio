function HomePage() {
    return (
      <div>
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1800"            alt="Llum Studio"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-12">
            <h1 className="font-serif text-6xl text-white mb-4">Llum Studio</h1>
            <p className="text-white/80 text-lg max-w-sm">
              Handcrafted lighting for contemporary spaces.
            </p>
          </div>
        </section>
      </div>
    )
  }
  
  export default HomePage