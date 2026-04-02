'use client'

import Link from 'next/link'
import usePlatformSettings from '../lib/usePlatformSettings'

/**
 * A signup link that auto-hides when self-service signup is disabled.
 * Falls back to /book-demo if provided, or hides entirely.
 *
 * Props:
 * - href: string (default "/signup")
 * - fallbackHref: string | null — show this href when signup disabled (default "/book-demo")
 * - fallbackText: string | null — button text when using fallback (default "Book Demo")
 * - hideWhenDisabled: boolean — hide entirely instead of showing fallback (default false)
 * - children: React.ReactNode
 * - ...rest: passed to <Link>
 */
export default function SignupLink({
  href = '/signup',
  fallbackHref = '/book-demo',
  fallbackText = 'Book Demo',
  hideWhenDisabled = false,
  children,
  ...rest
}) {
  const { signupEnabled } = usePlatformSettings()

  if (!signupEnabled) {
    if (hideWhenDisabled) return null
    if (fallbackHref) {
      return (
        <Link href={fallbackHref} {...rest}>
          {fallbackText || children}
        </Link>
      )
    }
    return null
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )
}
