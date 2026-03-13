/**
 * Centralized plan configuration — single source of truth for GateFlux pricing.
 * Used by the pricing page, price calculator, and any component that needs plan data.
 *
 * Formula: monthly_price = basePrice + (perUnitPrice × unit_count)
 */

export const plans = [
  {
    id: 'free',
    name: 'Free',
    basePrice: 0,
    perUnitPrice: 0,
    maxUnits: 25,
    trialDays: 0,
    customPricing: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    basePrice: 999,
    perUnitPrice: 8,
    trialDays: 30,
    customPricing: false,
  },
  {
    id: 'essential',
    name: 'Essential',
    basePrice: 1999,
    perUnitPrice: 12,
    trialDays: 30,
    customPricing: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    basePrice: 3999,
    perUnitPrice: 18,
    trialDays: 30,
    customPricing: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    basePrice: null,
    perUnitPrice: null,
    trialDays: 30,
    customPricing: true,
  },
]

/**
 * Calculate the total monthly price for a plan and unit count.
 * Returns null for custom-priced plans (Enterprise).
 *
 * @param {{ customPricing: boolean, basePrice: number, perUnitPrice: number }} plan
 * @param {number} units
 * @returns {number|null}
 */
export function calculatePlanPrice(plan, units) {
  if (!plan || plan.customPricing) return null
  return plan.basePrice + plan.perUnitPrice * units
}

/**
 * Look up a plan definition by its ID slug.
 *
 * @param {string} id
 * @returns {object|null}
 */
export function getPlanById(id) {
  return plans.find((p) => p.id === String(id).toLowerCase()) ?? null
}
