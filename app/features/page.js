import { pageMetadata } from '../../src/lib/seo'
import FeaturesPage from '../../src/views/FeaturesPage'

export const metadata = pageMetadata('/features', {
  title: 'Features — GateFlux',
  description: 'Explore every GateFlux feature: visitor pre-approval, gate access control, maintenance ticketing, community billing, staff management, notices, amenity booking and more.',
  openGraph: {
    title: 'Features — GateFlux',
    description: 'All-in-one community management: visitor management, gate security, billing, maintenance, staff and more.',
  },
})

export default function Features() {
  return <FeaturesPage />
}
