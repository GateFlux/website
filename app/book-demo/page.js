import BookDemoPage from '../../src/views/BookDemoPage'
import config from '../../src/lib/config'

export const metadata = {
  title: 'Book a Demo — GateFlux',
  description: 'See GateFlux in action with a personalised demo for your community. Our team will walk you through the features most relevant to your needs.',
  alternates: { canonical: `${config.website.baseUrl}/book-demo` },
  openGraph: {
    title: 'Book a Demo — GateFlux',
    description: 'Request a personalised GateFlux demo. Talk to our product experts and get your questions answered.',
    url: `${config.website.baseUrl}/book-demo`,
  },
}

export default function BookDemo() {
  return <BookDemoPage />
}
