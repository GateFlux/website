import { Suspense } from 'react'
import VerifyAccountPage from '../../src/views/VerifyAccountPage'
import config from '../../src/lib/config'

export const metadata = {
  title: 'Verify Phone — GateFlux',
  description: 'Verify your mobile OTP for GateFlux account activation.',
  alternates: { canonical: `${config.website.baseUrl}/verify-phone` },
}

function VerifyPhoneContent() {
  return <VerifyAccountPage focusStep="phone" />
}

export default function VerifyPhonePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VerifyPhoneContent />
    </Suspense>
  )
}
