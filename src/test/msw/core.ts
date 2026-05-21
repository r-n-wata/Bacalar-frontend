import { delay, HttpResponse, type JsonBodyType } from 'msw'
import type { AppLanguage } from '../../app/i18n/config'

export const defaultMockDelayMs = 180

export async function jsonSuccess<T extends JsonBodyType>(
  payload: T,
  init?: { delayMs?: number; status?: number },
) {
  await delay(init?.delayMs ?? defaultMockDelayMs)

  return HttpResponse.json(payload, {
    status: init?.status ?? 200,
  })
}

export async function jsonError(
  body: { message: string },
  init?: { delayMs?: number; status?: number },
) {
  await delay(init?.delayMs ?? defaultMockDelayMs)

  return HttpResponse.json(body, {
    status: init?.status ?? 500,
  })
}

export function resolveMockLanguage(request: Request): AppLanguage {
  const url = new URL(request.url)
  const queryLanguage = url.searchParams.get('lang')

  if (queryLanguage === 'es') {
    return 'es'
  }

  const acceptLanguage = request.headers.get('accept-language')

  return acceptLanguage?.toLowerCase().startsWith('es') ? 'es' : 'en'
}
