import { Suspense } from 'react'
import VerificationRedirectClient from '../../src/views/VerificationRedirectClient'

export const metadata = {
  title: 'Verify Email — GateFlux',
  description: 'Verify your email address to activate your GateFlux society workspace.',
  robots: { index: false, follow: false },
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VerificationRedirectClient />
    </Suspense>
  )
}
