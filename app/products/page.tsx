// app/products/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter } from 'lucide-react'

// This would come from your JSON file or database
import productsData from '@/data/products.json'

export const metadata: Metadata = {
  title: 'Products | Rainfield Water Solutions',
  description: 'Browse our complete range of water management products including rainwater harvesting, irrigation systems, and water features.',
}

export default function ProductsPage() {
  // In a real app, this would be handled with state management
  // For now, showing static implementation
  const { products, categories } = productsData

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-neulisneue font-bold mb-4">All Products</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Explore our comprehensive range of water management solutions. Request quotes for any products that meet your needs.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search products..." 
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600">Showing {products.length} products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <Link href={`/products/${product.slug}`}>
                  <CardHeader className="p-0">
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      <img 
                        src={product.images[0] || '/placeholder.svg'} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {categories.find(c => c.id === product.category)?.name}
                    </Badge>
                    <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {product.description}
                    </CardDescription>
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">SKU:</span> {product.sku}</p>
                      {product.brand && (
                        <p><span className="font-medium">Brand:</span> {product.brand}</p>
                      )}
                    </div>
                  </CardContent>
                </Link>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" variant="default">
                    Request Quote
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Load More / Pagination would go here */}
          <div className="mt-12 text-center">
            <Button >
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-neulisneue font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            We have over 400 products in our catalogue. Contact us for personalized assistance in finding the right solution for your needs.
          </p>
          <Button>
            <Link href="/contact">Contact Our Experts</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}