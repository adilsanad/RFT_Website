"use client"
import { useCountUpOnView } from "@/hooks/use-countup"

export default function StatsSection() {

  const projects = useCountUpOnView(120, 1200)
  const water = useCountUpOnView(99999, 1200)
  const products = useCountUpOnView(1000000, 1200)

  return (
    <section className="relative col-span-full flex w-full py-16">
      <div className="absolute left-0 top-0 bottom-0 z-10 ">
        <svg className="h-full" viewBox="0 0 560 746" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.13086 386.378C1.13117 371.882 19.6505 365.816 28.2266 377.503L176.039 578.933C190.037 598.008 197.584 621.082 197.584 644.742C197.584 700.341 152.513 745.5 96.9141 745.5C44.0144 745.5 1.13109 702.616 1.13086 649.715V386.378ZM331.418 0.5L331.455 0.505859L331.38 1C331.45 0.535519 331.455 0.507428 331.456 0.505859C331.457 0.505981 331.458 0.506595 331.46 0.506836C331.463 0.507338 331.468 0.507813 331.475 0.508789C331.487 0.510734 331.506 0.513722 331.53 0.517578C331.58 0.525344 331.653 0.536945 331.75 0.552734C331.943 0.584302 332.23 0.632238 332.606 0.698242C333.359 0.830338 334.47 1.03423 335.903 1.32324C338.77 1.90127 342.929 2.8187 348.106 4.17676C358.46 6.89282 372.888 11.3725 389.19 18.4287C421.791 32.5396 461.913 56.9654 491.931 98.2188C521.747 139.196 534.867 176.335 540.525 202.604C543.354 215.739 544.318 226.156 544.571 232.977C544.698 236.386 544.647 238.901 544.562 240.408C544.521 241.154 544.469 241.673 544.423 241.932C544.412 241.991 544.397 242.069 544.372 242.137C544.368 242.147 544.361 242.159 544.354 242.173C544.307 276.23 539.856 314.75 524.775 352.298C509.605 390.069 466.947 449.1 404.777 484.567L389.73 493.709C385.208 496.457 384.041 502.506 387.216 506.739L558.128 734.611C561.493 739.097 558.291 745.5 552.684 745.5H404.28L404.13 745.302L2.51074 213.421C1.20574 211.693 0.5 209.586 0.5 207.42V19.4502C0.50024 12.9625 8.71607 10.1551 12.6865 15.2861L251.385 323.757C253.081 325.949 255.697 327.232 258.469 327.232H337.957C341.128 327.232 344.062 325.556 345.673 322.825L388.654 249.948C390.305 247.15 390.31 243.677 388.669 240.873L345.667 167.399C344.06 164.654 341.118 162.967 337.937 162.967H295.685C292.593 162.967 289.678 161.53 287.793 159.08L174.231 11.4541C170.791 6.98162 173.955 0.500154 179.604 0.5H331.418ZM543.962 241.616L544.22 241.618C544.174 241.576 544.11 241.534 544.023 241.509C544.007 241.504 543.99 241.501 543.975 241.498C543.97 241.54 543.966 241.58 543.962 241.616Z" stroke="url(#paint0_linear_1778_589)" stroke-opacity="0.4" />
          <defs>
            <linearGradient id="paint0_linear_1778_589" x1="280" y1="1" x2="280" y2="745" gradientUnits="userSpaceOnUse">
              <stop stop-opacity="0.6" />
              <stop offset="1" stop-opacity="0.41" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="grid grid-cols-12 w-full gap-16 z-20 px-4">
        <div className="col-span-10 col-start-2 grid grid-cols-10 gap-6">
          <h2 className="col-span-5 text-6xl tracking-tighter font-medium text-black">Lorem ipsum dolor sit amet</h2>
          <p className="font-manrope text-xl leading-snug col-span-5 text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Pharetra molestie bibendum mauris pellentesque sit. Ut mauris
            mauris bibendum mauris. Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet
            cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.
          </p>
        </div>
        <div className="col-span-10 col-start-2 grid grid-cols-10 gap-8 font-neulisneue text-primary-900">
          <div className="col-span-3 pb-10 flex flex-col gap-9 bg-primary-200 rounded-[60px] border border-primary-900/15 text-center overflow-hidden">
            <div className="flex flex-col gap-3 w-full bg-primary-500/15 text-2xl px-8 pt-6">
              <p className="opacity-50">projects executed</p>
              <div className="w-full rounded-full bg-primary-900/25 h-[2px]" />
            </div>
            <div ref={projects.ref} className="text-7xl font-medium tracking-tighter ">{projects.count}+</div>
          </div>
          <div className="col-span-4 pb-10 flex flex-col gap-9 bg-primary-200 rounded-[60px] border border-primary-900/15 text-center overflow-hidden">
            <div className="flex flex-col gap-3 w-full bg-primary-500/15 text-2xl px-8 pt-6">
              <p className="opacity-50">gallons of water saved</p>
              <div className="w-full rounded-full bg-primary-900/25 h-[2px]" />
            </div>
            <div ref={water.ref} className="text-7xl font-medium tracking-tighter ">{water.count}</div>
          </div>
          <div className="col-span-3 pb-10 flex flex-col gap-9 bg-primary-200 rounded-[60px] border border-primary-900/15 text-center overflow-hidden">
            <div className="flex flex-col gap-3 w-full bg-primary-500/15 text-2xl px-8 pt-6">
              <p className="opacity-50">products sold</p>
              <div className="w-full rounded-full bg-primary-900/25 h-[2px]" />
            </div>
            <div ref={products.ref} className="text-7xl font-medium tracking-tighter ">{products.count}+</div>
          </div>
        </div>
      </div>
    </section>
  )
}
