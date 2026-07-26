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
import { AdminPublishedContentEditPage } from './AdminPublishedContentEditPage'
import { AdminPublishedContentPage } from './AdminPublishedContentPage'
import { AdminSubmissionDetailPage } from './AdminSubmissionDetailPage'
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
              {
                path: 'content',
                element: <AdminPublishedContentPage />,
              },
              {
                path: 'content/:type/:id/edit',
                element: <AdminPublishedContentEditPage />,
              },
              {
                path: 'submissions/:type/:id',
                element: <AdminSubmissionDetailPage />,
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

  it('shows admin navigation after admin sign-in', async () => {
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
        name: 'Submission review',
      }),
    ).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'Submissions' }),
    ).toBeVisible()
    expect(screen.getByRole('link', { name: 'Content' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Log out' })).toBeVisible()
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

  it('filters submissions by status and type and refreshes the list after approval', async () => {
    getSession.mockResolvedValue({
      data: {
        session: buildSession(),
      },
    })

    const submissions = [
      {
        id: 'event-submission-1',
        type: 'events',
        status: 'PENDING',
        title: 'Lagoon Music Night',
        startsAt: '2026-06-03T18:30:00.000Z',
        location: 'Casa del Muelle',
        category: 'music',
        submittedLocale: 'en',
        createdAt: '2026-06-02T10:00:00.000Z',
        updatedAt: '2026-06-02T10:00:00.000Z',
        thumbnail: {
          id: 'event-image-1',
          source: 'EXTERNAL_URL',
          url: 'https://images.example.com/event-1.jpg',
          sortOrder: 0,
        },
      },
      {
        id: 'restaurant-submission-1',
        type: 'restaurants',
        status: 'APPROVED',
        name: 'Casa de Maiz',
        cuisine: 'Mexican',
        moment: 'dinner',
        priceBand: '$$',
        submittedLocale: 'es',
        createdAt: '2026-06-02T09:00:00.000Z',
        updatedAt: '2026-06-02T09:00:00.000Z',
        thumbnail: {
          id: 'restaurant-image-1',
          source: 'EXTERNAL_URL',
          url: 'https://images.example.com/restaurant-1.jpg',
          sortOrder: 0,
        },
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
        const type = url.searchParams.get('type') ?? 'all'
        const status = (url.searchParams.get('status') ?? 'pending').toUpperCase()

        return jsonSuccess({
          items: submissions.filter((item) => {
            const matchesType = type === 'all' ? true : item.type === type
            const matchesStatus = status === 'ALL' ? true : item.status === status

            return matchesType && matchesStatus
          }),
        })
      }),
      http.post('/api/admin/submissions/:type/:id/:action', async ({ params }) => {
        const item = submissions.find((entry) => entry.id === String(params.id))

        if (item) {
          item.status = String(params.action) === 'approve' ? 'APPROVED' : 'REJECTED'
        }

        return jsonSuccess({
          id: String(params.id),
          type: String(params.type),
          status: String(params.action) === 'approve' ? 'APPROVED' : 'REJECTED',
          reviewedAt: '2026-06-02T12:00:00.000Z',
          reviewedBy: 'admin@bacalar.test',
        })
      }),
    )

    await renderAdminRoute('/admin/submissions')

    expect(
      await screen.findByRole('heading', {
        name: 'Submission review',
      }),
    ).toBeVisible()
    expect(await screen.findByText('Lagoon Music Night')).toBeVisible()
    expect(screen.queryByText('Casa de Maiz')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Approved' }))
    expect(await screen.findByText('Casa de Maiz')).toBeVisible()
    expect(screen.queryByText('Lagoon Music Night')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Pending' }))
    await userEvent.click(screen.getByRole('button', { name: 'Events' }))
    expect(await screen.findByText('Lagoon Music Night')).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Approve' }))

    await waitFor(() => {
      expect(screen.queryByText('Lagoon Music Night')).not.toBeInTheDocument()
    })
  })

  it('opens the detail page from a compact submission card', async () => {
    getSession.mockResolvedValue({
      data: {
        session: buildSession(),
      },
    })

    server.use(
      http.get('/api/admin/session', async () =>
        jsonSuccess({
          email: 'admin@bacalar.test',
          userId: 'supabase-user-1',
        }),
      ),
      http.get('/api/admin/submissions/events/event-submission-1', async () =>
        jsonSuccess({
          item: {
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
            thumbnail: {
              id: 'event-image-1',
              source: 'EXTERNAL_URL',
              url: 'https://images.example.com/event-1.jpg',
              sortOrder: 0,
            },
            images: [
              {
                id: 'event-image-1',
                source: 'EXTERNAL_URL',
                url: 'https://images.example.com/event-1.jpg',
                sortOrder: 0,
              },
              {
                id: 'event-image-2',
                source: 'EXTERNAL_URL',
                url: 'https://images.example.com/event-2.jpg',
                sortOrder: 1,
              },
            ],
          },
        }),
      ),
    )

    await renderAdminRoute('/admin/submissions')

    await userEvent.click(
      await screen.findByRole('link', { name: 'Open submission Lagoon Music Night' }),
    )

    expect(
      await screen.findByRole('heading', {
        name: 'Lagoon Music Night',
        level: 1,
      }),
    ).toBeVisible()
    expect(screen.getByText('Description')).toBeVisible()
    expect(screen.getAllByRole('img', { name: 'Lagoon Music Night' })).toHaveLength(2)
  })

  it('shows published content management and lets admins switch content types', async () => {
    getSession.mockResolvedValue({
      data: {
        session: buildSession(),
      },
    })

    await renderAdminRoute('/admin/content')

    expect(
      await screen.findByRole('heading', {
        name: 'Manage featured content',
      }),
    ).toBeVisible()
    expect(await screen.findByText('1 of 5 featured slots used')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'Restaurants' }))

    expect(await screen.findByText('Cielo de Maiz')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Add to featured' })).toBeVisible()
  })

  it('opens the published content edit route and loads bilingual listing fields', async () => {
    getSession.mockResolvedValue({
      data: {
        session: buildSession(),
      },
    })

    server.use(
      http.get('/api/admin/content/events/event-sunset-jazz', async () =>
        jsonSuccess({
          item: {
            id: 'event-sunset-jazz',
            type: 'events',
            route: '/events/event-sunset-jazz',
            isFeatured: true,
            featuredOrder: 0,
            status: 'PUBLISHED',
            category: 'music',
            startsAt: '2026-06-03T18:30:00.000Z',
            translations: {
              en: {
                title: 'Sunset Jazz by the Lagoon',
                dateLabel: 'Friday evening',
                venue: 'Casa Laguna Deck',
                description: 'Live jazz at sunset.',
              },
              es: {
                title: 'Jazz al atardecer',
                dateLabel: 'Viernes por la tarde',
                venue: 'Terraza Casa Laguna',
                description: 'Jazz en vivo al atardecer.',
              },
            },
            media: [],
          },
        }),
      ),
    )

    await renderAdminRoute('/admin/content/events/event-sunset-jazz/edit')

    expect(
      await screen.findByRole('heading', {
        name: 'Edit published listing',
      }),
    ).toBeVisible()
    expect(
      await screen.findByDisplayValue('Sunset Jazz by the Lagoon'),
    ).toBeVisible()
    expect(screen.getByDisplayValue('Jazz al atardecer')).toBeVisible()
    expect(screen.getByDisplayValue('Casa Laguna Deck')).toBeVisible()
  })

  it('confirms archive actions for published content and refreshes the list', async () => {
    getSession.mockResolvedValue({
      data: {
        session: buildSession(),
      },
    })

    const items = [
      {
        id: 'event-sunset-jazz',
        type: 'events',
        title: 'Sunset Jazz by the Lagoon',
        route: '/events/event-sunset-jazz',
        isFeatured: true,
        featuredOrder: 0,
        category: 'music',
        subtitle: 'Friday evening - Casa Laguna Deck',
        image: {
          src: 'https://images.example.com/event-featured.jpg',
          alt: 'Sunset Jazz by the Lagoon',
        },
      },
    ]

    server.use(
      http.get('/api/admin/content', async () =>
        jsonSuccess({
          items,
          featuredCount: items.length,
          featuredCap: 5,
        }),
      ),
      http.delete('/api/admin/content/:type/:id', async ({ params }) => {
        const index = items.findIndex((item) => item.id === String(params.id))

        if (index >= 0) {
          items.splice(index, 1)
        }

        return jsonSuccess({
          id: String(params.id),
          type: String(params.type),
          status: 'ARCHIVED',
        })
      }),
    )

    await renderAdminRoute('/admin/content')

    await userEvent.click(await screen.findByRole('button', { name: 'Delete' }))

    expect(await screen.findByRole('dialog')).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Archive listing' }))

    await waitFor(() => {
      expect(screen.queryByText('Sunset Jazz by the Lagoon')).not.toBeInTheDocument()
    })
    expect(await screen.findByText('Published listing archived.')).toBeVisible()
  })
})
