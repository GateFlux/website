import AboutPage from '../../src/views/AboutPage'
import config from '../../src/lib/config'

export const metadata = {
  title: 'About Us — GateFlux',
  description: "GateFlux is on a mission to modernise community living across India. Learn about our story, the team behind the platform, and why we're building smarter, safer communities.",
  alternates: { canonical: `${config.website.baseUrl}/about` },
  openGraph: {
    title: 'About Us — GateFlux',
    description: 'Meet the team building the future of smart community management in India.',
    url: `${config.website.baseUrl}/about`,
  },
}

export default function About() {
  return <AboutPage />
}
