import i18n, { defaultLanguage, type AppLanguage } from '../app/i18n/config'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type JsonRequestOptions = {
  language?: AppLanguage
  init?: RequestInit
}

function getCurrentLanguage() {
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language

  return activeLanguage === 'es' ? 'es' : defaultLanguage
}

export function getApiBaseUrl() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

  return baseUrl && baseUrl.length > 0 ? baseUrl : window.location.origin
}

export function createApiUrl(path: string, language: AppLanguage) {
  const url = new URL(path, getApiBaseUrl())
  url.searchParams.set('lang', language)

  return url
}

export async function getJson<T>(
  path: string,
  { language = getCurrentLanguage(), init }: JsonRequestOptions = {},
): Promise<T> {
  const response = await fetch(createApiUrl(path, language), {
    ...init,
    headers: {
      Accept: 'application/json',
      'Accept-Language': language,
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new ApiError(`Request failed for ${path}`, response.status)
  }

  return (await response.json()) as T
}
