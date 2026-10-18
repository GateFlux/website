import VideoShowcase from '../../src/components/VideoShowcase'
import config from '../../src/lib/config'

export const metadata = {
  title: 'GateFlux Product Demo | Community Management',
  description: 'Explore GateFlux visitor records, service requests, community notices, invoice review and amenities. Request a live demonstration for your community.',
  alternates: { canonical: `${config.website.baseUrl}/demo` },
  openGraph: { title: 'Explore the GateFlux Platform', description: 'See everyday residential community operations in GateFlux.', url: `${config.website.baseUrl}/demo` },
}

export default function DemoPage() {
  return <div className="pt-24"><h1 className="sr-only">GateFlux Product Demonstration</h1><VideoShowcase walkthrough /></div>
}
