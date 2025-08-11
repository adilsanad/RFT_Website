'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Icon from '@/public/assets/vectors'
import ProductImageGallery from '../components/ProductGallery'
import ProductDropdowns from '../components/ProductDropdown'
import RelatedProductsCarousel from '../components/RelatedProducts'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import { useProductNavigation } from '../hooks/useProductNavigation'


export default function ProductPageClient({ product, category, productsData }: { product: any, category: any, productsData: any }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { navigateBackToProducts } = useProductNavigation();

  return (
    <>
      <div className="bg-white grid grid-cols-4 md:grid-cols-12 font-neulissans tracking-tight gap-20 pt-20 md:pt-24 ">
        {/* Product Details */}
        <section className="col-span-full grid grid-cols-4 md:grid-cols-12 gap-8 py-8 md:p-12 md:py-0 max-md:bg-primary-900 max-md:rounded-[15px]">
          {/* Product Info */}
          <div className='md:order-1 order-2 col-span-full md:col-span-5 md:col-start-1 h-fit flex flex-col gap-4 md:gap-16 text-white rounded-[15px] max-md:px-8 md:p-12 md:bg-primary-900'>
            <div className='flex flex-col gap-6'>
                <Button
                size='compact'
                className='max-md:hidden w-fit py-3 rounded-[15px]'
                onClick={navigateBackToProducts}
                >
                <Icon width={16} name='roundedArrow' className='rotate-180' />
                </Button>
              <nav className="col-span-full flex  py-3">
                <ol className="flex items-center gap-2 text-base md:text-lg text-white/30 flex-wrap gap-y-0 ">
                  <li><Link href="/" className="hover:text-primary-600 transition-all">Home</Link></li>
                  {">"}
                  <li><Link href="/products" className="hover:text-primary-600 transition-all">Products</Link></li>
                  {">"}
                  <li><Link href={`/products?category=${category?.slug}`} className="hover:text-primary-600 transition-all">{category?.name}</Link></li>
                </ol>
              </nav>
            </div>
            <div className="flex flex-col gap-8">
              <h3 >{product.title}</h3>
              <div className="flex flex-col gap-1">
                <p className='flex w-full justify-between text-white/50 text-lg font-medium'><span className='text-white/70 font-semibold'>SKU</span> {product.subtitle}</p>
                <p className='flex w-full justify-between text-white/50 text-lg font-medium'><span className='text-white/70 font-semibold'>Product Type</span>  {product.subcategory
                  ? product.subcategory.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (c: string) => c.toUpperCase())
                  : ' '}
                </p>
                <p className='flex w-full justify-between text-white/50 text-lg font-medium'><span className='text-white/70 font-semibold'>Brand</span> {product.brand}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                className='w-full'
                onClick={() => setIsQuoteModalOpen(true)}
              >
                <Icon width={20} name='quote' className='' />
                Request Quote
              </Button>
            </div>
          </div>
          <div className="md:order-2 order-1 col-span-full md:col-span-7 max-h-full max-md:bg-black/10 max-md:p-4 md:col-start-6 flex flex-col gap-12 max-md:border-t max-md:border-b border-white/15">
            <ProductImageGallery product={product} />
          </div>
        </section>
        <section className='col-span-full flex flex-col px-8 md:px-24'>
          <ProductDropdowns product={product} />
        </section>

        <section className='col-span-full flex flex-col px-8 md:px-24 pr-0 md:pr-0 overflow-x-auto'>
          {/* Related Products */}
          <RelatedProductsCarousel
            products={productsData.products}
            currentProduct={product}
            relationType="category"
            maxProducts={8}
          />
        </section>
      </div>

      <QuoteRequestModal
        product={product}
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  )
}