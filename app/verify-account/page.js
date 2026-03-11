import { Suspense } from 'react'
import VerifyAccountPage from '../../src/views/VerifyAccountPage'
import config from '../../src/lib/config'

export const metadata = {
  title: 'Verify Account — GateFlux',
  description: 'Verify your GateFlux account using email and mobile OTP.',
  alternates: { canonical: `${config.website.baseUrl}/verify-account` },
}

function VerifyAccountContent() {
  return <VerifyAccountPage />
}

export default function VerifyAccount() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VerifyAccountContent />
    </Suspense>
  )
}
