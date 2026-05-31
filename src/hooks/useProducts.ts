import { useEffect, useState } from 'react'
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

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('shop_id', SHOP_ID)
        .eq('is_active', true)

      if (error) {
        setError(error.message)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}