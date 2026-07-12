import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const DEFAULT_SITE_URL = 'https://suenobacalar.com'
const STATIC_ROUTES = ['/', '/tours', '/restaurants', '/events']
const MAX_PAGE_SIZE = 24

function trimTrailingSlash(value) {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

function getSiteUrl() {
  const configured = process.env.VITE_SITE_URL?.trim()
  return configured ? trimTrailingSlash(configured) : DEFAULT_SITE_URL
}

function getApiBaseUrl(siteUrl) {
  const configured = process.env.VITE_API_BASE_URL?.trim()
  return configured ? trimTrailingSlash(configured) : siteUrl
}

async function getJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en',
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed for ${url} with ${response.status}`)
  }

  return response.json()
}

async function collectPaginatedRoutes(baseUrl, apiPath) {
  const routes = new Set()
  let cursor = null

  while (true) {
    const url = new URL(apiPath, `${baseUrl}/`)
    url.searchParams.set('lang', 'en')
    url.searchParams.set('limit', String(MAX_PAGE_SIZE))
    url.searchParams.set('category', 'all')

    if (cursor) {
      url.searchParams.set('cursor', cursor)
    }

    const payload = await getJson(url)

    for (const item of payload.items ?? []) {
      if (typeof item.route === 'string' && item.route.startsWith('/')) {
        routes.add(item.route)
      }
    }

    cursor = payload.pagination?.nextCursor ?? null

    if (!payload.pagination?.hasMore || !cursor) {
      break
    }
  }

  return routes
}

function buildSitemapXml(siteUrl, routes) {
  const urls = [...new Set(routes)].sort()
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ]

  for (const route of urls) {
    lines.push('  <url>')
    lines.push(`    <loc>${siteUrl}${route === '/' ? '' : route}</loc>`)
    lines.push('  </url>')
  }

  lines.push('</urlset>')

  return `${lines.join('\n')}\n`
}

async function main() {
  const siteUrl = getSiteUrl()
  const apiBaseUrl = getApiBaseUrl(siteUrl)
  const routes = new Set(STATIC_ROUTES)

  try {
    const [events, restaurants, tours] = await Promise.all([
      collectPaginatedRoutes(apiBaseUrl, '/api/events'),
      collectPaginatedRoutes(apiBaseUrl, '/api/restaurants'),
      collectPaginatedRoutes(apiBaseUrl, '/api/tours'),
    ])

    for (const route of [...events, ...restaurants, ...tours]) {
      routes.add(route)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`Falling back to static sitemap routes: ${message}`)
  }

  const distDir = path.resolve(process.cwd(), 'dist')
  await mkdir(distDir, { recursive: true })
  await writeFile(
    path.join(distDir, 'sitemap.xml'),
    buildSitemapXml(siteUrl, routes),
    'utf8',
  )
}

await main()
