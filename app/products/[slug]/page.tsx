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

// Generate static params for all products (SSG)
export async function generateStaticParams() {
  return productsData.products.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = productsData.products.find(p => p.slug === params.slug)

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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productsData.products.find(p => p.slug === params.slug)
  const category = productsData.categories.find(c => c.id === product?.category)

  if (!product) {
    notFound()
  }

  // Get related products (same category, different product)
  const relatedProducts = productsData.products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="bg-white grid grid-cols-12 font-neulissans tracking-tight pt-12 ">
      {/* Product Details */}
      <section className="col-span-full grid grid-cols-12 gap-8 px-8 py-12">
        <div className="col-span-full grid grid-cols-12 items-stretch">
          {/* Product Info */}
          <div className='col-span-5 col-start-1 h-fit flex flex-col gap-12 text-white rounded-[15px] p-8 bg-primary-900'>
            <Button size='compact' className='w-fit'><Icon width={16} name='roundedArrow' className='rotate-180' /></Button>
            <nav className="col-span-full flex  py-3">
              <div className=" px-4">
                <ol className="flex items-center space-x-2 text-sm ">
                  <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
                  <ChevronRight className="h-4 w-4" />
                  <li><Link href="/products" className="hover:text-primary-600">Products</Link></li>
                  <ChevronRight className="h-4 w-4" />
                  <li><Link href={`/products?category=${category?.slug}`} className="hover:text-primary-600">{category?.name}</Link></li>
                </ol>
              </div>
            </nav>
            <div className="p-6 space-y-4">
              <h1 className="text-5xl font-neulisneue font-medium mb-2">{product.name}</h1>
              <p className="mb-6">SKU: {product.sku}</p>

              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>
              {/* Quick Specs */}
              <div className="">
                <div className="p-6">
                  <h3 className="font-semibold mb-4">Key Specifications</h3>
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b last:border-0">
                        <dt className="text-gray-600">{key}:</dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
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
            {/* Product Images */}
            <div className='flex flex-col gap-8'>
              <div className=" bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[0] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full max-h-96 object-cover"
                />
              </div>
              {}
            </div>


          </div>

          {/* Detailed Information Tabs */}
          <div className="col-span-full mt-16">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="downloads">Downloads</TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Complete Specifications</h3>
                    <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b">
                          <dt className="text-gray-600">{key}:</dt>
                          <dd className="font-medium text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                    {product.features && (
                      <ul className="space-y-3">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary-600 mr-2">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="col-span-full mt-16">
              <h2 className="text-2xl font-neulisneue font-bold mb-8">Related Products</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                    <Link href={`/products/${relatedProduct.slug}`}>
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                          <img
                            src={relatedProduct.images[0] || '/placeholder.svg'}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-semibold line-clamp-2">{relatedProduct.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">SKU: {relatedProduct.sku}</p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}