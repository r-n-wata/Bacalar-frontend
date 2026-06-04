import { http } from 'msw'
import { jsonSuccess } from '../../../test/msw/core'
import { adminPublishedContentApiPath } from '../api/getAdminPublishedContent'
import { adminSessionApiPath } from '../api/getAdminSession'
import { adminSubmissionsApiPath } from '../api/getAdminSubmissions'
import {
  adminPublishedContentFixture,
  adminSessionFixture,
  adminSubmissionDetailFixtures,
  adminSubmissionsFixture,
} from './admin.fixtures'

export const adminHandlers = [
  http.get(adminSessionApiPath, async () => jsonSuccess(adminSessionFixture)),
  http.get(adminPublishedContentApiPath, async ({ request }) => {
    const url = new URL(request.url)
    const type = (url.searchParams.get('type') ?? 'events') as
      | 'events'
      | 'restaurants'
      | 'tours'

    return jsonSuccess(adminPublishedContentFixture[type])
  }),
  http.get(adminSubmissionsApiPath, async ({ request }) => {
    const url = new URL(request.url)
    const type = url.searchParams.get('type') ?? 'all'
    const status = (url.searchParams.get('status') ?? 'pending').toUpperCase()

    return jsonSuccess({
      items: adminSubmissionsFixture.items.filter((item) => {
        const matchesType = type === 'all' ? true : item.type === type
        const matchesStatus = status === 'ALL' ? true : item.status === status

        return matchesType && matchesStatus
      }),
    })
  }),
  http.get('/api/admin/submissions/:type/:id', async ({ params }) => {
    const key = `${String(params.type)}:${String(params.id)}`

    return jsonSuccess(adminSubmissionDetailFixtures[key])
  }),
  http.post('/api/admin/submissions/:type/:id/:action', async ({ params }) =>
    jsonSuccess({
      id: String(params.id),
      type: String(params.type),
      status: String(params.action) === 'approve' ? 'APPROVED' : 'REJECTED',
      reviewedAt: '2026-06-02T12:00:00.000Z',
      reviewedBy: adminSessionFixture.email,
    }),
  ),
  http.post('/api/admin/content/:type/:id/feature', async ({ params }) =>
    jsonSuccess(adminPublishedContentFixture[String(params.type) as 'events']),
  ),
  http.delete('/api/admin/content/:type/:id/feature', async ({ params }) =>
    jsonSuccess(adminPublishedContentFixture[String(params.type) as 'events']),
  ),
]
