import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import SignInPage from './pages/SignInPage'
import Footer from './components/layout/Footer'

function App() {
  const [lightsOn, setLightsOn] = useState(false)

  return (
    <BrowserRouter>
      <Navbar lightsOn={lightsOn} />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage lightsOn={lightsOn} setLightsOn={setLightsOn} />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/sign-in" element={<SignInPage/>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App