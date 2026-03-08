'use client'

import { useMemo, useState } from 'react'

const PLAN_CONFIG = {
  starter: { label: 'Starter', base: 999, perUnit: 8 },
  essential: { label: 'Essential', base: 1999, perUnit: 12 },
  professional: { label: 'Professional', base: 3999, perUnit: 18 },
}

export function estimateMonthlyPrice(plan, units) {
  const normalizedPlan = String(plan || 'starter').toLowerCase()
  const config = PLAN_CONFIG[normalizedPlan] || PLAN_CONFIG.starter
  const safeUnits = Number.isFinite(Number(units)) ? Math.max(10, Math.min(2000, Number(units))) : 100

  return config.base + (safeUnits * config.perUnit)
}

function formatCurrency(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function PricingCalculator({
  initialPlan = 'starter',
  initialUnits = 100,
  minUnits = 10,
  maxUnits = 2000,
  showHint = true,
  className = '',
  onChange,
}) {
  const [plan, setPlan] = useState(initialPlan)
  const [units, setUnits] = useState(Math.max(minUnits, Math.min(maxUnits, Number(initialUnits) || minUnits)))

  const estimatedMonthlyPrice = useMemo(() => estimateMonthlyPrice(plan, units), [plan, units])

  const handlePlanChange = (nextPlan) => {
    setPlan(nextPlan)
    onChange?.({ plan: nextPlan, units, price: estimateMonthlyPrice(nextPlan, units) })
  }

  const handleUnitsChange = (nextUnits) => {
    const safeUnits = Math.max(minUnits, Math.min(maxUnits, Number(nextUnits) || minUnits))
    setUnits(safeUnits)
    onChange?.({ plan, units: safeUnits, price: estimateMonthlyPrice(plan, safeUnits) })
  }

  return (
    <div className={`bg-neutral-50 rounded-xl border border-primary-100 p-6 ${className}`}>
      <h3 className="text-xl font-bold text-primary-900 mb-4">Pricing Calculator</h3>

      <div className="space-y-5">
        <div>
          <p className="text-sm font-medium text-primary-700 mb-2">How many units are in your society?</p>
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
            <input
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

        <div>
          <p className="text-sm font-medium text-primary-700 mb-2">Select plan:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(PLAN_CONFIG).map(([slug, config]) => (
              <button
                key={slug}
                type="button"
                onClick={() => handlePlanChange(slug)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  plan === slug
                    ? 'border-accent-500 bg-accent-500 text-white'
                    : 'border-primary-200 bg-white text-primary-700 hover:bg-primary-50'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white border border-primary-100 p-4">
          <p className="text-sm text-primary-700">
            For a society with {units} units, estimated monthly price is <span className="font-bold text-primary-900">{formatCurrency(estimatedMonthlyPrice)}/month</span>.
          </p>
        </div>

        {showHint && (
          <p className="text-xs text-primary-500">
            Most societies with 100 units pay around {formatCurrency(estimateMonthlyPrice('starter', 100))}/month.
          </p>
        )}
      </div>
    </div>
  )
}
