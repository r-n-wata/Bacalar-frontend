import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { getJson } from '../../services/http'
import { server } from '../../test/msw/server'
import { TestProviders } from '../../test/TestProviders'
import { fetchApi } from './fetchApi'

describe('fetchApi', () => {
  it('returns typed data for a successful request', async () => {
    const { result } = renderHook(
      () =>
        fetchApi({
          queryKey: ['health', 'success'],
          queryFn: () => getJson<{ status: string }>('/api/health'),
        }),
      {
        wrapper: TestProviders,
      },
    )

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual({ status: 'ok' })
  })

  it('returns error state when the request fails', async () => {
    server.use(
      http.get('/api/health', async () => {
        return HttpResponse.json(
          { message: 'broken' },
          {
            status: 500,
          },
        )
      }),
    )

    const { result } = renderHook(
      () =>
        fetchApi({
          queryKey: ['health', 'error'],
          queryFn: () => getJson<{ status: string }>('/api/health'),
        }),
      {
        wrapper: TestProviders,
      },
    )

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error?.status).toBe(500)
  })

  it('passes localized request details through the shared request stack', async () => {
    server.use(
      http.get('/api/health', async ({ request }) => {
        const url = new URL(request.url)
        const language = url.searchParams.get('lang')
        const header = request.headers.get('accept-language')

        return HttpResponse.json({
          status: `${language}:${header}`,
        })
      }),
    )

    const { result } = renderHook(
      () =>
        fetchApi({
          queryKey: ['health', 'es'],
          queryFn: () =>
            getJson<{ status: string }>('/api/health', {
              language: 'es',
            }),
        }),
      {
        wrapper: TestProviders,
      },
    )

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual({ status: 'es:es' })
  })
})
