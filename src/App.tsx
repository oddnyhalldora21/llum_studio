import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<div>Cart</div>} />
          <Route path="/checkout" element={<div>Checkout</div>} />
          <Route path="/sign-in" element={<div>Sign In</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App