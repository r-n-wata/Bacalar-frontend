export async function startMockServiceWorker() {
  if (!import.meta.env.DEV) {
    return
  }

  if (import.meta.env.VITE_ENABLE_MSW === 'false') {
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
