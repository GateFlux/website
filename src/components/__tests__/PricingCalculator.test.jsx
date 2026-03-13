import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PricingCalculator, { estimateMonthlyPrice } from '../PricingCalculator'

describe('estimateMonthlyPrice', () => {
  it('uses starter plan when plan is unknown', () => {
    expect(estimateMonthlyPrice('unknown', 100)).toBe(1799)
  })

  it('respects provided min/max unit limits', () => {
    expect(estimateMonthlyPrice('starter', 0, { minUnits: 1, maxUnits: 5000 })).toBe(1007)
    expect(estimateMonthlyPrice('professional', 7000, { minUnits: 1, maxUnits: 5000 })).toBe(93999)
  })
})

describe('PricingCalculator', () => {
  it('renders accessible controls for unit slider and input', () => {
    render(<PricingCalculator showHint={false} />)

    expect(screen.getByLabelText(/number of units:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^units$/i)).toBeInTheDocument()
  })

  it('clamps entered units to component maxUnits and updates estimate', () => {
    render(<PricingCalculator minUnits={1} maxUnits={5000} initialUnits={1} showHint={false} />)

    const numberInput = screen.getByLabelText(/^units$/i)
    fireEvent.change(numberInput, { target: { value: '6000' } })

    expect(numberInput).toHaveValue(5000)
    expect(screen.getByText(/₹40,999\s*\/\s*mo/i)).toBeInTheDocument()
    expect(screen.getByText(/₹93,999\s*\/\s*month/i)).toBeInTheDocument()
  })

  it('updates recommended plan and emits normalized values via onChange', () => {
    const onChange = jest.fn()
    render(<PricingCalculator minUnits={1} maxUnits={5000} initialUnits={299} showHint={false} onChange={onChange} />)

    const numberInput = screen.getByLabelText(/^units$/i)
    fireEvent.change(numberInput, { target: { value: '300' } })

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      plan: 'essential',
      units: 300,
      monthlyPrice: 5599,
    }))
    expect(screen.getByText(/₹5,599\s*\/\s*month/i)).toBeInTheDocument()
  })
})
