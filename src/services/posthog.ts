import posthog from 'posthog-js'

const projectToken = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN?.trim()
const host = import.meta.env.VITE_POSTHOG_HOST?.trim()

if (!projectToken) {
  if (import.meta.env.DEV) {
    throw new Error(
      'VITE_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_PROJECT_TOKEN is configured',
    )
  }
} else if (!host) {
  if (import.meta.env.DEV) {
    throw new Error(
      'VITE_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_HOST is configured',
    )
  }
} else {
  posthog.init(projectToken, {
    api_host: host,
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
}

export default posthog
