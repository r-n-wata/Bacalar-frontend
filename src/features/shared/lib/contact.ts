import type { AppLanguage } from '../../../app/i18n/config'

export type ListingType = 'restaurants' | 'tours' | 'events'

export type ContactInfo = {
  providerName: string
  whatsapp?: string
  phone?: string
  website?: string
  instagram?: string
  facebook?: string
  email?: string
  mapsUrl?: string
}

export type ContactAction = {
  key:
    | 'whatsapp'
    | 'phone'
    | 'website'
    | 'instagram'
    | 'facebook'
    | 'maps'
    | 'email'
  eventName:
    | 'whatsapp_clicked'
    | 'phone_clicked'
    | 'website_clicked'
    | 'instagram_clicked'
    | 'facebook_clicked'
    | 'maps_clicked'
    | 'email_clicked'
  href: string
  external: boolean
}

function normalizeValue(value?: string) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

function normalizeUrl(value?: string) {
  const normalized = normalizeValue(value)

  if (!normalized) {
    return undefined
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized
  }

  return `https://${normalized}`
}

function normalizeSocialHandle(
  value: string | undefined,
  baseUrl: string,
) {
  const normalized = normalizeValue(value)

  if (!normalized) {
    return undefined
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized
  }

  return `${baseUrl}/${normalized.replace(/^@/, '')}`
}

export function getWhatsappMessage(language: AppLanguage) {
  return language === 'es'
    ? 'Hola, encontr\u00e9 su negocio en Sue\u00f1o Bacalar y me gustar\u00eda obtener m\u00e1s informaci\u00f3n.'
    : 'Hi! I found your business on Sue\u00f1o Bacalar and would like more information.'
}

export function buildWhatsappHref(
  value: string | undefined,
  language: AppLanguage,
) {
  const digits = normalizeValue(value)?.replace(/\D/g, '')

  if (!digits) {
    return undefined
  }

  const params = new URLSearchParams({
    text: getWhatsappMessage(language),
  })

  return `https://wa.me/${digits}?${params.toString()}`
}

function buildPhoneHref(value?: string) {
  const normalized = normalizeValue(value)
  return normalized ? `tel:${normalized}` : undefined
}

function buildEmailHref(value?: string) {
  const normalized = normalizeValue(value)
  return normalized ? `mailto:${normalized}` : undefined
}

export function buildContactActions(
  contact: ContactInfo | undefined,
  language: AppLanguage,
): ContactAction[] {
  if (!contact) {
    return []
  }

  const actions: Array<ContactAction | null> = [
    (() => {
      const href = buildWhatsappHref(contact.whatsapp, language)
      return href
        ? {
            key: 'whatsapp',
            eventName: 'whatsapp_clicked',
            href,
            external: false,
          }
        : null
    })(),
    (() => {
      const href = buildPhoneHref(contact.phone)
      return href
        ? {
            key: 'phone',
            eventName: 'phone_clicked',
            href,
            external: false,
          }
        : null
    })(),
    (() => {
      const href = normalizeUrl(contact.website)
      return href
        ? {
            key: 'website',
            eventName: 'website_clicked',
            href,
            external: true,
          }
        : null
    })(),
    (() => {
      const href = normalizeSocialHandle(contact.instagram, 'https://instagram.com')
      return href
        ? {
            key: 'instagram',
            eventName: 'instagram_clicked',
            href,
            external: true,
          }
        : null
    })(),
    (() => {
      const href = normalizeSocialHandle(contact.facebook, 'https://facebook.com')
      return href
        ? {
            key: 'facebook',
            eventName: 'facebook_clicked',
            href,
            external: true,
          }
        : null
    })(),
    (() => {
      const href = normalizeUrl(contact.mapsUrl)
      return href
        ? {
            key: 'maps',
            eventName: 'maps_clicked',
            href,
            external: true,
          }
        : null
    })(),
    (() => {
      const href = buildEmailHref(contact.email)
      return href
        ? {
            key: 'email',
            eventName: 'email_clicked',
            href,
            external: false,
          }
        : null
    })(),
  ]

  return actions.filter((action): action is ContactAction => action !== null)
}
