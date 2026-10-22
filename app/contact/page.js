import { pageMetadata } from '../../src/lib/seo'
import ContactPage from '../../src/views/ContactPage'

export const metadata = pageMetadata('/contact', {
  title: 'Contact GateFlux — GateFlux',
  description: 'Get in touch with GateFlux for sales, support, partnership, and product questions.',
  openGraph: {
    title: 'Contact GateFlux — GateFlux',
    description: 'Reach the GateFlux team for support, sales, and partnerships.',
  },
})

export default function Contact() {
  return <ContactPage />
}
