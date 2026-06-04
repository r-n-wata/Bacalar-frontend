import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test/renderWithProviders'
import { ScrollToTop } from './ScrollToTop'

describe('ScrollToTop', () => {
  it('scrolls to the top when the route changes', async () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo')

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ScrollToTop />,
        },
        {
          path: '/events',
          element: (
            <>
              <ScrollToTop />
              <div>Events page</div>
            </>
          ),
        },
      ],
      {
        initialEntries: ['/'],
      },
    )

    renderWithProviders(<RouterProvider router={router} />)

    await router.navigate('/events')

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' })
    expect(await screen.findByText('Events page')).toBeVisible()
  })
})
