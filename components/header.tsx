'use client'
import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Icon, { Logo } from "@/public/assets/vectors"
import productsData from '@/data/products.json'
import { AnimatePresence, motion, scale } from 'motion/react';

const ProductsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("rainwater-harvesting")

  const { products, categories } = productsData

  // Generate brands dynamically based on actual products in each category
  const brandsByCategory = useMemo(() => {
    const brandData: Record<string, Array<{ name: string; logo: string }>> = {}

    categories.forEach(category => {
      // Filter products for this category
      const categoryProducts = products.filter(product => product.category === category.id)

      // Extract unique brands for this category
      const uniqueBrands = [...new Set(
        categoryProducts
          .map(product => product.brand)
          .filter(brand => brand) // Filter out undefined brands
      )]

      // Create brand objects with placeholder logos
      brandData[category.id] = uniqueBrands.map(brand => ({
        name: brand!,
        logo: `/logos/sizematchedbrands/${brand!.toLowerCase().replace(/\s+/g, '-')}-logo.png`
      }))
    })

    return brandData
  }, [products, categories])

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  // Close dropdown when any link is clicked
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <Link
        href="/products"
        className={`flex items-center gap-2 text-black hover:text-primary-900 hover:font-bold ${isOpen ? 'font-bold' : ''} transition-all`}
        onClick={handleLinkClick}
      >
        <span>Products</span>
        <Icon name="chevronDown" width={10} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>

      {/* Dropdown */}
      {isOpen &&
        (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 pt-8 w-[800px] z-50"
          >
            <div className="bg-white rounded-[15px] shadow-xl border border-primary-900/30 overflow-hidden">
              {/* Categories Row (Skinny) */}
              <div className="flex gap-6 p-6 py-5 pb-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`flex flex-col gap-1 p-1 text-md tracking-tight transition-all text-primary-900
                      ${activeCategory === category.id ? 'font-bold' : ''}`}
                    onMouseEnter={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                    <div className={`flex h-0.5 mx-2 transition-all duration-300 rounded-full ${activeCategory === category.id ? 'bg-primary-600' : ' bg-transparent'
                      }`} />

                  </button>
                ))}
              </div>

              {/* Brands Row */}
              <div className="py-4 px-8 bg-primary-100 border-t border-primary-900/15 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="w-full"
                  >
                    {brandsByCategory[activeCategory]?.length > 0 ? (
                      <>
                        <div className="flex flex-wrap gap-12">
                          {brandsByCategory[activeCategory]?.map((brand, index) => (
                            <Link
                              key={index}
                              href={`/products?categories=${activeCategory}&brands=${encodeURIComponent(brand.name)}`}
                              className="flex hover:translate-y-1 transition-all duration-300"
                              onClick={handleLinkClick}
                            >
                              {/* Placeholder for brand logo */}
                              <img src={brand.logo} className="flex w-auto h-20" alt={brand.name} />
                            </Link>
                          ))}
                        </div>

                        {/* View All Link */}
                        <Link
                          href={`/products?categories=${activeCategory}`}
                          className="group inline-flex gap-2 py-2 items-center text-md tracking-tight fill-primary-900/40 text-primary-900/40 hover:text-primary-900 hover:fill-primary-900 transition-colors"
                          onClick={handleLinkClick}
                        >
                          See all {categories.find(c => c.id === activeCategory)?.name} products
                          <Icon name="roundedArrow" width={12} className="" />
                        </Link>
                      </>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-sm">No brands available for this category yet.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
    </div>
  )
}
// Types
interface Category {
  id: string;
  name: string;
}

interface MobileMenuProps {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  categories: Category[];
}

// Mobile Navigation Menu Component
const MobileMenu: React.FC<MobileMenuProps> = ({ showMenu, setShowMenu, categories }) => {
  const [expandedProducts, setExpandedProducts] = useState<boolean>(false)

  const handleLinkClick = (): void => {
    setShowMenu(false)
  }

  return (
    <AnimatePresence>
      {showMenu && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-full bg-white z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Logo className="w-[136px]" />
              <button
                onClick={() => setShowMenu(false)}
                className="p-2 rounded-full bg-primary-200 hover:bg-primary-300 transition-colors"
              >
                <Icon name="check" width={20} className="text-primary-900" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-6">
              <nav className="space-y-1">
                {/* About */}
                <Link
                  href="/about"
                  className="flex items-center justify-between py-4 text-xl text-gray-700 hover:text-primary-900 transition-colors border-b border-gray-100"
                  onClick={handleLinkClick}
                >
                  <span>About</span>
                  <Icon name="chevronDown" width={20} className="-rotate-90 text-gray-400" />
                </Link>

                {/* Solutions */}
                <Link
                  href="/solutions"
                  className="flex items-center justify-between py-4 text-xl text-gray-700 hover:text-primary-900 transition-colors border-b border-gray-100"
                  onClick={handleLinkClick}
                >
                  <span>Solutions</span>
                  <Icon name="chevronDown" width={20} className="-rotate-90 text-gray-400" />
                </Link>

                {/* Products */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => setExpandedProducts(!expandedProducts)}
                    className="flex items-center justify-between w-full py-4 text-xl text-gray-700 hover:text-primary-900 transition-colors"
                  >
                    <span>Products</span>
                    <Icon
                      name="chevronDown"
                      width={20}
                      className={`text-gray-400 transition-transform duration-200 ${expandedProducts ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedProducts && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-4 space-y-3">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/products?categories=${category.id}`}
                              className="block py-2 text-base text-gray-600 hover:text-primary-900 transition-colors"
                              onClick={handleLinkClick}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Brands */}
                <Link
                  href="/brands"
                  className="flex items-center justify-between py-4 text-xl text-gray-700 hover:text-primary-900 transition-colors border-b border-gray-100"
                  onClick={handleLinkClick}
                >
                  <span>Brands</span>
                  <Icon name="chevronDown" width={20} className="-rotate-90 text-gray-400" />
                </Link>

                {/* Contact */}
                <Link
                  href="#contact"
                  className="flex items-center justify-between py-4 text-xl text-gray-700 hover:text-primary-900 transition-colors border-b border-gray-100"
                  onClick={handleLinkClick}
                >
                  <span>Contact</span>
                  <Icon name="chevronDown" width={20} className="-rotate-90 text-gray-400" />
                </Link>
              </nav>

              {/* Get Started Button */}
              <div className="mt-8">
                <Button
                  className="w-full"
                  size="default"
                  onClick={handleLinkClick}
                >
                  Get Started
                </Button>
              </div>

              {/* Footer */}
              <div className="mt-12 text-center">
                <p className="text-sm text-gray-500">© 2025 Rainfield Technologies</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Header() {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [showMenu, setShowMenu] = useState(false);

  const { categories }: { categories: Category[] } = productsData


  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      setScrolled(currentY > 0)

      if (currentY < lastScrollY || currentY < 250) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }

      setLastScrollY(currentY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-neulisneue ${showHeader ? "translate-y-0" : "-translate-y-full"
        } ${scrolled
          ? "p-4"
          : "p-0"
        }`}
    >
      <div className={`w-full flex items-center justify-between
        ${scrolled
          ? "px-6 py-3 bg-white/60 border border-gray-300 rounded-[15px] shadow-md backdrop-blur-lg"
          : "px-8 py-4 bg-gradient-to-b from-white/80 to-white/0 rounded-none shadow-none backdrop-blur-sm"
        }`}>
        <Link href='/' className="flex items-center py-2">
          <Logo className={scrolled ? 'w-[124px] md:w-[140px]' : 'w-[136px] md:w-[160px]'} />
        </Link>

        <nav className="relative hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-black hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link href="/solutions" className="text-black hover:text-gray-900 transition-colors">
            Solutions
          </Link>
          <ProductsDropdown />
          <Link href="#contact" className="text-black  hover:text-gray-900 transition-colors">
            Contact
          </Link>

        </nav>

        <Button className="max-md:hidden" size="compact">Get Started</Button>

        <button onClick={() => setShowMenu(prev => !prev)} className="relative flex flex-col gap-1 md:hidden bg-primary-200 rounded-full items-center p-3">
          <div className="w-3 rounded-full bg-primary-900 h-1" />
          <div className="w-5 rounded-full bg-primary-900 h-1" />
          <div className="w-3 rounded-full bg-primary-900 h-1" />
        </button>
      </div>
    </header>
    <MobileMenu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        categories={categories}
      />
      </>
  )
}