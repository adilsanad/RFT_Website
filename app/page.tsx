import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/StatsSection"
import SolutionsSection from "@/components/solutions-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import MarqueeSection from "@/components/marquee-section"

interface MarqueeData {
  src: string;
  alt: string;
}
const partners: MarqueeData[] = [
  { src: "/logos/amiad.png", alt: "Amiad" },
  { src: "/logos/hunter.png", alt: "Hunter" },
  { src: "/logos/ecorain.png", alt: "Ecorain" },
  { src: "/logos/finolex.png", alt: "Finolex" },
  { src: "/logos/yuzuak.png", alt: "Yuzuak" },
  { src: "/logos/jain.png", alt: "Jain" },
  { src: "/logos/paige.png", alt: "Paige" },
];

const clients: MarqueeData[] = [
  { src: "/assets/images/logos/sobha.png", alt: "Sobha" },
  { src: "/assets/images/logos/prestige.png", alt: "Prestige" },
  { src: "/assets/images/logos/brigade.png", alt: "Brigade" },
  { src: "/assets/images/logos/bagmane.png", alt: "Bagmane" },
  { src: "/assets/images/logos/embassy.png", alt: "Embassy" },
];

export default function Home() {
  return (
    <main className="grid grid-cols-12 min-h-screen bg-white font-neulissans tracking-tight">
      <HeroSection />
      <MarqueeSection data={partners} title={<p className="text-2xl text-gray-500">our <span className="font-bold">partners</span></p>}/>
      <StatsSection />
      <SolutionsSection />
      <MarqueeSection data={clients} gradientColor="#F3F4F6" title={<p className="text-2xl text-gray-500">our <span className="font-bold">clients</span></p>} className="bg-primary-100"/>
      <TestimonialsSection />
      <ContactSection />
    </main>
  )
}
