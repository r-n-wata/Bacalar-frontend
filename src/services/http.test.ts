import { afterEach, describe, expect, it } from 'vitest'
import { createApiUrl, getApiBaseUrl } from './http'

const originalApiBaseUrl = import.meta.env.VITE_API_BASE_URL

afterEach(() => {
  import.meta.env.VITE_API_BASE_URL = originalApiBaseUrl
})

describe('http runtime config', () => {
  it('uses the configured API base URL when provided', () => {
    import.meta.env.VITE_API_BASE_URL = 'https://bacalar-api.onrender.com'

    expect(getApiBaseUrl()).toBe('https://bacalar-api.onrender.com')
    expect(createApiUrl('/api/home', 'en').toString()).toBe(
      'https://bacalar-api.onrender.com/api/home?lang=en',
    )
  })

  it('falls back to the current browser origin when no API base URL is set', () => {
    import.meta.env.VITE_API_BASE_URL = ''

    expect(getApiBaseUrl()).toBe(window.location.origin)
    expect(createApiUrl('/api/events', 'es').toString()).toBe(
      `${window.location.origin}/api/events?lang=es`,
    )
  })
})
