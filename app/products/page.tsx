"use client"
import { useState, useEffect, useMemo, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import productsData from '@/data/products.json'
import Icon from '@/public/assets/vectors'
import { RotateCcw, X } from 'lucide-react'

interface FilterState {
  search: string
  categories: string[]
  productType: string[]
  brands: string[]
  sortBy: string
}

interface TempFilterState {
  categories: string[]
  productType: string[]
  brands: string[]
  sortBy: string
}

// Separate component for the main products content
function ProductsContent() {
  const { products, categories, productTypes } = productsData
  const searchParams = useSearchParams()
  const router = useRouter()

  // Main filter state (applied filters)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    productType: [],
    brands: [],
    sortBy: 'name-asc'
  })

  // Temporary filter state for dropdowns
  const [tempFilters, setTempFilters] = useState<TempFilterState>({
    categories: [],
    brands: [],
    productType: [],
    sortBy: 'name-asc'
  })

  // Dropdown open states
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false)
  const [productTypeDropdownOpen, setProductTypeDropdownOpen] = useState(false)
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Refs for dropdown positioning
  const categoryRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const productTypeRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoriesParam = searchParams.getAll('categories')
    const productTypeParam = searchParams.getAll('productType')
    const brandsParam = searchParams.getAll('brands')
    const searchParam = searchParams.get('search')
    const sortParam = searchParams.get('sort')

    const initialFilters: FilterState = {
      search: searchParam || '',
      categories: categoriesParam || [],
      productType: productTypeParam || [],
      brands: brandsParam || [],
      sortBy: sortParam || 'name-asc'
    }

    setFilters(initialFilters)
    setTempFilters({
      categories: initialFilters.categories,
      productType: initialFilters.productType,
      brands: initialFilters.brands,
      sortBy: initialFilters.sortBy
    })
  }, [searchParams])

  // Update URL when filters change
  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams()

    if (newFilters.search) params.set('search', newFilters.search)

    // Handle multiple categories
    if (newFilters.categories.length > 0) {
      newFilters.categories.forEach(category => {
        params.append('categories', category)
      })
    }

    // Handle multiple product types
    if (newFilters.productType.length > 0) {
      newFilters.productType.forEach(productType => {
        params.append('productType', productType)
      })
    }

    // Handle multiple brands
    if (newFilters.brands.length > 0) {
      newFilters.brands.forEach(brand => {
        params.append('brands', brand)
      })
    }

    if (newFilters.sortBy !== 'name-asc') params.set('sort', newFilters.sortBy)

    const newURL = params.toString() ? `/products?${params.toString()}` : '/products'
    router.replace(newURL, { scroll: false })
  }

  // Extract unique brands from products
  const allBrands = useMemo(() => {
    const brands = new Set<string>()
    products.forEach(product => {
      if (product.brand) {
        brands.add(product.brand)
      }
    })
    return Array.from(brands).sort()
  }, [products])

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower) ||
        product.brand?.toLowerCase().includes(searchLower)
      )
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category))
    }

    // Apply product type filter
    if (filters.productType.length > 0) {
      filtered = filtered.filter(product => filters.productType.includes(product.subcategory))
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => product.brand && filters.brands.includes(product.brand))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title)
        case 'name-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return filtered
  }, [products, filters])

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  // Check if any filters are active
  const hasActiveFilters = filters.search || filters.categories.length > 0 || filters.productType.length > 0 || filters.brands.length > 0 || filters.sortBy !== 'name-asc'
  const hasActiveCategory = filters.categories.length > 0
  const hasActiveProductType = filters.productType.length > 0
  const hasActiveBrand = filters.brands.length > 0

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const active = []
    if (filters.search) {
      active.push({ type: 'search', value: filters.search, label: `Search: "${filters.search}"` })
    }
    filters.categories.forEach(categoryId => {
      const category = categories.find(c => c.id === categoryId)
      if (category) {
        active.push({ type: 'category', value: categoryId, label: category.name })
      }
    })
    filters.productType.forEach(productTypeId => {
      const productType = productTypes.find(pt => pt.id === productTypeId)
      if (productType) {
        active.push({ type: 'productType', value: productTypeId, label: productType.name })
      }
    })
    filters.brands.forEach(brand => {
      active.push({ type: 'brand', value: brand, label: brand })
    })
    if (filters.sortBy !== 'name-asc') {
      const sortLabels: Record<string, string> = {
        'name-desc': 'Name (Z-A)',
        'newest': 'Newest First'
      }
      active.push({ type: 'sort', value: filters.sortBy, label: `Sort: ${sortLabels[filters.sortBy]}` })
    }
    return active
  }, [filters, categories, productTypes])

  // Handle search input
  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  // Handle filter confirmations
  const handleCategoryConfirm = () => {
    const newFilters = { ...filters, categories: tempFilters.categories }
    setFilters(newFilters)
    updateURL(newFilters)
    setCategoryDropdownOpen(false)
  }

  const handleProductTypeConfirm = () => {
    const newFilters = { ...filters, productType: tempFilters.productType }
    setFilters(newFilters)
    updateURL(newFilters)
    setProductTypeDropdownOpen(false)
  }

  const handleBrandConfirm = () => {
    const newFilters = { ...filters, brands: tempFilters.brands }
    setFilters(newFilters)
    updateURL(newFilters)
    setBrandDropdownOpen(false)
  }

  const handleSortConfirm = () => {
    const newFilters = { ...filters, sortBy: tempFilters.sortBy }
    setFilters(newFilters)
    updateURL(newFilters)
    setSortDropdownOpen(false)
  }

  // Reset all filters
  const resetFilters = () => {
    const newFilters = {
      search: '',
      categories: [],
      productType: [],
      brands: [],
      sortBy: 'name-asc'
    }
    setFilters(newFilters)
    setTempFilters({
      categories: [],
      productType: [],
      brands: [],
      sortBy: 'name-asc'
    })
    setCurrentPage(1)
    router.replace('/products', { scroll: false })
  }

  // Remove individual filter
  const removeFilter = (type: string, value?: string) => {
    let newFilters = { ...filters }

    switch (type) {
      case 'search':
        newFilters.search = ''
        break
      case 'category':
        if (value) {
          newFilters.categories = newFilters.categories.filter(c => c !== value)
        }
        break
      case 'productType':
        if (value) {
          newFilters.productType = newFilters.productType.filter(pt => pt !== value)
        }
        break
      case 'brand':
        if (value) {
          newFilters.brands = newFilters.brands.filter(b => b !== value)
        }
        break
      case 'sort':
        newFilters.sortBy = 'name-asc'
        break
    }

    setFilters(newFilters)
    updateURL(newFilters)
  }

  // Handle checkbox changes
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setTempFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryId]
        : prev.categories.filter(c => c !== categoryId)
    }))
  }

  const handleProductTypeChange = (productTypeId: string, checked: boolean) => {
    setTempFilters(prev => ({
      ...prev,
      productType: checked
        ? [...prev.productType, productTypeId]
        : prev.productType.filter(pt => pt !== productTypeId)
    }))
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    setTempFilters(prev => ({
      ...prev,
      brands: checked
        ? [...prev.brands, brand]
        : prev.brands.filter(b => b !== brand)
    }))
  }

  // Sync temp filters when dropdowns open
  useEffect(() => {
    if (categoryDropdownOpen) {
      setTempFilters(prev => ({ ...prev, categories: [...filters.categories] }))
    }
  }, [categoryDropdownOpen, filters.categories])

  useEffect(() => {
    if (productTypeDropdownOpen) {
      setTempFilters(prev => ({ ...prev, productType: [...filters.productType] }))
    }
  }, [productTypeDropdownOpen, filters.productType])

  useEffect(() => {
    if (brandDropdownOpen) {
      setTempFilters(prev => ({ ...prev, brands: [...filters.brands] }))
    }
  }, [brandDropdownOpen, filters.brands])

  useEffect(() => {
    if (sortDropdownOpen) {
      setTempFilters(prev => ({ ...prev, sortBy: filters.sortBy }))
    }
  }, [sortDropdownOpen, filters.sortBy])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false)
      }
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setBrandDropdownOpen(false)
      }
      if (productTypeRef.current && !productTypeRef.current.contains(event.target as Node)) {
        setProductTypeDropdownOpen(false)
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Pagination component
  const PaginationComponent = () => {
    if (totalPages <= 1) return null

    const getVisiblePages = () => {
      const delta = 2
      const range = []
      const rangeWithDots = []

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i)
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...')
      } else {
        rangeWithDots.push(1)
      }

      rangeWithDots.push(...range)

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages)
      } else {
        rangeWithDots.push(totalPages)
      }

      return rangeWithDots.filter((item, index, array) => array.indexOf(item) === index)
    }

    return (
      <div className="flex items-center gap-6 justify-center py-16 pt-32">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="group p-4 px-4 bg-primary-200 border border-primary-900/30 disabled:border-0 rounded-[45px_15px_15px_45px] flex items-center justify-center transition-all hover:translate-y-1 "
        >
          <Icon width={16} name="roundedArrow" className="fill-primary-900 rotate-180 group-disabled:fill-primary-900/30 transition-all" />
        </button>
        <div className='flex items-center justify-center'>
          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={page === '...'}
              className="group m-0 py-2 px-3 flex flex-col w-fit gap-2 items-center justify-center hover:translate-y-1 transition-all"
            >
              <h5 className={`
              ${page === currentPage ? 'opacity-100' : 'opacity-60 hover:opacity-100'}  
              text-center flex justify-center text-xl font-medium min-w-6 transition-all`}
              >
                {page}</h5>
              <div className={`h-1 ${page === currentPage ? 'bg-primary-600' : 'bg-primary-600/0'} rounded-full  w-full transition-all`} />
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="group p-4 px-4 bg-primary-200 border border-primary-900/30 disabled:border-0 rounded-[15px_45px_45px_15px] flex items-center justify-center transition-all enabled:hover:translate-y-1"
        >
          <Icon width={16} name="roundedArrow" className="fill-primary-900 group-disabled:fill-primary-900/30 transition-all" />
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 pt-20 max-md:gap-y-8">

      {/* Hero Section */}
      <section className="relative col-span-full flex flex-col px-4 md:px-24 py-16 pb-0 gap-24">
        <div className="px-4">
          <h1 className="font-neulisneue">All Products</h1>
        </div>
        {/* Filtering Option Bar */}
        <div className='flex flex-col'>
          <div className={`flex max-md:flex-col h-fit border-2 border-primary-900/30 ${brandDropdownOpen ? 'md:rounded-[15px_15px_15px_0px]' : 'md:rounded-[15px]'} ${productTypeDropdownOpen ? 'max-md:rounded-[15px_15px_15px_0px]' : 'max-md:rounded-[15px]'} transition-all `}>
            <div className='flex flex-[2] font-neulissans max-md:border-b-2 border-primary-900/30'>
              {/* Brand Filter Dropdown */}
              <div className="relative h-fit flex-1 flex" ref={brandRef}>
                <button
                  className={`flex justify-between w-full items-center p-6 py-4 ${hasActiveBrand ? 'bg-primary-300' : 'bg-primary-100'} ${brandDropdownOpen ? 'rounded-[14.5px_0px_0px_0px]' : 'rounded-[14.5px_0px_0px_0px] md:rounded-[14.5px_0px_0px_14.5px]'} transition-all`}
                  onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                >
                  <h5 className=''>Brand</h5>
                  <div className='flex items-center justify-center gap-2'>
                    <span className={`flex items-center justify-center w-8 h-8 bg-primary-900 text-white text-sm font-bold rounded-[10px] transition-all ${hasActiveBrand ? 'opacity-100' : 'opacity-0'}`}>{filters.brands.length > 0 && `${filters.brands.length}`}</span>

                    <Icon name='chevronDown' className={`h-4 w-4 transition-transform ${brandDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {brandDropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    className="absolute top-[94%] -left-[1%] md:-left-[0.5%] mt-1 w-56 md:w-72 bg-primary-100 border-2 border-primary-900/30 rounded-[0px_15px_30px_30px] shadow-lg z-50 overflow-hidden">
                    <div className="flex flex-col">
                      <div className="flex flex-col max-h-64 overflow-y-auto">
                        {allBrands.map((brand) => (
                          <label key={brand} className={`flex font-neulissans items-center justify-between w-full cursor-pointer p-6 py-5 border-b-2 border-primary-900/15 ${tempFilters.brands.includes(brand) ? 'bg-primary-300' : 'bg-primary-100 hover:bg-primary-200'} transition-all`}>
                            <span className="text-base md:text-lg text-[#35463A] tracking-tight">{brand}</span>
                            {/* Custom Checkbox */}
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={tempFilters.brands.includes(brand)}
                                onChange={(e) => handleBrandChange(brand, e.target.checked)}
                                className="sr-only" // Hide default checkbox
                              />
                              <div
                                className={`
                                  w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
                                  ${tempFilters.brands.includes(brand)
                                    ? 'bg-primary-600 border-primary-600'
                                    : 'bg-white border-gray-300 hover:border-primary-400'
                                  }
                                    `}
                              >
                                {tempFilters.brands.includes(brand) && (
                                  <Icon name='check' className='h-3 w-3 fill-white' />
                                )}
                              </div>
                            </div>
                          </label>

                        ))}
                      </div>
                      <div className="flex w-full p-4 gap-4">
                        <button
                          className='flex font-medium tracking-tighter text-primary-900/70 hover:text-primary-900 text-base md:text-lg items-center justify-center px-3 md:px-5 py-3 transition-all'
                          onClick={() => setBrandDropdownOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className='flex font-medium tracking-tighter text-base md:text-lg items-center justify-center rounded-[15px] px-3 md:px-5 py-3 w-full bg-primary-500 transition-all hover:bg-primary-400'
                          onClick={handleBrandConfirm}>
                          Save
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div className='h-full flex w-[2px] bg-primary-900/30' />
              {/* Category Dropdown */}
              <div className="relative h-full flex-1 flex" ref={categoryRef}>
                <button
                  className={`flex justify-between h-full w-full items-center p-6 py-4 ${hasActiveCategory ? 'bg-primary-300' : 'bg-primary-100'} max-md:rounded-[0px_14.5px_0px_0px]`}
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                >
                  <h5 className=''>Category</h5>
                  <div className='flex items-center justify-center gap-2'>
                    <span className={`flex items-center justify-center w-8 h-8 bg-primary-900 text-white text-sm font-bold rounded-[10px] transition-all ${hasActiveCategory ? 'opacity-100' : 'opacity-0'}`}>{filters.categories.length > 0 && `${filters.categories.length}`}</span>
                    <Icon name='chevronDown' className={`h-4 w-4 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {categoryDropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    className="absolute top-[94%] max-md:-right-[1%] md:-left-[0.5%] mt-1 w-64 md:w-72 bg-primary-100 border-2 border-primary-900/30 rounded-[15px_0px_30px_30px] md:rounded-[0px_15px_30px_30px] shadow-lg z-50 overflow-hidden">
                    <div className="flex flex-col">
                      <div className="flex flex-col max-h-64 overflow-y-auto">
                        {categories.map((category) => (
                          <label key={category.id} className={`flex font-neulissans items-center justify-between w-full cursor-pointer p-6 py-5 border-b-2 border-primary-900/15 ${tempFilters.categories.includes(category.id) ? 'bg-primary-300' : 'bg-primary-100 hover:bg-primary-200'} transition-all`}>
                            <span className="text-base md:text-lg text-[#35463A] tracking-tight">{category.name}</span>
                            {/* Custom Checkbox */}
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={tempFilters.categories.includes(category.id)}
                                onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                                className="sr-only" // Hide default checkbox
                              />
                              <div
                                className={`
                                  w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
                                  ${tempFilters.categories.includes(category.id)
                                    ? 'bg-primary-600 border-primary-600'
                                    : 'bg-white border-gray-300 hover:border-primary-400'
                                  }
                                    `}
                              >
                                {tempFilters.categories.includes(category.id) && (
                                  <Icon name='check' className='h-3 w-3 fill-white' />
                                )}
                              </div>
                            </div>
                          </label>

                        ))}
                      </div>
                      <div className="flex w-full p-4 gap-4">
                        <button
                          className='flex font-medium tracking-tighter text-primary-900/70 hover:text-primary-900 text-base md:text-lg items-center justify-center px-3 md:px-5 py-3 transition-all'
                          onClick={() => setCategoryDropdownOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className='flex font-medium tracking-tighter text-base md:text-lg items-center justify-center rounded-[15px] px-3 md:px-5 py-3 w-full bg-primary-500 transition-all hover:bg-primary-400'
                          onClick={handleCategoryConfirm}>
                          Save
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div className='h-full hidden md:flex w-[2px] bg-primary-900/30' />
            </div>
            <div className='flex flex-[3] font-neulissans'>
              {/* Product Type Dropdown */}
              <div className="relative h-full flex-[3] flex" ref={productTypeRef}>
                <button
                  className={`flex justify-between h-full w-full items-center p-6 py-4 ${hasActiveProductType ? 'bg-primary-300' : 'bg-primary-100'} ${productTypeDropdownOpen ? 'rounded-[0px]' : 'rounded-[0px_0px_0px_14.5px]'}`}
                  onClick={() => setProductTypeDropdownOpen(!productTypeDropdownOpen)}
                >
                  <h5 className=''>Product Type</h5>
                  <div className='flex items-center justify-center gap-2'>
                    <span className={`flex items-center justify-center w-8 h-8 bg-primary-900 text-white text-sm font-bold rounded-[10px] transition-all ${hasActiveProductType ? 'opacity-100' : 'opacity-0'}`}>{filters.productType.length > 0 && `${filters.productType.length}`}</span>
                    <Icon name='chevronDown' className={`h-4 w-4 transition-transform ${productTypeDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {productTypeDropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    className="absolute top-[94%] -left-[1%] md:-left-[0.5%] mt-1 w-56 md:w-72 bg-primary-100 border-2 border-primary-900/30 rounded-[0px_15px_30px_30px] shadow-lg z-50 overflow-hidden">
                    <div className="flex flex-col">
                      <div className="flex flex-col max-h-64 overflow-y-auto">
                        {productTypes.map((productType) => (
                          <label key={productType.id} className={`flex font-neulissans items-center justify-between w-full cursor-pointer p-6 py-5 border-b-2 border-primary-900/15 ${tempFilters.productType.includes(productType.id) ? 'bg-primary-300' : 'bg-primary-100 hover:bg-primary-200'} transition-all`}>
                            <span className="text-base md:text-lg text-[#35463A] tracking-tight">{productType.name}</span>
                            {/* Custom Checkbox */}
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={tempFilters.productType.includes(productType.id)}
                                onChange={(e) => handleProductTypeChange(productType.id, e.target.checked)}
                                className="sr-only" // Hide default checkbox
                              />
                              <div
                                className={`
                                  w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
                                  ${tempFilters.productType.includes(productType.id)
                                    ? 'bg-primary-600 border-primary-600'
                                    : 'bg-white border-gray-300 hover:border-primary-400'
                                  }
                                    `}
                              >
                                {tempFilters.productType.includes(productType.id) && (
                                  <Icon name='check' className='h-3 w-3 fill-white' />
                                )}
                              </div>
                            </div>
                          </label>

                        ))}
                      </div>
                      <div className="flex w-full p-4 gap-4">
                        <button
                          className='flex font-medium tracking-tighter text-primary-900/70 hover:text-primary-900 text-base md:text-lg items-center justify-center px-3 md:px-5 py-3 transition-all'
                          onClick={() => setProductTypeDropdownOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className='flex font-medium tracking-tighter text-base md:text-lg items-center justify-center rounded-[15px] px-3 md:px-5 py-3 w-full bg-primary-500 transition-all hover:bg-primary-400'
                          onClick={handleProductTypeConfirm}>
                          Save
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              {/* Sort By Dropdown 
              <div className="relative h-full flex-[3] flex" ref={sortRef}>
                <button
                  className={`flex justify-between h-full w-full items-center p-6 py-4 bg-primary-100 ${sortDropdownOpen ? 'max-md:rounded-[0px]' : 'max-md:rounded-[0px_0px_0px_14.5px]'} `}
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                >
                  <div className='flex max-md:flex-col gap-2 md:items-center'>
                    <h5 className='max-md:text-left'>Sort By:</h5>
                    <span className='text-xs md:text-base max-md:text-left opacity-70'>
                      {
                        filters.sortBy === 'name-asc' ? 'Name (A-Z)' :
                          filters.sortBy === 'name-desc' ? 'Name (Z-A)' : 'Newest First'
                      }
                    </span>
                  </div>

                  <Icon name='chevronDown' className={`h-4 w-4 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {sortDropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    className="absolute top-[94%] -left-[1%] md:-left-[0.5%] mt-1 w-56 md:w-72 bg-primary-100 border-2 border-primary-900/30 rounded-[0px_15px_30px_30px] shadow-lg z-50 overflow-hidden">
                    <div className="flex flex-col">
                      <div className="flex flex-col max-h-64 overflow-y-auto">
                        <label className={`flex font-neulissans items-center justify-between w-full cursor-pointer p-6 py-5 border-b-2 border-primary-900/15 ${tempFilters.sortBy.includes('name-asc') ? 'bg-primary-300' : 'bg-primary-100 hover:bg-primary-200'} transition-all`}>
                          <span className="text-base md:text-lg text-[#35463A] tracking-tight">Name (A-Z)</span>
                          <input
                            type="radio"
                            name="sort"
                            value="name-asc"
                            checked={tempFilters.sortBy === 'name-asc'}
                            onChange={(e) => setTempFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                            className="sr-only"
                          />
                          <div
                            className={`
                                  w-5 h-5 p-[3px] md:w-6 md:h-6 md:p-[4px] rounded-[8px] md:rounded-[10px] border-2 transition-all duration-200 flex items-center justify-center border-primary-800
                                  ${tempFilters.sortBy.includes('name-asc')
                                ? 'bg-transparent '
                                : 'bg-white border-gray-300 hover:border-primary-400'
                              }`}
                          >
                            <div className={`w-full h-full rounded-[4px] md:rounded-[5px] ${tempFilters.sortBy.includes('name-asc') ? 'bg-primary-700 ' : 'bg-primary-700/0'} transition-all`} />
                          </div>
                        </label>
                        <label className={`flex font-neulissans items-center justify-between w-full cursor-pointer p-6 py-5 border-b-2 border-primary-900/15 ${tempFilters.sortBy.includes('name-desc') ? 'bg-primary-300' : 'bg-primary-100 hover:bg-primary-200'} transition-all`}>

                          <span className="text-base md:text-lg text-[#35463A] tracking-tight">Name (Z-A)</span>
                          <input
                            type="radio"
                            name="sort"
                            value="name-desc"
                            checked={tempFilters.sortBy === 'name-desc'}
                            onChange={(e) => setTempFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                            className="sr-only"
                          />
                          <div
                            className={`
                                  w-5 h-5 p-[3px] md:w-6 md:h-6 md:p-[4px] rounded-[8px] md:rounded-[10px] border-2 transition-all duration-200 flex items-center justify-center border-primary-800
                                  ${tempFilters.sortBy.includes('name-desc')
                                ? 'bg-transparent '
                                : 'bg-white border-gray-300 hover:border-primary-400'
                              }`}
                          >
                            <div className={`w-full h-full rounded-[4px] md:rounded-[5px] ${tempFilters.sortBy.includes('name-desc') ? 'bg-primary-700 ' : 'bg-primary-700/0'} transition-all`} />
                          </div>
                        </label>
                        <label className={`flex font-neulissans items-center justify-between w-full h-full cursor-pointer p-6 py-5 border-b-2 border-primary-900/15 ${tempFilters.sortBy.includes('newest') ? 'bg-primary-300' : 'bg-primary-100 hover:bg-primary-200'} transition-all`}>
                          <span className="text-base md:text-lg text-[#35463A] tracking-tight">Newest First</span>
                          <input
                            type="radio"
                            name="sort"
                            value="newest"
                            checked={tempFilters.sortBy === 'newest'}
                            onChange={(e) => setTempFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                            className="sr-only"
                          />
                          <div
                            className={`
                                  w-5 h-5 p-[3px] md:w-6 md:h-6 md:p-[4px] rounded-[8px] md:rounded-[10px] border-2 transition-all duration-200 flex items-center justify-center border-primary-800
                                  ${tempFilters.sortBy.includes('newest')
                                ? 'bg-transparent '
                                : 'bg-white border-gray-300 hover:border-primary-400'
                              }`}
                          >
                            <div className={`w-full h-full rounded-[4px] md:rounded-[5px] ${tempFilters.sortBy.includes('newest') ? 'bg-primary-700 ' : 'bg-primary-700/0'} transition-all`} />
                          </div>
                        </label>
                      </div>
                      <div className="flex w-full p-4 gap-4">
                        <button
                          className='flex font-medium tracking-tighter text-primary-900/70 hover:text-primary-900 text-base md:text-lg items-center justify-center px-3 md:px-5 py-3 transition-all'
                          onClick={() => setSortDropdownOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className='flex font-medium tracking-tighter text-base md:text-lg items-center justify-center rounded-[15px] px-3  md:px-5 py-3 w-full bg-primary-500 transition-all hover:bg-primary-400'
                          onClick={handleSortConfirm}>
                          Save
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              */}
              <div className='h-full flex w-[2px] bg-primary-900/30' />
              <div className={`flex gap-4 flex-[5] items-center rounded-[0px_15px_15px_0px] ${filters.search ? 'bg-primary-300 ' : 'bg-primary-100 '} transition-all `}>
                <Icon name="search" width={20} className="ml-6" />
                <input
                  className='
                    bg-transparent font-neulissans w-full py-4 pl-0 px-8
                    md:text-xl text-lg font-normal
                    placeholder:font-neulissans placeholder:text-base placeholder:font-normal placeholder:tracking-tight placeholder:text-[#afb3b0]
                    focus-visible:outline-none 
                    disabled:cursor-not-allowed disabled:opacity-50
                  '
                  placeholder='Search products'
                  value={filters.search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />

              </div>
            </div>
          </div>
          <div className="flex justify-between w-full px-3 pr-0 py-4">
            <div className="flex flex-col max-md:w-full md:flex-row md:items-center justify-center md:justify-between gap-4">
              <div className='flex gap-4 max-md:justify-center'>
                <p className="font-neulissans tracking-tight text-[#808381] text-lg py-3">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                <span className={` ${activeFilters.length > 0 ? 'inline-block' : 'hidden'} w-1 h-1 rounded-full bg-[#808381] self-center`}></span>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="md:hidden flex py-3 items-center gap-3 hover:opacity-80 transition-all hover:translate-y-0.5"
                  >
                    <p className='font-neulissans tracking-tight text-lg'>Reset Filters</p>
                    <RotateCcw className="h-5 w-5" />
                  </button>
                )}
              </div>
              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="flex max-md:w-full justify-center flex-wrap gap-2 md:gap-4">
                  {activeFilters.map((filter, index) => (
                    <div key={index} className="flex max-md:text-sm items-center py-2 px-3 bg-primary-100 border border-primary-900/30 rounded-[15px] font-neulissans gap-3">
                      {filter.label}
                      <button
                        onClick={() => removeFilter(filter.type, filter.value)}
                        className="group hover:bg-primary-900 rounded-full p-1.5 border border-primary-900/30 transition-all"
                      >
                        <X className="group-hover:text-white text-primary-900 transition-all h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="hidden md:flex py-3 px-6 items-center gap-3 hover:opacity-80 transition-all hover:translate-y-0.5"
              >
                <p className='font-neulissans tracking-tight text-lg'>Reset Filters</p>
                <RotateCcw className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

      </section>
      {/* Products Grid */}
      <section className="col-span-full pt-0 py-12 px-4 md:px-24">
        <div className="">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 ">
                {currentProducts.map((product) => (
                  <div key={product.id} className="group hover:translate-y-1 transition-all duration-500 max-md:pb-4 ">
                    <a href={`/products/${product.slug}`}>
                      <div className="p-0">
                        <div className="aspect-square bg-primary-100 rounded-[15px] border-2 border-primary-900/30 overflow-hidden">
                          <img
                            src={product.images[0] || '/assets/images/noimage.jpg'}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/images/noimage.jpg';
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col max-md:px-2 p-4 gap-2">
                        <h4 className="group-hover:text-primary-800 transition-all text-base md:text-xl font-neulissans font-medium tracking-tight leading-tight">{product.title}</h4>
                        <div className="flex text-gray-400 font-medium">
                          {product.brand && (
                            <p className='text-sm md:text-lg font-medium font-neulissans tracking-tight leading-tight'>{product.brand} · {productTypes.find(c => c.id === product.subcategory)?.name} · {product.subtitle} </p>
                          )}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <PaginationComponent />
            </>
          ) : (
            <div className="text-center items-center flex flex-col py-12 px-12 gap-6">
              <p className="text-gray-500 text-2xl mb-4">No products found.</p>
              <Button onClick={resetFilters} variant="light">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

// Loading component for Suspense fallback
function ProductsLoading() {
  return (
    <div className="grid grid-cols-12 pt-20 max-md:gap-y-8">
      <section className="relative col-span-full flex flex-col px-4 md:px-24 py-16 pb-0 gap-24">
        <div className="px-4">
          <h1 className="font-neulisneue">All Products</h1>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </section>
    </div>
  )
}

// Main component with Suspense wrapper
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  )
}