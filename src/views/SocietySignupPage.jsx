'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
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

const INDIAN_STATES_AND_UTS = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Chandigarh',
  'Puducherry',
]

const ENTERPRISE_PLAN = {
  label: 'Enterprise',
  pricing: 'Contact Sales',
  notes: 'Custom pricing',
  billing: 'Annual and custom billing',
}

function formatCurrency(value) {
  return `₹${Math.round(Number(value || 0)).toLocaleString('en-IN')}`
}

function mapPublicPlanToOption(plan) {
  const slug = String(plan?.slug || '').toLowerCase()
  const basePrice = plan?.base_price
  const perUnitPrice = plan?.per_unit_price
  const trialDays = Number(plan?.trial_days || 30)
  const isCustom = basePrice === null || perUnitPrice === null || slug === 'enterprise'
  return {
    slug,
    label: plan?.display_name || plan?.name || slug,
    pricing: isCustom ? 'Contact Sales' : `${formatCurrency(basePrice)}/month base`,
    notes: isCustom ? 'Custom pricing' : `${formatCurrency(perUnitPrice)} per unit`,
    billing: trialDays > 0 ? `${trialDays}-day trial included` : 'Billing monthly',
    version: plan?.plan_version || null,
    base_price: basePrice,
    per_unit_price: perUnitPrice,
  }
}

const DISPOSABLE_DOMAINS = ['mailinator.com', 'tempmail.com', '10minutemail.com']

function slugifySocietyName(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function normalizeWorkspaceSlug(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
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
    const message = data?.message || 'Request failed'
    throw new Error(message)
  }

  return data
}

async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data?.message || 'Request failed'
    throw new Error(message)
  }

  return data
}

async function executeRecaptcha(action) {
  if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined' || !window.grecaptcha?.execute) {
    return null
  }

  return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
}

