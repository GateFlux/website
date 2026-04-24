'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * Client-side redirect from /verify-email and /verify-account to /signup
 * preserving the email + token query params so SocietySignupPage can resume
 * the signup flow (auto-verify the token and advance to the OTP step).
 *
 * A client-side redirect is required because the website is built with
 * `output: 'export'` (static HTML), so server-side `redirect()` is not
 * available at request time.
 */
export default function VerificationRedirectClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const params = new URLSearchParams()
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    if (email) params.set('email', email)
    if (token) params.set('token', token)

    const target = params.toString() ? `/signup?${params.toString()}` : '/signup'
    router.replace(target)
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        <p className="mt-4 text-sm text-primary-700">Resuming verification…</p>
      </div>
    </div>
  )
}
