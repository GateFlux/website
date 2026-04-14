'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import config from '../lib/config'
import usePlatformSettings from '../lib/usePlatformSettings'
import { extractVerificationToken } from '../lib/verificationToken'

const API_BASE = config.api.baseUrl
const APP_BASE = config.app.baseUrl
const RECAPTCHA_SITE_KEY = config.recaptcha.siteKey

function canAutoFillLocalOtp() {
  if (typeof window === 'undefined') {
    return false
  }

  const host = window.location.hostname.toLowerCase()

  if (host === 'localhost' || host.endsWith('.localhost') || host === '127.0.0.1' || host === '::1' || host === '0.0.0.0' || host.endsWith('.local') || host.endsWith('.test')) {
    return true
  }

  const privateIpv4 = /^(10\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})|192\.168\.(\d{1,3})\.(\d{1,3})|172\.(1[6-9]|2\d|3[0-1])\.(\d{1,3})\.(\d{1,3}))$/
  return privateIpv4.test(host)
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

function extractApiErrorMessage(payload, fallbackMessage = 'Request failed') {
  const errors = payload?.errors

  if (errors && typeof errors === 'object') {
    const firstFieldValue = Object.values(errors)[0]

    if (Array.isArray(firstFieldValue) && firstFieldValue.length > 0) {
      const firstMessage = String(firstFieldValue[0] || '').trim()
      if (firstMessage) {
        return firstMessage
      }
    }

    if (typeof firstFieldValue === 'string' && firstFieldValue.trim()) {
      return firstFieldValue.trim()
    }
  }

  const rawMessage = String(payload?.message || '').trim()
  return rawMessage || fallbackMessage
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
    const message = extractApiErrorMessage(data, 'Request failed')
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
    const message = extractApiErrorMessage(data, 'Request failed')
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
    const prefilledEmail = searchParams.get('email') || ''
    const prefilledToken = searchParams.get('token') || ''
    const isReentry = Boolean(prefilledEmail)
    const reentryAttemptedRef = useRef(false)
    const [step, setStep] = useState(1)
    const [phoneAlreadyVerified, setPhoneAlreadyVerified] = useState(false)
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
  const { signupEnabled, maintenanceMode } = usePlatformSettings()
  const signupDisabled = !signupEnabled
  const stateDropdownRef = useRef(null)

  // Existing user authentication flow state
  const [signupMode, setSignupMode] = useState('') // 'new_user_signup' or 'existing_user_requires_auth'
  const [existingUserToken, setExistingUserToken] = useState('')
  const [existingUserPassword, setExistingUserPassword] = useState('')
  const [existingUserReason, setExistingUserReason] = useState('')

  // Resume verification modal state
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [resumeEmail, setResumeEmail] = useState('')
  const [resumeModalLoading, setResumeModalLoading] = useState(false)
  const [resumeModalError, setResumeModalError] = useState('')
  const [resumeModalActivated, setResumeModalActivated] = useState(false)

  // Tracks whether a reentry user has valid pending signup (allows steps 2/3 even when signup is disabled)
  const [validReentry, setValidReentry] = useState(false)

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
      admin_email: prefilledEmail,
    admin_phone: '',
    password: '',
    password_confirmation: '',
    terms_accepted: false,
      email_token: prefilledToken,
    phone_otp: '',
  })

  useEffect(() => {
    if (preselectedPlan) {
      setForm((prev) => ({ ...prev, plan_slug: preselectedPlan }))
    }
  }, [preselectedPlan])

    useEffect(() => {
      if (!prefilledEmail || reentryAttemptedRef.current) {
        return
      }

      reentryAttemptedRef.current = true

      const restoreReentry = async () => {
        setLoading(true)
        setError('')

        try {
          if (prefilledToken) {
            const verificationToken = extractVerificationToken(prefilledToken)
            if (verificationToken.length >= 20) {
              try {
                await apiPost('/public/society-signup/verify-email', { token: verificationToken })
              } catch (_e) {
                // token may already be used; continue to status check
              }
            }
          }

          const response = await apiPost('/public/society-signup/status', {
            email: prefilledEmail.trim().toLowerCase(),
          })
          const statusData = response?.data || {}

          if (!statusData.signup_found) {
            setError('No pending signup found for this email. Please check the email address or start a new registration.')
            return
          }

          if (statusData.user_activated) {
            setError('')
            setSuccess(`Your account is already active. Please log in to the platform to continue.`)
            setAssignedSetupUrl(`${APP_BASE}/login`)
            return
          }

          if (canAutoFillLocalOtp() && statusData?.otp_debug) {
            setForm((prev) => ({
              ...prev,
              phone_otp: String(statusData.otp_debug),
            }))
          }

          setValidReentry(true)

          if (statusData.phone_verified) {
            setPhoneAlreadyVerified(true)
            setStep(3)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else if (statusData.email_verified) {
            setStep(3)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            setStep(2)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        } catch (err) {
          setValidReentry(false)
          setError('Could not load verification status. Please check your email or try again.')
        } finally {
          setLoading(false)
        }
      }

      void restoreReentry()
    }, [prefilledEmail, prefilledToken])

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

  const monthlyEstimate = useMemo(() => {
    if (!selectedPlanDetails) {
      return null
    }

    const basePrice = Number(selectedPlanDetails.base_price)
    const perUnitPrice = Number(selectedPlanDetails.per_unit_price)
    const units = Number(form.unit_count)

    if (!Number.isFinite(basePrice) || !Number.isFinite(perUnitPrice)) {
      return null
    }

    if (!Number.isInteger(units) || units < 1) {
      return null
    }

    const total = basePrice + (perUnitPrice * units)

    return {
      total,
      basePrice,
      perUnitPrice,
      units,
    }
  }, [form.unit_count, selectedPlanDetails])

  const handlePlanChange = (event) => {
    const nextPlan = String(event.target.value || '').toLowerCase()

    setForm((prev) => ({ ...prev, plan_slug: nextPlan }))
  }

  const handleUnitCountChange = (event) => {
    const nextValue = String(event.target.value || '')

    if (nextValue === '' || /^\d+$/.test(nextValue)) {
      setForm((prev) => ({ ...prev, unit_count: nextValue }))
    }
  }

  const handleUnitCountBlur = () => {
    const parsedUnits = Number(form.unit_count)
    const safeUnits = Math.max(1, Math.min(10000, Number.isFinite(parsedUnits) ? parsedUnits : 1))
    setForm((prev) => ({ ...prev, unit_count: String(safeUnits) }))
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
    return ''
  }

    const validateCompletionFields = () => {
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
    if (signupDisabled) return
    setLoading(true)
    setError('')
    setSuccess('')
    setAssignedSetupUrl('')
    setSignupMode('')

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

      // Check if this is an existing user that needs authentication
      const mode = result?.data?.mode
      if (mode === 'existing_user_requires_auth') {
        setSignupMode('existing_user_requires_auth')
        setExistingUserReason(result?.data?.reason || 'An account with this email already exists.')
        setError('')
        setSuccess('This email is already registered. Please authenticate to create a new society.')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        // New user signup flow
        setSignupMode('new_user_signup')
        setSuccess('Society created in pending verification. Complete email and mobile verification to activate.')
        setAssignedSetupUrl(result?.data?.setup_url || '')

        setForm((prev) => ({
          ...prev,
          email_token: '',
          phone_otp: canAutoFillLocalOtp() ? (result?.data?.verification?.otp_debug || '') : '',
        }))

        setStep(2)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAuthenticateExisting = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!existingUserPassword) {
        throw new Error('Please enter your password.')
      }

      const response = await apiPost('/public/society-signup/authenticate-existing', {
        email: form.admin_email.trim().toLowerCase(),
        password: existingUserPassword,
      })

      const token = response?.data?.token
      if (!token) {
        throw new Error('Authentication failed. Please try again.')
      }

      setExistingUserToken(token)
      setSuccess('Authentication successful. Proceeding to create your society...')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      // Auto-advance to society creation after brief delay to show success message
      setTimeout(() => {
        setSuccess('')
        // The UI will now show the CreateSociety form
      }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSociety = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!existingUserToken) {
        throw new Error('Authentication token missing. Please authenticate first.')
      }

      // Note: Need to send token as Bearer in Authorization header for this endpoint
      const response = await fetch(`${API_BASE}/public/society-signup/create-society`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${existingUserToken}`,
        },
        body: JSON.stringify({
          plan_slug: form.plan_slug,
          society_name: form.society_name.trim(),
          workspace_slug: isCustomSlugEnabled ? normalizeWorkspaceSlug(customSlug) : null,
          city: form.city.trim(),
          state: form.state,
          country: 'India',
          unit_count: Number(form.unit_count),
          recaptcha_token: await executeRecaptcha('create_society'),
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        const message = extractApiErrorMessage(data, 'Failed to create society')
        throw new Error(message)
      }

      setSuccess('Society created successfully! Verify your email to complete activation.')
      setAssignedSetupUrl(data?.data?.setup_url || '')

      setForm((prev) => ({
        ...prev,
        email_token: '',
        phone_otp: canAutoFillLocalOtp() ? (data?.data?.verification?.otp_debug || '') : '',
      }))

      // Reset existing user flow state
      setSignupMode('')
      setExistingUserToken('')
      setExistingUserPassword('')
      setExistingUserReason('')

      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePhone = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const normalizedPhone = form.admin_phone.trim()

      if (!/^[6-9][0-9]{9}$/.test(normalizedPhone)) {
        throw new Error('Mobile number must be a valid 10-digit Indian number starting with 6-9.')
      }

      const response = await apiPost('/public/society-signup/update-phone', {
        email: form.admin_email.trim().toLowerCase(),
        phone: normalizedPhone,
      })

      setPhoneAlreadyVerified(false)

      if (canAutoFillLocalOtp() && response?.data?.otp_debug) {
        setForm((prev) => ({ ...prev, phone_otp: String(response.data.otp_debug) }))
      } else {
        setForm((prev) => ({ ...prev, phone_otp: '' }))
      }

      setSuccess('Mobile number updated. New OTP sent to your updated number.')
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
          email: form.admin_email.trim().toLowerCase(),
          recaptcha_token: recaptchaToken,
        })

        if (canAutoFillLocalOtp() && response?.data?.otp_debug) {
          setForm((prev) => ({ ...prev, phone_otp: String(response.data.otp_debug) }))
        }

        setSuccess('New OTP sent successfully.')
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
        const completionError = validateCompletionFields()
        if (completionError) {
          throw new Error(completionError)
        }

        if (!phoneAlreadyVerified) {
          await apiPost('/public/society-signup/verify-phone', {
        email: form.admin_email,
        otp: form.phone_otp,
          })
        }

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

        {signupDisabled && !validReentry && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-6 py-8 text-center">
            <h2 className="text-lg font-semibold text-amber-900">
              {maintenanceMode ? 'Platform Under Maintenance' : 'Registration Currently Unavailable'}
            </h2>
            <p className="mt-2 text-sm text-amber-800">
              {maintenanceMode
                ? 'The platform is currently under maintenance. Please check back shortly.'
                : 'Self-service society registration is temporarily disabled. Please contact us or book a demo to get started.'}
            </p>
            {!maintenanceMode && (
              <div className="mt-4 flex justify-center gap-3">
                <Link href="/contact" className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800">
                  Contact Us
                </Link>
                <Link href="/book-demo" className="rounded-lg border border-primary-300 bg-white px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50">
                  Book a Demo
                </Link>
              </div>
            )}
          </div>
        )}

          {isReentry && (
            <p className="mb-4 rounded border border-primary-200 bg-primary-50 px-3 py-2 text-sm text-primary-700">
              Resuming verification for <span className="font-semibold">{prefilledEmail}</span>
            </p>
          )}

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

        {!signupDisabled && step === 1 && signupMode === 'existing_user_requires_auth' && !existingUserToken && (
          <form onSubmit={handleAuthenticateExisting} className={cardClass}>
            <h2 className="text-lg font-semibold text-primary-900">Authenticate to Create a New Society</h2>
            <p className="text-sm text-primary-600">{existingUserReason}</p>

            <div className="space-y-1">
              <label className="text-sm font-medium text-primary-800">Email</label>
              <input
                className={`${fieldClass} bg-primary-50 text-primary-700`}
                type="email"
                value={form.admin_email.trim().toLowerCase()}
                readOnly
                disabled
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-primary-800">Password</label>
              <input
                className={fieldClass}
                type="password"
                placeholder="Enter your password"
                value={existingUserPassword}
                onChange={(e) => setExistingUserPassword(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button 
                type="button"
                className="flex-1 rounded-lg border border-primary-200 px-5 py-3 text-sm font-semibold text-primary-900 hover:bg-primary-50 disabled:opacity-60"
                onClick={() => {
                  setSignupMode('')
                  setExistingUserPassword('')
                  setError('')
                  setSuccess('')
                }}
                disabled={loading}
              >
                Back
              </button>
              <button className={`${primaryButtonClass} flex-1`} disabled={loading} type="submit">
                {loading ? 'Authenticating...' : 'Authenticate'}
              </button>
            </div>
          </form>
        )}

        {!signupDisabled && step === 1 && signupMode === 'existing_user_requires_auth' && existingUserToken && (
          <form onSubmit={handleCreateSociety} className={cardClass}>
            <h2 className="text-lg font-semibold text-primary-900">Create Your New Society</h2>
            <p className="text-sm text-primary-600">You're authenticated as <span className="font-semibold">{form.admin_email.trim().toLowerCase()}</span>. Now create your new society.</p>

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
              <label htmlFor="society_name_auth" className="text-sm font-medium text-primary-800">Society Name</label>
              <input
                id="society_name_auth"
                className={fieldClass}
                placeholder="e.g. Green Valley Residency"
                value={form.society_name}
                onChange={handleSocietyNameChange}
                required
              />
              <p className="text-xs text-primary-600">Workspace preview: {slugPreview}</p>
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
                <label className="text-sm font-medium text-primary-800">State</label>
                <input
                  className={fieldClass}
                  placeholder="e.g. Telangana"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="unit_count_auth" className="text-sm font-medium text-primary-800">Number of Flats / Units</label>
              <input
                id="unit_count_auth"
                className={fieldClass}
                type="number"
                min="1"
                max="10000"
                placeholder="e.g. 120"
                value={form.unit_count}
                onChange={handleUnitCountChange}
                onBlur={handleUnitCountBlur}
                required
              />
            </div>

            <div className="flex gap-3">
              <button 
                type="button"
                className="flex-1 rounded-lg border border-primary-200 px-5 py-3 text-sm font-semibold text-primary-900 hover:bg-primary-50 disabled:opacity-60"
                onClick={() => {
                  setExistingUserToken('')
                  setExistingUserPassword('')
                  setSignupMode('')
                  setError('')
                  setSuccess('')
                }}
                disabled={loading}
              >
                Back
              </button>
              <button className={`${primaryButtonClass} flex-1`} disabled={loading} type="submit">
                {loading ? 'Creating...' : 'Create Society'}
              </button>
            </div>
          </form>
        )}

        {!signupDisabled && step === 1 && (!signupMode || signupMode === 'new_user_signup') && (
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
                {monthlyEstimate ? (
                  <div className="mt-2 rounded-lg border border-primary-200 bg-white px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">Estimated Monthly Cost</p>
                    <p className="text-base font-semibold text-primary-900">{formatCurrency(monthlyEstimate.total)}/month</p>
                    <p className="text-xs text-primary-700">Estimated yearly cost: {formatCurrency(monthlyEstimate.total * 12)}/year</p>
                    <p className="text-xs text-primary-600">
                      {formatCurrency(monthlyEstimate.basePrice)} base + {formatCurrency(monthlyEstimate.perUnitPrice)} × {monthlyEstimate.units} units
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-primary-600">Enter a valid unit count to see estimated monthly cost.</p>
                )}
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
              <label htmlFor="unit_count" className="text-sm font-medium text-primary-800">Number of Flats / Units</label>
              <input
                id="unit_count"
                className={fieldClass}
                type="number"
                min="1"
                max="10000"
                step="1"
                placeholder="e.g. 120"
                value={form.unit_count}
                onChange={handleUnitCountChange}
                onBlur={handleUnitCountBlur}
                required
              />
              {selectedPlanDetails ? (
                monthlyEstimate ? (
                  <div className="space-y-1 text-xs text-primary-600">
                    <p>
                      Estimated monthly cost: <span className="font-semibold text-primary-800">{formatCurrency(monthlyEstimate.total)}/month</span>
                    </p>
                    <p>
                      Estimated yearly cost: <span className="font-semibold text-primary-800">{formatCurrency(monthlyEstimate.total * 12)}/year</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-primary-600">Enter a valid unit count to view monthly estimate.</p>
                )
              ) : null}
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

             <button className={primaryButtonClass} disabled={loading} type="submit">
              {loading ? 'Creating...' : 'Create Society'}
            </button>
          </form>
        )}

        {(!signupDisabled || validReentry) && step === 2 && (
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

        {(!signupDisabled || validReentry) && step === 3 && (
          <form onSubmit={handleVerifyPhoneAndComplete} className={cardClass}>
            <h2 className="text-lg font-semibold text-primary-900">Step 3: Verify Mobile and Activate</h2>

              <div className="space-y-1">
                <label className="text-sm font-medium text-primary-800">Mobile Number</label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex flex-1 items-center gap-2">
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
                  <button
                    type="button"
                    className="rounded-lg border border-primary-200 px-4 py-3 text-sm font-semibold text-primary-900 hover:bg-primary-50 disabled:opacity-60"
                    onClick={handleUpdatePhone}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Number'}
                  </button>
                </div>
                <p className="text-xs text-primary-600">Use this if you need OTP on a different number.</p>
              </div>

              {!phoneAlreadyVerified && (
                <div className="space-y-1">
                  <label className="text-sm text-primary-700">Mobile OTP</label>
                  <input
                    className={fieldClass}
                    placeholder="Enter 6-digit OTP"
                    value={form.phone_otp}
                    onChange={(e) => setForm({ ...form, phone_otp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    required
                  />
                  <button type="button" className="text-xs font-semibold text-primary-800 underline underline-offset-2" onClick={handleResendOtp} disabled={loading}>Resend OTP</button>
                </div>
              )}

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
                  I agree to <Link href="/terms" target="_blank" className="underline">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="underline">Privacy Policy</Link>
                </span>
              </label>

              <button className={primaryButtonClass} disabled={loading} type="submit">
                {loading ? 'Completing...' : 'Verify Mobile and Continue'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-primary-600">
           Already signed up?{' '}<button type="button" className="font-semibold text-primary-800 underline underline-offset-2 hover:text-primary-900" onClick={() => { setResumeEmail(''); setResumeModalError(''); setResumeModalActivated(false); setShowResumeModal(true) }}>Resume verification</button>
        </p>

        {/* Resume Verification Modal */}
        {showResumeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowResumeModal(false)}>
            <div className="relative mx-4 w-full max-w-md rounded-2xl border border-primary-200 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="absolute right-3 top-3 rounded-full p-1 text-primary-400 hover:bg-primary-100 hover:text-primary-700" onClick={() => setShowResumeModal(false)} aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
              <h3 className="mb-1 text-lg font-semibold text-primary-900">{resumeModalActivated ? 'Account Already Active' : 'Resume Verification'}</h3>
              {resumeModalActivated ? (
                <div>
                  <p className="mb-4 text-sm text-primary-600">This email is already associated with an active account. Please log in to the platform to manage your society.</p>
                  <div className="flex items-center justify-end gap-3">
                    <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50" onClick={() => setShowResumeModal(false)}>Close</button>
                    <a href={`${APP_BASE}/login`} className="inline-flex rounded-lg bg-primary-800 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-900">Go to Login</a>
                  </div>
                </div>
              ) : (
                <>
              <p className="mb-4 text-sm text-primary-600">Enter the admin email you used during signup to continue your verification.</p>
              <form onSubmit={async (e) => {
                e.preventDefault()
                const trimmed = resumeEmail.trim().toLowerCase()
                if (!trimmed) return
                setResumeModalLoading(true)
                setResumeModalError('')
                try {
                  const response = await apiPost('/public/society-signup/status', { email: trimmed })
                  const statusData = response?.data || {}
                  if (statusData.user_activated) {
                    setResumeModalActivated(true)
                    return
                  }
                  if (!statusData.signup_found) {
                    setResumeModalError('No pending signup found for this email. Please check the email address and try again.')
                    return
                  }
                  setShowResumeModal(false)
                  window.location.assign(`/signup?email=${encodeURIComponent(trimmed)}`)
                } catch (_err) {
                  setResumeModalError('Could not verify this email. Please try again.')
                } finally {
                  setResumeModalLoading(false)
                }
              }}>
                <input
                  type="email"
                  className="w-full rounded-lg border border-primary-200 bg-white px-4 py-3 text-sm text-primary-900 outline-none placeholder:text-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="your@email.com"
                  value={resumeEmail}
                  onChange={(e) => { setResumeEmail(e.target.value); setResumeModalError('') }}
                  autoFocus
                  required
                  disabled={resumeModalLoading}
                />
                {resumeModalError && (
                  <p className="mt-2 text-sm text-red-600">{resumeModalError}</p>
                )}
                <div className="mt-4 flex items-center justify-end gap-3">
                  <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50" onClick={() => setShowResumeModal(false)} disabled={resumeModalLoading}>Cancel</button>
                  <button type="submit" className="rounded-lg bg-primary-800 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-900 disabled:opacity-60" disabled={!resumeEmail.trim() || resumeModalLoading}>{resumeModalLoading ? 'Checking...' : 'Continue'}</button>
                </div>
              </form>
              </>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
