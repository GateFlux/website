import ContactPage from '../../src/views/ContactPage'
import config from '../../src/lib/config'

export const metadata = {
  title: 'Contact GateFlux — GateFlux',
  description: 'Get in touch with GateFlux for sales, support, partnership, and product questions.',
  alternates: { canonical: `${config.website.baseUrl}/contact` },
  openGraph: {
    title: 'Contact GateFlux — GateFlux',
    description: 'Reach the GateFlux team for support, sales, and partnerships.',
    url: `${config.website.baseUrl}/contact`,
  },
}

export default function Contact() {
  return <ContactPage />
}
