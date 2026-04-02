'use client'

import { useEffect, useState } from 'react'
import config from './config'

const CACHE_KEY = 'gf_platform_settings'
const STALE_TTL = 5 * 60 * 1000 // 5 minutes — serve stale, then revalidate

function readCache() {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeCache(data) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }))
  } catch {
    // Storage full or unavailable — ignore
  }
}

let fetchPromise = null

function fetchSettings() {
  if (fetchPromise) return fetchPromise
  fetchPromise = fetch(`${config.api.baseUrl}/public/settings`, {
    headers: { Accept: 'application/json' },
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((json) => {
      const data = json?.data ?? {}
      writeCache(data)
      fetchPromise = null
      return data
    })
    .catch(() => {
      fetchPromise = null
      return null
    })
  return fetchPromise
}

/**
 * Returns public platform settings using a stale-while-revalidate strategy:
 * - Serves cached data instantly (no flicker)
 * - If cache is older than 5 min, revalidates in the background
 * - If no cache exists, fetches fresh
 * This means setting changes are picked up within one page navigation.
 */
export default function usePlatformSettings() {
  // Always start with null to match server render and avoid hydration mismatch
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    const cached = readCache()
    const cachedData = cached?.data ?? null
    const isStale = !cached || (Date.now() - cached.ts > STALE_TTL)

    // Serve cached data immediately if available
    if (cachedData) {
      setSettings(cachedData)
    }

    // Revalidate in background if stale, or fetch fresh if no cache
    if (isStale) {
      fetchSettings().then((fresh) => {
        if (fresh) setSettings(fresh)
      })
    }
  }, [])

  return {
    signupEnabled: settings?.allow_self_signup !== false && settings?.maintenance_mode !== true,
    maintenanceMode: settings?.maintenance_mode === true,
    loading: settings === null,
    settings,
  }
}
