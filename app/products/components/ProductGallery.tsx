'use client';

import { useState } from 'react';

interface ProductImageGalleryProps {
  product: {
    name: string;
    images: string[];
  };
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-[3fr_1fr] gap-4 h-full">
        {/* Main Image Viewer - 3/4 width, full height */}
        <div className="bg-primary-200 border-2 border-primary-900/15 rounded-lg overflow-hidden h-full">
          <img
            src={product.images[selectedImageIndex] || '/placeholder.svg'}
            alt={`${product.name} - Image ${selectedImageIndex + 1}`}
            className="w-full h-full object-cover cursor-zoom-in"
          />
        </div>

        {/* Image Selector Column - 1/4 width, fixed height with scroll */}
          <div className="flex flex-col gap-3 overflow-y-auto h-full max-h-[600px] min-h-0">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-square h-40 bg-primary-200 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 flex-shrink-0 ${
                  index === selectedImageIndex
                    ? 'ring-2 ring-primary-500 ring-offset-2'
                    : 'hover:opacity-80'
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
      </div>

      {/* Mobile Layout - Simple Horizontal Carousel */}
      <div className="md:hidden">
        <div 
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {product.images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 aspect-square bg-primary-200 border-2 border-primary-900/15 rounded-lg overflow-hidden snap-start"
            >
              <img
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}