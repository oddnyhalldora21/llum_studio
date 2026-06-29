import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

const SHOP_ID = '6b98e9ae-4667-4100-8203-4fbd00a36157'

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price_cents: number
  currency: string
  image_url: string
  image_url_2: string | null
  genre: string
  collection: string | null
}

async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('shop_id', SHOP_ID)
    .eq('is_active', true)

  if (error) throw new Error(error.message)
  return data || []
}

export function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  return {
    products: data || [],
    loading: isLoading,
    error: error?.message || null,
  }
}