import type { Metadata } from 'next'
import IrrigationPageClient from './IrrigationPageClient'

export const metadata: Metadata = {
  title: 'Irrigation Systems India - Automated Sprinkler & Drip Irrigation Solutions',
  description: 'Expert irrigation system installation across India. Automated sprinkler systems, drip irrigation, smart controllers, and precision watering solutions for commercial, residential, and agricultural projects. Free consultation available.',
  keywords: [
    'irrigation systems India',
    'automated irrigation Bangalore',
    'sprinkler systems India',
    'drip irrigation installation',
    'commercial irrigation systems',
    'residential irrigation Bangalore',
    'smart irrigation controllers',
    'landscape irrigation India',
    'automated watering systems',
    'precision irrigation systems',
    'irrigation contractor Bangalore',
    'Hunter irrigation systems India'
  ],
  openGraph: {
    title: 'Irrigation Systems India - Automated Sprinkler & Drip Solutions',
    description: 'Expert irrigation system installation across India. Automated sprinkler systems, drip irrigation, and smart controllers for all project types.',
    images: [
      {
        url: '/og-irrigation.png',
        width: 1200,
        height: 630,
        alt: 'Rainfield Technologies - Irrigation Systems',
      },
    ],
  },
  alternates: {
    canonical: 'https://rainfield.in/solutions/irrigation-systems',
  },
};

const IrrigationPage = () => {
  return <IrrigationPageClient />
}

export default IrrigationPage;