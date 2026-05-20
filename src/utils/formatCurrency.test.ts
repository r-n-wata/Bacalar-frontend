import { describe, expect, it } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats numbers as whole MXN currency values', () => {
    expect(formatCurrency(2750)).toBe('MX$2,750')
  })

  it('rounds to the nearest peso', () => {
    expect(formatCurrency(2750.49)).toBe('MX$2,750')
    expect(formatCurrency(2750.5)).toBe('MX$2,751')
  })
})
