import PricingPage from '../../src/views/PricingPage'

export const metadata = {
  title: 'Pricing Plans — GateFlux',
  description: 'Flexible GateFlux pricing for communities of every size — Basic, Standard, Professional, and Enterprise plans. Start with a 14-day free trial, no credit card required.',
  alternates: { canonical: 'https://gateflux.co/pricing' },
  openGraph: {
    title: 'Pricing Plans — GateFlux',
    description: 'Transparent pricing plans for gated communities of all sizes. Start free, upgrade as you grow.',
    url: 'https://gateflux.co/pricing',
  },
}

export default function Pricing() {
  return <PricingPage />
}
