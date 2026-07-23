export type CustomEventPayload = Record<string, string>

type AnalyticsSink = {
  trackCustomEvent?: (name: string, payload: CustomEventPayload) => void
}

function getAnalyticsSink(): AnalyticsSink | undefined {
  const globalObject = globalThis as typeof globalThis & {
    __SB_ANALYTICS__?: AnalyticsSink
  }

  return globalObject.__SB_ANALYTICS__
}

export function trackCustomEvent(name: string, payload: CustomEventPayload) {
  try {
    getAnalyticsSink()?.trackCustomEvent?.(name, payload)
  } catch {
    // Intentionally swallow analytics errors so navigation stays uninterrupted.
  }
}
