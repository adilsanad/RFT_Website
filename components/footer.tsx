'use client';
import Icon, { Logo } from "@/public/assets/vectors"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

export default function Footer() {
  const location = usePathname()
  return (
    <footer className="col-span-full font-neulissans grid-cols-4 md:grid-cols-12 grid gap-y-32 md:gap-y-44 relative w-full bg-[#242424] text-white py-16 pt-20 overflow-hidden md:bg-[url('../public/assets/images/footerbg.png')] bg-[url('../public/assets/images/footerbg-mobile.png')] md:bg-right-top bg-right-bottom bg-no-repeat">
      <div className="col-span-full flex flex-col md:grid grid-cols-2 px-11 md:px-20 gap-28 md:gap-8">
        <div className="flex flex-col gap-10">
          <Logo theme="dark" className="w-[220px] md:w-[240px]" />
          <div className="flex gap-5">
            <Button variant="footer" size="footer" className="group"><Icon name="mail" className="fill-primary-600 group-hover:fill-primary-300 transition-all w-6"/></Button>
            <Button variant="footer" size="footer" className="group"><Icon name="phone" className="fill-primary-600 group-hover:fill-primary-300 transition-all w-6"/></Button>
            <Button variant="footer" size="footer" className="group"><Icon name="linkedin" className="fill-primary-600 group-hover:fill-primary-300 transition-all w-6"/></Button>
          </div>
        </div>
        <ul className="flex flex-col gap-5 md:text-right text-xl md:items-end font-light tracking-normal text-white/40">
          <li>
            <Link href="/about" className={`${location.startsWith('/about') ? 'text-white font-medium' : ''} flex gap-x-3 items-start hover:text-white transition-colors`}>
              <p className="md:order-1 order-2">About</p>
              <div className={`order-1 md:order-2 ${location === '/about' ? 'opacity-100' : 'opacity-0'} flex h-[22px] w-[4px] rounded-[2px] mt-[4px] bg-primary-600`}></div>
            </Link>
          </li>
          <li>
            <Link href="/solutions" className={`${location.startsWith('/solutions') ? 'text-white font-medium' : ''} flex gap-x-3 items-start hover:text-white transition-colors`}>
              <p className="md:order-1 order-2">Solutions</p>
              <div className={`order-1 md:order-2 ${location.startsWith('/solutions') ? 'opacity-100' : 'opacity-0'} flex h-[22px] w-[4px] rounded-[2px] mt-[4px] bg-primary-600`}></div>
            </Link>
          </li>
          <li>
            <Link href="/products" className={`${location.startsWith('/products') ? 'text-white font-medium' : ''} flex gap-x-3 items-start hover:text-white transition-colors`}>
              <p className="md:order-1 order-2">Products</p>
              <div className={`order-1 md:order-2 ${location.startsWith('/products') ? 'opacity-100' : 'opacity-0'} flex h-[22px] w-[4px] rounded-[2px] mt-[4px] bg-primary-600`}></div>
            </Link>
          </li>
          <li>
            <Link href="#contact" className={`${location.startsWith('/contact') ? 'text-white font-medium' : ''} flex gap-x-3 items-start hover:text-white transition-colors`}>
              <p className="md:order-1 order-2">Contact</p>
              <div className={`order-1 md:order-2 ${location === '/contact' ? 'opacity-100' : 'opacity-0'} flex h-[22px] w-[4px] rounded-[2px] mt-[4px] bg-primary-600`}></div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-span-full text-md md:text-lg grid grid-cols-2 px-11 md:px-20 gap-4 md:gap-8 opacity-60">
        <p className=" max-md:col-span-full text-gray-400">Kalkere-Agara, Horamavu, Bengaluru, 560043, India</p>
        <p className=" max-md:col-span-full md:text-right text-gray-400 font-light">© 2025 Rainfield. All rights reserved.</p>
      </div>
    </footer>
  )
}
