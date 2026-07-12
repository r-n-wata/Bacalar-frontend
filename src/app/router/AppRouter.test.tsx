import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../components/templates/AppShell'
import { renderWithProviders } from '../../test/renderWithProviders'
import { appRoutes } from './AppRouter'
import { PublicRouteStatusPage } from './PublicRouteStatusPage'

function BrokenPage() {
  throw new Error('render failed')
}

describe('AppRouter', () => {
  it('renders the branded not found page for unknown routes', async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/missing-route'],
    })

    await renderWithProviders(<RouterProvider router={router} />)

    expect(
      await screen.findByText('This page is not available.'),
    ).toBeVisible()
    expect(screen.getByRole('link', { name: 'Back to homepage' })).toHaveAttribute(
      'href',
      '/',
    )
  })

  it('renders the route-level fallback for unexpected render errors', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <AppShell />,
          errorElement: (
            <AppShell>
              <PublicRouteStatusPage />
            </AppShell>
          ),
          children: [
            {
              index: true,
              element: <BrokenPage />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/'],
      },
    )

    await renderWithProviders(<RouterProvider router={router} />)

    expect(
      await screen.findByText('We hit a problem loading this page.'),
    ).toBeVisible()
  })
})
