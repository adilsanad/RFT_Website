import type { Metadata } from 'next'
import PoolsPageClient from './PoolsPageClient'

export const metadata: Metadata = {
  title: 'Swimming Pool Systems & Water Features India - Installation, Maintenance & Equipment',
  description: 'Expert swimming pool system installation and water feature design across India. Pool equipment, filtration systems, water features, maintenance, and complete pool solutions for residential and commercial projects.',
  keywords: [
    'swimming pool systems India',
    'pool installation Bangalore',
    'water features India',
    'pool equipment India',
    'swimming pool contractor',
    'pool filtration systems',
    'commercial pool systems',
    'residential pool installation',
    'pool maintenance India',
    'water feature design',
    'pool automation systems',
    'swimming pool Bangalore'
  ],
  openGraph: {
    title: 'Swimming Pool Systems & Water Features India - Professional Installation',
    description: 'Expert swimming pool system installation and water feature design across India. Complete pool solutions and maintenance services.',
    images: [
      {
        url: '/og-pools.png',
        width: 1200,
        height: 630,
        alt: 'Rainfield Technologies - Swimming Pool Systems',
      },
    ],
  },
  alternates: {
    canonical: 'https://rainfield.in/solutions/pools-water-features',
  },
};

const PoolsPage = () => {
  return <PoolsPageClient />
}

export default PoolsPage;