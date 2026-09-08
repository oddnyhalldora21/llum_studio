import { useMutation } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { CartItem } from '../store/cartStore'

export type CreateOrderInput = {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  postal: string
  items: CartItem[]
  subtotalCents: number
}

export type CreateOrderResult = {
  orderId: string
  orderNumber: string
}

export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const { data: { user } } = await supabase.auth.getUser()

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user?.id ?? null,
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
      address: input.address,
      city: input.city,
      postal: input.postal,
      subtotal_cents: input.subtotalCents,
      shipping_cents: 0,
      total_cents: input.subtotalCents,
      status: 'confirmed',
    })
    .select()
    .single()

  if (orderError) throw new Error(orderError.message)

  const orderItemsPayload = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.product.id,
    product_name: item.product.name,
    size: item.size,
    hardware: item.hardware,
    color: item.color,
    quantity: item.quantity,
    price_cents: item.product.price_cents,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItemsPayload)
  if (itemsError) throw new Error(itemsError.message)

  return {
    orderId: order.id,
    orderNumber: order.id.slice(0, 8).toUpperCase(),
  }
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
  })
}