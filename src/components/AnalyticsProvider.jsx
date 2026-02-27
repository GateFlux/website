'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initAnalytics, trackPageView } from '../utils/analytics'

export default function AnalyticsProvider() {
  useEffect(() => {
    let cleanup
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        cleanup = initAnalytics()
      })
    } else {
      setTimeout(() => {
        cleanup = initAnalytics()
      }, 1)
    }
    return () => {
      if (typeof cleanup === 'function') cleanup()
    }
  }, [])

  const pathname = usePathname()
  useEffect(() => {
    trackPageView(pathname, document.title)
  }, [pathname])

  return null
}
