import { afterEach, describe, expect, it } from 'vitest'
import { isMockServiceWorkerEnabled } from './start'

const originalEnableMsw = import.meta.env.VITE_ENABLE_MSW
const originalDev = import.meta.env.DEV

afterEach(() => {
  import.meta.env.VITE_ENABLE_MSW = originalEnableMsw
  import.meta.env.DEV = originalDev
})

describe('mock service worker runtime mode', () => {
  it('stays enabled in development unless explicitly disabled', () => {
    import.meta.env.DEV = true
    import.meta.env.VITE_ENABLE_MSW = 'true'

    expect(isMockServiceWorkerEnabled()).toBe(true)

    import.meta.env.VITE_ENABLE_MSW = 'false'

    expect(isMockServiceWorkerEnabled()).toBe(false)
  })

  it('stays disabled outside development', () => {
    import.meta.env.DEV = false
    import.meta.env.VITE_ENABLE_MSW = 'true'

    expect(isMockServiceWorkerEnabled()).toBe(false)
  })
})
