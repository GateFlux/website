import { pageMetadata } from '../../src/lib/seo'
import RefundPolicyPage from '../../src/views/RefundPolicyPage'

export const metadata = pageMetadata('/refund-policy', {
  title: 'Cancellation & Refund Policy — GateFlux',
  description: 'GateFlux subscription cancellation rights, 7-day cooling-off period, and pro-rata refund policy.',
})

export default function RefundPolicy() {
  return <RefundPolicyPage />
}
