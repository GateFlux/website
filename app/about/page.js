import { pageMetadata } from '../../src/lib/seo'
import AboutPage from '../../src/views/AboutPage'

export const metadata = pageMetadata('/about', {
  title: 'About Us — GateFlux',
  description: "GateFlux is on a mission to modernise community living across India. Learn about our story, the team behind the platform, and why we're building smarter, safer communities.",
  openGraph: {
    title: 'About Us — GateFlux',
    description: 'Meet the team building the future of smart community management in India.',
  },
})

export default function About() {
  return <AboutPage />
}
