'use client'

import { useMemo, useState } from 'react'
import { plans, calculatePlanPrice } from '../../config/plans'
import { estimateMonthlyPrice as estimateMonthlyPriceFromLib } from '../lib/pricing'

export function estimateMonthlyPrice(planId, units, limits) {
  return estimateMonthlyPriceFromLib(planId, units, limits)
}


function formatCurrency(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

function recommendPlan(units) {
  if (units <= 100) return 'starter'
  if (units <= 300) return 'essential'
  return 'professional'
}

function getPlanId(plan) {
  return String(plan?.id ?? plan?.slug ?? '').toLowerCase()
}

function toYearlyFromMonthly(monthlyValue) {
  return monthlyValue * 12 * 0.85
}

export default function PricingCalculator({
  initialUnits = 100,
  minUnits = 10,
  maxUnits = 2000,
  showHint = true,
  className = '',
  onChange,
  planOptions = plans,
}) {
  const [units, setUnits] = useState(Math.max(minUnits, Math.min(maxUnits, Number(initialUnits) || minUnits)))
  const [unitsInputValue, setUnitsInputValue] = useState(String(Math.max(minUnits, Math.min(maxUnits, Number(initialUnits) || minUnits))))

  const paidPlans = useMemo(
    () => (Array.isArray(planOptions) ? planOptions.filter((p) => !p.customPricing && getPlanId(p) !== 'free') : []),
    [planOptions]
  )
  const enterprisePlan = useMemo(
    () => (Array.isArray(planOptions) ? planOptions.find((p) => p.customPricing) : null),
    [planOptions]
  )

  const recommendedPlan = useMemo(() => recommendPlan(units), [units])

  const planPrices = useMemo(
    () =>
      paidPlans.map((plan) => {
        const monthly = calculatePlanPrice(plan, units)

        return {
          ...plan,
          monthly,
          yearly: monthly !== null ? toYearlyFromMonthly(monthly) : null,
          isRecommended: getPlanId(plan) === recommendedPlan,
        }
      }),
    [units, recommendedPlan, paidPlans]
  )

  const recommended = planPrices.find((p) => p.id === recommendedPlan)

  const emitChange = (safeUnits) => {
    const plan = recommendPlan(safeUnits)
    const selectedPlan = paidPlans.find((item) => getPlanId(item) === plan)
    const monthlyPrice = selectedPlan
      ? (calculatePlanPrice(selectedPlan, safeUnits) ?? estimateMonthlyPrice(plan, safeUnits, { minUnits, maxUnits, fallbackUnits: initialUnits }))
      : estimateMonthlyPrice(plan, safeUnits, { minUnits, maxUnits, fallbackUnits: initialUnits })

    onChange?.({
      used: true,
      units: safeUnits,
      plan,
      monthlyPrice,
      yearlyPrice: toYearlyFromMonthly(monthlyPrice),
    })
  }

  const handleUnitsChange = (nextUnits) => {
    const parsedUnits = Number(nextUnits)
    const safeUnits = Math.max(minUnits, Math.min(maxUnits, parsedUnits || minUnits))
    setUnits(safeUnits)
    setUnitsInputValue(String(safeUnits))
    emitChange(safeUnits)
  }

  const handleUnitsInputChange = (event) => {
    const nextValue = String(event.target.value || '')
    setUnitsInputValue(nextValue)

    if (nextValue === '') {
      return
    }

    const parsedUnits = Number(nextValue)
    if (!Number.isFinite(parsedUnits)) {
      return
    }

    const boundedUnits = Math.min(maxUnits, parsedUnits)
    setUnits(boundedUnits)
    emitChange(boundedUnits)
  }

  const handleUnitsInputBlur = () => {
    const parsedUnits = Number(unitsInputValue)
    const safeUnits = Math.max(minUnits, Math.min(maxUnits, Number.isFinite(parsedUnits) ? parsedUnits : minUnits))
    setUnits(safeUnits)
    setUnitsInputValue(String(safeUnits))
    emitChange(safeUnits)
  }

  return (
    <div className={`bg-neutral-50 rounded-xl border border-primary-100 p-6 ${className}`}>
      <h3 className="text-xl font-bold text-primary-900 mb-4">Pricing Calculator</h3>

      <div className="space-y-5">
        <div>
          <label htmlFor="pricing-units-slider" className="block text-sm font-medium text-primary-700 mb-2">
            Number of Units: {units}
          </label>
          <input
            id="pricing-units-slider"
            type="range"
            min={minUnits}
            max={maxUnits}
            value={units}
            onChange={(e) => handleUnitsChange(e.target.value)}
            className="w-full"
          />
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="pricing-units-input" className="text-sm text-primary-700 sr-only">
              Units
            </label>
            <input
              id="pricing-units-input"
              type="number"
              min={minUnits}
              max={maxUnits}
              value={unitsInputValue}
              onChange={handleUnitsInputChange}
              onBlur={handleUnitsInputBlur}
              className="w-32 rounded-md border border-primary-200 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="rounded-lg bg-white border border-primary-100 divide-y divide-primary-50">
          {planPrices.map((plan) => (
            <div
              key={getPlanId(plan)}
              className={`flex items-center justify-between px-4 py-3 ${
                plan.isRecommended ? 'bg-accent-50 border-l-2 border-l-accent-500' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary-800 capitalize">{plan.name}</span>
                {plan.isRecommended && (
                  <span className="text-xs font-semibold text-accent-600 bg-accent-100 px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              <span className="text-sm font-bold text-primary-900">
                {formatCurrency(plan.monthly)} / mo
              </span>
            </div>
          ))}
          {enterprisePlan && (
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-medium text-primary-800">Enterprise</span>
              <span className="text-sm font-semibold text-primary-600">Contact Sales</span>
            </div>
          )}
        </div>

        {recommended && (
          <div className="rounded-lg bg-primary-50 border border-primary-100 p-3">
            <p className="text-xs text-primary-600 mb-1">Recommended: <span className="font-semibold capitalize">{recommended.name}</span></p>
            <p className="text-lg font-bold text-primary-900">{formatCurrency(recommended.monthly)} / month</p>
            <p className="text-xs text-primary-500 mt-0.5">{formatCurrency(recommended.yearly)} billed yearly (save 15%)</p>
          </div>
        )}

        {showHint && (
          <p className="text-xs text-primary-500">
            Most societies with 100 units pay around{' '}
            {formatCurrency(calculatePlanPrice(paidPlans.find((p) => getPlanId(p) === 'starter'), 100))}/month on Starter.
          </p>
        )}
      </div>
    </div>
  )
}
