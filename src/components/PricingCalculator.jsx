'use client'

import { useMemo, useState } from 'react'
import { estimateMonthlyPrice } from '../lib/pricing'

function formatCurrency(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

function recommendPlan(units) {
  if (units <= 100) return 'starter'
  if (units <= 300) return 'essential'
  return 'professional'
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
}) {
  const [units, setUnits] = useState(Math.max(minUnits, Math.min(maxUnits, Number(initialUnits) || minUnits)))

  const recommendedPlan = useMemo(() => recommendPlan(units), [units])

  const estimatedMonthlyPrice = useMemo(
    () => estimateMonthlyPrice(recommendedPlan, units, { minUnits, maxUnits, fallbackUnits: initialUnits }),
    [recommendedPlan, units, minUnits, maxUnits, initialUnits]
  )

  const estimatedYearlyPrice = useMemo(() => toYearlyFromMonthly(estimatedMonthlyPrice), [estimatedMonthlyPrice])

  const emitChange = (safeUnits) => {
    const plan = recommendPlan(safeUnits)
    const monthlyPrice = estimateMonthlyPrice(plan, safeUnits, { minUnits, maxUnits, fallbackUnits: initialUnits })

    onChange?.({
      used: true,
      units: safeUnits,
      plan,
      monthlyPrice,
      yearlyPrice: toYearlyFromMonthly(monthlyPrice),
    })
  }

  const handleUnitsChange = (nextUnits) => {
    const safeUnits = Math.max(minUnits, Math.min(maxUnits, Number(nextUnits) || minUnits))
    setUnits(safeUnits)
    emitChange(safeUnits)
  }

  return (
    <div className={`bg-neutral-50 rounded-xl border border-primary-100 p-6 ${className}`}>
      <h3 className="text-xl font-bold text-primary-900 mb-4">Pricing Calculator</h3>

      <div className="space-y-5">
        <div>
          <label htmlFor="pricing-units-slider" className="block text-sm font-medium text-primary-700 mb-2">
            Units: {units}
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
            <label htmlFor="pricing-units-input" className="text-sm text-primary-700">
              Units
            </label>
            <input
              id="pricing-units-input"
              type="number"
              min={minUnits}
              max={maxUnits}
              value={units}
              onChange={(e) => handleUnitsChange(e.target.value)}
              className="w-32 rounded-md border border-primary-200 px-3 py-2 text-sm"
            />
            <span className="text-sm text-primary-600">{units} units</span>
          </div>
        </div>

        <div className="rounded-lg bg-white border border-primary-100 p-4">
          <p className="text-sm text-primary-600">Recommended Plan: <span className="font-semibold text-primary-900 capitalize">{recommendedPlan}</span></p>
          <p className="text-sm text-primary-600 mt-3">Estimated Monthly Price</p>
          <p className="text-xl font-bold text-primary-900">{formatCurrency(estimatedMonthlyPrice)}</p>
          <p className="text-sm text-primary-600 mt-3">Estimated Yearly Price</p>
          <p className="text-xl font-bold text-primary-900">{formatCurrency(estimatedYearlyPrice)}</p>
        </div>

        {showHint && (
          <p className="text-xs text-primary-500">
            Most societies with 100 units pay around {
              formatCurrency(estimateMonthlyPrice('starter', 100, { minUnits, maxUnits, fallbackUnits: initialUnits }))
            }/month.
          </p>
        )}
      </div>
    </div>
  )
}
