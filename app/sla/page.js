import { pageMetadata } from '../../src/lib/seo'
import SlaPage from '../../src/views/SlaPage'

export const metadata = pageMetadata('/sla', {
  title: 'Service Level Agreement — GateFlux',
  description: '99.5% standard and 99.9% elite uptime commitments, 1-hour P1 response, and service credits for GateFlux customers.',
})

export default function Sla() {
  return <SlaPage />
}
