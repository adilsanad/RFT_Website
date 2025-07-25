import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Rainfield Technologies',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html >
      <head>
        <link rel="preload" href="/fonts/fonnts.com-Neulis_Neue_Medium.otf" as="font" type="font/otf" crossOrigin="" />
        <link rel="preload" href="/fonts/fonnts.com-Neulis_Sans_Medium.otf" as="font" type="font/otf" crossOrigin="" />
        <link rel="preload" href="/fonts/Manrope-VariableFont_wght.ttf" as="font" type="font/ttf" crossOrigin="" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
