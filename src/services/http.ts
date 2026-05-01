export function simulateRequest<T>(payload: T, delay = 180): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(payload), delay)
  })
}
