import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../store/cartStore'

describe('Checkout Logic', () => {

  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  const mockProduct = {
    id: 'test-1',
    name: 'Test Lamp',
    slug: 'test-lamp',
    genre: 'Pendant',
    price_cents: 100000,
    currency: 'USD',
    description: 'A test lamp',
    image_url: 'https://example.com/image.jpg',
    image_url_2: null,
    collection: null, // Added the missing property
  }

  it('cart is empty after placing order', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().clearCart()
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('calculates correct total for multiple items', () => {
    const mockProduct2 = { ...mockProduct, id: 'test-2', price_cents: 200000 }
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct2)
    const total = useCartStore.getState().totalPrice()
    expect(total).toBe(300000)
  })

  it('total is 0 for empty cart', () => {
    const total = useCartStore.getState().totalPrice()
    expect(total).toBe(0)
  })

  it('total items is 0 after checkout', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().clearCart()
    const total = useCartStore.getState().totalItems()
    expect(total).toBe(0)
  })

})