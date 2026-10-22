import { pageMetadata } from '../../src/lib/seo'
import { Suspense } from 'react'
import SocietySignupPage from '../../src/views/SocietySignupPage'

export const metadata = pageMetadata('/signup', {
  title: 'Sign Up — GateFlux',
  description: 'Create your society workspace or join an existing society on GateFlux.',
})

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
