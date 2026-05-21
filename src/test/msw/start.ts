export function isMockServiceWorkerEnabled() {
  if (!import.meta.env.DEV) {
    return false
  }

  if (import.meta.env.VITE_ENABLE_MSW === 'false') {
    return false
  }

  return true
}

export async function startMockServiceWorker() {
  if (!isMockServiceWorkerEnabled()) {
    return
  }

  const { worker } = await import('./browser')

  await worker.start({
    onUnhandledRequest: 'error',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}
