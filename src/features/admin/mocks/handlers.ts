import { http } from 'msw'
import { jsonSuccess } from '../../../test/msw/core'
import { adminSessionApiPath } from '../api/getAdminSession'
import { adminSubmissionsApiPath } from '../api/getPendingSubmissions'
import { adminSessionFixture, adminSubmissionsFixture } from './admin.fixtures'

export const adminHandlers = [
  http.get(adminSessionApiPath, async () => jsonSuccess(adminSessionFixture)),
  http.get(adminSubmissionsApiPath, async ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('type')

    if (!filter || filter === 'all') {
      return jsonSuccess(adminSubmissionsFixture)
    }

    return jsonSuccess({
      items: adminSubmissionsFixture.items.filter((item) => item.type === filter),
    })
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
]
