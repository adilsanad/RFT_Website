"use client"
import { useState } from "react"
import Icon from "@/public/assets/vectors";
import { Button } from '../../../components/ui/button'
import StatsSection from "@/components/StatsSection";
import StatCounter from "@/components/ui/StatCounter";
import productsData from '@/data/products.json'
import RelatedProductsCarousel from "@/app/products/components/RelatedProducts";

const TeamMember = ({ name, role, image }: { name: string, role: string, image: string }) => (
    <div className="flex-1 h-fit flex flex-col gap-4 items-start ">
        <img src={image} alt={name} className="w-full min-h-80 h-full rounded-[15px] object-cover bg-gray-300" />
    </div>
)

export default function Hunter() {
    const darkColor="#00445D";
    const lightColor="#E2F7FF";

    return (
        <main className="grid grid-cols-12 gap-24 bg-white font-neulissans tracking-tight py-[5.5rem]">
            <section className="col-span-full relative flex flex-col w-full ">
                <div className="flex flex-col w-full px-4 z-10">
                    <div className="relative w-full rounded-[15px_15px_60px_60px] bg-[#00658A] overflow-hidden ">
                        <div className=" flex flex-col gap-4 p-9 px-14 min-h-80 justify-end ">
                            <svg className="max-w-xs" viewBox="0 0 330 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0V78H30.493V39.7959H36.8706V78H67.5628V0H36.8706V31.4388H30.493V0H0Z" fill="white" />
                                <path d="M126.755 61.6837V22.0867H102.64V77.602H110.612C120.178 77.602 126.755 70.4388 126.755 61.6837Z" fill="white" />
                                <path d="M73.1432 22.0867V61.6837C73.1432 70.4388 79.7202 77.602 89.2866 77.602H97.2586V22.0867H73.1432Z" fill="white" />
                                <path d="M132.335 22.0867V77.602H156.451V22.0867H132.335Z" fill="white" />
                                <path d="M126.755 61.6837V22.0867H102.64V77.602H110.612C120.178 77.602 126.755 70.4388 126.755 61.6837Z" fill="white" />
                                <path d="M132.335 22.0867V77.602H156.451V22.0867H132.335Z" fill="white" />
                                <path d="M185.748 38.0051V77.602H161.633V22.0867H169.605C179.171 22.0867 185.748 29.25 185.748 38.0051Z" fill="white" />
                                <path d="M185.748 38.0051V77.602H161.633V22.0867H169.605C179.171 22.0867 185.748 29.25 185.748 38.0051Z" fill="white" />
                                <path d="M183.954 28.2551H192.126V77.602H215.244V28.2551H225.01V22.6837H215.244V0L183.954 28.2551Z" fill="white" />
                                <path d="M246.136 21.0918V71.6327C259.29 71.6327 268.059 68.25 275.832 60.0918V67.4541C266.118 75.4379 261.084 77.602 246.136 77.602C228.199 77.602 219.629 60.8878 219.629 48.949C219.629 36.0153 230.79 21.0918 246.136 21.0918Z" fill="white" />
                                <path d="M250.72 21.0918V49.9439H276.43C276.43 32.0357 266.465 21.0918 250.72 21.0918Z" fill="white" />
                                <path d="M280.017 22.0867V77.602H303.734V22.0867H280.017Z" fill="white" />
                                <path d="M329.643 33.6276C329.643 40.2212 324.289 45.5663 317.685 45.5663C311.081 45.5663 305.727 40.2212 305.727 33.6276C305.727 27.0339 311.081 21.6888 317.685 21.6888C324.289 21.6888 329.643 27.0339 329.643 33.6276Z" fill="white" />
                            </svg>
                            <a href="https://www.hunterirrigation.com" className="flex gap-2 items-center hover:translate-y-0.5 transition-all">
                                <Icon name="url" width={16} className="fill-white" />
                                <p className="text-md font-neulissans font-medium text-white underline underline-offset-2">hunterirrigation.com</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section >
            <section className="col-span-full relative flex flex-col px-24 gap-8">
                <div className="col-span-full flex flex-col gap-12">
                    {/* Dynamic Content */}
                    <div className="min-h-[120px] transition-all duration-300 ease-in-out">
                        <p className="text-xl leading-relaxed text-gray-700">
                            To become the global leader in sustainable water management, creating a world where every drop of water is valued, conserved, and used efficiently. We envision communities thriving through smart water solutions that protect our planet for future generations.
                        </p>
                    </div>
                </div>
                <StatCounter duration={1500} darkColor={darkColor} lightColor={lightColor} StatData={[
                    { title: "projects executed", count: 100 },
                    { title: "gallons of water saved", count: 500000 },
                    { title: "products sold", count: 200 }
                ]} />
            </section>

            <section className={` col-span-full grid grid-cols-12 gap-12 py-36 pt-42 border border-black/15 ${!lightColor && 'bg-primary-100'} rounded-[45px] `}
            style={lightColor ? {backgroundColor: lightColor} : {}}>
                <div className="col-span-10 col-start-2 flex flex-col gap-12 ">
                    <h2 className="font-medium tracking-tighter ">Brand Gallery</h2>
                    <div className="grid grid-cols-3 gap-5 w-full">
                        <TeamMember
                            name="John Doe"
                            role="Project Manager"
                            image="/images/team/john.jpg"
                        />
                        <TeamMember
                            name="Jane Smith"
                            role="Lead Developer"
                            image="/images/team/jane.jpg"
                        />
                        <TeamMember
                            name="Alice Johnson"
                            role="UX Designer"
                            image="/images/team/alice.jpg"
                        />
                        <TeamMember
                            name="John Doe"
                            role="Project Manager"
                            image="/images/team/john.jpg"
                        />
                        <TeamMember
                            name="Jane Smith"
                            role="Lead Developer"
                            image="/images/team/jane.jpg"
                        />
                        <TeamMember
                            name="Alice Johnson"
                            role="UX Designer"
                            image="/images/team/alice.jpg"
                        />

                        <TeamMember
                            name="John Doe"
                            role="Project Manager"
                            image="/images/team/john.jpg"
                        />
                        <TeamMember
                            name="Jane Smith"
                            role="Lead Developer"
                            image="/images/team/jane.jpg"
                        />
                        <TeamMember
                            name="Alice Johnson"
                            role="UX Designer"
                            image="/images/team/alice.jpg"
                        />
                    </div>
                </div>
            </section>
            <section className='col-span-full flex flex-col px-24 pr-0 overflow-x-auto'>
                <RelatedProductsCarousel
                    products={productsData.products}
                    relationType="brand"
                    brandName="Hunter"
                    maxProducts={8}
                    title="Products"
                />
            </section>
        </main>
    )
}