import { pageMetadata } from '../../src/lib/seo'
import PricingPage from '../../src/views/PricingPage'

export const metadata = pageMetadata('/pricing', {
  title: 'Pricing Plans — GateFlux',
  description: 'Flexible GateFlux pricing for communities of every size with clear starts-at monthly pricing across Starter, Essential, Professional, and Enterprise plans.',
  openGraph: {
    title: 'Pricing Plans — GateFlux',
    description: 'Simple starts-at pricing plans for gated communities of all sizes. Start free, upgrade as you grow.',
  },
})

export default function Pricing() {
  return <PricingPage />
}
