'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import config from '../lib/config'
import { extractVerificationToken } from '../lib/verificationToken'

const API_BASE = config.api.baseUrl
const APP_BASE = config.app.baseUrl
const RECAPTCHA_SITE_KEY = config.recaptcha.siteKey

function canAutoFillLocalOtp() {
  if (typeof window === 'undefined') {
    return false
  }

  const host = window.location.hostname.toLowerCase()
  return host === 'localhost' || host === '127.0.0.1' || host.endsWith('.test')
}

async function apiPost(path, payload) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed')
  }

  return data
}

async function executeRecaptcha(action) {
  if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined' || !window.grecaptcha?.execute) {
    return null
  }

  return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
}

export default function VerifyAccountPage({ focusStep = 'all' }) {
  const searchParams = useSearchParams()
  const prefilledEmail = searchParams.get('email') || ''
  const prefilledToken = searchParams.get('token') || ''

  const [email, setEmail] = useState(prefilledEmail)
  const [emailToken, setEmailToken] = useState(prefilledToken)
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [status, setStatus] = useState({ email_verified: false, phone_verified: false, tenant_slug: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fieldClass = 'w-full rounded-lg border border-primary-200 bg-white px-4 py-3 text-primary-900 placeholder:text-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200'
  const primaryButtonClass = 'inline-flex items-center justify-center rounded-lg bg-primary-900 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-60'
  const cardClass = 'space-y-4 rounded-2xl border border-primary-100 bg-white/95 p-6 shadow-sm'

  const redirectUrl = useMemo(() => {
    const slug = status?.tenant_slug || ''
    return slug ? `${APP_BASE}/${slug}/setup` : `${APP_BASE}/login`
  }, [status])

  const fetchStatus = async () => {
    if (!email) {
      throw new Error('Please enter your email first.')
    }

    const response = await apiPost('/public/society-signup/status', { email: email.trim().toLowerCase() })
    setStatus(response?.data || {})
  }

  const handleFetchStatus = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await fetchStatus()
      setSuccess('Verification status loaded.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyEmail = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const verificationToken = extractVerificationToken(emailToken)
      if (verificationToken.length < 20) {
        throw new Error('Please paste the full email verification token or full verification link from your email.')
      }

      await apiPost('/public/society-signup/verify-email', { token: verificationToken })

      if (verificationToken !== emailToken) {
        setEmailToken(verificationToken)
      }

      await fetchStatus()
      setSuccess('Email verified successfully.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const recaptchaToken = await executeRecaptcha('resend_email')
      await apiPost('/public/society-signup/resend-email', {
        email: email.trim().toLowerCase(),
        recaptcha_token: recaptchaToken,
      })

      setSuccess('Verification email resent successfully.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPhone = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await apiPost('/public/society-signup/verify-phone', {
        email: email.trim().toLowerCase(),
        otp,
      })
      await fetchStatus()
      setSuccess('Phone OTP verified successfully.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const recaptchaToken = await executeRecaptcha('resend_otp')
      const response = await apiPost('/public/society-signup/resend-phone', {
        email: email.trim().toLowerCase(),
        recaptcha_token: recaptchaToken,
      })

      if (canAutoFillLocalOtp() && response?.data?.otp_debug) {
        setOtp(String(response.data.otp_debug))
      }

      setSuccess('New OTP sent successfully.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const completion = await apiPost('/public/society-signup/complete', {
        email: email.trim().toLowerCase(),
        password,
        password_confirmation: passwordConfirmation,
      })

      setSuccess('Account verified. Redirecting to setup...')
      window.location.assign(completion?.data?.redirect_url || redirectUrl)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#dbeafe,_#f8fafc_40%,_#ecfeff)] pt-28 pb-16">
      {RECAPTCHA_SITE_KEY ? (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`} strategy="afterInteractive" />
      ) : null}

      <div className="mx-auto max-w-2xl px-6">
        <h1 className="mb-1 text-3xl font-bold text-primary-900">Verify Your Account</h1>
        <p className="mb-6 text-primary-600">Complete email and mobile verification before accessing your GateFlux workspace.</p>

        {error && <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        {success && <p className="mb-4 rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>}

        <form onSubmit={handleFetchStatus} className={`${cardClass} mb-4`}>
          <label className="text-sm font-medium text-primary-800">Admin Email</label>
          <input className={fieldClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className={primaryButtonClass} type="submit" disabled={loading}>{loading ? 'Loading...' : 'Load Verification Status'}</button>
        </form>

        <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
          <div className={`rounded-lg border p-3 ${status.email_verified ? 'border-green-200 bg-green-50 text-green-700' : 'border-primary-200 bg-white text-primary-700'}`}>
            Step 1: Email {status.email_verified ? 'Verified' : 'Pending'}
          </div>
          <div className={`rounded-lg border p-3 ${status.phone_verified ? 'border-green-200 bg-green-50 text-green-700' : 'border-primary-200 bg-white text-primary-700'}`}>
            Step 2: Phone OTP {status.phone_verified ? 'Verified' : 'Pending'}
          </div>
        </div>

        {(focusStep === 'all' || focusStep === 'email') && !status.email_verified && (
          <form onSubmit={handleVerifyEmail} className={`${cardClass} mb-4`}>
            <h2 className="text-lg font-semibold text-primary-900">Verify Email</h2>
            <input className={fieldClass} placeholder="Paste token or full verification link" value={emailToken} onChange={(e) => setEmailToken(e.target.value)} required />
            <div className="flex flex-wrap gap-2">
              <button className={primaryButtonClass} type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify Email'}</button>
              <button type="button" className="rounded-lg border border-primary-300 px-4 py-2 text-sm font-semibold text-primary-800" onClick={handleResendEmail} disabled={loading}>Resend Email</button>
            </div>
          </form>
        )}

        {(focusStep === 'all' || focusStep === 'phone') && !status.phone_verified && (
          <form onSubmit={handleVerifyPhone} className={`${cardClass} mb-4`}>
            <h2 className="text-lg font-semibold text-primary-900">Verify Phone OTP</h2>
            <input className={fieldClass} placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} required />
            <div className="flex flex-wrap gap-2">
              <button className={primaryButtonClass} type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
              <button type="button" className="rounded-lg border border-primary-300 px-4 py-2 text-sm font-semibold text-primary-800" onClick={handleResendOtp} disabled={loading}>Resend OTP</button>
            </div>
          </form>
        )}

        <form onSubmit={handleComplete} className={cardClass}>
          <h2 className="text-lg font-semibold text-primary-900">Complete Activation</h2>
          <input className={fieldClass} type="password" placeholder="Set password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input className={fieldClass} type="password" placeholder="Confirm password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
          <button className={primaryButtonClass} type="submit" disabled={loading}>{loading ? 'Completing...' : 'Continue to Setup'}</button>
          <p className="text-xs text-primary-600">After verification, you will be redirected to your workspace setup URL.</p>
        </form>

        <p className="mt-6 text-center text-sm text-primary-600">
          Need to create a new society? <Link href="/signup" className="font-semibold text-primary-800 underline">Go to Signup</Link>
        </p>
      </div>
    </main>
  )
}
