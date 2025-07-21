// app/products/[slug]/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRight, Download, FileText, Mail, Phone } from 'lucide-react'
import productsData from '@/data/products.json'
import Icon from '@/public/assets/vectors'
import { useState } from 'react'
import ProductImageGallery from '../components/ProductGallery'
import ProductDropdowns from '../components/ProductDropdown'
import RelatedProductsCarousel from '../components/RelatedProducts'

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
    title: product.metaTitle || `${product.name} | Rainfield`,
    description: product.metaDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  }
}

// Quote Request Form Component
function QuoteRequestForm({ product }: { product: any }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input id="name" required />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" />
        </div>
      </div>
      <div>
        <Label htmlFor="quantity">Quantity Required</Label>
        <Input id="quantity" placeholder="e.g., 10 units" />
      </div>
      <div>
        <Label htmlFor="message">Additional Requirements</Label>
        <Textarea
          id="message"
          placeholder="Please specify any special requirements or questions..."
          rows={4}
        />
      </div>
      <input type="hidden" name="product" value={product.name} />
      <input type="hidden" name="sku" value={product.sku} />
      <Button type="submit" className="w-full">Send Quote Request</Button>
    </form>
  )
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params; // Add this line
  const product = productsData.products.find(p => p.slug === slug) // Use slug instead of params.slug
  const category = productsData.categories.find(c => c.id === product?.category)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white grid grid-cols-12 font-neulissans tracking-tight gap-20 pt-12 ">
      {/* Product Details */}
      <section className="col-span-full grid grid-cols-12 gap-8 p-12 pb-0">
        {/* Product Info */}
        <div className='col-span-5 col-start-1 h-fit flex flex-col gap-16 text-white rounded-[15px] p-12 bg-primary-900'>
          <div className='flex flex-col gap-6'>
            <Button size='compact' className='w-fit py-3 rounded-[15px]' link='back'><Icon width={16} name='roundedArrow' className='rotate-180' /></Button>
            <nav className="col-span-full flex  py-3">
              <ol className="flex items-center gap-2 text-xl text-white/30 ">
                <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
                  //
                <li><Link href="/products" className="hover:text-primary-600">Products</Link></li>
                  //
                <li><Link href={`/products?category=${category?.slug}`} className="hover:text-primary-600">{category?.name}</Link></li>
              </ol>
            </nav>
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="text-5xl font-neulisneue font-medium mb-2">{product.name}</h3>
            <div className="">
              <p className='text-xl text-white/70 tracking-tight'>{product.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className='w-full'>
                  <Icon width={20} name='quote' className='' />
                  Request Quote
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Request Quote for {product.name}</DialogTitle>
                  <DialogDescription>
                    Fill out the form below and we'll get back to you within 24 hours with a detailed quote.
                  </DialogDescription>
                </DialogHeader>
                <QuoteRequestForm product={product} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="col-span-7 col-start-6 flex flex-col gap-12">
          <ProductImageGallery product={product} />
        </div>
      </section>
      <section className='col-span-full flex flex-col px-24'>
        <ProductDropdowns product={product} />
      </section>

      <section className='col-span-full flex flex-col px-24 pr-0 overflow-x-auto'>
        {/* Related Products */}
          <RelatedProductsCarousel
            products={productsData.products}
            currentProduct={product}
            relationType="category"
            maxProducts={8}
          />
      </section>
    </div >
  )
}