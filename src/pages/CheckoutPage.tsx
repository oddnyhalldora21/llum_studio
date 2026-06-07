import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, clearCart, removeItem } = useCartStore()
  const { user } = useAuthStore()
  const total = items.reduce((sum, item) => sum + item.product.price_cents * item.quantity, 0)

  const [email, setEmail] = useState(user?.email || '')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const newErrors: Record<string, string> = {}

    if (!email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email'

    if (!firstName) newErrors.firstName = 'First name is required'
    if (!lastName) newErrors.lastName = 'Last name is required'
    if (!address) newErrors.address = 'Address is required'
    if (!city) newErrors.city = 'City is required'
    if (!postal) newErrors.postal = 'Postal code is required'

    if (!cardNumber) newErrors.cardNumber = 'Card number is required'
    else if (cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Enter a valid 16-digit card number'

    if (!expiry) newErrors.expiry = 'Expiry is required'
    else if (!/^\d{2}\/\d{2}$/.test(expiry)) newErrors.expiry = 'Use MM/YY format'

    if (!cvc) newErrors.cvc = 'CVC is required'
    else if (cvc.length < 3) newErrors.cvc = 'Enter a valid CVC'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handlePlaceOrder() {
    if (!validate()) return
    clearCart()
    navigate('/order-confirmation')
  }

  const inputClass = "w-full px-3 py-3 text-sm outline-none bg-transparent border transition-colors"

  function inputStyle(field: string) {
    return { borderColor: errors[field] ? '#c0392b' : '#5c1a1a30', color: '#5c1a1a' }
  }

  function ErrorMsg({ field }: { field: string }) {
    return errors[field] ? (
      <p className="text-xs mt-1" style={{ color: '#c0392b' }}>{errors[field]}</p>
    ) : null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0eb' }}>

      <div className="px-8 pt-24">
        <div className="border-t" style={{ borderColor: '#5c1a1a' }} />
      </div>

      <div className="flex flex-col md:flex-row px-8 gap-8 py-12">

        {/* Left - Form */}
        <div className="flex-1">
          <h1 className="text-xs tracking-widest uppercase mb-12" style={{ color: '#5c1a1a' }}>
            Checkout
          </h1>

          {/* Contact */}
          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#5c1a1a80' }}>Contact</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass}
              style={inputStyle('email')}
            />
            <ErrorMsg field="email" />
          </div>

          {/* Shipping */}
          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#5c1a1a80' }}>Shipping Address</p>
            <div className="flex flex-col md:flex-row gap-3 mb-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className={inputClass}
                  style={inputStyle('firstName')}
                />
                <ErrorMsg field="firstName" />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className={inputClass}
                  style={inputStyle('lastName')}
                />
                <ErrorMsg field="lastName" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className={`${inputClass} mb-3`}
              style={inputStyle('address')}
            />
            <ErrorMsg field="address" />
            <div className="flex flex-col md:flex-row gap-3 mt-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className={inputClass}
                  style={inputStyle('city')}
                />
                <ErrorMsg field="city" />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Postal code"
                  value={postal}
                  onChange={e => setPostal(e.target.value)}
                  className={inputClass}
                  style={inputStyle('postal')}
                />
                <ErrorMsg field="postal" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#5c1a1a80' }}>Payment</p>
            <p className="text-xs mb-4" style={{ color: '#5c1a1a60' }}>This is a demo store — no real payments are processed.</p>
            <input
              type="text"
              placeholder="Card number"
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
              maxLength={19}
              className={`${inputClass} mb-3`}
              style={inputStyle('cardNumber')}
            />
            <ErrorMsg field="cardNumber" />
            <div className="flex gap-3 mt-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="MM / YY"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  maxLength={5}
                  className={inputClass}
                  style={inputStyle('expiry')}
                />
                <ErrorMsg field="expiry" />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={e => setCvc(e.target.value)}
                  maxLength={4}
                  className={inputClass}
                  style={inputStyle('cvc')}
                />
                <ErrorMsg field="cvc" />
              </div>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ backgroundColor: '#3d1a10', color: '#f5f0eb' }}
          >
            Place Order
          </button>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full md:w-80 shrink-0 md:pt-20">
        {items.map((item, index) => (
            <div key={`${item.product.id}-${item.size}-${item.hardware}-${index}`} className="py-2">
              <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />
              <div className="flex items-center justify-between py-2 gap-2">
                <div className="flex-1">
                  <p className="text-sm" style={{ color: '#5c1a1a' }}>{item.product.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#5c1a1a60' }}>{item.size} · {item.hardware}</p>
                </div>
                <p className="text-sm shrink-0" style={{ color: '#5c1a1a80' }}>Qty: {item.quantity}</p>
                <p className="text-sm shrink-0 ml-2" style={{ color: '#5c1a1a' }}>
                  €{(item.product.price_cents * item.quantity / 100).toLocaleString()}
                </p>
              </div>
              <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />
              <div className="py-3 flex gap-4 items-start">
                <div className="overflow-hidden shrink-0" style={{ width: '80px', height: '96px', backgroundColor: '#e8e0d8' }}>
                  <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => removeItem(item.product.id, item.size, item.hardware)}
                  className="text-xs transition-opacity hover:opacity-60 pt-1"
                  style={{ color: '#5c1a1a60' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />
          <div className="flex justify-between py-3">
            <span className="text-sm" style={{ color: '#5c1a1a80' }}>Subtotal</span>
            <span className="text-sm" style={{ color: '#5c1a1a' }}>€{(total / 100).toLocaleString()}</span>
          </div>
          <div className="flex justify-between pb-3">
            <span className="text-sm" style={{ color: '#5c1a1a80' }}>Shipping</span>
            <span className="text-sm" style={{ color: '#5c1a1a60' }}>Free</span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#5c1a1a' }} />
          <div className="flex justify-between py-3">
            <span className="text-sm font-medium" style={{ color: '#5c1a1a' }}>Total</span>
            <span className="text-sm font-medium" style={{ color: '#5c1a1a' }}>€{(total / 100).toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CheckoutPage