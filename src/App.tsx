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
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import CollectionsPage from './pages/CollectionsPage'
import CollectionDetailPage from './pages/CollectionDetailPage'
import CartDrawer from './components/CartDrawer'
import ScrollToTop from './components/ScrollToTop'
import AboutPage from './pages/AboutPage'


function App() {
  const [lightsOn, setLightsOn] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <BrowserRouter>
      <Navbar lightsOn={lightsOn} onCartOpen={() => setCartOpen(true)} />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage lightsOn={lightsOn} setLightsOn={setLightsOn} />} />
          <Route path="/products/:id" element={<ProductDetailPage lightsOn={lightsOn} setLightsOn={setLightsOn} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/detail" element={<CollectionDetailPage />} />
          <Route path="/collections/detail/:slug" element={<CollectionDetailPage />} />
          <Route path="/about" element={<AboutPage />} />

        </Routes>
      </main>
      <Footer lightsOn={lightsOn} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ScrollToTop />
    </BrowserRouter>
  )
}

export default App