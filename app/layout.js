import './globals.css'
import Script from 'next/script'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import FloatingCTA from '../src/components/FloatingCTA'
import AnalyticsProvider from '../src/components/AnalyticsProvider'

export const viewport = {
  themeColor: '#1c153e',
}

export const metadata = {
  title: 'GateFlux | Modern Infrastructure for Smarter Communities',
  description: 'GateFlux unifies residents, security, and management into one intelligent, secure ecosystem. Enterprise-grade apartment and gated community management platform.',
  keywords: 'apartment management, gated community, visitor management, security management, society management, housing society software, MyGate alternative, community management app',
  authors: [{ name: 'GateFlux' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://gateflux.com/',
    title: 'GateFlux | Modern Infrastructure for Smarter Communities',
    description: 'GateFlux unifies residents, security, and management into one intelligent, secure ecosystem. Enterprise-grade apartment and gated community management platform.',
    images: [{ url: 'https://gateflux.com/og-image.png' }],
    siteName: 'GateFlux',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GateFlux | Modern Infrastructure for Smarter Communities',
    description: 'GateFlux unifies residents, security, and management into one intelligent, secure ecosystem.',
    images: ['https://gateflux.com/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png?v=2" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png?v=2" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png?v=2" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png?v=2" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png?v=2" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png?v=2" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png?v=2" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png?v=2" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png?v=2" />
        <link rel="manifest" href="/favicon/manifest.json?v=2" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#1c153e" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "GateFlux",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, iOS, Android",
              "description": "Enterprise-grade apartment and gated community management platform",
              "url": "https://gateflux.com",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "500" },
              "provider": { "@type": "Organization", "name": "GateFlux", "url": "https://gateflux.com" }
            })
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=G-8QPSRLQD06"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
        <AnalyticsProvider />
        <Script id="gtm" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-8QPSRLQD06');
          `}
        </Script>
      </body>
    </html>
  )
}