export default function SocietySignupPage() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [assignedSetupUrl, setAssignedSetupUrl] = useState('')
  const [isCustomSlugEnabled, setIsCustomSlugEnabled] = useState(false)
  const [customSlug, setCustomSlug] = useState('')
  const [isCustomSlugDirty, setIsCustomSlugDirty] = useState(false)
  const [slugAvailability, setSlugAvailability] = useState({
    status: 'idle',
    requestedSlug: '',
    resolvedSlug: '',
    message: '',
  })
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false)
  const [stateSearch, setStateSearch] = useState('')
  const [planOptions, setPlanOptions] = useState({})
  const [plansLoading, setPlansLoading] = useState(true)
  const stateDropdownRef = useRef(null)

  const requestedPlan = useMemo(() => (searchParams.get('plan') || '').toLowerCase(), [searchParams])
  const isEnterpriseSignupRequested = requestedPlan === 'enterprise'

  const preselectedPlan = useMemo(() => {
    return Object.prototype.hasOwnProperty.call(planOptions, requestedPlan) ? requestedPlan : null
  }, [requestedPlan, planOptions])

  useEffect(() => {
    let mounted = true

    const loadPublicPlans = async () => {
      try {
        const response = await apiGet('/public/plans')
        const rows = Array.isArray(response?.data) ? response.data : []
        const normalized = rows.reduce((acc, plan) => {
          const mapped = mapPublicPlanToOption(plan)
          if (mapped.slug && mapped.slug !== 'enterprise') {
            acc[mapped.slug] = mapped
          }

          return acc
        }, {})

        if (mounted) {
          setPlanOptions(normalized)
        }
      } catch (_err) {
        if (mounted) {
          setPlanOptions({})
        }
      } finally {
        if (mounted) {
          setPlansLoading(false)
        }
      }
    }

    void loadPublicPlans()

    return () => {
      mounted = false
    }
  }, [])

  const [form, setForm] = useState({
    plan_slug: preselectedPlan || '',
    society_name: '',
    city: '',
    state: '',
    country: 'India',
    unit_count: 100,
    admin_name: '',
    admin_email: '',
    admin_phone: '',
    password: '',
    password_confirmation: '',
    terms_accepted: false,
    email_token: '',
    phone_otp: '',
  })

  useEffect(() => {
    if (preselectedPlan) {
      setForm((prev) => ({ ...prev, plan_slug: preselectedPlan }))
    }
  }, [preselectedPlan])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setIsStateDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const filteredStates = useMemo(() => {
    const query = stateSearch.trim().toLowerCase()
    if (!query) {
      return INDIAN_STATES_AND_UTS
    }

    return INDIAN_STATES_AND_UTS.filter((stateName) => stateName.toLowerCase().includes(query))
  }, [stateSearch])

  const selectedPlanDetails = useMemo(() => {
    return form.plan_slug ? planOptions[form.plan_slug] : null
  }, [form.plan_slug, planOptions])

  const handlePlanChange = (event) => {
    const nextPlan = String(event.target.value || '').toLowerCase()

    setForm((prev) => ({ ...prev, plan_slug: nextPlan }))
  }

  const handleSocietyNameChange = (event) => {
    const nextName = event.target.value
    const nextDerivedSlug = slugifySocietyName(nextName)

    setForm((prev) => ({ ...prev, society_name: nextName }))
    if (isCustomSlugEnabled && !isCustomSlugDirty) {
      setCustomSlug(nextDerivedSlug)
    }
    setSlugAvailability({
      status: 'idle',
      requestedSlug: nextDerivedSlug,
      resolvedSlug: '',
      message: '',
    })
  }

  const derivedSlug = useMemo(() => slugifySocietyName(form.society_name), [form.society_name])
  const requestedSlug = useMemo(() => {
    return isCustomSlugEnabled ? normalizeWorkspaceSlug(customSlug) : derivedSlug
  }, [customSlug, derivedSlug, isCustomSlugEnabled])

  const resolvedSlug = useMemo(() => {
    if (slugAvailability.requestedSlug === requestedSlug && slugAvailability.resolvedSlug) {
      return slugAvailability.resolvedSlug
    }

    return requestedSlug
  }, [requestedSlug, slugAvailability])

  const slugPreview = useMemo(() => {
    return resolvedSlug ? `${APP_BASE}/${resolvedSlug}/setup` : `${APP_BASE}/your-society/setup`
  }, [resolvedSlug])

  const syncSlugAvailability = async ({ societyName, requestedWorkspaceSlug }) => {
    const trimmedName = String(societyName || '').trim()
    const normalizedRequestedSlug = normalizeWorkspaceSlug(requestedWorkspaceSlug)
    const isSlugQuery = normalizedRequestedSlug !== ''

    if (isSlugQuery && !/^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/.test(normalizedRequestedSlug)) {
      setSlugAvailability({
        status: 'invalid',
        requestedSlug: normalizedRequestedSlug,
        resolvedSlug: normalizedRequestedSlug,
        message: 'Workspace URL must be 3-50 characters, lowercase letters, numbers, or hyphens, and cannot start/end with hyphen.',
      })
      return null
    }

    const effectiveRequestedSlug = isSlugQuery ? normalizedRequestedSlug : slugifySocietyName(trimmedName)
    if (!isSlugQuery && (!trimmedName || !effectiveRequestedSlug || !/^[A-Za-z0-9\s\-&.]{3,120}$/.test(trimmedName))) {
      setSlugAvailability({
        status: 'idle',
        requestedSlug: effectiveRequestedSlug,
        resolvedSlug: '',
        message: '',
      })
      return null
    }

    setSlugAvailability({
      status: 'checking',
      requestedSlug: effectiveRequestedSlug,
      resolvedSlug: effectiveRequestedSlug,
      message: 'Checking workspace URL...',
    })

    try {
      const endpoint = isSlugQuery
        ? `/public/society-signup/check-slug?slug=${encodeURIComponent(normalizedRequestedSlug)}`
        : `/public/society-signup/check-slug?society_name=${encodeURIComponent(trimmedName)}`
      const response = await apiGet(endpoint)

      const availability = response?.data || {}
      const resolvedAvailabilitySlug = availability.resolved_slug || effectiveRequestedSlug

      setSlugAvailability({
        status: availability.available ? 'available' : 'suggested',
        requestedSlug: availability.requested_slug || effectiveRequestedSlug,
        resolvedSlug: resolvedAvailabilitySlug,
        message: availability.message || 'Workspace URL availability updated.',
      })

      return availability
    } catch (availabilityError) {
      setSlugAvailability({
        status: 'error',
        requestedSlug: effectiveRequestedSlug,
        resolvedSlug: effectiveRequestedSlug,
        message: 'Could not verify workspace URL right now. We will reserve the next available URL during signup.',
      })

      return null
    }
  }

  const passwordStrength = useMemo(() => {
    const password = form.password
    if (!password) {
      return ''
    }

    let score = 0
    if (password.length >= 8) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/\d/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    if (score <= 2) return 'Weak'
    if (score <= 4) return 'Medium'
    return 'Strong'
  }, [form.password])

  const fieldClass = 'w-full rounded-lg border border-primary-200 bg-white px-4 py-3 text-primary-900 placeholder:text-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200'
  const primaryButtonClass = 'inline-flex items-center justify-center rounded-lg bg-primary-900 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-60'
  const cardClass = 'space-y-4 rounded-2xl border border-primary-100 bg-white/95 p-6 shadow-sm'

  const validateSignupForm = () => {
    const societyName = form.society_name.trim()
    const normalizedCustomSlug = normalizeWorkspaceSlug(customSlug)
    if (!form.plan_slug || !planOptions[form.plan_slug]) {
      return 'Please select a valid plan.'
    }
    if (!/^[A-Za-z0-9\s\-&.]{3,120}$/.test(societyName)) {
      return 'Society name must be 3-120 characters and can include letters, numbers, spaces, -, &, and .'
    }
    if (isCustomSlugEnabled && !/^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/.test(normalizedCustomSlug)) {
      return 'Workspace URL must be 3-50 characters, lowercase letters, numbers, or hyphens, and cannot start/end with hyphen.'
    }
    if (!/^[A-Za-z\s]{2,80}$/.test(form.city.trim())) {
      return 'City must be 2-80 characters and contain letters only.'
    }
    if (!INDIAN_STATES_AND_UTS.includes(form.state)) {
      return 'Please choose a valid Indian state or union territory.'
    }
    const units = Number(form.unit_count)
    if (!Number.isInteger(units) || units < 1 || units > 10000) {
      return 'Number of units must be between 1 and 10000.'
    }
    if (!/^[A-Za-z\s]{3,80}$/.test(form.admin_name.trim())) {
      return 'Admin full name must be 3-80 characters and contain letters/spaces only.'
    }
    const normalizedEmail = form.admin_email.trim().toLowerCase()
    const emailDomain = normalizedEmail.split('@')[1] || ''
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return 'Please provide a valid admin email.'
    }
    if (DISPOSABLE_DOMAINS.includes(emailDomain)) {
      return 'Disposable email domains are not allowed.'
    }
    if (!/^[6-9][0-9]{9}$/.test(form.admin_phone.trim())) {
      return 'Mobile number must be a valid 10-digit Indian number starting with 6-9.'
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(form.password)) {
      return 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    }
    if (form.password !== form.password_confirmation) {
      return 'Password and confirm password do not match.'
    }
    if (!form.terms_accepted) {
      return 'Please accept Terms of Service and Privacy Policy.'
    }

    return ''
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    setAssignedSetupUrl('')

    try {
      const validationError = validateSignupForm()
      if (validationError) {
        throw new Error(validationError)
      }

      const availability = await syncSlugAvailability({
        societyName: form.society_name,
        requestedWorkspaceSlug: isCustomSlugEnabled ? customSlug : '',
      })

      if (isCustomSlugEnabled && availability && availability.available === false) {
        throw new Error('Requested workspace URL is unavailable. Use the suggested URL or pick another one.')
      }

      const result = await apiPost('/public/society-signup', {
        plan_slug: form.plan_slug,
        society_name: form.society_name.trim(),
        workspace_slug: isCustomSlugEnabled ? normalizeWorkspaceSlug(customSlug) : null,
        city: form.city.trim(),
        state: form.state,
        country: 'India',
        unit_count: Number(form.unit_count),
        admin_name: form.admin_name.trim(),
        admin_email: form.admin_email.trim().toLowerCase(),
        admin_phone: form.admin_phone.trim(),
        recaptcha_token: await executeRecaptcha('signup'),
      })

      setSuccess('Society created in pending verification. Complete email and mobile verification to activate.')
      setAssignedSetupUrl(result?.data?.setup_url || '')

      setForm((prev) => ({
        ...prev,
        email_token: '',
        phone_otp: canAutoFillLocalOtp() ? (result?.data?.verification?.otp_debug || '') : '',
      }))

      setStep(2)
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

    try {
      const verificationToken = extractVerificationToken(form.email_token)
      if (verificationToken.length < 20) {
        throw new Error('Please paste the full email verification token or full verification link from your email.')
      }

      await apiPost('/public/society-signup/verify-email', {
        token: verificationToken,
      })

      if (verificationToken !== form.email_token) {
        setForm((prev) => ({
          ...prev,
          email_token: verificationToken,
        }))
      }

      setSuccess('Email verified. Enter mobile OTP to complete account activation.')
      setStep(3)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPhoneAndComplete = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await apiPost('/public/society-signup/verify-phone', {
        email: form.admin_email,
        otp: form.phone_otp,
      })

      const completion = await apiPost('/public/society-signup/complete', {
        email: form.admin_email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      })

      const redirectUrl = completion?.data?.redirect_url || `${APP_BASE}/login`
      setSuccess('Account verified successfully. Redirecting to your setup workspace...')
      window.location.assign(redirectUrl)
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

      <div className="mx-auto max-w-3xl px-6">
        <h1 className="mb-1 text-3xl font-bold text-primary-900">Create Your Society Workspace</h1>
        <p className="mb-1 text-primary-700">Start your 30-day free trial.</p>
        <p className="mb-6 text-sm text-primary-600">No credit card required.</p>

        <div className="mb-6 grid grid-cols-3 gap-2 text-xs">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className={`h-2 rounded-full ${step >= index ? 'bg-primary-700' : 'bg-primary-100'}`}
            />
          ))}
        </div>

        {error && <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        {success && (
          <div className="mb-4 rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            <p>{success}</p>
            {assignedSetupUrl && (
              <p className="mt-1 text-xs text-green-800">Final workspace URL: {assignedSetupUrl}</p>
            )}
          </div>
        )}
        {isEnterpriseSignupRequested && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p className="font-semibold">Enterprise onboarding is handled by our sales team.</p>
            <p className="mt-1">
              {ENTERPRISE_PLAN.pricing} with {ENTERPRISE_PLAN.billing.toLowerCase()}. Book a demo for a guided rollout,
              integration review, and custom proposal. You can also choose a self-serve plan below.
            </p>
            <Link href="/book-demo" className="mt-3 inline-flex text-sm font-semibold text-amber-900 underline underline-offset-2">
              Contact Sales for Enterprise
            </Link>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSignup} className={cardClass}>
            <h2 className="text-lg font-semibold text-primary-900">Step 1: Signup Details</h2>

            <div className="space-y-1">
              <label htmlFor="plan_slug" className="text-sm font-medium text-primary-800">Choose Your Plan</label>
              <select
                id="plan_slug"
                className={fieldClass}
                value={form.plan_slug}
                onChange={handlePlanChange}
                required
              >
                <option value="" disabled>Select a plan</option>
                {Object.entries(planOptions).map(([slug, details]) => (
                  <option key={slug} value={slug}>{details.label}</option>
                ))}
              </select>
              {plansLoading ? <p className="text-xs text-primary-500">Loading plans...</p> : null}
            </div>

            {selectedPlanDetails ? (
              <div className="rounded-xl border border-primary-200 bg-primary-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">Selected Plan</p>
                <p className="mt-1 text-lg font-semibold text-primary-900">{selectedPlanDetails?.label}</p>
                <p className="text-sm text-primary-700">{selectedPlanDetails?.pricing}</p>
                <p className="text-sm text-primary-700">{selectedPlanDetails?.notes}</p>
                <p className="text-sm text-primary-700">{selectedPlanDetails?.billing}</p>
              </div>
            ) : null}

            <div className="space-y-1">
              <label htmlFor="society_name" className="text-sm font-medium text-primary-800">Society Name</label>
              <input
                id="society_name"
                className={fieldClass}
                placeholder="e.g. Green Valley Residency"
                value={form.society_name}
                onChange={handleSocietyNameChange}
                onBlur={() => {
                  if (!isCustomSlugEnabled) {
                    void syncSlugAvailability({ societyName: form.society_name, requestedWorkspaceSlug: '' })
                  }
                }}
                required
              />
              <button
                type="button"
                className="text-xs font-semibold text-primary-800 underline underline-offset-2"
                onClick={() => {
                  const nextEnabled = !isCustomSlugEnabled
                  setIsCustomSlugEnabled(nextEnabled)
                  if (nextEnabled) {
                    const nextSlug = normalizeWorkspaceSlug(customSlug || derivedSlug)
                    setCustomSlug(nextSlug)
                    setIsCustomSlugDirty(customSlug !== '')
                    setSlugAvailability({
                      status: 'idle',
                      requestedSlug: nextSlug,
                      resolvedSlug: '',
                      message: '',
                    })
                  } else {
                    setIsCustomSlugDirty(false)
                    setCustomSlug('')
                    setSlugAvailability({
                      status: 'idle',
                      requestedSlug: derivedSlug,
                      resolvedSlug: '',
                      message: '',
                    })
                    void syncSlugAvailability({ societyName: form.society_name, requestedWorkspaceSlug: '' })
                  }
                }}
              >
                {isCustomSlugEnabled ? 'Use Auto-generated URL' : 'Edit Workspace URL'}
              </button>
              {isCustomSlugEnabled && (
                <div className="space-y-1">
                  <label htmlFor="workspace_slug" className="text-xs font-medium text-primary-800">Workspace URL</label>
                  <input
                    id="workspace_slug"
                    className={fieldClass}
                    placeholder="e.g. green-valley-residency"
                    value={customSlug}
                    onChange={(event) => {
                      const nextSlug = normalizeWorkspaceSlug(event.target.value)
                      setCustomSlug(nextSlug)
                      setIsCustomSlugDirty(true)
                      setSlugAvailability({
                        status: 'idle',
                        requestedSlug: nextSlug,
                        resolvedSlug: '',
                        message: '',
                      })
                    }}
                    onBlur={() => {
                      void syncSlugAvailability({
                        societyName: form.society_name,
                        requestedWorkspaceSlug: customSlug,
                      })
                    }}
                    required={isCustomSlugEnabled}
                  />
                  <p className="text-xs text-primary-600">Use lowercase letters, numbers, and hyphens only.</p>
                </div>
              )}
              <p className="text-xs text-primary-600">Workspace preview: {slugPreview}</p>
              {slugAvailability.status === 'checking' && (
                <p className="text-xs text-primary-600">{slugAvailability.message}</p>
              )}
              {slugAvailability.status === 'available' && (
                <p className="text-xs text-green-700">{slugAvailability.message}</p>
              )}
              {slugAvailability.status === 'invalid' && (
                <p className="text-xs text-red-700">{slugAvailability.message}</p>
              )}
              {slugAvailability.status === 'suggested' && (
                <div className="space-y-1">
                  <p className="text-xs text-amber-700">
                    {slugAvailability.message} Suggested URL: {APP_BASE}/{resolvedSlug}/setup
                  </p>
                  {isCustomSlugEnabled && (
                    <button
                      type="button"
                      className="text-xs font-semibold text-primary-800 underline underline-offset-2"
                      onClick={() => {
                        setCustomSlug(resolvedSlug)
                        setIsCustomSlugDirty(true)
                        setSlugAvailability({
                          status: 'available',
                          requestedSlug: resolvedSlug,
                          resolvedSlug,
                          message: 'Workspace URL is available.',
                        })
                      }}
                    >
                      Use Suggested URL
                    </button>
                  )}
                </div>
              )}
              {slugAvailability.status === 'error' && (
                <p className="text-xs text-amber-700">{slugAvailability.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-primary-800">City</label>
                <input
                  className={fieldClass}
                  placeholder="e.g. Hyderabad"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-primary-800">State / Union Territory</label>
                <div className="relative" ref={stateDropdownRef}>
                  <button
                    type="button"
                    className={`${fieldClass} flex items-center justify-between text-left`}
                    onClick={() => {
                      setIsStateDropdownOpen((prev) => !prev)
                      setStateSearch(form.state)
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={isStateDropdownOpen}
                  >
                    <span className={form.state ? 'text-primary-900' : 'text-primary-400'}>
                      {form.state || 'Select state or UT'}
                    </span>
                    <span className="text-primary-500">{isStateDropdownOpen ? '▲' : '▼'}</span>
                  </button>

                  {isStateDropdownOpen && (
                    <div className="absolute z-20 mt-2 w-full rounded-lg border border-primary-200 bg-white p-2 shadow-lg">
                      <input
                        className={fieldClass}
                        placeholder="Search state or UT"
                        value={stateSearch}
                        onChange={(e) => setStateSearch(e.target.value)}
                        autoFocus
                      />
                      <div className="mt-2 max-h-52 overflow-auto rounded-md border border-primary-100">
                        {filteredStates.length === 0 && (
                          <p className="px-3 py-2 text-sm text-primary-500">No matching state or UT found.</p>
                        )}
                        {filteredStates.map((stateName) => (
                          <button
                            key={stateName}
                            type="button"
                            className="block w-full px-3 py-2 text-left text-sm text-primary-800 hover:bg-primary-50"
                            onClick={() => {
                              setForm({ ...form, state: stateName })
                              setStateSearch(stateName)
                              setIsStateDropdownOpen(false)
                            }}
                          >
                            {stateName}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input type="hidden" name="state" value={form.state} required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-primary-800">Country</label>
              <input className={`${fieldClass} bg-primary-50 text-primary-700`} value={form.country} readOnly required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-primary-800">Number of Flats / Units</label>
              <input
                className={fieldClass}
                type="number"
                min="1"
                max="10000"
                step="1"
                placeholder="e.g. 120"
                value={form.unit_count}
                onChange={(e) => setForm({ ...form, unit_count: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-primary-800">Admin Full Name</label>
              <input
                className={fieldClass}
                placeholder="e.g. Rohan Mehta"
                value={form.admin_name}
                onChange={(e) => setForm({ ...form, admin_name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-primary-800">Admin Email</label>
              <input
                className={fieldClass}
                type="email"
                placeholder="admin@society.com"
                value={form.admin_email}
                onChange={(e) => setForm({ ...form, admin_email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-primary-800">Mobile Number</label>
              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-3 text-sm font-medium text-primary-700">+91</span>
                <input
                  className={fieldClass}
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  value={form.admin_phone}
                  onChange={(e) => setForm({ ...form, admin_phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-primary-800">Password</label>
              <input
                className={fieldClass}
                type="password"
                placeholder="Create password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              {passwordStrength && <p className="text-xs text-primary-600">Strength: {passwordStrength}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-primary-800">Confirm Password</label>
              <input
                className={fieldClass}
                type="password"
                placeholder="Confirm password"
                value={form.password_confirmation}
                onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                required
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-primary-700">
              <input
                type="checkbox"
                className="mt-1"
                checked={form.terms_accepted}
                onChange={(e) => setForm({ ...form, terms_accepted: e.target.checked })}
              />
              <span>
                I agree to <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
              </span>
            </label>

            <button className={primaryButtonClass} disabled={loading} type="submit">
              {loading ? 'Creating...' : 'Create Society'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyEmail} className={cardClass}>
            <h2 className="text-lg font-semibold text-primary-900">Step 2: Verify Email</h2>
            <label className="text-sm text-primary-700">Email Verification Token or Link</label>
            <input
              className={fieldClass}
              placeholder="Paste token or full verification link from email"
              value={form.email_token}
              onChange={(e) => setForm({ ...form, email_token: e.target.value })}
              required
            />
            <button className={primaryButtonClass} disabled={loading} type="submit">
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleVerifyPhoneAndComplete} className={cardClass}>
            <h2 className="text-lg font-semibold text-primary-900">Step 3: Verify Mobile and Activate</h2>
            <label className="text-sm text-primary-700">Mobile OTP</label>
            <input
              className={fieldClass}
              placeholder="Enter 6-digit OTP"
              value={form.phone_otp}
              onChange={(e) => setForm({ ...form, phone_otp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
              required
            />
            <button className={primaryButtonClass} disabled={loading} type="submit">
              {loading ? 'Completing...' : 'Verify Mobile and Continue'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-primary-600">
          Already signed up? <Link href="/verify-account" className="font-semibold text-primary-800 underline">Verify your account here</Link>
        </p>
      </div>
    </main>
  )
}
