"use client"

import { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, X, Check, RotateCcw, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import productsData from '@/data/products.json'

interface FilterState {
  search: string
  categories: string[]
  brands: string[]
  sortBy: string
}

interface TempFilterState {
  categories: string[]
  brands: string[]
  sortBy: string
}

export default function ProductsPage() {
  const { products, categories } = productsData
  const searchParams = useSearchParams()
  const router = useRouter()

  // Main filter state (applied filters)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    brands: [],
    sortBy: 'name-asc'
  })

  // Temporary filter state for dropdowns
  const [tempFilters, setTempFilters] = useState<TempFilterState>({
    categories: [],
    brands: [],
    sortBy: 'name-asc'
  })

  // Dropdown open states
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false)
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Refs for dropdown positioning
  const categoryRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoriesParam = searchParams.get('categories')
    const brandsParam = searchParams.get('brands')
    const searchParam = searchParams.get('search')
    const sortParam = searchParams.get('sort')

    const initialFilters: FilterState = {
      search: searchParam || '',
      categories: categoriesParam ? [categoriesParam] : [],
      brands: brandsParam ? [brandsParam] : [],
      sortBy: sortParam || 'name-asc'
    }

    setFilters(initialFilters)
    setTempFilters({
      categories: initialFilters.categories,
      brands: initialFilters.brands,
      sortBy: initialFilters.sortBy
    })
  }, [searchParams])

  // Update URL when filters change
  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams()
    
    if (newFilters.search) params.set('search', newFilters.search)
    if (newFilters.categories.length > 0) params.set('categories', newFilters.categories[0])
    if (newFilters.brands.length > 0) params.set('brands', newFilters.brands[0])
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
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower) ||
        product.brand?.toLowerCase().includes(searchLower)
      )
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category))
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => product.brand && filters.brands.includes(product.brand))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
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
  const hasActiveFilters = filters.search || filters.categories.length > 0 || filters.brands.length > 0 || filters.sortBy !== 'name-asc'

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const active = []
    if (filters.search) {
      active.push({ type: 'search', value: `"${filters.search}"`, label: `Search: "${filters.search}"` })
    }
    filters.categories.forEach(categoryId => {
      const category = categories.find(c => c.id === categoryId)
      if (category) {
        active.push({ type: 'category', value: categoryId, label: category.name })
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
  }, [filters, categories])

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
      brands: [],
      sortBy: 'name-asc'
    }
    setFilters(newFilters)
    setTempFilters({
      categories: [],
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
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="light"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getVisiblePages().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "light"}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
            className="px-3"
          >
            {page}
          </Button>
        ))}

        <Button
          variant="light"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-neulisneue font-bold mb-4">All Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Explore our comprehensive range of water management solutions. Request quotes for any products that meet your needs.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search products..." 
                className="pl-10"
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative" ref={categoryRef}>
              <Button 
                variant="light" 
                className="w-full md:w-[200px] justify-between"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              >
                Categories {filters.categories.length > 0 && `(${filters.categories.length})`}
                <ChevronDown className={`h-4 w-4 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Select Categories</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tempFilters.categories.includes(category.id)}
                            onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{category.name}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-end space-x-2 mt-4 pt-3 border-t">
                      <Button 
                        variant="light" 
                        size='compact' 
                        onClick={() => setCategoryDropdownOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button size='compact' onClick={handleCategoryConfirm}>
                        <Check className="h-4 w-4 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Brand Filter Dropdown */}
            <div className="relative" ref={brandRef}>
              <Button 
                variant="light" 
                className="w-full md:w-[200px] justify-between"
                onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
              >
                Brands {filters.brands.length > 0 && `(${filters.brands.length})`}
                <ChevronDown className={`h-4 w-4 transition-transform ${brandDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {brandDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Select Brands</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {allBrands.map((brand) => (
                        <label key={brand} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tempFilters.brands.includes(brand)}
                            onChange={(e) => handleBrandChange(brand, e.target.checked)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-end space-x-2 mt-4 pt-3 border-t">
                      <Button 
                        variant="light" 
                        size='compact' 
                        onClick={() => setBrandDropdownOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button size='compact' onClick={handleBrandConfirm}>
                        <Check className="h-4 w-4 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sort By Dropdown */}
            <div className="relative" ref={sortRef}>
              <Button 
                variant="light" 
                className="w-full md:w-[200px] justify-between"
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              >
                {filters.sortBy === 'name-asc' ? 'Name (A-Z)' : 
                 filters.sortBy === 'name-desc' ? 'Name (Z-A)' : 'Newest First'}
                <ChevronDown className={`h-4 w-4 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {sortDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full md:w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Sort Products</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value="name-asc"
                          checked={tempFilters.sortBy === 'name-asc'}
                          onChange={(e) => setTempFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Name (A-Z)</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value="name-desc"
                          checked={tempFilters.sortBy === 'name-desc'}
                          onChange={(e) => setTempFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Name (Z-A)</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value="newest"
                          checked={tempFilters.sortBy === 'newest'}
                          onChange={(e) => setTempFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Newest First</span>
                      </label>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4 pt-3 border-t">
                      <Button 
                        variant="light" 
                        size='compact' 
                        onClick={() => setSortDropdownOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button size='compact' onClick={handleSortConfirm}>
                        <Check className="h-4 w-4 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Info and Active Filters */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                {filteredProducts.length !== products.length && ` (filtered from ${products.length} total)`}
              </p>
              
              {hasActiveFilters && (
                <Button
                  variant="light"
                  onClick={resetFilters}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Filters
                </Button>
              )}
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 self-center">Active filters:</span>
                {activeFilters.map((filter, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {filter.label}
                    <button
                      onClick={() => removeFilter(filter.type, filter.value)}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Products Grid - Changed to 3 columns */}
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <a href={`/products/${product.slug}`}>
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
                    </a>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" variant="default">
                        Request Quote
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <PaginationComponent />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No products found matching your criteria</p>
              <Button onClick={resetFilters} variant="light">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          )}
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
            <a href="/contact">Contact Our Experts</a>
          </Button>
        </div>
      </section>
    </div>
  )
}