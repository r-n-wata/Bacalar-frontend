import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AppProviders } from './app/providers/AppProviders'
import { warmPostHog } from './services/posthog'
import { startMockServiceWorker } from './test/msw/start'
import './styles/globals.scss'

async function bootstrap() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  )

  void startMockServiceWorker()

  const scheduleAnalyticsStartup = () => {
    warmPostHog()
  }

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(scheduleAnalyticsStartup, { timeout: 2000 })
    return
  }

  globalThis.setTimeout(scheduleAnalyticsStartup, 1)
}

void bootstrap()
