import { pageMetadata } from '../../src/lib/seo'
import BookDemoPage from '../../src/views/BookDemoPage'

export const metadata = pageMetadata('/book-demo', {
  title: 'Book a Demo — GateFlux',
  description: 'See GateFlux in action with a personalised demo for your community. Our team will walk you through the features most relevant to your needs.',
  openGraph: {
    title: 'Book a Demo — GateFlux',
    description: 'Request a personalised GateFlux demo. Talk to our product experts and get your questions answered.',
  },
})

export default function BookDemo() {
  return <BookDemoPage />
}
