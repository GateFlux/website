import './globals.css'
import { SITE_URL, siteStructuredData } from '../src/lib/seo'
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
  metadataBase: new URL(SITE_URL),
  title: 'GateFlux',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/favicon/apple-icon-180x180.png', sizes: '180x180' }],
  },
  manifest: '/favicon/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
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
            __html: JSON.stringify(siteStructuredData).replace(/</g, '\\u003c')
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
        <AnalyticsProvider />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8QPSRLQD06"
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8QPSRLQD06');
          `}
        </Script>
      </body>
    </html>
  )
}
