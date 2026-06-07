import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../hooks/useProducts'

export type CartItem = {
  product: Product
  quantity: number
  size: string
  hardware: string
  color: string
}

type CartStore = {
  items: CartItem[]
  addItem: (product: Product, size: string, hardware: string, color: string) => void
  removeItem: (productId: string, size: string, hardware: string) => void
  updateQuantity: (productId: string, size: string, hardware: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, hardware, color) => {
        const existing = get().items.find(i =>
          i.product.id === product.id &&
          i.size === size &&
          i.hardware === hardware
        )
        if (existing) {
          set({ items: get().items.map(i =>
            i.product.id === product.id && i.size === size && i.hardware === hardware
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )})
        } else {
          set({ items: [...get().items, { product, quantity: 1, size, hardware, color }] })
        }
      },

      removeItem: (productId, size, hardware) => {
        set({ items: get().items.filter(i =>
          !(i.product.id === productId && i.size === size && i.hardware === hardware)
        )})
      },

      updateQuantity: (productId, size, hardware, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, hardware)
        } else {
          set({ items: get().items.map(i =>
            i.product.id === productId && i.size === size && i.hardware === hardware
              ? { ...i, quantity }
              : i
          )})
        }
      },

      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price_cents * i.quantity, 0),
    }),
    { name: 'llum-cart' }
  )
)