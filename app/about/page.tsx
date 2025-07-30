"use client"
import { useState } from "react"
import Icon from "@/public/assets/vectors";
import { Button } from '../../components/ui/button'
import StatsSection from "@/components/StatsSection";
import StatCounter from "@/components/ui/StatCounter";
import DivAnimation from "@/components/ui/DivAnimated";
import { AnimatePresence, motion } from 'motion/react'

const TeamMember = ({ name, role, image }: { name: string, role: string, image: string }) => (
    <div className="flex-1 h-fit flex flex-col gap-6 md:gap-4 items-center md:items-start ">
        <img src={image} alt={name} className="w-full min-h-80 h-full rounded-[15px] object-cover bg-gray-300" />
        <div className="flex flex-col max-md:text-center gap-1 px-4">
            <h3 className="text-3xl font-medium font-neulisneue tracking-tighter">{name}</h3>
            <p className="text-gray-600">{role}</p>
        </div>
    </div>
)

export default function About() {
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
        <main className="grid grid-cols-4 md:grid-cols-12 gap-24 min-h-screen bg-white font-neulissans tracking-tight py-[5.5rem] pb-0">
            <section className="col-span-full relative flex flex-col w-full ">
                <div className="flex flex-col w-full px-2 md:px-4 z-10">
                    <div className="relative w-full min-h-[480px] md:min-h-[720px] rounded-[15px_15px_60px_60px] bg-gray-500 overflow-hidden ">
                        <div className="absolute flex flex-col gap-4 left-0 right-0 bottom-0 p-10 md:p-12 md:max-w-xl ">
                            <h1>Lorem ipsum dolor sit amet.</h1>
                            <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
                        </div>
                    </div>
                </div>
            </section >
            <section className="col-span-full relative flex flex-col px-8 md:px-24 gap-8">
                <h2 className="col-span-full flex ">Who we are</h2>
                <div className="col-span-full flex flex-col gap-12">
                    {/* Tab Buttons */}
                    <div className="flex gap-4 font-neulisneue text-xl tracking-tighter">
                        <Button
                            variant={activeTab === 'mission' ? 'default' : 'defaultnobg'}
                            size="compact"
                            className={`w-fit transition-all duration-200 border-0 ${activeTab === 'mission' ? 'bg-primary-400' : 'opacity-40'}`}
                            onClick={() => setActiveTab('mission')}
                        >
                            our mission
                        </Button>
                        <Button
                            variant={activeTab === 'vision' ? 'default' : 'defaultnobg'}
                            size="compact"
                            className={`w-fit transition-all duration-200 border-0 ${activeTab === 'vision' ? 'bg-primary-400' : 'opacity-40'}`}
                            onClick={() => setActiveTab('vision')}
                        >
                            our vision
                        </Button>
                    </div>
                    {/* Dynamic Content */}
                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab} initial={{ opacity: 0, translateY: 20 }} animate={{ opacity: 100, translateY: 0 }} className="min-h-[120px] transition-all duration-300 ease-in-out">
                            <p className="text-xl leading-relaxed text-gray-700">
                                {content[activeTab].text}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <StatCounter duration={1500} StatData={[
                    { title: "projects executed", count: 100 },
                    { title: "gallons of water saved", count: 500000 },
                    { title: "products sold", count: 200 }
                ]} />
            </section>

            <section className="col-span-full flex flex-col gap-12 rounded-[45px_45px_0px_0px] bg-primary-100 ">
                <div className="col-span-full flex max-md:flex-col w-full items-center gap-8 md:gap-24 max-md:px-2 md:pl-24 py-16 md:py-24">
                    <div className="flex md:flex-[2] flex-col gap-8 max-md:px-8 py-16">
                        <h2 className="">Our Impact</h2>
                        <p>Lorem ipsum dolor sit amet consectetur. Pretium lobortis ante libero viverra ultricies suspendisse eget pulvinar sit. Purus sapien tincidunt est integer ultricies in arcu. Urna id amet nec id duis.
                            <br /><br />
                            Purus sapien tincidunt est integer ultricies in arcu. Urna id amet nec id duis. </p>
                    </div>
                    <img className="flex md:flex-[3] aspect-[3/2] w-full bg-gray-50 rounded-[30px] md:rounded-[60px_0px_0px_60px]" />
                </div>
                <div className="grid grid-cols-4 md:grid-cols-12  gap-20 pb-24">
                    <h2 className="col-span-full md:col-span-10 md:col-start-2 text-center">The team behind the scenes</h2>
                    <div className="col-span-full md:col-span-10 md:col-start-2 flex flex-col gap-12 max-md:px-8">
                        <div className="flex max-md:flex-col gap-x-5 gap-y-12 w-full ">
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
                        <div className="flex max-md:flex-col gap-x-5 gap-y-12 w-full">
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
                </div>
            </section>
        </main>
    )
}