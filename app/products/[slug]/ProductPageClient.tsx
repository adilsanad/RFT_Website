'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Icon from '@/public/assets/vectors'
import ProductImageGallery from '../components/ProductGallery'
import ProductDropdowns from '../components/ProductDropdown'
import RelatedProductsCarousel from '../components/RelatedProducts'
import { motion, AnimatePresence } from 'motion/react'

// Quote Request Modal Component
function QuoteRequestModal({ product, isOpen, onClose }: { product: any, isOpen: boolean, onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '',
    message: '',
    budget: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailData = {
        subject: `Quote Request for ${product.title}`,
        productName: product.title,
        sku: product.sku,
        customerInfo: formData,
        timestamp: new Date().toISOString()
      };

      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setFormData({ name: '', company: '', email: '', phone: '', quantity: '', message: '', budget: '' });
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 font-manrope"
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-white rounded-[30px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="tracking-tighter flex flex-col gap-1 mb-3">
              <div className="flex justify-between items-center ">
                <p className="text-black/60 font-medium text-lg font-neulissans">Request Quote for</p>
                <button
                  onClick={onClose}
                  className="text-gray-500 text-2xl hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <h4 className="font-neulisneue text-2xl">{product.title}</h4>
            </div>
            <p className="text-black/60 font-medium tracking-tight mb-6">
              Fill out the form below and we'll get back to you with a detailed quote as soon as possible.
            </p>

            {submitStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                Quote request sent successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
                Failed to send quote request. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium font-neulisneue mb-1">Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium font-neulisneue mb-1">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium font-neulisneue mb-1">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium font-neulisneue mb-1">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium font-neulisneue mb-1">Quantity Required</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  placeholder="e.g., 10 units"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium font-neulisneue mb-1">Additional Requirements</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Please specify any special requirements or questions..."
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-primary-900/30 bg-primary-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Quote Request'}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProductPageClient({ product, category, productsData }: { product: any, category: any, productsData: any }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white grid grid-cols-4 md:grid-cols-12 font-neulissans tracking-tight gap-20 pt-20 md:pt-24 ">
        {/* Product Details */}
        <section className="col-span-full grid grid-cols-4 md:grid-cols-12 gap-8 py-8 md:p-12 md:py-0 max-md:bg-primary-900 max-md:rounded-[15px]">
          {/* Product Info */}
          <div className='md:order-1 order-2 col-span-full md:col-span-5 md:col-start-1 h-fit flex flex-col gap-4 md:gap-16 text-white rounded-[15px] max-md:px-8 md:p-12 md:bg-primary-900'>
            <div className='flex flex-col gap-6'>
              <Button size='compact' className='max-md:hidden w-fit py-3 rounded-[15px]' link='back'><Icon width={16} name='roundedArrow' className='rotate-180' /></Button>
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
              <div className="">
                <p className='text-white/60 text-lg font-medium'>{product.description}</p>
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