import HomePage from '../src/views/HomePage'

export const metadata = {
  title: 'GateFlux | Smart Community Management Platform',
  description: 'GateFlux unifies residents, security, and management into one intelligent, secure ecosystem. Visitor management, gate security, billing, maintenance and more — all in one platform.',
  alternates: { canonical: 'https://gateflux.co/' },
  openGraph: {
    title: 'GateFlux | Smart Community Management Platform',
    description: 'GateFlux unifies residents, security, and management into one intelligent, secure ecosystem.',
    url: 'https://gateflux.co/',
  },
}

export default function Home() {
  return <HomePage />
}
