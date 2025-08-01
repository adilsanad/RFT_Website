"use client"
import { useState } from "react"
import Icon from "@/public/assets/vectors";
import { Button } from '../../components/ui/button'
import StatsSection from "@/components/StatsSection";
import StatCounter from "@/components/ui/StatCounter";
import DivAnimation from "@/components/ui/DivAnimated";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import SolutionsSection from "@/components/solutions-section";

const TeamMember = ({ name, role, image }: { name: string, role: string, image: string }) => (
    <div className="flex-1 h-fit flex flex-col gap-4 items-start ">
        <img src={image} alt={name} className="w-full min-h-80 h-full rounded-[15px] object-cover bg-gray-300" />
        <div className="flex flex-col gap-1">
            <h3 className="text-3xl font-medium font-neulisneue tracking-tighter">{name}</h3>
            <p className="text-gray-600">{role}</p>
        </div>
    </div>
)
interface Project {
    id: string
    image: string
    location: string
    title: string
    service: string
    organization: string
}

const sampleProjects: Project[] = [
    {
        id: '1',
        image: '/images/projects/dsu-campus.jpg',
        location: 'Dayananda Sagar University, Harohalli, Bengaluru',
        title: 'Dayananda Sagar University',
        service: 'Automated Irrigation Systems',
        organization: 'DSU'
    },
    {
        id: '2',
        image: '/images/projects/tech-park.jpg',
        location: 'Electronic City, Bengaluru',
        title: 'Tech Park Water Management',
        service: 'Rainwater Harvesting & Treatment',
        organization: 'Infosys Limited'
    },
    {
        id: '3',
        image: '/images/projects/residential.jpg',
        location: 'Whitefield, Bengaluru',
        title: 'Luxury Residential Complex',
        service: 'Complete Water Management Solution',
        organization: 'Prestige Group'
    },
    {
        id: '4',
        image: '/images/projects/hospital.jpg',
        location: 'Koramangala, Bengaluru',
        title: 'Multi-Specialty Hospital',
        service: 'Water Purification & Storage',
        organization: 'Manipal Hospitals'
    },
    {
        id: '5',
        image: '/images/projects/factory.jpg',
        location: 'Tumkur Industrial Area',
        title: 'Manufacturing Plant',
        service: 'Industrial Water Treatment',
        organization: 'Toyota Kirloskar'
    }
]

export default function Solutions() {
    const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission')

    const content = {
        mission: {
            text: "We are dedicated to revolutionizing water management through innovative, sustainable solutions that benefit both our clients and the environment. Our mission is to make water conservation accessible, efficient, and profitable for everyone."
        },
        vision: {
            text: "To become the global leader in sustainable water management, creating a world where every drop of water is valued, conserved, and used efficiently. We envision communities thriving through smart water solutions that protect our planet for future generations."
        }
    }

    return (
        <main className="grid grid-cols-4 md:grid-cols-12 gap-20 bg-white font-neulissans tracking-tight py-[5.5rem]">
            <section className="md:pl-16 md:pr-0 col-span-full relative flex w-full min-h-[50vh] md:min-h-[58vh] items-center bg-primary-100">
                <div className="flex max-md:flex-col gap-12 w-full pr-0 z-10 items-end">
                    <div className="flex flex-1 flex-col gap-4 md:py-16 md:order-1 order-2 max-md:text-center max-w-xl max-md:pb-12 ">
                        <h1 className="">Built for Indian landscapes.</h1>
                        <p className="max-md:px-6">Smart, scalable, and sustainable—our water systems are trusted across India’s toughest climates and most demanding urban spaces.</p>
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
                        <Icon name="pool" className="fill-primary-600 w-5 md:w-6" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="">Built for India's landscapes.</h4>
                        <p className="">Smart, scalable, and sustainable—our water systems are trusted across India’s toughest climates and most demanding spaces.</p>
                    </div>
                </div>
                <div className="col-span-6 flex flex-col gap-8">
                    <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 ">
                        <Icon name="pool" className="fill-primary-600 w-5 md:w-6" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="">Built for India's landscapes.</h4>
                        <p className="">Smart, scalable, and sustainable—our water systems are trusted across India’s toughest climates and most demanding spaces.</p>
                    </div>
                </div>
                <div className="col-span-6 flex flex-col gap-8">
                    <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 ">
                        <Icon name="pool" className="fill-primary-600 w-5 md:w-6" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="">Built for India's landscapes.</h4>
                        <p className="">Smart, scalable, and sustainable—our water systems are trusted across India’s toughest climates and most demanding spaces.</p>
                    </div>
                </div>
                <div className="col-span-6 flex flex-col gap-8">
                    <div className="z-10 p-2 flex w-fit rounded-full border-4 border-primary-600 ">
                        <Icon name="pool" className="fill-primary-600 w-5 md:w-6" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="">Built for India's landscapes.</h4>
                        <p className="">Smart, scalable, and sustainable—our water systems are trusted across India’s toughest climates and most demanding spaces.</p>
                    </div>
                </div>
            </section>
            <ProjectsCarousel projects={sampleProjects} />
        </main >
    )
}