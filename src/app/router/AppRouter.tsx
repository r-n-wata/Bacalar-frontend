import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppShell } from '../../components/templates/AppShell'
import { EventsPage } from '../../features/events/pages/EventsPage'
import { HomePage } from '../../features/home/pages/HomePage'
import { RestaurantsPage } from '../../features/restaurants/pages/RestaurantsPage'
import { ToursPage } from '../../features/tours/pages/ToursPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'events',
        element: <EventsPage />,
      },
      {
        path: 'restaurants',
        element: <RestaurantsPage />,
      },
      {
        path: 'tours',
        element: <ToursPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
