import PricingPage from '../../src/views/PricingPage'

export const metadata = {
  title: 'Pricing Plans — GateFlux',
  description: 'Flexible GateFlux pricing for communities of every size with clear starts-at monthly pricing across Starter, Essential, Professional, and Enterprise plans.',
  alternates: { canonical: 'https://gateflux.co/pricing' },
  openGraph: {
    title: 'Pricing Plans — GateFlux',
    description: 'Simple starts-at pricing plans for gated communities of all sizes. Start free, upgrade as you grow.',
    url: 'https://gateflux.co/pricing',
  },
}

export default function Pricing() {
  return <PricingPage />
}
