'use client';
import ContactSection from "@/components/contact-section";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { Button } from "@/components/ui/button";
import Icon from "@/public/assets/vectors";
import Link from "next/link";

const RainwaterPage = () => {
    return (
        <main className="grid grid-cols-4 md:grid-cols-12 gap-24 bg-white font-neulissans tracking-tight">
            {/* Hero Section with Masked Background */}
            <section className="col-span-full flex flex-col md:col-span-12 relative w-full px-2 md:px-10 bg-primary-100 py-[5.5rem] max-md:pb-[10rem]">
                <img className="flex min-h-[480px] object-cover md:hidden rounded-[30px_30px_45px_45px]" src="/assets/images/rwhhero.png" />
                {/* Container with native aspect ratio (1354:720 = ~1.88:1) */}
                <div className="flex flex-col max-md:items-end md:absolute md:top-96 md:right-10 md:w-[49.5vw] w-full h-auto z-10">
                    <div className="max-md:absolute inset-0 flex flex-col gap-8 justify-end items-end text-right p-8 md:p-16 max-md:text-center  rounded-[136px_45px_90px_45px] md:bg-primary-300 md:border-2 border-primary-900/15">
                        <div className="flex flex-col max-md:p-8 max-md:pb-10 gap-8 max-md:bg-primary-300 items-end max-md:items-center rounded-[60px_60px_90px_90px]">
                            <div className="text-xl bg-primary-500 text-primary-900/70 px-6 py-3 md:py-4 rounded-full w-fit font-semibold tracking-tight">
                                Rainwater Harvesting
                            </div>
                            <div className="flex flex-col gap-6">
                                <h1 className="">
                                    Smart, sustainable rainwater solutions
                                </h1>
                                <p className="max-md:px-4 subtitle">
                                    Advanced irrigation systems designed to optimize water usage and enhance agricultural productivity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-md:hidden relative w-full">
                    <img className="w-full h-auto" src="/assets/images/rwhmask.png" alt="Rainwater Harvesting Mask" />
                    {/*
                    <div className="absolute bottom-36 left-20 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full text-xl font-medium tracking-tight">automated irrigation systems</div>
                    <div className="absolute opacity-40 hover:opacity-100 transition-all top-36 right-32 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full text-xl font-medium tracking-tight">rainfall monitoring</div>
                    */}
                </div>
            </section>

            {/* Content Section */}
            <section className="col-span-full md:col-span-12 grid grid-cols-4 md:grid-cols-12 px-8 md:px-24 py-16">
                <div className="col-span-12 flex flex-col gap-24">
                    <h2 className="">What we deliver</h2>
                    <div className="flex max-md:flex-col gap-20">
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="pipe" className="fill-primary-600" /></div>
                            <h3>Subsurface Drainage & Stormwater Systems</h3>
                            <p className="body-text">Comprehensive drainage and stormwater solutions for hotels, office parks, and campuses. Minimal maintenance, maximum reliability.</p>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="borewell" className="fill-primary-600" /></div>

                            <h3>Borewell & Aquifer Recharge</h3>
                            <p className="body-text">Tailored modular layouts for factories and large complexes. Designed to scale and built to last.</p>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="rainwater" className="fill-primary-600" /></div>
                            <h3>Rainwater Storage & Management</h3>
                            <p className="body-text">Automated solutions for gardens, lawns, terraces, and landscapes. Set it once—let your system handle the rest.</p>
                        </div>
                    </div>

                </div>
            </section>
            <section className="col-span-full md:col-span-12 flex w-full  max-md:gap-12 gap-12 px-4 md:px-24 py-28 bg-primary-100 border-t-2 border-b-2 border-primary-900/10 items-center">
                <div className="flex flex-col flex-1 gap-9 px-3 md:pr-12">
                    <h2 className="">Rainwater Harvesting & Management Solutions</h2>
                    <div className="h-1 rounded-full bg-primary-600 px-2 pr-6"></div>
                    <p className="font-neulissans opacity-75 text-xl">Whether you're tackling water scarcity or reducing utility costs, Rainfield delivers smart rainwater management solutions tailored to your site.</p>
                </div>
                <div className="flex flex-col flex-1  gap-9 p-10 md:px-14 md:py-12 rounded-[30px] border-[3px] bg-white border-primary-600 shadow-[inset_0_0_24px_24px_rgba(216,255,226,0.4)] ">
                    <p className="font-neulissans opacity-75 text-xl pt-3">Rainfield offers advanced rainwater harvesting solutions in India, helping homes, businesses, and industries manage water sustainably. Based in Bangalore, we design and install custom systems for rooftop harvesting, groundwater recharge, and stormwater management.</p>
                    <p className="font-neulissans opacity-75 text-xl pt-9 pb-3 border-t-2 border-black/20">Our end-to-end service includes filtration, storage, distribution, and automation—built for maximum efficiency and minimal maintenance. Projects completed across North and South India, including Karnataka, Tamil Nadu, Maharashtra, Telangana, Kerala, Delhi, Rajasthan and other states.</p>
                </div>
            </section>
            <ProjectsCarousel />
            <ContactSection bgColor="bg-white" />
        </main>
    );
}

export default RainwaterPage;