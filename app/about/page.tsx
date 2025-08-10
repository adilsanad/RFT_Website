import type { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet the water systems engineering team behind Rainfield Technologies. 45+ years combined experience in irrigation, rainwater harvesting, and pool systems across India. Leaders in sustainable water management solutions.',
  keywords: [
    'Rainfield Technologies about',
    'water systems engineers Bangalore',
    'irrigation experts India',
    'water management team',
    'rainwater harvesting engineers',
    'swimming pool contractors India',
    'sustainable water solutions',
    'irrigation company Bangalore',
    'water conservation experts',
    'automated irrigation specialists'
  ],
  openGraph: {
    title: 'About',
    description: 'Meet the water systems engineering team behind Rainfield Technologies. 45+ years combined experience in sustainable water management solutions across India.',
    images: [
      {
        url: '/og-about.png',
        width: 1200,
        height: 630,
        alt: 'Rainfield Technologies Team - Water Systems Engineers',
      },
    ],
  },
  alternates: {
    canonical: 'https://rainfield.in/about',
  },
}

const AboutPage = () => {
  return <AboutPageClient />
}

export default AboutPage