// app/products/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import productsData from '@/data/products.json'
import ProductPageClient from './ProductPageClient'

// Generate static params for all products (SSG)
export async function generateStaticParams() {
  return productsData.products.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params; // Add this line
  const product = productsData.products.find(p => p.slug === slug) // Use slug instead of params.slug

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.metaTitle || `${product.title} | Rainfield`,
    description: product.metaDescription || product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images,
    },
  }
}


export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const product = productsData.products.find(p => p.slug === slug);
  const category = productsData.categories.find(c => c.id === product?.category);

  if (!product) {
    notFound()
  }

  return (
    <ProductPageClient 
      product={product} 
      category={category} 
      productsData={productsData} 
    />
  )
}