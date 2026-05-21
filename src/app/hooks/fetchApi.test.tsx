import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it, vi } from 'vitest'
import { getJson } from '../../services/http'
import { createTestQueryClient } from '../../test/createTestQueryClient'
import { server } from '../../test/msw/server'
import { TestProviders } from '../../test/TestProviders'
import { useFetchApi } from './fetchApi'

describe('useFetchApi', () => {
  it('returns typed data for a successful request', async () => {
    const { result } = renderHook(
      () =>
        useFetchApi({
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
        useFetchApi({
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
        useFetchApi({
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

  it('honors per-query staleTime and reuses cached results on remount', async () => {
    const queryClient = createTestQueryClient()
    const queryFn = vi.fn(async () => ({ status: 'cached' }))
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const firstRender = renderHook(
      () =>
        useFetchApi({
          queryKey: ['health', 'cached'],
          queryFn,
          staleTime: 1000 * 60,
        }),
      {
        wrapper,
      },
    )

    await waitFor(() => {
      expect(firstRender.result.current.isSuccess).toBe(true)
    })

    firstRender.unmount()

    const secondRender = renderHook(
      () =>
        useFetchApi({
          queryKey: ['health', 'cached'],
          queryFn,
          staleTime: 1000 * 60,
        }),
      {
        wrapper,
      },
    )

    await waitFor(() => {
      expect(secondRender.result.current.isSuccess).toBe(true)
    })

    expect(queryFn).toHaveBeenCalledTimes(1)
  })
})
