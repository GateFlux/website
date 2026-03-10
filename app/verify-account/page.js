import VerifyAccountPage from '../../src/views/VerifyAccountPage'

export const metadata = {
  title: 'Verify Account — GateFlux',
  description: 'Verify your GateFlux account using email and mobile OTP.',
  alternates: { canonical: 'https://gateflux.co/verify-account' },
}

export default function VerifyAccount() {
  return <VerifyAccountPage />
}
