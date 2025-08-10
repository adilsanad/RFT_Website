'use client';
import ContactSection from "@/components/contact-section";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { Button } from "@/components/ui/button";
import Icon from "@/public/assets/vectors";
import Link from "next/link";

const IrrigationPage = () => {
    return (
        <main className="grid grid-cols-4 md:grid-cols-12 gap-24 bg-white font-neulissans tracking-tight">
            {/* Hero Section with Masked Background */}
            <section className="col-span-full flex flex-col md:col-span-12 relative w-full px-2 md:px-10 bg-primary-100 py-[5.5rem] max-md:pb-[10rem]">
                <img className="flex min-h-[480px] object-cover md:hidden rounded-[30px_30px_45px_45px]" src="/assets/images/irrigationhero.png" />
                <div className="flex flex-col max-md:items-end md:absolute md:top-22 md:left-10 w-full md:w-[57vw] h-auto z-10">
                    <svg className="max-md:hidden w-full h-auto" viewBox="0 0 823 435" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 45.9484C0 20.7283 20.7238 0.432288 45.9385 0.958252L763.448 15.9251C806.664 16.8266 834.776 61.7484 816.695 101.01L695.382 364.429C674.908 408.886 629.485 436.454 580.596 434.092L85.6581 410.188C37.6963 407.871 0 368.31 0 320.292V45.9484Z" fill="#BEFAD0" />
                        <path d="M45.9277 1.45801L763.438 16.4248C806.293 17.3188 834.171 61.8662 816.241 100.801L694.928 364.22C674.539 408.492 629.305 435.944 580.62 433.593L85.6826 409.688C37.9872 407.385 0.5 368.043 0.5 320.292V45.9482C0.500087 21.0085 20.9934 0.938065 45.9277 1.45801Z" stroke="#002F0E" stroke-opacity="0.2" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col gap-8 max-md:justify-end max-md:items-center md:p-16 md:pr-44 max-md:text-center max-md:px-8 max-md:pb-8 ">
                        <div className="flex flex-col max-md:p-8 max-md:pb-10 gap-8 max-md:bg-primary-300 max-md:items-center rounded-[60px_60px_90px_90px]">
                            <h5 className="text-xl bg-primary-500 text-primary-900/70 px-6 py-3 md:py-4 rounded-full w-fit font-semibold tracking-tight">
                                Irrigation Systems
                            </h5>
                            <div className="flex flex-col gap-6">
                                <h1 className="">
                                    Smarter systems,
                                    zero-waste irrigation.
                                </h1>
                                <p className='max-md:px-4 subtitle'>
                                    Advanced irrigation systems designed to optimize water usage and enhance agricultural productivity.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="max-md:hidden relative w-full">
                    <img className=" w-full h-auto" src="/assets/images/irrigationmask.png" alt="Rainwater Harvesting Mask" />
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
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="design" className="fill-primary-600" /></div>
                            <h3>Precision Irrigation Design</h3>
                            <p className="body-text">We create custom layouts engineered for maximum coverage and efficiency, ensuring every square inch gets the right amount of water without waste.</p>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="cpu" className="fill-primary-600" /></div>

                            <h3>Automated Control Systems</h3>
                            <p className="body-text">Smart timers, weather-based sensors, and app-connected controllers let you manage watering with zero guesswork, saving time and resources.</p>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 "><Icon width={24} height={24} name="engineer" className="fill-primary-600" /></div>
                            <h3>Expert Installation & Support</h3>
                            <p className="body-text">From trenching to testing, our team handles the full install with minimal disruption and provides ongoing maintenance to keep systems performing flawlessly.</p>
                        </div>
                    </div>

                </div>
            </section>
            <section className="col-span-full md:col-span-12 flex max-md:flex-col w-full  max-md:gap-12 gap-12 px-4 md:px-24 py-28 bg-primary-100 border-t-2 border-b-2 border-primary-900/10 items-center">
                <div className="flex flex-col flex-1 gap-9 px-3 md:pr-12">
                    <h2 className="">Irrigation Systems & Automation</h2>
                    <div className="h-1 rounded-full bg-primary-600 px-2 pr-6"></div>
                    <p className="font-neulissans opacity-75 text-xl">From home gardens to large-scale landscapes to commercial installations , Rainfield delivers reliable irrigation systems that work year after year.</p>
                </div>
                <div className="flex flex-col flex-1  gap-9 p-10 md:px-14 md:py-12 rounded-[30px] border-[3px] bg-white border-primary-600 shadow-[inset_0_0_24px_24px_rgba(216,255,226,0.4)] ">
                    <p className="font-neulissans opacity-75 text-xl pt-3">Rainfield is a top provider of custom irrigation systems in Bangalore, India, serving residential, commercial, and industrial clients. We specialize in drip irrigation, sprinkler setups, and fully automated watering systems using smart controllers and soil sensors.</p>
                    <p className="font-neulissans opacity-75 text-xl pt-9 pb-3 border-t-2 border-black/20">Our irrigation solutions are designed for water efficiency, long-term performance, and hassle-free maintenance. We’ve successfully delivered projects pan-India, including Karnataka, Tamil Nadu, Maharashtra, Kerala, Telangana, and more.</p>
                </div>
            </section>
            <ProjectsCarousel />
            <ContactSection bgColor="bg-white" />
        </main>
    );
}

export default IrrigationPage;