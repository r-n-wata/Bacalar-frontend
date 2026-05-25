import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import i18n from '../app/i18n/config'
import { server } from './msw/server'

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
