import { pageMetadata } from '../../src/lib/seo'
import SecurityPage from '../../src/views/SecurityPage'

export const metadata = pageMetadata('/security', {
  title: 'Security & Compliance — GateFlux',
  description: 'GateFlux is built security-first: end-to-end encryption, DPDP & GDPR compliance, role-based access control, audit logs, and SOC-2-aligned infrastructure for your community data.',
  openGraph: {
    title: 'Security & Compliance — GateFlux',
    description: 'Enterprise-grade security with DPDP & GDPR compliance, E2E encryption, and complete audit trails.',
  },
})

export default function Security() {
  return <SecurityPage />
}
