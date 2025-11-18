import type React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: 'SteveOS - Personal Operating System',
    template: '%s | SteveOS',
  },
  description:
    'The personal digital headquarters of Steve Defendre. Showcasing projects, blog posts, and services.',
  keywords:
    'SteveOS, Steve Defendre, full-stack engineer, software development, portfolio, blog, veteran',
  authors: [
    { name: 'Steve Defendre', url: 'https://www.linkedin.com/in/joseph-m-defendre-a11a47225/' },
  ],
  creator: 'Steve Defendre',
  publisher: 'SteveOS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://steve-os.vercel.app'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/api/rss', title: 'SteveOS Blog RSS Feed' }],
    },
  },
  openGraph: {
    title: 'SteveOS - Personal Operating System',
    description:
      'The personal digital headquarters of Steve Defendre. Showcasing projects, blog posts, and services.',
    url: 'https://steve-os.vercel.app',
    siteName: 'SteveOS',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'SteveOS - Personal Operating System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SteveOS - Personal Operating System',
    description: 'The personal digital headquarters of Steve Defendre.',
    images: ['/logo.png'],
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
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  generator: 'v0.app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
