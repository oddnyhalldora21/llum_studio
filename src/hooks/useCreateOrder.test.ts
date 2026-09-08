import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createOrder } from './useCreateOrder'
import { supabase } from '../lib/supabase'
import type { CartItem } from '../store/cartStore'

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: { getUser: vi.fn() },
    from: vi.fn(),
  },
}))

// Builds a mock query result that works both as `await insert(...)` directly
// (order_items) and as `insert(...).select().single()` (orders)
function makeInsertBuilder(directResult: any, selectSingleResult?: any) {
  const builder: any = Promise.resolve(directResult)
  builder.select = vi.fn(() => ({
    single: vi.fn().mockResolvedValue(selectSingleResult),
  }))
  return builder
}

const mockItem: CartItem = {
  product: {
    id: 'prod-1',
    name: 'Test Lamp',
    slug: 'test-lamp',
    genre: 'Pendant',
    price_cents: 50000,
    currency: 'EUR',
    description: 'A test lamp',
    image_url: 'https://example.com/a.jpg',
    image_url_2: null,
    collection: null,
  },
  quantity: 2,
  size: 'Medium',
  hardware: 'Brass',
  color: 'Original',
}

const baseInput = {
  email: 'jane@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  address: '123 Main St',
  city: 'Reykjavik',
  postal: '101',
  items: [mockItem],
  subtotalCents: 100000,
}

describe('createOrder', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an order and its order_items, returning an order number', async () => {
    ;(supabase.auth.getUser as any).mockResolvedValue({ data: { user: { id: 'user-1' } } })
    const orderRow = { id: 'abcdef12-3456-7890-abcd-ef1234567890' }

    ;(supabase.from as any).mockImplementation((table: string) => {
      if (table === 'orders') {
        return { insert: vi.fn(() => makeInsertBuilder(undefined, { data: orderRow, error: null })) }
      }
      if (table === 'order_items') {
        return { insert: vi.fn(() => makeInsertBuilder({ error: null })) }
      }
      throw new Error(`Unexpected table: ${table}`)
    })

    const result = await createOrder(baseInput)

    expect(result.orderId).toBe(orderRow.id)
    expect(result.orderNumber).toBe('ABCDEF12')
  })

  it('sends user_id as null for a guest checkout', async () => {
    ;(supabase.auth.getUser as any).mockResolvedValue({ data: { user: null } })
    const orderRow = { id: 'guest123-0000-0000-0000-000000000000' }
    let capturedOrderInsert: any = null

    ;(supabase.from as any).mockImplementation((table: string) => {
      if (table === 'orders') {
        return {
          insert: vi.fn((payload: any) => {
            capturedOrderInsert = payload
            return makeInsertBuilder(undefined, { data: orderRow, error: null })
          }),
        }
      }
      if (table === 'order_items') {
        return { insert: vi.fn(() => makeInsertBuilder({ error: null })) }
      }
      throw new Error(`Unexpected table: ${table}`)
    })

    await createOrder(baseInput)

    expect(capturedOrderInsert.user_id).toBeNull()
  })

  it('sends the signed-in user id when logged in', async () => {
    ;(supabase.auth.getUser as any).mockResolvedValue({ data: { user: { id: 'user-42' } } })
    const orderRow = { id: 'order123-0000-0000-0000-000000000000' }
    let capturedOrderInsert: any = null

    ;(supabase.from as any).mockImplementation((table: string) => {
      if (table === 'orders') {
        return {
          insert: vi.fn((payload: any) => {
            capturedOrderInsert = payload
            return makeInsertBuilder(undefined, { data: orderRow, error: null })
          }),
        }
      }
      if (table === 'order_items') {
        return { insert: vi.fn(() => makeInsertBuilder({ error: null })) }
      }
      throw new Error(`Unexpected table: ${table}`)
    })

    await createOrder(baseInput)

    expect(capturedOrderInsert.user_id).toBe('user-42')
  })

  it('throws if creating the order fails', async () => {
    ;(supabase.auth.getUser as any).mockResolvedValue({ data: { user: null } })
    ;(supabase.from as any).mockImplementation((table: string) => {
      if (table === 'orders') {
        return { insert: vi.fn(() => makeInsertBuilder(undefined, { data: null, error: { message: 'insert failed' } })) }
      }
      throw new Error(`Unexpected table: ${table}`)
    })

    await expect(createOrder(baseInput)).rejects.toThrow('insert failed')
  })

  it('throws if creating order_items fails', async () => {
    ;(supabase.auth.getUser as any).mockResolvedValue({ data: { user: null } })
    const orderRow = { id: 'order999-0000-0000-0000-000000000000' }

    ;(supabase.from as any).mockImplementation((table: string) => {
      if (table === 'orders') {
        return { insert: vi.fn(() => makeInsertBuilder(undefined, { data: orderRow, error: null })) }
      }
      if (table === 'order_items') {
        return { insert: vi.fn(() => makeInsertBuilder({ error: { message: 'items insert failed' } })) }
      }
      throw new Error(`Unexpected table: ${table}`)
    })

    await expect(createOrder(baseInput)).rejects.toThrow('items insert failed')
  })
})