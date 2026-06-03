import i18n, { defaultLanguage, type AppLanguage } from '../app/i18n/config'

export class ApiError extends Error {
  status: number
  code?: string
  details?: unknown

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

type JsonRequestOptions = {
  language?: AppLanguage
  init?: RequestInit
}

type ApiErrorPayload = {
  error?: {
    code?: string
    message?: string
    details?: unknown
  }
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

async function requestJson<T>(
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
    let errorPayload: ApiErrorPayload | undefined

    try {
      errorPayload = (await response.json()) as ApiErrorPayload
    } catch {
      errorPayload = undefined
    }

    throw new ApiError(
      errorPayload?.error?.message ?? `Request failed for ${path}`,
      response.status,
      errorPayload?.error?.code,
      errorPayload?.error?.details,
    )
  }

  return (await response.json()) as T
}

export async function getJson<T>(
  path: string,
  options?: JsonRequestOptions,
): Promise<T> {
  return requestJson(path, options)
}

export async function postJson<TRequest, TResponse>(
  path: string,
  body: TRequest,
  options?: JsonRequestOptions,
): Promise<TResponse> {
  return requestJson<TResponse>(path, {
    ...options,
    init: {
      ...options?.init,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.init?.headers,
      },
      body: JSON.stringify(body),
    },
  })
}
