const PLAN_CONFIG = {
  starter: { label: 'Starter', base: 999, perUnit: 8 },
  essential: { label: 'Essential', base: 1999, perUnit: 12 },
  professional: { label: 'Professional', base: 3999, perUnit: 18 },
}

export function getPlanConfig() {
  return PLAN_CONFIG
}

export function estimateMonthlyPrice(plan, units, limits = {}) {
  const normalizedPlan = String(plan || 'starter').toLowerCase()
  const config = PLAN_CONFIG[normalizedPlan] || PLAN_CONFIG.starter
  const minUnits = Number.isFinite(Number(limits.minUnits)) ? Number(limits.minUnits) : 10
  const maxUnits = Number.isFinite(Number(limits.maxUnits)) ? Number(limits.maxUnits) : 2000
  const fallbackUnits = Number.isFinite(Number(limits.fallbackUnits)) ? Number(limits.fallbackUnits) : 100
  const safeUnits = Number.isFinite(Number(units))
    ? Math.max(minUnits, Math.min(maxUnits, Number(units)))
    : Math.max(minUnits, Math.min(maxUnits, fallbackUnits))

  return config.base + (safeUnits * config.perUnit)
}
