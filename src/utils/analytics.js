/**
 * GateFlux Analytics Module
 * Handles GTM dataLayer events, GA4 tracking, and Core Web Vitals
 */

import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'

// Device type detection
const getDeviceType = () => {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// Push event to GTM dataLayer
export const pushToDataLayer = (event) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
}

// Track page view
export const trackPageView = (pagePath, pageTitle) => {
  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle,
    device_type: getDeviceType(),
  })
}

// Track CTA clicks
export const trackCTAClick = (ctaName, ctaLocation) => {
  pushToDataLayer({
    event: 'cta_click',
    cta_name: ctaName,
    cta_location: ctaLocation,
    page_path: window.location.pathname,
    device_type: getDeviceType(),
  })
}

// Track form submissions
export const trackFormSubmit = (formName, formData = {}) => {
  pushToDataLayer({
    event: 'form_submit',
    form_name: formName,
    form_data: formData,
    page_path: window.location.pathname,
    device_type: getDeviceType(),
  })
}

// Track scroll depth
export const initScrollTracking = () => {
  const thresholds = [25, 50, 75, 100]
  const tracked = new Set()

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)

    thresholds.forEach((threshold) => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold)
        pushToDataLayer({
          event: 'scroll_depth',
          scroll_depth: threshold,
          page_path: window.location.pathname,
          device_type: getDeviceType(),
        })
      }
    })
  }

  // Use passive listener for better INP
  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

// Send Web Vital metric to GA4 via GTM
const sendWebVital = (metric) => {
  // Round values for cleaner data
  const value = metric.name === 'CLS' 
    ? Math.round(metric.value * 1000) / 1000 
    : Math.round(metric.value)

  pushToDataLayer({
    event: 'web_vitals',
    metric_name: metric.name,
    metric_id: metric.id,
    value: value,
    delta: Math.round(metric.delta),
    rating: metric.rating, // 'good', 'needs-improvement', or 'poor'
    page_path: window.location.pathname,
    device_type: getDeviceType(),
    navigation_type: metric.navigationType,
  })

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}: ${value} (${metric.rating})`)
  }
}

// Initialize Core Web Vitals tracking
export const initWebVitals = () => {
  // Report all metrics without sampling
  const reportAllChanges = { reportAllChanges: true }

  onCLS(sendWebVital, reportAllChanges)
  onINP(sendWebVital, reportAllChanges)
  onLCP(sendWebVital, reportAllChanges)
  onFCP(sendWebVital, reportAllChanges)
  onTTFB(sendWebVital, reportAllChanges)
}

// Initialize all analytics
export const initAnalytics = () => {
  // Initialize Web Vitals tracking
  initWebVitals()

  // Initialize scroll tracking
  const cleanupScroll = initScrollTracking()

  // Track initial page view
  trackPageView(window.location.pathname, document.title)

  return () => {
    cleanupScroll()
  }
}

// Custom event tracking helper
export const trackEvent = (eventName, eventParams = {}) => {
  pushToDataLayer({
    event: eventName,
    ...eventParams,
    page_path: window.location.pathname,
    device_type: getDeviceType(),
    timestamp: new Date().toISOString(),
  })
}

// Track outbound link clicks
export const trackOutboundLink = (url, linkText) => {
  pushToDataLayer({
    event: 'outbound_link',
    link_url: url,
    link_text: linkText,
    page_path: window.location.pathname,
    device_type: getDeviceType(),
  })
}

export default {
  initAnalytics,
  initWebVitals,
  trackPageView,
  trackCTAClick,
  trackFormSubmit,
  trackEvent,
  trackOutboundLink,
  pushToDataLayer,
}
