'use client'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

const STORAGE_KEY = 'productsPageState'

export function useProductNavigation() {
  const router = useRouter()

  // Navigate back to products with saved state (integrates with existing ProductsPageClient state)
  const navigateBackToProducts = useCallback(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY)
      if (savedState) {
        const state = JSON.parse(savedState)
        
        // Build URL from saved filters
        const params = new URLSearchParams()
        
        if (state.filters?.search) params.set('search', state.filters.search)
        
        if (state.filters?.categories?.length > 0) {
          state.filters.categories.forEach((category: string) => {
            params.append('categories', category)
          })
        }
        
        if (state.filters?.productType?.length > 0) {
          state.filters.productType.forEach((type: string) => {
            params.append('productType', type)
          })
        }
        
        if (state.filters?.brands?.length > 0) {
          state.filters.brands.forEach((brand: string) => {
            params.append('brands', brand)
          })
        }
        
        if (state.filters?.sortBy && state.filters.sortBy !== 'name-asc') {
          params.set('sort', state.filters.sortBy)
        }

        const queryString = params.toString()
        const url = queryString ? `/products?${queryString}` : '/products'
        
        router.push(url)
      } else {
        // Fallback - just go to products page
        router.push('/products')
      }
    } catch (error) {
      console.warn('Failed to restore page state:', error)
      router.push('/products')
    }
  }, [router])

  return { navigateBackToProducts }
}