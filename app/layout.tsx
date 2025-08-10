import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://rainfield.in'),
  title: {
    default: 'Rainfield Technologies - Smart Water Management Solutions India',
    template: '%s · Rainfield Technologies'
  },
  description: 'Leading provider of irrigation systems, rainwater harvesting, and swimming pool solutions across India. Expert water management systems for commercial, residential, and industrial projects.',
  keywords: [
    'irrigation systems India',
    'rainwater harvesting Bangalore',
    'Hunter irrigation dealer',
    'commercial water management',
    'automated sprinkler systems',
    'swimming pool systems India',
    'water management Bangalore',
    'drip irrigation systems',
    'landscape irrigation Karnataka',
    'irrigation contractor Bangalore'
  ],
  authors: [{ name: 'Rainfield Technologies' }],
  creator: 'Rainfield Technologies',
  publisher: 'Rainfield Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rainfield.in',
    siteName: 'Rainfield Technologies',
    title: 'Rainfield Technologies - Smart Water Management Solutions India',
    description: 'Leading provider of irrigation systems, rainwater harvesting, and swimming pool solutions across India. Expert water management systems for commercial, residential, and industrial projects.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rainfield Technologies - Water Management Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rainfield Technologies - Smart Water Management Solutions India',
    description: 'Leading provider of irrigation systems, rainwater harvesting, and swimming pool solutions across India.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/favicon-192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/fonts/fonnts.com-Neulis_Neue_Medium.otf" as="font" type="font/otf" crossOrigin="" />
        <link rel="preload" href="/fonts/fonnts.com-Neulis_Sans_Medium.otf" as="font" type="font/otf" crossOrigin="" />
        <link rel="preload" href="/fonts/Manrope-VariableFont_wght.ttf" as="font" type="font/ttf" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Rainfield Technologies",
              "url": "https://rainfield.in",
              "logo": "https://rainfield.in/logo.png",
              "description": "Leading provider of irrigation systems, rainwater harvesting, and swimming pool solutions across India",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kalkere-Agara, Horamavu",
                "addressLocality": "Bengaluru",
                "postalCode": "560043",
                "addressCountry": "India"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXX-XXX-XXXX",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hindi"]
              },
              "sameAs": [
                "https://linkedin.com/company/rainfield-technologies"
              ],
              "areaServed": [
                "Karnataka",
                "Tamil Nadu", 
                "Maharashtra",
                "Kerala",
                "Telangana",
                "India"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Water Management Solutions",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Irrigation Systems",
                      "description": "Commercial and residential irrigation system installation and maintenance"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Rainwater Harvesting",
                      "description": "Rainwater collection and management systems"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Swimming Pool Systems",
                      "description": "Pool installation, maintenance, and water feature systems"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
