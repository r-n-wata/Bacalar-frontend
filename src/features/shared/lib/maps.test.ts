import { describe, expect, it } from 'vitest'
import { buildMapEmbedUrl, buildMapUrl } from './maps'

describe('map helpers', () => {
  it('adds the Bacalar location context for shorthand addresses', () => {
    expect(buildMapUrl('calle 40 con 19b')).toBe(
      'https://www.google.com/maps?q=calle+40+con+19b%2C+Bacalar%2C+Quintana+Roo%2C+Mexico',
    )
    expect(buildMapEmbedUrl('calle 40 con 19b')).toBe(
      'https://www.google.com/maps?q=calle+40+con+19b%2C+Bacalar%2C+Quintana+Roo%2C+Mexico&output=embed',
    )
  })

  it('preserves addresses that already include locality details', () => {
    expect(buildMapUrl('Avenida 3 210, Bacalar, Quintana Roo')).toBe(
      'https://www.google.com/maps?q=Avenida+3+210%2C+Bacalar%2C+Quintana+Roo',
    )
    expect(buildMapUrl('Calle 22, Mexico')).toBe(
      'https://www.google.com/maps?q=Calle+22%2C+Mexico',
    )
  })

  it('returns undefined for empty addresses', () => {
    expect(buildMapUrl('   ')).toBeUndefined()
    expect(buildMapEmbedUrl()).toBeUndefined()
  })
})
