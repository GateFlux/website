import { pageMetadata } from '../../src/lib/seo'
import CookiesPage from '../../src/views/CookiesPage'

export const metadata = pageMetadata('/cookies', {
  title: 'Cookie Policy — GateFlux',
  description: 'How GateFlux uses cookies and tracking technologies, with full DPDP and GDPR compliance controls.',
})

export default function Cookies() {
  return <CookiesPage />
}
