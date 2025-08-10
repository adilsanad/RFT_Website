import type { Metadata } from 'next'
import SolutionsPageClient from './SolutionsPageClient'

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Comprehensive water management solutions for Indian landscapes. Expert irrigation systems, rainwater harvesting, and swimming pool installations. Built for commercial, residential, and industrial projects across India.',
  keywords: [
    'water management solutions India',
    'irrigation solutions Bangalore',
    'rainwater harvesting systems',
    'swimming pool systems India',
    'commercial irrigation solutions',
    'landscape water management',
    'automated irrigation India',
    'sustainable water solutions',
    'industrial water systems',
    'residential irrigation systems'
  ],
  openGraph: {
    title: 'Solutions',
    description: 'Comprehensive water management solutions built for Indian landscapes. Expert irrigation, rainwater harvesting, and pool systems.',
    images: [
      {
        url: '/og-solutions.png',
        width: 1200,
        height: 630,
        alt: 'Rainfield Technologies - Water Management Solutions',
      },
    ],
  },
  alternates: {
    canonical: 'https://rainfield.in/solutions',
  },
};

const SolutionsPage = () => {
  return <SolutionsPageClient />
}

export default SolutionsPage