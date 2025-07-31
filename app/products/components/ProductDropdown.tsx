'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Product {
  description: string;
  specifications: Record<string, string | undefined>;
  features?: string[];
}

interface ProductDropdownsProps {
  product: Product;
}

interface OpenSections {
  description: boolean;
  specifications: boolean;
  features: boolean;
}

const ProductDropdowns: React.FC<ProductDropdownsProps> = ({ product }) => {
  const [openSections, setOpenSections] = useState<OpenSections>({
    description: true,
    specifications: true,
    features: false,
  });

  const toggleSection = (section: keyof OpenSections): void => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Sample product data for demo
  const sampleProduct: Product = {
    description: "Lorem ipsum dolor sit amet consectetur. Pretium lobortis ante libero viverra ultricies suspendisse eget pulvinar sit. Purus sapien tincidunt est integer ultricies in arcu. Urna id amet nec id duis. Lorem ipsum dolor sit amet consectetur. Pretium lobortis ante libero viverra ultricies suspendisse eget pulvinar sit. Purus sapien tincidunt est integer ultricies in arcu. Urna id amet nec id duis. Pretium lobortis ante libero viverra ultricies suspendisse eget pulvinar sit. Purus sapien tincidunt est integer ultricies in arcu. Urna id amet nec id duis.",
    specifications: {
      "Lorem ipsum": "Dolor sit amet consectetur.",
      "Lorem ipsum 2": "Dolor sit amet consectetur.",
      "Lorem ipsum 3": "Dolor sit amet consectetur.",
      "Lorem ipsum 4": "Dolor sit amet consectetur.",
      "Lorem ipsum 5": "Dolor sit amet consectetur.",
      "Lorem ipsum 6": "Dolor sit amet consectetur."
    },
    features: [
      "Feature 1 - Lorem ipsum dolor sit amet",
      "Feature 2 - Consectetur adipiscing elit",
      "Feature 3 - Sed do eiusmod tempor incididunt",
      "Feature 4 - Ut labore et dolore magna aliqua"
    ]
  };

  const productData = product || sampleProduct;

  return (
    <section className='col-span-full flex flex-col '>
      <div className="col-span-full flex flex-col">
        
        {/* Description Dropdown */}
        <div className="border-b border-gray-300">
          <button
            onClick={() => toggleSection('description')}
            className="w-full flex justify-between items-center py-8 text-left"
          >
            <h4 className="">Description</h4>
            {openSections.description ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>
          
          {openSections.description && (
            <div className="pb-8">
              <p className="text-gray-700 leading-relaxed">
                {productData.description}
              </p>
            </div>
          )}
        </div>

        {/* Product Specifications Dropdown */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('specifications')}
            className="w-full flex justify-between items-center py-8 text-left"
          >
            <h4>Product Specifications</h4>
            {openSections.specifications ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>
          
          {openSections.specifications && (
            <div className="pb-8">
              <dl className="grid md:grid-cols-2 gap-x-16 gap-y-4">
                {Object.entries(productData.specifications)
                  .filter(([, value]) => value !== undefined) // Filter out undefined values
                  .map(([key, value], index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                    <dt className="text-gray-700 font-medium">{key} :</dt>
                    <dd className="text-gray-600 text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* Features Dropdown */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('features')}
            className="w-full flex justify-between items-center py-8 text-left"
          >
            <h4>Features</h4>
            {openSections.features ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>
          
          {openSections.features && (
            <div className="pb-8">
              {productData.features && (
                <ul className="space-y-3">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ProductDropdowns;