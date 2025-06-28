import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import PartnersSection from "@/components/marquee-section"
import StatsSection from "@/components/stats-section"
import SolutionsSection from "@/components/solutions-section"
import ClientsSection from "@/components/clients-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
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
  { src: "/logos/sobha.png", alt: "Sobha" },
  { src: "/logos/prestige.png", alt: "Prestige" },
  { src: "/logos/brigade.png", alt: "Brigade" },
  { src: "/logos/realty.png", alt: "Realty" },
];

export default function Home() {
  return (
    <main className="grid grid-cols-12 min-h-screen bg-white font-neulissans tracking-tight">
      <Header />
      <HeroSection />
      <MarqueeSection data={partners} title={<p className="text-2xl text-gray-500">our <span className="font-bold">partners</span></p>}/>
      <StatsSection />
      <SolutionsSection />
      <MarqueeSection data={clients} gradientColor="#F3F4F6" title={<p className="text-2xl text-gray-500">our <span className="font-bold">clients</span></p>} className="bg-primary-100"/>
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
