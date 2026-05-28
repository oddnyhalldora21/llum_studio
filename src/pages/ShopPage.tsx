const products = [
    { id: 1, name: "Cosmos Chandelier", category: "Chandelier", price: 8000, image: "https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 2, name: "Orb Pendant", category: "Pendant", price: 2900, image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 3, name: "Glass Sconce", category: "Sconce", price: 2750, image: "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 4, name: "Arc Floor Lamp", category: "Floor Lamp", price: 3200, image: "https://images.pexels.com/photos/6489103/pexels-photo-6489103.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 5, name: "Linen Table Lamp", category: "Table Lamp", price: 1200, image: "https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 6, name: "Brass Pendant", category: "Pendant", price: 1800, image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800" },
  ]
  
  const categories = ["All Products", "Chandelier", "Pendant", "Sconce", "Table Lamp", "Floor Lamp"]
  
  function ShopPage() {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 px-8 py-12 border-r border-stone-200">
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat}>
                <button className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>
  
        {/* Product Grid */}
        <main className="flex-1 px-8 py-12">
          <h1 className="font-serif text-3xl text-stone-900 mb-8">
            All Products <span className="text-lg text-stone-400 font-sans">{products.length}</span>
          </h1>
          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-square overflow-hidden bg-stone-100 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-sm text-stone-900">{product.name}</p>
                <p className="text-sm text-stone-500">From ${product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }
  
  export default ShopPage