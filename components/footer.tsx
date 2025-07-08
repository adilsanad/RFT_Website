'use client';
import Icon, { Logo } from "@/public/assets/vectors"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

export default function Footer() {
  const location = usePathname()
  return (
    <footer className="col-span-full font-neulissans grid-cols-12 grid gap-y-32 relative w-full bg-[#242424] text-white py-16 pt-20 overflow-hidden bg-[url('../public/assets/images/footerbg.png')] bg-right-top bg-no-repeat">
      <div className="col-span-full grid grid-cols-2 px-20 gap-8">
        <div className="flex flex-col gap-10">
          <Logo width={240} theme="dark" />
          <div className="flex gap-5">
            <Button variant="footer" size="footer"><Icon name="mail" className="fill-primary-600"/></Button>
            <Button variant="footer" size="footer"><Icon name="phone" className="fill-primary-600"/></Button>
            <Button variant="footer" size="footer"><Icon name="linkedin" className="fill-primary-600"/></Button>
          </div>
        </div>
        <ul className="flex flex-col gap-4 text-right text-xl items-end font-light tracking-tight text-white/40">
          <li>
            <Link href="/about" className="flex gap-x-3 items-start hover:text-white transition-colors">
              <p>About</p>
              <div className={`${location === '/about' ? 'opacity-100' : 'opacity-0'} flex h-[22px] w-[4px] rounded-[2px] mt-[2px] bg-primary-600`}></div>
            </Link>
          </li>
          <li>
            <Link href="/solutions" className="flex gap-x-3 items-start hover:text-white transition-colors">
              <p>Solutions</p>
              <div className={`${location === '/solutions' ? 'opacity-100' : 'opacity-0'} flex h-[22px] w-[4px] rounded-[2px] mt-[2px] bg-primary-600`}></div>
            </Link>
          </li>
          <li>
            <Link href="/products" className={`${location === '/products' ? 'text-white' : ''} flex gap-x-3 items-start hover:text-white transition-colors`}>
              <p>Products</p>
              <div className={`${location === '/products' ? 'opacity-100' : 'opacity-0'} flex h-[22px] w-[4px] rounded-[2px] mt-[2px] bg-primary-600`}></div>
            </Link>
          </li>
          <li>
            <Link href="#contact" className="flex gap-x-3 items-start hover:text-white transition-colors">
              <p>Contact</p>
              <div className={`${location === '/contact' ? 'opacity-100' : 'opacity-0'} flex h-[22px] w-[4px] rounded-[2px] mt-[2px] bg-primary-600`}></div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-span-full text-lg grid grid-cols-2 px-20 gap-8">
        <p className=" text-gray-400">Kalkere-Agara, Horamavu, Bengaluru, 560043, India</p>
        <p className=" text-right text-gray-400 font-light">© 2024 Rainfield. All rights reserved.</p>
      </div>
    </footer>
  )
}
