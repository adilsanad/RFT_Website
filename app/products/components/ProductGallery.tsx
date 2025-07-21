'use client';

import { useState } from 'react';

interface ProductImageGalleryProps {
  product: {
    name: string;
    images: string[];
  };
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* Main Image Viewer - 3/4 width */}
        <div className="col-span-3 bg-primary-200 border-2 border-primary-900/15 rounded-lg overflow-hidden">
          <img
            src={product.images[selectedImageIndex] || '/placeholder.svg'}
            alt={`${product.name} - Image ${selectedImageIndex + 1}`}
            className="w-full h-full object-cover cursor-zoom-in"
          />
        </div>

        {/* Image Selector Column - 1/4 width */}
        <div className="col-span-1 flex flex-col gap-2 overflow-y-auto">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`aspect-square bg-primary-200 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
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
    </div>
  );
}