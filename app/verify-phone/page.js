import VerifyAccountPage from '../../src/views/VerifyAccountPage'

export const metadata = {
  title: 'Verify Phone — GateFlux',
  description: 'Verify your mobile OTP for GateFlux account activation.',
  alternates: { canonical: 'https://gateflux.co/verify-phone' },
}

export default function VerifyPhonePage() {
  return <VerifyAccountPage focusStep="phone" />
}
