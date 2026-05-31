import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from './cartStore'

describe('Cart Store', () => {

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
  }

  it('starts with an empty cart', () => {
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('adds a product to the cart', () => {
    useCartStore.getState().addItem(mockProduct)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].product.name).toBe('Test Lamp')
    expect(items[0].quantity).toBe(1)
  })

  it('increases quantity when adding same product twice', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
  })

  it('removes a product from the cart', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().removeItem('test-1')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('updates quantity of a product', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().updateQuantity('test-1', 5)
    const { items } = useCartStore.getState()
    expect(items[0].quantity).toBe(5)
  })

  it('removes product when quantity is set to 0', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().updateQuantity('test-1', 0)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('clears the cart', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().clearCart()
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('calculates total items correctly', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct)
    const total = useCartStore.getState().totalItems()
    expect(total).toBe(2)
  })

  it('calculates total price correctly', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct)
    const total = useCartStore.getState().totalPrice()
    expect(total).toBe(200000)
  })

})