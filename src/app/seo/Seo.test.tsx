import type { ReactNode } from 'react'
import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../test/renderWithProviders'
import { Seo } from './Seo'

describe('Seo', () => {
  afterEach(() => {
    document.title = ''
    document.documentElement.lang = 'en'
    document.head.querySelector('link[rel="canonical"]')?.remove()
    for (const selector of [
      'meta[name="description"]',
      'meta[name="robots"]',
      'meta[property="og:site_name"]',
      'meta[property="og:type"]',
      'meta[property="og:locale"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:url"]',
      'meta[property="og:image"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
    ]) {
      document.head.querySelector(selector)?.remove()
    }
  })

  function renderSeo(
    ui: ReactNode,
    options: {
      route?: string
      language?: 'en' | 'es'
    } = {},
  ) {
    const { route = '/', language = 'en' } = options

    const router = createMemoryRouter(
      [
        {
          path: '*',
          element: <>{ui}</>,
        },
      ],
      {
        initialEntries: [route],
      },
    )

    return renderWithProviders(<RouterProvider router={router} />, {
      language,
    })
  }

  it('sets document title, canonical url, language and social tags', async () => {
    await renderSeo(
      <Seo
        title="Where to eat in Bacalar"
        description="From breakfast by the lagoon to relaxed dinners, we've selected places worth visiting."
        image="https://images.example.com/restaurant.jpg"
      />,
      { route: '/restaurants' },
    )

    expect(screen.queryByText('unused')).not.toBeInTheDocument()
    expect(document.title).toBe('Where to eat in Bacalar | Sueno Bacalar')
    expect(document.documentElement.lang).toBe('en')
    expect(
      document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
    ).toBe(
      "From breakfast by the lagoon to relaxed dinners, we've selected places worth visiting.",
    )
    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe('https://suenobacalar.com/restaurants')
    expect(
      document.head.querySelector('meta[property="og:image"]')?.getAttribute('content'),
    ).toBe('https://images.example.com/restaurant.jpg')
    expect(
      document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),
    ).toBe('summary_large_image')
  })

  it('marks noindex pages and updates the locale for spanish', async () => {
    await renderSeo(
      <Seo
        title="Enviar un evento en Bacalar"
        description="Comparte un evento en Bacalar para revision editorial antes de considerarlo para publicacion."
        noIndex
      />,
      { route: '/events/submit', language: 'es' },
    )

    expect(document.title).toBe('Enviar un evento en Bacalar | Sueno Bacalar')
    expect(document.documentElement.lang).toBe('es')
    expect(
      document.head.querySelector('meta[name="robots"]')?.getAttribute('content'),
    ).toBe('noindex,nofollow')
    expect(
      document.head.querySelector('meta[property="og:locale"]')?.getAttribute('content'),
    ).toBe('es_MX')
    expect(
      document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),
    ).toBe('summary_large_image')
    expect(
      document.head.querySelector('meta[property="og:image"]')?.getAttribute('content'),
    ).toBe('https://suenobacalar.com/social-preview.png')
  })
})
