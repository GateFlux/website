import { Suspense } from 'react'
import SocietySignupPage from '../../src/views/SocietySignupPage'
import config from '../../src/lib/config'

export const metadata = {
  title: 'Sign Up — GateFlux',
  description: 'Create your society workspace or join an existing society on GateFlux.',
  alternates: { canonical: `${config.website.baseUrl}/signup` },
}

function SignupPageContent() {
  return <SocietySignupPage />
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SignupPageContent />
    </Suspense>
  )
}
