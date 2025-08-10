"use client"
import { useState } from "react"
import Icon from "@/public/assets/vectors";
import { Button } from '../../components/ui/button'
import StatCounter from "@/components/ui/StatCounter";
import { AnimatePresence, motion } from 'motion/react'
import hero from "@/public/images/aboutpage/abouthero.png";
import heromobile from "@/public/images/aboutpage/aboutheromobile.png";
import avatar from "@/public/images/assets/genericavatar.png";
import ContactSection from "@/components/contact-section";

interface TeamMemberProps {
    name: string;
    role: string;
}

const TeamMember = ({ name, role }: TeamMemberProps) => (
    <div className="flex flex-col gap-4 items-center text-center">
        <img src={avatar.src} alt={name} className="w-24 h-24 rounded-full object-cover" />
        <div>
            <h3 className="text-lg font-medium">{name}</h3>
            <p className="text-gray-600">{role}</p>
        </div>
    </div>
);

type TabKey = 'mission' | 'vision';

const AboutPageClient = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('mission');

    const content: Record<TabKey, { p1: string; p2: string }> = {
        mission: {
            p1: "At Rainfield, our mission is to make sustainable water management simple, reliable, and accessible. We design and deliver systems that help individuals, businesses, and institutions use water more efficiently — whether that's through rainwater harvesting, irrigation, or water reuse.",
            p2: "We believe water infrastructure doesn't need to be complicated, it just needs to work. From tight urban spaces to large commercial landscapes, we approach each build with the same intent: to create systems that last, perform, and add value without waste."
        },
        vision: {
            p1: "At Rainfield, we envision leading the way in sustainable water management solutions for industrial and commercial sectors across India. We deliver integrated systems for automated irrigation, innovative rainwater harvesting,  swimming pools and advanced water filtration that are both efficient and sustainable.",
            p2: "Guided by a holistic approach, we aim to enhance lives and protect the environment, shaping a future where responsible water management is at the heart of progress."
        }
    }

    return (
        <main className="grid grid-cols-4 md:grid-cols-12 gap-24 min-h-screen bg-white font-neulissans tracking-tight py-[5.5rem] pb-0">
            <section className="col-span-full relative flex flex-col w-full md:px-4 z-10 ">
                <div className="flex max-md:flex-col w-full justify-between md:bg-primary-100 md:border border-primary-900/15 rounded-[15px] md:h-[60vh] overflow-hidden">
                    <div className="flex h-full items-end p-8 md:p-12 max-w-2xl ">
                        <h2 className="font-normal font-neulisneue">We engineer smarter water solutions for a <span className="font-medium italic">sustainable urban future.</span></h2>
                    </div>
                    <div className="flex items-center relative">
                        <div className="absolute -inset-2 bg-gradient-to-t from-white/0 from-30% to-white/100" />
                        <img src={hero.src} className="h-[calc(100%+1rem)] max-md:hidden" />
                        <img src={heromobile.src} className="h-[calc(100%+1rem)] md:hidden" />
                    </div>
                </div>
            </section >
            <section className="col-span-full relative flex flex-col px-8 md:px-24 gap-24">
                <div className="col-span-full flex flex-col gap-12">
                    {/* Tab Buttons */}
                    <div className="flex gap-4 max-md:justify-center ">
                        <Button
                            variant={activeTab === 'mission' ? 'default' : 'defaultnobg'}
                            className={`font-neulisneue font-medium text-xl md:text-2xl tracking-tight w-fit transition-all duration-200 border-0 ${activeTab === 'mission' ? 'bg-primary-400' : 'opacity-40'}`}
                            onClick={() => setActiveTab('mission')}
                        >
                            our mission
                        </Button>
                        <Button
                            variant={activeTab === 'vision' ? 'default' : 'defaultnobg'}
                            className={`font-neulisneue font-medium text-xl md:text-2xl tracking-tight w-fit transition-all duration-200 border-0 ${activeTab === 'vision' ? 'bg-primary-400' : 'opacity-40'}`}
                            onClick={() => setActiveTab('vision')}
                        >
                            our vision
                        </Button>
                    </div>
                    {/* Dynamic Content */}
                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab} initial={{ opacity: 0, translateY: 20 }} animate={{ opacity: 100, translateY: 0 }} className="min-h-[120px] transition-all duration-300 ease-in-out flex max-md:flex-col gap-8">
                            <p className="body-text">
                                {content[activeTab].p1}
                            </p>
                            <p className="body-text">
                                {content[activeTab].p2}
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

            <section className="col-span-full flex flex-col gap-12 rounded-[45px_45px_0px_0px] bg-primary-100 border border-primary-900/15 ">
                <div className="grid grid-cols-4 md:grid-cols-12  gap-20 py-24">
                    <div className="col-span-full md:col-span-10 md:col-start-2 flex gap-16 py-8 max-md:px-8 max-md:text-center max-md:flex-col">
                        <h2 className="flex-1">The team behind the scenes</h2>
                        <p className="body-text flex-[2]">
                            We're a small, hands-on team of engineers, designers, and project specialists who care about getting the details right. Backed by more than 45 years of combined industry experience, we bring practical expertise to every project — from site planning to final deployment.
                        </p>
                    </div>
                    <div className="col-span-full md:col-span-10 md:col-start-2 grid grid-cols-1 md:grid-cols-3 gap-12 max-md:px-8">
                        <TeamMember
                            name="Vilas Gaikwad"
                            role="Director"
                        />
                        <TeamMember
                            name="Pravin Panghavane"
                            role="Group General Manager"
                        />
                        <TeamMember
                            name="Basil Rafi"
                            role="General Manager"
                        />
                        <TeamMember
                            name="Shalan Abhale"
                            role="Head of Systems Design"
                        />
                    </div>
                </div>
                <ContactSection  />
            </section>
        </main>
    )
}

export default AboutPageClient