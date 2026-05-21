import { http } from 'msw'
import { jsonSuccess } from './core'

export const baseHandlers = [
  http.get('/api/health', async () =>
    jsonSuccess({
      status: 'ok',
    }),
  ),
]
