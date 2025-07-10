'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Icon, { Logo } from "@/public/assets/vectors"

const ProductsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("rainwater-harvesting")

  const categories = [
    { id: "rainwater-harvesting", name: "Rainwater Harvesting", slug: "rainwater-harvesting" },
    { id: "irrigation", name: "Irrigation Systems", slug: "irrigation" },
    { id: "water-features", name: "Water Features", slug: "water-features" }
  ]

  // Placeholder brand logos for each category
  const brandsByCategory = {
    "rainwater-harvesting": [
      { name: "Hunter", logo: "hunter-logo.svg" },
      { name: "Rain Bird", logo: "rainbird-logo.svg" },
      { name: "Aquatech", logo: "aquatech-logo.svg" },
      { name: "WaterWise", logo: "waterwise-logo.svg" },
      { name: "EcoFlow", logo: "ecoflow-logo.svg" }
    ],
    "irrigation": [
      { name: "Hunter", logo: "hunter-logo.svg" },
      { name: "Paige", logo: "paige-logo.svg" },
      { name: "FinOlex", logo: "finolex-logo.svg" },
      { name: "FitValf", logo: "fitvalf-logo.svg" },
      { name: "Yuzuak", logo: "yuzuak-logo.svg" }
    ],
    "water-features": [
      { name: "Amiad", logo: "amiad-logo.svg" },
      { name: "EcoRain", logo: "ecorain-logo.svg" },
      { name: "JAIN", logo: "jain-logo.svg" },
      { name: "AquaPro", logo: "aquapro-logo.svg" },
      { name: "WaterTech", logo: "watertech-logo.svg" }
    ]
  }

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
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
        className="flex items-center gap-2 text-black hover:text-gray-900 transition-colors"
      >
        <span>Products</span>
        <Icon name="chevronDown" width={10} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 w-[800px] z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            {/* Categories Row (Skinny) */}
            <div className="border-b border-gray-100 bg-gray-50">
              <div className="flex">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'text-primary-600 bg-white border-b-2 border-primary-600'
                        : 'text-black hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onMouseEnter={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands Row */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Available Brands for {categories.find(c => c.id === activeCategory)?.name}
                </h3>
              </div>
              
              <div className="grid grid-cols-5 gap-6">
                {brandsByCategory[activeCategory as keyof typeof brandsByCategory]?.map((brand, index) => (
                  <div key={index} className="group">
                    <Link 
                      href={`/products?category=${activeCategory}&brand=${brand.name.toLowerCase()}`}
                      className="block"
                    >
                      {/* Placeholder for brand logo */}
                      <div className="aspect-[3/2] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center group-hover:border-primary-300 group-hover:bg-primary-50 transition-colors">
                        <div className="text-center">
                          <div className="w-16 h-10 bg-gray-300 rounded mb-2 mx-auto"></div>
                          <span className="text-xs text-black group-hover:text-primary-600 font-medium">
                            {brand.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* View All Link */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link 
                  href={`/products?category=${activeCategory}`}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View all {categories.find(c => c.id === activeCategory)?.name} products
                  <Icon name="chevronDown" width={12} className="ml-1 rotate-[-90deg]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      setScrolled(currentY > 0)

      if (currentY < lastScrollY || currentY < 50) {
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
    <header
      className={`fixed top-0 col-span-full w-full z-50 transition-all duration-300 font-neulissans ${showHeader ? "translate-y-0" : "-translate-y-full"
        } ${scrolled
          ? "p-4"
          : "p-0"
        }`}
    >
      <div className={`w-full flex items-center justify-between
        ${scrolled
          ? "px-6 py-3 bg-white/50 border border-gray-300 rounded-[15px] shadow-md backdrop-blur-lg"
          : "px-8 py-4 bg-gradient-to-b from-white80 to-white/0 rounded-none shadow-none backdrop-blur-sm"
        }`}>
        <Link href='/' className="flex items-center py-2">
          <Logo width={scrolled ? 140 : 160} />
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

        <Button size="compact">Get Started</Button>
      </div>
    </header>
  )
}
