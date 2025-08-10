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
  { src: "/assets/images/logos/l&w.png", alt: "L&W Construction" },
];

export default function Home() {
  return (
    <main className="grid grid-cols-4 md:grid-cols-12 min-h-screen bg-white font-neulissans tracking-tight">
      <HeroSection />
      <MarqueeSection data={partners} title={<p className="text-2xl text-gray-500">our <span className="font-bold">partners</span></p>} />
      <StatsSection />

      <section className="col-span-full grid grid-cols-4 md:grid-cols-12 gap-8 md:gap-16 py-24 md:pt-32 border-t border-primary-900/15 mt-8 bg-primary-100 rounded-[45px_45px_0px_0px]" id="solutions">
        <div className="md:col-span-10 md:col-start-2 max-md:px-8">
          <h2>Solutions</h2>
        </div>
        <SolutionsSection />
      </section>

      <MarqueeSection data={clients} imageClass="h-20 px-16" gradientColor="#F3F4F6" title={<p className="text-2xl text-gray-500">our <span className="font-bold">clients</span></p>} className="bg-primary-100" />
      <TestimonialsSection />
      <ContactSection />
    </main>
  )
}
