import { describe, expect, it } from 'vitest'
import { buildContactActions, buildWhatsappHref } from './contact'

describe('contact helpers', () => {
  it('builds a localized WhatsApp link', () => {
    expect(buildWhatsappHref('+52 983 123 4567', 'es')).toBe(
      'https://wa.me/529831234567?text=Hola%2C+encontr%C3%A9+su+negocio+en+Sue%C3%B1o+Bacalar+y+me+gustar%C3%ADa+obtener+m%C3%A1s+informaci%C3%B3n.',
    )
  })

  it('filters missing methods and normalizes supported contact actions', () => {
    expect(
      buildContactActions(
        {
          providerName: 'Laguna Vela',
          website: 'lagunavela.example.com',
          instagram: '@lagunavela',
        },
        'en',
      ),
    ).toEqual([
      {
        key: 'website',
        eventName: 'website_clicked',
        href: 'https://lagunavela.example.com',
        external: true,
      },
      {
        key: 'instagram',
        eventName: 'instagram_clicked',
        href: 'https://instagram.com/lagunavela',
        external: true,
      },
    ])
  })
})
