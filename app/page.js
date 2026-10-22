import { pageMetadata } from '../src/lib/seo'
import HomePage from '../src/views/HomePage'

export const metadata = pageMetadata('/', {
  title: 'GateFlux | Smart Community Management Platform',
  description: 'GateFlux simplifies gated community management with visitor access control, maintenance payments, resident communication, and community administration.',
  openGraph: {
    description: 'Simplify security, maintenance payments, resident communication, and community operations with GateFlux.',
  },
})

export default function Home() {
  return <HomePage />
}
