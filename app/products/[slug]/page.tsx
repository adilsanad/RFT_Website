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
  
  // Generate SEO-optimized title
  const seoTitle = product.seoTitle || 
    `${product.brand} ${product.sku} - ${product.subcategory} | ${category?.name || 'Irrigation'} Equipment India | Rainfield Technologies`;
  
  // Generate comprehensive SEO description
  const seoDescription = product.seoDescription || 
    `${product.brand} ${product.sku} ${product.subcategory} - ${product.description}. Professional installation across India, Bangalore, Delhi, Mumbai. Expert support, 2-year warranty. Buy ${product.brand} irrigation equipment online.`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      `${product.brand} ${product.sku}`,
      `${product.sku} India`,
      `${product.brand} ${product.subcategory}`,
      `${product.subcategory} Bangalore`,
      `irrigation ${product.subcategory} India`,
      `${category?.name || 'irrigation'} equipment Bangalore`,
      'irrigation systems India',
      'Rainfield Technologies',
      `${product.brand} dealer India`,
      'irrigation installation Bangalore',
      `${product.subcategory} Mumbai Delhi`,
      'irrigation equipment online India'
    ],
    openGraph: {
      title: `${product.brand} ${product.sku} - ${product.subcategory}`,
      description: seoDescription,
      images: product.images?.map(img => ({
        url: img,
        width: 800,
        height: 600,
        alt: `${product.brand} ${product.sku} ${product.subcategory} - ${product.title}`,
      })) || [],
      type: 'website',
      siteName: 'Rainfield Technologies',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.brand} ${product.sku} - ${product.subcategory}`,
      description: seoDescription,
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

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${product.brand} ${product.sku}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "manufacturer": {
      "@type": "Organization",
      "name": product.brand
    },
    "model": product.sku,
    "sku": product.sku,
    "mpn": product.sku,
    "category": product.subcategory,
    "image": product.images?.map(img => `https://rainfield.in${img}`) || [],
    "url": `https://rainfield.in/products/${product.slug}`,
    "offers": {
      "@type": "Offer",
      "price": product.price || "0",
      "priceCurrency": "INR",
      "availability": product.availability === "OutOfStock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "priceValidUntil": "2025-12-31",
      "seller": {
        "@type": "Organization",
        "name": "Rainfield Technologies",
        "url": "https://rainfield.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kalkere-Agara, Horamavu",
          "addressLocality": "Bengaluru",
          "postalCode": "560043",
          "addressCountry": "India"
        }
      }
    },
    "additionalProperty": Object.entries(product.specifications || {}).map(([key, value]) => ({
      "@type": "PropertyValue",
      "name": key,
      "value": value
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "20"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageClient 
        product={product} 
        category={category} 
        productsData={productsData} 
      />
    </>
  )
}