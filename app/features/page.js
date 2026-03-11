import FeaturesPage from '../../src/views/FeaturesPage'
import config from '../../src/lib/config'

export const metadata = {
  title: 'Features — GateFlux',
  description: 'Explore every GateFlux feature: visitor pre-approval, gate access control, maintenance ticketing, community billing, staff management, notices, amenity booking and more.',
  alternates: { canonical: `${config.website.baseUrl}/features` },
  openGraph: {
    title: 'Features — GateFlux',
    description: 'All-in-one community management: visitor management, gate security, billing, maintenance, staff and more.',
    url: `${config.website.baseUrl}/features`,
  },
}

export default function Features() {
  return <FeaturesPage />
}
