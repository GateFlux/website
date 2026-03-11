import { Suspense } from 'react'
import VerifyAccountPage from '../../src/views/VerifyAccountPage'
import config from '../../src/lib/config'

export const metadata = {
  title: 'Verify Email — GateFlux',
  description: 'Verify your email for GateFlux account activation.',
  alternates: { canonical: `${config.website.baseUrl}/verify-email` },
}

function VerifyEmailContent() {
  return <VerifyAccountPage focusStep="email" />
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VerifyEmailContent />
    </Suspense>
  )
}
