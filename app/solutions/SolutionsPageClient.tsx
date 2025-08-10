"use client"
import { useState } from "react"
import Icon from "@/public/assets/vectors";
import { Button } from '../../components/ui/button'
import StatsSection from "@/components/StatsSection";
import StatCounter from "@/components/ui/StatCounter";
import DivAnimation from "@/components/ui/DivAnimated";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import SolutionsSection from "@/components/solutions-section";

const SolutionsPageClient = () => {
    return (
        <main className="grid grid-cols-4 md:grid-cols-12 gap-20 bg-white font-neulissans tracking-tight py-[5.5rem]">
            <section className="md:pl-16 md:pr-0 col-span-full relative flex w-full min-h-[50vh] md:min-h-[58vh] items-center bg-primary-100">
                <div className="flex max-md:flex-col gap-12 w-full pr-0 z-10 items-end">
                    <div className="flex flex-1 flex-col gap-4 md:py-16 md:order-1 order-2 max-md:text-center max-w-xl max-md:pb-12 ">
                        <h1 className="">Built for Indian landscapes.</h1>
                        <p className="max-md:px-6 subtitle">Smart, scalable, and sustainable—our water systems are trusted across India's toughest climates and most demanding urban spaces.</p>
                    </div>
                    <div className="flex-1 grid grid-cols-3 w-full md:order-2 order-1">
                        <div className="aspect-square bg-primary-500 rounded-[0px_0px_0px_240px] hover:rounded-[240px_0px_0px_0px] transition-all duration-500" />
                        <div className="aspect-square bg-primary-500 rounded-[0px_0px_240px_0px] hover:rounded-[0px_240px_240px_0px] transition-all duration-500" />
                        <div className="aspect-square bg-primary-300 rounded-[0px_0px_0px_240px] hover:rounded-[240px_0px_240px_0px] transition-all duration-500" />
                        <div className="aspect-square bg-primary-900 rounded-[240px_0px_0px_0px] hover:rounded-[0px_0px_0px_240px] transition-all duration-500" />
                        <div className="aspect-square bg-primary-900 rounded-[0px_240px_0px_0px] hover:rounded-[240px_0px_240px_0px] transition-all duration-500" />
                        <div className="aspect-square bg-primary-700 rounded-[240px_0px_0px_0px] hover:rounded-[240px_0px_0px_240px] transition-all duration-500" />
                    </div>
                </div>
            </section >
            <SolutionsSection />
            <section className="col-span-full relative flex flex-col md:grid grid-cols-12 gap-24 gap-y-20 md:py-24 md:gap-y-28 px-8 md:px-24">
                <div className="col-span-6 flex flex-col gap-8">
                    <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 ">
                        <Icon name="waterDrops" className="fill-primary-600 w-5 md:w-6" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="">Water Solutions, End-to-End</h4>
                        <p className="body-text">From first sketch to final splash, we design and deliver complete water systems — irrigation, rainwater harvesting, and pools — built to last.</p>
                    </div>
                </div>
                <div className="col-span-6 flex flex-col gap-8">
                    <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 ">
                        <Icon name="eco" className="fill-primary-600 w-5 md:w-6" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="">Smart, Sustainable Design</h4>
                        <p className="body-text">Every project blends innovation with efficiency, reducing waste and maximising performance without compromising aesthetics.</p>
                    </div>
                </div>
                <div className="col-span-6 flex flex-col gap-8">
                    <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 ">
                        <Icon name="engineer" className="fill-primary-600 w-5 md:w-6" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="">Expertly Engineered Systems</h4>
                        <p className="body-text">Every project is custom-fit to your property and lifestyle. From discreet irrigation lines to artfully placed water features, we design for both performance and aesthetics, so the end result feels like it's always been part of your space.</p>
                    </div>
                </div>
                <div className="col-span-6 flex flex-col gap-8">
                    <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 ">
                        <Icon name="pipeWrench" className="fill-primary-600 w-5 md:w-6" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="">Turnkey Design & Maintenance</h4>
                        <p className="body-text">We believe great projects don't end at handover. Our team stays with you for the long run, offering maintenance, performance checks, and timely upgrades so your investment keeps paying off year after year.</p>
                    </div>
                </div>
            </section>
            <ProjectsCarousel />
        </main >
    )
}

export default SolutionsPageClient