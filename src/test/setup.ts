import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import i18n from '../app/i18n/config'
import { server } from './msw/server'

import.meta.env.VITE_SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? 'https://project.supabase.co'
import.meta.env.VITE_SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'test-anon-key'
import.meta.env.VITE_API_BASE_URL = ''
window.scrollTo = vi.fn()
window.HTMLElement.prototype.scrollIntoView = vi.fn()

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  })
})

afterEach(async () => {
  cleanup()
  server.resetHandlers()
  await i18n.changeLanguage('en')
})

afterAll(() => {
  server.close()
})
