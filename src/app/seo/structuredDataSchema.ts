import type { AppLanguage } from '../i18n/config'
import {
  buildCanonicalUrl,
  resolveAbsoluteUrl,
  resolveSiteUrl,
  SITE_NAME,
} from './seoUtils'

type ImageValue = {
  src: string
  alt?: string
}

function getLocale(language: AppLanguage) {
  return language === 'es' ? 'es_MX' : 'en_US'
}

export function buildOrganizationStructuredData() {
  const siteUrl = resolveSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl,
    logo: resolveAbsoluteUrl(siteUrl, '/apple-touch-icon.png'),
    image: resolveAbsoluteUrl(siteUrl, '/social-preview.png'),
  }
}

export function buildWebsiteStructuredData(language: AppLanguage) {
  const siteUrl = resolveSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl,
    inLanguage: getLocale(language),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/tours`,
      'query-input': 'required name=category',
    },
  }
}

export function buildCollectionPageStructuredData(options: {
  language: AppLanguage
  pathname: string
  title: string
  description: string
}) {
  const siteUrl = resolveSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: options.title,
    description: options.description,
    url: buildCanonicalUrl(siteUrl, options.pathname),
    inLanguage: getLocale(options.language),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: siteUrl,
    },
  }
}

export function buildEventStructuredData(options: {
  language: AppLanguage
  pathname: string
  title: string
  description: string
  dateLabel: string
  venue: string
  startsAt?: string
  endsAt?: string
  image?: ImageValue
}) {
  const siteUrl = resolveSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: options.title,
    description: options.description,
    url: buildCanonicalUrl(siteUrl, options.pathname),
    inLanguage: getLocale(options.language),
    startDate: options.startsAt,
    endDate: options.endsAt,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: options.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bacalar',
        addressRegion: 'Quintana Roo',
        addressCountry: 'MX',
      },
    },
    image: options.image?.src
      ? [resolveAbsoluteUrl(siteUrl, options.image.src)]
      : undefined,
    keywords: [options.dateLabel, options.venue].join(', '),
  }
}

export function buildRestaurantStructuredData(options: {
  language: AppLanguage
  pathname: string
  name: string
  description: string
  cuisine: string
  priceRange: string
  image?: ImageValue
}) {
  const siteUrl = resolveSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: options.name,
    description: options.description,
    servesCuisine: options.cuisine,
    priceRange: options.priceRange,
    url: buildCanonicalUrl(siteUrl, options.pathname),
    inLanguage: getLocale(options.language),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bacalar',
      addressRegion: 'Quintana Roo',
      addressCountry: 'MX',
    },
    image: options.image?.src
      ? [resolveAbsoluteUrl(siteUrl, options.image.src)]
      : undefined,
  }
}

export function buildTourStructuredData(options: {
  language: AppLanguage
  pathname: string
  name: string
  description: string
  duration: string
  image?: ImageValue
  providerName: string
}) {
  const siteUrl = resolveSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: options.name,
    description: options.description,
    url: buildCanonicalUrl(siteUrl, options.pathname),
    inLanguage: getLocale(options.language),
    provider: {
      '@type': 'Organization',
      name: options.providerName,
    },
    touristType: options.duration,
    image: options.image?.src
      ? [resolveAbsoluteUrl(siteUrl, options.image.src)]
      : undefined,
    itinerary: {
      '@type': 'Place',
      name: 'Bacalar Lagoon',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bacalar',
        addressRegion: 'Quintana Roo',
        addressCountry: 'MX',
      },
    },
  }
}
