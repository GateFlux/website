import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import FloatingCTA from '../src/components/FloatingCTA'
import AnalyticsProvider from '../src/components/AnalyticsProvider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

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
    url: 'https://gateflux.co/',
    title: 'GateFlux | Modern Infrastructure for Smarter Communities',
    description: 'GateFlux unifies residents, security, and management into one intelligent, secure ecosystem. Enterprise-grade apartment and gated community management platform.',
    images: [{ url: 'https://gateflux.co/og-image.png' }],
    siteName: 'GateFlux',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GateFlux | Modern Infrastructure for Smarter Communities',
    description: 'GateFlux unifies residents, security, and management into one intelligent, secure ecosystem.',
    images: ['https://gateflux.co/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
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
        <Script id="strip-heading-tag-attrs" strategy="beforeInteractive">
          {`
            (function () {
              function stripAttrs(root) {
                if (!root || !root.querySelectorAll) return;
                var nodes = root.querySelectorAll('[data-heading-tag]');
                for (var i = 0; i < nodes.length; i += 1) {
                  nodes[i].removeAttribute('data-heading-tag');
                }
              }

              function startObserver() {
                if (!document || !document.documentElement || !window.MutationObserver) return;

                stripAttrs(document);

                var observer = new MutationObserver(function (mutations) {
                  for (var i = 0; i < mutations.length; i += 1) {
                    var mutation = mutations[i];

                    if (mutation.type === 'attributes' && mutation.target && mutation.target.removeAttribute) {
                      mutation.target.removeAttribute('data-heading-tag');
                    }

                    if (mutation.type === 'childList' && mutation.addedNodes && mutation.addedNodes.length) {
                      for (var j = 0; j < mutation.addedNodes.length; j += 1) {
                        var node = mutation.addedNodes[j];
                        if (!node || node.nodeType !== 1) continue;
                        if (node.hasAttribute && node.hasAttribute('data-heading-tag')) {
                          node.removeAttribute('data-heading-tag');
                        }
                        stripAttrs(node);
                      }
                    }
                  }
                });

                observer.observe(document.documentElement, {
                  subtree: true,
                  childList: true,
                  attributes: true,
                  attributeFilter: ['data-heading-tag'],
                });

                window.addEventListener('load', function () {
                  stripAttrs(document);
                  setTimeout(function () {
                    observer.disconnect();
                  }, 4000);
                }, { once: true });
              }

              startObserver();
            })();
          `}
        </Script>
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
              "url": "https://gateflux.co",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "500" },
              "provider": { "@type": "Organization", "name": "GateFlux", "url": "https://gateflux.co" }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
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
