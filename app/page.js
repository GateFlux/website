import HomePage from '../src/views/HomePage'
import config from '../src/lib/config'

export const metadata = {
  title: 'GateFlux | Smart Community Management Platform',
  description: 'GateFlux unifies residents, security, and management into one intelligent, secure ecosystem. Visitor management, gate security, billing, maintenance and more — all in one platform.',
  alternates: { canonical: `${config.website.baseUrl}/` },
  openGraph: {
    title: 'GateFlux | Smart Community Management Platform',
    description: 'GateFlux unifies residents, security, and management into one intelligent, secure ecosystem.',
    url: `${config.website.baseUrl}/`,
  },
}

export default function Home() {
  return <HomePage />
}
