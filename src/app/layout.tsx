import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'
import { CustomCursor } from '@/components/common/CustomCursor'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { siteConfig } from '@/config/site'
import './globals.css'

const csAloise = localFont({
  src: [
    {
      path: '../../public/assets/fonts/CSAloise-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-csaloise',
  display: 'swap',
  preload: false,
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '900'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${csAloise.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-white text-black" suppressHydrationWarning>
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScrollProvider>
          <CustomCursor />
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
