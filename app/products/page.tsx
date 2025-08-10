import type { Metadata } from 'next'
import ProductsPageClient from './ProductsPageClient'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our comprehensive catalog of irrigation products and water management equipment. Hunter irrigation, Jain systems, sprinklers, rotors, drip irrigation, and pool equipment. Authorized dealer across India.',
  keywords: [
    'irrigation products India',
    'Hunter irrigation products',
    'Jain irrigation equipment',
    'sprinkler systems India',
    'drip irrigation products',
    'irrigation rotors India',
    'water management equipment',
    'Hunter dealer India',
    'irrigation supplies Bangalore',
    'landscape irrigation products',
    'pool equipment India',
    'rainwater harvesting products'
  ],
  openGraph: {
    title: 'All Products',
    description: 'Comprehensive catalog of irrigation products and water management equipment from leading brands across India.',
    images: [
      {
        url: '/og-products.png',
        width: 1200,
        height: 630,
        alt: 'Rainfield Technologies - Irrigation Products Catalog',
      },
    ],
  },
  alternates: {
    canonical: 'https://rainfield.in/products',
  },
}

const ProductsPage = () => {
  return <ProductsPageClient />
}

export default ProductsPage