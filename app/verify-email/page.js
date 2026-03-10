import VerifyAccountPage from '../../src/views/VerifyAccountPage'

export const metadata = {
  title: 'Verify Email — GateFlux',
  description: 'Verify your email for GateFlux account activation.',
  alternates: { canonical: 'https://gateflux.co/verify-email' },
}

export default function VerifyEmailPage() {
  return <VerifyAccountPage focusStep="email" />
}
