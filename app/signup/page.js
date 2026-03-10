import SocietySignupPage from '../../src/views/SocietySignupPage'

export const metadata = {
  title: 'Sign Up — GateFlux',
  description: 'Create your society workspace or join an existing society on GateFlux.',
  alternates: { canonical: 'https://gateflux.co/signup' },
}

export default function SignupPage() {
  return <SocietySignupPage />
}
