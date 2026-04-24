import { Suspense } from 'react'
import VerificationRedirectClient from '../../src/views/VerificationRedirectClient'

export const metadata = {
  title: 'Verify Account — GateFlux',
  description: 'Resume verification for your GateFlux society signup.',
  robots: { index: false, follow: false },
}

export default function VerifyAccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VerificationRedirectClient />
    </Suspense>
  )
}
