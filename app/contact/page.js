import ContactPage from '../../src/views/ContactPage'

export const metadata = {
  title: 'Book a Demo — GateFlux',
  description: 'See GateFlux in action with a personalised demo for your community. Our team will walk you through the features most relevant to your needs. Response within 24 hours.',
  alternates: { canonical: 'https://gateflux.co/contact' },
  openGraph: {
    title: 'Book a Demo — GateFlux',
    description: 'Request a personalised GateFlux demo. Talk to our product experts and get your questions answered.',
    url: 'https://gateflux.co/contact',
  },
}

export default function Contact() {
  return <ContactPage />
}
