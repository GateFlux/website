import {
  plans as planDefinitions,
  calculatePlanPrice as calcFromPlanObj,
  getPlanById,
} from '../../config/plans'

export { planDefinitions as plans, getPlanById }

/**
 * Calculate the monthly price for a plan by ID slug and unit count.
 * Returns null for Enterprise (custom pricing).
 *
 * @param {string} planId
 * @param {number} units
 * @returns {number|null}
 */
export function calculatePlanPrice(planId, units) {
  const plan = getPlanById(planId)
  return plan ? calcFromPlanObj(plan, units) : null
}

export function getPlanConfig() {
  return Object.fromEntries(
    planDefinitions
      .filter((p) => !p.customPricing)
      .map((p) => [p.id, { label: p.name, base: p.basePrice, perUnit: p.perUnitPrice }])
  )
}

export function estimateMonthlyPrice(plan, units, limits = {}) {
  const normalizedPlan = String(plan || 'starter').toLowerCase()
  const minUnits = Number.isFinite(Number(limits.minUnits)) ? Number(limits.minUnits) : 10
  const maxUnits = Number.isFinite(Number(limits.maxUnits)) ? Number(limits.maxUnits) : 2000
  const fallbackUnits = Number.isFinite(Number(limits.fallbackUnits)) ? Number(limits.fallbackUnits) : 100
  const safeUnits = Number.isFinite(Number(units))
    ? Math.max(minUnits, Math.min(maxUnits, Number(units)))
    : Math.max(minUnits, Math.min(maxUnits, fallbackUnits))

  const price = calculatePlanPrice(normalizedPlan, safeUnits)
  if (price === null) {
    return calculatePlanPrice('starter', safeUnits) ?? 0
  }
  return price
}
