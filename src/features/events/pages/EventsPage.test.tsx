import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { AppShell } from '../../../components/templates/AppShell'
import { server } from '../../../test/msw/server'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { EventsPage } from './EventsPage'
import { eventsErrorHandler } from '../mocks/handlers'

describe('EventsPage', () => {
  function renderEventsRoute(language?: 'en' | 'es') {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <AppShell />,
          children: [
            {
              path: 'events',
              element: <EventsPage />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/events'],
      },
    )

    return renderWithProviders(<RouterProvider router={router} />, {
      language,
    })
  }

  it('renders localized events and refetches when the language changes', async () => {
    await renderEventsRoute()

    expect(await screen.findByText('Sunset Jazz by the Lagoon')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'ES' }))

    expect(
      await screen.findByText('Jazz al atardecer junto a la laguna'),
    ).toBeVisible()
  })

  it('shows a translated error state when the handler fails', async () => {
    server.use(eventsErrorHandler('broken'))

    await renderEventsRoute('es')

    expect(
      await screen.findByText(
        'No pudimos cargar los eventos en este momento. Actualiza o prueba otro idioma.',
      ),
    ).toBeVisible()
  })
})
