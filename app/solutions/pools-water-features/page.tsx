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
                <img className="flex min-h-[480px] object-cover md:hidden rounded-[30px_30px_45px_45px]" src="/assets/images/poolshero.png" />
                {/* Container with native aspect ratio (1354:720 = ~1.88:1) */}
                <div className="flex flex-col max-md:items-end md:absolute top-96 left-10 md:w-[49.5vw] h-auto z-10">
                    <div className="max-md:absolute inset-0 flex flex-col gap-8 justify-end items-start p-8 md:p-16 max-md:text-center md:rounded-[45px_136px_90px_45px] md:bg-primary-300 md:border-2 border-primary-900/15">
                        <div className="flex flex-col max-md:p-8 max-md:pb-10 gap-8 max-md:bg-primary-300 items-start max-md:items-center rounded-[60px_60px_90px_90px]">
                            <div className="text-xl bg-primary-500 text-primary-900/70 px-6 py-3 md:py-4 rounded-full w-fit font-semibold tracking-tight">
                                Pools & Water Features
                            </div>
                            <div className="flex flex-col gap-6">
                                <h1 className="">
                                    Bespoke Pools & Water Experiences
                                </h1>
                                <p className="max-md:px-4 subtitle">
                                   Water features & Pools built to last, designed to impress, and tailored to your exact requirements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-md:hidden relative w-full">
                    <img className=" w-full h-auto" src="/assets/images/poolsmask.png" alt="Rainwater Harvesting Mask" />
                    <div className="absolute bottom-36 left-20 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full text-xl font-medium tracking-tight">automated irrigation systems</div>
                    <div className="absolute opacity-40 hover:opacity-100 transition-all top-36 right-32 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full text-xl font-medium tracking-tight">rainfall monitoring</div>

                </div>

            </section>

            {/* Content Section */}
            <section className="col-span-full md:col-span-12 grid grid-cols-4 md:grid-cols-12 px-8 md:px-24 py-16">
                <div className="col-span-12 flex flex-col gap-24">
                    <h2 className="">What we deliver</h2>
                    <div className="flex max-md:flex-col gap-20">
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="pool" className="fill-primary-600" /></div>
                            <h3>Residential Pools</h3>
                            <p className="body-text">We create tailored residential pools that integrate seamlessly with your home. Whether it’s a serene plunge pool or a family-friendly leisure space, each build prioritizes beauty, safety, and long-term performance.</p>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="swimming" className="fill-primary-600" /></div>

                            <h3>Professional Pools</h3>
                            <p className="body-text">Our professional-grade pools are designed for heavy use in hotels, resorts, sports facilities, and institutions and are built to exacting standards.</p>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="fountain" className="fill-primary-600" /></div>
                            <h3>Water features</h3>
                            <p className="body-text">From elegant reflecting pools to striking fountains and waterfalls, our custom water features bring movement, texture, and visual drama to any environment — indoors or outdoors.</p>
                        </div>
                    </div>

                </div>
            </section>
            <section className="col-span-full md:col-span-12 flex max-md:flex-col w-full  max-md:gap-12 gap-12 px-4 md:px-24 py-28 bg-primary-100 border-t-2 border-b-2 border-primary-900/10 items-center">
                <div className="flex flex-col flex-1 gap-9 px-3 md:pr-12">
                    <h2 className="">Custom Pools & Water Features</h2>
                    <div className="h-1 rounded-full bg-primary-600 px-2 pr-6"></div>
                    <p className="font-neulissans opacity-75 text-xl">Whether it’s a serene garden pond or a professional olympic-size swimming pool, Rainfield brings your vision for water features to life.</p>
                </div>
                <div className="flex flex-col flex-1  gap-9 p-10 md:px-14 md:py-12 rounded-[30px] border-[3px] bg-white border-primary-600 shadow-[inset_0_0_24px_24px_rgba(216,255,226,0.4)] ">
                    <p className="font-neulissans opacity-75 text-xl pt-3">Rainfield designs and builds custom pools and water features in India, serving residential and commercial spaces across Bangalore and beyond. We handle everything from decorative fountains and reflecting pools to large-scale water installations and swimming pools.</p>
                    <p className="font-neulissans opacity-75 text-xl pt-9 pb-3 border-t-2 border-black/20">Our systems combine aesthetic design with technical precision—ensuring long-term performance, efficient water use, and easy upkeep. We've delivered projects throughout Karnataka, Tamil Nadu, Maharashtra, Telangana, and more.</p>
                </div>
            </section>
            <ProjectsCarousel />
            <ContactSection bgColor="bg-white" />
        </main>
    );
}

export default RainwaterPage;