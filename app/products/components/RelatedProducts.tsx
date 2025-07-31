'use client';

import React, { useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Icon from '@/public/assets/vectors';

interface Product {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  category: string;
  images: string[];
}

interface RelatedProductsCarouselProps {
  products: Product[];
  currentProduct?: Product; // The current product to find related products for
  brandName?: string; // Alternative to currentProduct for brand filtering
  categoryName?: string; // Alternative to currentProduct for category filtering
  relationType?: 'category' | 'brand' | 'both'; // How to determine related products
  title?: string;
  maxProducts?: number; // Limit the number of products shown
}

const RelatedProductsCarousel: React.FC<RelatedProductsCarouselProps> = ({
  products,
  currentProduct,
  brandName,
  categoryName,
  relationType = 'category',
  title,
  maxProducts = 12
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.map(cat => ({ id: cat, name: cat }));
  }, [products]);

  // Determine the target brand and category for filtering
  const targetBrand = brandName || currentProduct?.brand;
  const targetCategory = categoryName || currentProduct?.category;

  // Filter and get related products based on relation type
  const relatedProducts = useMemo(() => {
    if (!currentProduct && !brandName && !categoryName) {
      return products.slice(0, maxProducts);
    }

    let filtered: Product[] = [];

    switch (relationType) {
      case 'category':
        if (targetCategory) {
          filtered = products.filter(product =>
            product.id !== currentProduct?.id &&
            product.category === targetCategory
          );
        }
        break;

      case 'brand':
        if (targetBrand) {
          filtered = products.filter(product =>
            product.id !== currentProduct?.id &&
            product.brand === targetBrand
          );
        }
        break;

      case 'both':
        if (targetBrand && targetCategory) {
          // First try to find products with same brand and category
          const sameBrandAndCategory = products.filter(product =>
            product.id !== currentProduct?.id &&
            product.brand === targetBrand &&
            product.category === targetCategory
          );

          // Then add products with same brand (different category)
          const sameBrandDifferentCategory = products.filter(product =>
            product.id !== currentProduct?.id &&
            product.brand === targetBrand &&
            product.category !== targetCategory
          );

          // Finally add products with same category (different brand)
          const sameCategoryDifferentBrand = products.filter(product =>
            product.id !== currentProduct?.id &&
            product.category === targetCategory &&
            product.brand !== targetBrand
          );

          // Combine with priority: same brand+category, then same brand, then same category
          filtered = [
            ...sameBrandAndCategory,
            ...sameBrandDifferentCategory,
            ...sameCategoryDifferentBrand
          ];
        } else if (targetBrand) {
          // If only brand is available, filter by brand
          filtered = products.filter(product =>
            product.id !== currentProduct?.id &&
            product.brand === targetBrand
          );
        } else if (targetCategory) {
          // If only category is available, filter by category
          filtered = products.filter(product =>
            product.id !== currentProduct?.id &&
            product.category === targetCategory
          );
        }
        break;

      default:
        filtered = products.filter(product => product.id !== currentProduct?.id);
    }

    return filtered.slice(0, maxProducts);
  }, [products, currentProduct, targetBrand, targetCategory, relationType, maxProducts]);

  // Generate dynamic title based on relation type and available data

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Approximate width of one card + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (relatedProducts.length === 0) return null;

  return (
    <div className="col-span-full flex flex-col gap-12 py-20">
      <div className="flex items-center justify-between pr-4 md:pr-24">
        <h3 className="">Related Products</h3>

        {/* Navigation Buttons */}
        <div className="flex gap-1 md:gap-2 pr-6 md:pr-24">
          <button
            onClick={() => scroll('left')}
            className="p-[14px] px-[18px] max-md:mb-4 md:p-[0.9rem] w-fit bg-primary-300 rounded-[45px_15px_15px_45px] flex items-center justify-center border-2 border-primary-900/30 hover:border-primary-900/50 md:hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:translate-y-0"
          >
            <Icon name="roundedArrow" className="fill-primary-900 rotate-180 w-[18px] md:w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-[14px] px-[18px] max-md:mb-4 md:p-[0.9rem] w-fit bg-primary-300 rounded-[15px_45px_45px_15px] flex items-center justify-center border-2 border-primary-900/30 hover:border-primary-900/50 md:hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:translate-y-0"
          >
            <Icon name="roundedArrow" className="fill-primary-900 w-[18px] md:w-5" />
          </button>
        </div>
        
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 pr-20"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="w-[300px] md:w-[500px] group hover:translate-y-1 transition-all duration-500 flex-shrink-0"
          >
            <a href={`/products/${product.slug}`}>
              <div className="p-0">
                <div className="aspect-[4/3] bg-primary-100 rounded-[15px] border-2 border-primary-900/30 overflow-hidden">
                  <img
                    src={product.images[0] || '/placeholder.svg'}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col p-4">
                <h5 className="group-hover:text-primary-800 transition-all text-2xl font-neulissans font-medium tracking-tighter line-clamp-2">
                  {product.title}
                </h5>
                <div className="flex text-gray-600 font-medium">
                  {product.brand && (
                    <p className='text-lg font-medium font-neulissans tracking-tight'>
                      {product.brand}
                      {product.category && (
                        <> · {product.category}</>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RelatedProductsCarousel;