type PostHogModule = typeof import('posthog-js')
type PostHogClient = PostHogModule['default']
type CaptureProperties = Record<string, unknown>
type IdentifyProperties = Record<string, string>

const projectToken = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN?.trim()
const host = import.meta.env.VITE_POSTHOG_HOST?.trim()
const isTestEnvironment = import.meta.env.MODE === 'test'

let posthogClientPromise: Promise<PostHogClient | null> | null = null

function validateConfiguration() {
  if (!projectToken) {
    if (import.meta.env.DEV && !isTestEnvironment) {
      throw new Error(
        'VITE_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_PROJECT_TOKEN is configured',
      )
    }

    return false
  }

  if (!host) {
    if (import.meta.env.DEV && !isTestEnvironment) {
      throw new Error(
        'VITE_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_HOST is configured',
      )
    }

    return false
  }

  return true
}

async function loadPostHogClient() {
  if (!validateConfiguration()) {
    return null
  }

  if (!posthogClientPromise) {
    posthogClientPromise = import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.init(projectToken!, {
          api_host: host!,
          defaults: '2025-05-24',
          capture_pageview: 'history_change',
          capture_pageleave: 'if_capture_pageview',
          disable_scroll_properties: false,
        })
        posthog.startExceptionAutocapture({
          capture_unhandled_errors: true,
          capture_unhandled_rejections: true,
          capture_console_errors: false,
        })

        return posthog
      })
      .catch((error) => {
        posthogClientPromise = null

        if (import.meta.env.DEV && !isTestEnvironment) {
          throw error
        }

        return null
      })
  }

  return posthogClientPromise
}

export function warmPostHog() {
  void loadPostHogClient()
}

const posthog = {
  capture(eventName: string, properties?: CaptureProperties) {
    void loadPostHogClient().then((client) => {
      client?.capture(eventName, properties)
    })
  },
  identify(distinctId: string, properties?: IdentifyProperties) {
    void loadPostHogClient().then((client) => {
      client?.identify(distinctId, properties)
    })
  },
  reset() {
    void loadPostHogClient().then((client) => {
      client?.reset()
    })
  },
}

export default posthog
