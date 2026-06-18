import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

type SeoProps = {
  title: string
  description: string
  image?: string
  noIndex?: boolean
}

const SITE_NAME = 'Sueno Bacalar'
const DEFAULT_SITE_URL = 'https://suenobacalar.com'
const DEFAULT_TITLE_SUFFIX = ` | ${SITE_NAME}`
const MAX_DESCRIPTION_LENGTH = 160

function trimTrailingSlash(value: string) {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

function resolveSiteUrl() {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim()

  if (configuredSiteUrl) {
    return trimTrailingSlash(configuredSiteUrl)
  }

  return DEFAULT_SITE_URL
}

function buildCanonicalUrl(siteUrl: string, pathname: string) {
  const normalizedPath = pathname === '/' ? '' : pathname
  return `${siteUrl}${normalizedPath}`
}

function truncateDescription(value: string) {
  if (value.length <= MAX_DESCRIPTION_LENGTH) {
    return value
  }

  return `${value.slice(0, MAX_DESCRIPTION_LENGTH - 1).trimEnd()}…`
}

function ensureMetaTag(attribute: 'name' | 'property', key: string) {
  const selector = `meta[${attribute}="${key}"]`
  let tag = document.head.querySelector<HTMLMetaElement>(selector)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.append(tag)
  }

  return tag
}

function setMetaContent(attribute: 'name' | 'property', key: string, content: string) {
  ensureMetaTag(attribute, key).setAttribute('content', content)
}

function removeMetaTag(attribute: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove()
}

function ensureCanonicalLink() {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.append(link)
  }

  return link
}

export function Seo({ title, description, image, noIndex = false }: SeoProps) {
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    const siteUrl = resolveSiteUrl()
    const canonicalUrl = buildCanonicalUrl(siteUrl, location.pathname)
    const locale = i18n.resolvedLanguage === 'es' ? 'es_MX' : 'en_US'
    const normalizedDescription = truncateDescription(description.trim())

    document.title = `${title}${DEFAULT_TITLE_SUFFIX}`
    document.documentElement.lang = i18n.resolvedLanguage === 'es' ? 'es' : 'en'

    ensureCanonicalLink().setAttribute('href', canonicalUrl)

    setMetaContent('name', 'description', normalizedDescription)
    setMetaContent('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow')
    setMetaContent('property', 'og:site_name', SITE_NAME)
    setMetaContent('property', 'og:type', 'website')
    setMetaContent('property', 'og:locale', locale)
    setMetaContent('property', 'og:title', title)
    setMetaContent('property', 'og:description', normalizedDescription)
    setMetaContent('property', 'og:url', canonicalUrl)
    setMetaContent('name', 'twitter:card', image ? 'summary_large_image' : 'summary')
    setMetaContent('name', 'twitter:title', title)
    setMetaContent('name', 'twitter:description', normalizedDescription)

    if (image) {
      const absoluteImageUrl = image.startsWith('http')
        ? image
        : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`

      setMetaContent('property', 'og:image', absoluteImageUrl)
      setMetaContent('name', 'twitter:image', absoluteImageUrl)
    } else {
      removeMetaTag('property', 'og:image')
      removeMetaTag('name', 'twitter:image')
    }
  }, [description, i18n.resolvedLanguage, image, location.pathname, noIndex, title])

  return null
}
