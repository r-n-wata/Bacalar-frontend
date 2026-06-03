import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { server } from '../../../test/msw/server'
import { jsonSuccess } from '../../../test/msw/core'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { AdminDashboardPage } from './AdminDashboardPage'
import { AdminLoginPage } from './AdminLoginPage'
import { ProtectedAdminRoute } from './ProtectedAdminRoute'

const getSession = vi.fn()
const onAuthStateChange = vi.fn()
const signInWithPassword = vi.fn()
const signOut = vi.fn()

vi.mock('../auth/supabase', () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      getSession,
      onAuthStateChange,
      signInWithPassword,
      signOut,
    },
  }),
}))

function buildSession(token = 'token-123') {
  return {
    access_token: token,
    user: {
      id: 'supabase-user-1',
      email: 'admin@bacalar.test',
    },
  }
}

function renderAdminRoute(initialEntry: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppShell />,
        children: [
          {
            path: 'admin/login',
            element: <AdminLoginPage />,
          },
          {
            path: 'admin',
            element: <ProtectedAdminRoute />,
            children: [
              {
                path: 'submissions',
                element: <AdminDashboardPage />,
              },
            ],
          },
        ],
      },
    ],
    {
      initialEntries: [initialEntry],
    },
  )

  return renderWithProviders(<RouterProvider router={router} />)
}

beforeEach(() => {
  const subscription = { unsubscribe: vi.fn() }

  getSession.mockReset()
  onAuthStateChange.mockReset()
  signInWithPassword.mockReset()
  signOut.mockReset()

  getSession.mockResolvedValue({
    data: {
      session: null,
    },
  })
  onAuthStateChange.mockReturnValue({
    data: {
      subscription,
    },
  })
  signOut.mockResolvedValue({
    error: null,
  })
})

describe('admin access flow', () => {
  it('redirects unauthenticated users to the admin login page', async () => {
    await renderAdminRoute('/admin/submissions')

    expect(
      await screen.findByRole('heading', {
        name: 'Sign in to review submissions',
      }),
    ).toBeVisible()
  })

  it('signs in and navigates into the admin dashboard for allow-listed admins', async () => {
    signInWithPassword.mockResolvedValue({
      data: {
        session: buildSession(),
      },
      error: null,
    })

    await renderAdminRoute('/admin/login')

    await userEvent.type(screen.getByLabelText('Email'), 'admin@bacalar.test')
    await userEvent.type(screen.getByLabelText('Password'), 'super-secret')
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(
      await screen.findByRole('heading', {
        name: 'Pending submissions',
      }),
    ).toBeVisible()
  })

  it('shows a login error when the admin session validation fails', async () => {
    signInWithPassword.mockResolvedValue({
      data: {
        session: buildSession(),
      },
      error: null,
    })
    server.use(
      http.get('/api/admin/session', async () =>
        Response.json(
          {
            error: {
              code: 'ADMIN_ACCESS_REQUIRED',
              message: 'You do not have admin access.',
            },
          },
          { status: 403 },
        ),
      ),
    )

    await renderAdminRoute('/admin/login')

    await userEvent.type(screen.getByLabelText('Email'), 'person@example.com')
    await userEvent.type(screen.getByLabelText('Password'), 'secret')
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(
      await screen.findByText('You do not have admin access.'),
    ).toBeVisible()
    expect(signOut).toHaveBeenCalled()
  })

  it('filters pending submissions and refreshes the list after approval', async () => {
    getSession.mockResolvedValue({
      data: {
        session: buildSession(),
      },
    })

    const pendingItems = [
      {
        id: 'event-submission-1',
        type: 'events',
        status: 'PENDING',
        title: 'Lagoon Music Night',
        startsAt: '2026-06-03T18:30:00.000Z',
        location: 'Casa del Muelle',
        category: 'music',
        description: 'A sunset set with local musicians.',
        contactName: 'Ana',
        contactMethod: 'ana@example.com',
        submittedLocale: 'en',
        createdAt: '2026-06-02T10:00:00.000Z',
        updatedAt: '2026-06-02T10:00:00.000Z',
        images: [],
      },
      {
        id: 'restaurant-submission-1',
        type: 'restaurants',
        status: 'PENDING',
        name: 'Casa de Maiz',
        cuisine: 'Mexican',
        moment: 'dinner',
        priceBand: '$$',
        description: 'A lagoon-side dinner stop.',
        contactName: 'Luis',
        contactMethod: 'luis@example.com',
        submittedLocale: 'es',
        createdAt: '2026-06-02T09:00:00.000Z',
        updatedAt: '2026-06-02T09:00:00.000Z',
        images: [],
      },
    ]

    server.use(
      http.get('/api/admin/session', async () =>
        jsonSuccess({
          email: 'admin@bacalar.test',
          userId: 'supabase-user-1',
        }),
      ),
      http.get('/api/admin/submissions', async ({ request }) => {
        const url = new URL(request.url)
        const filter = url.searchParams.get('type')

        return jsonSuccess({
          items: pendingItems.filter((item) =>
            !filter || filter === 'all' ? true : item.type === filter,
          ),
        })
      }),
      http.post('/api/admin/submissions/:type/:id/:action', async ({ params }) => {
        const index = pendingItems.findIndex((item) => item.id === String(params.id))

        if (index >= 0) {
          pendingItems.splice(index, 1)
        }

        return jsonSuccess({
          id: String(params.id),
          type: String(params.type),
          status: 'APPROVED',
          reviewedAt: '2026-06-02T12:00:00.000Z',
          reviewedBy: 'admin@bacalar.test',
        })
      }),
    )

    await renderAdminRoute('/admin/submissions')

    expect(
      await screen.findByRole('heading', {
        name: 'Pending submissions',
      }),
    ).toBeVisible()
    expect(await screen.findByText('Lagoon Music Night')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'Restaurants' }))

    expect(await screen.findByText('Casa de Maiz')).toBeVisible()
    expect(screen.queryByText('Lagoon Music Night')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'All pending' }))
    await userEvent.click(
      (await screen.findAllByRole('button', { name: 'Approve' }))[0],
    )

    expect(await screen.findByText('Casa de Maiz')).toBeVisible()
    await waitFor(() => {
      expect(screen.queryByText('Lagoon Music Night')).not.toBeInTheDocument()
    })
  })
})
