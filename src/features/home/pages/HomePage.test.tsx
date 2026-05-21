import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { server } from '../../../test/msw/server'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { homeErrorHandler } from '../mocks/handlers'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  function renderHomeRoute(language?: 'en' | 'es') {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <AppShell />,
          children: [
            {
              index: true,
              element: <HomePage />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/'],
      },
    )

    return renderWithProviders(<RouterProvider router={router} />, {
      language,
    })
  }

  it('renders homepage content from the home API and refetches on language change', async () => {
    await renderHomeRoute()

    expect(
      await screen.findByText(
        'Help travelers build an easy, beautiful first plan for Bacalar.',
      ),
    ).toBeVisible()

    expect(
      screen.queryByRole('link', {
        name: 'Booking',
      }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: 'Booking',
      }),
    ).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    expect(
      await screen.findByText(
        'Ayuda a las personas viajeras a construir un primer plan facil y bonito para Bacalar.',
      ),
    ).toBeVisible()

    expect(
      screen.queryByRole('link', {
        name: 'Reservas',
      }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: 'Reservas',
      }),
    ).not.toBeInTheDocument()
  })

  it('shows a localized homepage error state when the handler fails', async () => {
    server.use(homeErrorHandler('broken'))

    await renderHomeRoute('es')

    expect(
      await screen.findByText(
        'No pudimos cargar la pagina principal en este momento. Intentalo de nuevo.',
      ),
    ).toBeVisible()
  })
})
