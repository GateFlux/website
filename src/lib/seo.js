// Production SEO URLs deliberately do not depend on preview environment variables.
export const SITE_URL = 'https://gateflux.co'
export const HOME_TITLE = 'GateFlux | Smart Community Management Platform'
export const HOME_DESCRIPTION = 'GateFlux simplifies gated community management with visitor access control, maintenance payments, resident communication, and community administration.'
export const SOCIAL_IMAGE = {
  url: `${SITE_URL}/images/gateflux-og.png`,
  width: 1733,
  height: 907,
  type: 'image/png',
  alt: 'GateFlux Smart Community Management Platform',
}

export function pageMetadata(path, { title, description, openGraph = {}, robots }) {
  const url = `${SITE_URL}${path === '/' ? '/' : `${path.replace(/\/$/, '')}/`}`
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: robots || { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: 'GateFlux',
      locale: 'en_IN',
      title: openGraph.title || title,
      description: openGraph.description || description,
      url,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@gateflux', // Official profile linked by Footer.jsx.
      title,
      description: path === '/'
        ? 'Manage visitors, payments, residents, and community operations with GateFlux.'
        : description,
      images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    },
  }
}

export const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'GateFlux',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo-dark.svg`,
      description: HOME_DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'GateFlux',
      url: `${SITE_URL}/`,
      description: HOME_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}
