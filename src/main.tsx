import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AppProviders } from './app/providers/AppProviders'
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
}

void bootstrap()
