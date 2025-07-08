'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Icon, { Logo } from "@/public/assets/vectors"

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
          ? "px-6 py-3 bg-primary-100/75 border border-gray-300 rounded-[15px] shadow-md backdrop-blur-lg"
          : "px-8 py-4 bg-gradient-to-b from-primary-100/80 to-primary-100/0 rounded-none shadow-none backdrop-blur-sm"
        }`}>
        <Link href='/' className="flex items-center py-2">
          <Logo width={scrolled ? 140 : 160} />
        </Link>

        <nav className="relative hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link href="#solutions" className="text-gray-600 hover:text-gray-900 transition-colors">
            Solutions
          </Link>
          <div className="group flex text-gray-600 hover:text-gray-900 transition-colors">
            <Link href="/products" className="flex gap-2">
              <p>Products</p>
              <Icon name="chevronDown" width={10} className="" />
            </Link>
            <div className="group-hover:flex hidden bg-primary-200 h-fit">
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4">
                <ul className="space-y-2">
                  <li>
                    <Link href="/products/category1" className="block text-gray-700 hover:text-gray-900">
                      Category 1
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/category2" className="block text-gray-700 hover:text-gray-900">
                      Category 2
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/category3" className="block text-gray-700 hover:text-gray-900">
                      Category 3
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

          </div>
          <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </Link>

        </nav>

        <Button size="compact">Get Started</Button>
      </div>
    </header>
  )
}
