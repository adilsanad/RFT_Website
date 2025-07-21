'use client';
import ContactSection from "@/components/contact-section";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { Button } from "@/components/ui/button";
import Icon from "@/public/assets/vectors";
import Link from "next/link";

const RainwaterPage = () => {
    return (
        <main className="grid grid-cols-12 gap-24 bg-white font-neulissans tracking-tight">
            {/* Hero Section with Masked Background */}
            <section className="col-span-12 relative w-full px-10 bg-primary-100 py-[5.5rem]">
                {/* Container with native aspect ratio (1354:720 = ~1.88:1) */}
                <div className="absolute top-96 right-10 w-[49.5vw] h-auto z-10">
                    <div className=" flex flex-col gap-8 justify-end items-end text-right p-16 rounded-[136px_45px_90px_45px] bg-primary-300 border-2 border-primary-900/15">
                        <div className="bg-primary-500 text-primary-900/80 px-8 py-4 rounded-full text-xl font-medium tracking-tight">
                            rainwater harvesting
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2 className="">
                                Smart, sustainable rainwater solutions
                            </h2>
                            <p className="text-xl ">
                                Advanced irrigation systems designed to optimize water usage and enhance agricultural productivity.
                            </p>
                        </div>

                    </div>
                </div>
                <div className="relative w-full">
                    <img className=" w-full h-auto" src="/assets/images/rwhmask.png" alt="Rainwater Harvesting Mask" />
                    <div className="absolute bottom-36 left-20 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full text-xl font-medium tracking-tight">automated irrigation systems</div>
                       <div className="absolute opacity-40 hover:opacity-100 transition-all top-36 right-32 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full text-xl font-medium tracking-tight">rainfall monitoring</div>
                
                </div>

            </section>

            {/* Content Section */}
            <section className="col-span-12 grid grid-cols-12 px-24 py-8">
                <div className="col-span-12 flex flex-col gap-14">
                    <h2 className="">What we deliver</h2>
                    <div className="flex gap-20">
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="pool" className="fill-primary-600" /></div>

                            <h1 className="text-4xl font-medium tracking-tighter ">Built for India's landscapes.</h1>
                            <p className="text-xl font-manrope">Smart, scalable, and sustainable—our water systems are trusted across India’s toughest climates and most demanding spaces.</p>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="pool" className="fill-primary-600" /></div>

                            <h1 className="text-4xl font-medium tracking-tighter ">Built for India's landscapes.</h1>
                            <p className="text-xl font-manrope">Smart, scalable, and sustainable—our water systems are trusted across India’s toughest climates and most demanding spaces.</p>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="pool" className="fill-primary-600" /></div>

                            <h1 className="text-4xl font-medium tracking-tighter ">Built for India's landscapes.</h1>
                            <p className="text-xl font-manrope">Smart, scalable, and sustainable—our water systems are trusted across India’s toughest climates and most demanding spaces.</p>
                        </div>
                    </div>

                </div>
            </section>
            <section className="col-span-12 grid grid-cols-12 px-24 py-28 bg-primary-100 border-t-2 border-b-2 border-primary-900/10 items-center">
                <div className="col-span-6 flex flex-col gap-9 px-3 pr-12">
                    <h2>Rainwater Harvesting & Management Solutions</h2>
                    <div className="h-1 rounded-full bg-primary-600 px-2 pr-6"></div>
                    <p className="font-neulissans opacity-75 text-xl">Whether you're tackling water scarcity or reducing utility costs, Rainfield delivers smart rainwater management solutions tailored to your site.</p>
                </div>
                <div className="col-span-6 flex  flex-col gap-9 px-14 py-12 rounded-[30px] border-[3px] bg-white border-primary-600 shadow-[inset_0_0_24px_24px_rgba(216,255,226,0.4)] ">
                    <p className="font-neulissans opacity-75 text-xl pt-3">Rainfield offers advanced rainwater harvesting solutions in India, helping homes, businesses, and industries manage water sustainably. Based in Bangalore, we design and install custom systems for rooftop harvesting, groundwater recharge, and stormwater management.</p>
                    <p className="font-neulissans opacity-75 text-xl pt-9 pb-3 border-t-2 border-black/20">Our end-to-end service includes filtration, storage, distribution, and automation—built for maximum efficiency and minimal maintenance. Projects completed across Karnataka, Tamil Nadu, Maharashtra, Telangana, and other states.</p>
                </div>
            </section>
            <ProjectsCarousel />
            <ContactSection bgColor="bg-white" />
        </main>
    );
}

export default RainwaterPage;