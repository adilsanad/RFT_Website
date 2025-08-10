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
  const { slug } = await params;
  const product = productsData.products.find(p => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Rainfield Technologies',
      description: 'The requested product was not found. Browse our complete range of irrigation systems, water management solutions, and pool equipment.',
    }
  }

  const category = productsData.categories.find(c => c.id === product.category);
  
  return {
    title: product.metaTitle || `${product.title} - ${product.brand} | Rainfield Technologies India`,
    description: product.metaDescription || `${product.description}. Premium ${product.brand} irrigation equipment available across India. Expert installation and support.`,
    keywords: [
      `${product.title}`,
      `${product.brand} India`,
      `${product.sku}`,
      `${category?.name || 'irrigation'} equipment`,
      'irrigation systems India',
      'Rainfield Technologies',
      `${product.brand} ${product.subcategory}`,
      'irrigation installation India'
    ],
    openGraph: {
      title: `${product.title} - ${product.brand}`,
      description: product.description,
      images: product.images?.map(img => ({
        url: img,
        width: 800,
        height: 600,
        alt: `${product.title} - ${product.brand}`,
      })) || [],
      type: 'website',
      siteName: 'Rainfield Technologies',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} - ${product.brand}`,
      description: product.description,
      images: product.images?.[0],
    },
    alternates: {
      canonical: `https://rainfield.in/products/${product.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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