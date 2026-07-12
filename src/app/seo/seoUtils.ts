export const SITE_NAME = 'Sueno Bacalar'
export const DEFAULT_SITE_URL = 'https://suenobacalar.com'
export const DEFAULT_SOCIAL_IMAGE_PATH = '/social-preview.png'
export const DEFAULT_TITLE_SUFFIX = ` | ${SITE_NAME}`
export const MAX_DESCRIPTION_LENGTH = 160

export function trimTrailingSlash(value: string) {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

export function resolveSiteUrl() {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim()

  if (configuredSiteUrl) {
    return trimTrailingSlash(configuredSiteUrl)
  }

  return DEFAULT_SITE_URL
}

export function buildCanonicalUrl(siteUrl: string, pathname: string) {
  const normalizedPath = pathname === '/' ? '' : pathname
  return `${siteUrl}${normalizedPath}`
}

export function truncateDescription(value: string) {
  if (value.length <= MAX_DESCRIPTION_LENGTH) {
    return value
  }

  return `${value.slice(0, MAX_DESCRIPTION_LENGTH - 1).trimEnd()}...`
}

export function resolveAbsoluteUrl(siteUrl: string, pathOrUrl: string) {
  if (pathOrUrl.startsWith('http')) {
    return pathOrUrl
  }

  return `${siteUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}
