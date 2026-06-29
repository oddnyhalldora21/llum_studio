import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Product } from './useProducts'

async function fetchProduct(slug: string): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export function useProduct(slug: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProduct(slug),
    enabled: !!slug,
  })

  return {
    product: data || null,
    loading: isLoading,
    error: error?.message || null,
  }
}