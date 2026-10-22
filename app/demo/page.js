import { pageMetadata } from '../../src/lib/seo'
import VideoShowcase from '../../src/components/VideoShowcase'

export const metadata = pageMetadata('/demo', {
  title: 'GateFlux Product Demo | Community Management',
  description: 'Explore GateFlux visitor records, service requests, community notices, invoice review and amenities. Request a live demonstration for your community.',
  openGraph: { title: 'Explore the GateFlux Platform', description: 'See everyday residential community operations in GateFlux.' },
})

export default function DemoPage() {
  return <div className="pt-24"><h1 className="sr-only">GateFlux Product Demonstration</h1><VideoShowcase walkthrough /></div>
}
