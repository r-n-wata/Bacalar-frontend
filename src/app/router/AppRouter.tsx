import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppShell } from '../../components/templates/AppShell'
import { EventsPage } from '../../features/events/pages/EventsPage'
import { EventDetailPage } from '../../features/events/pages/EventDetailPage'
import { EventSubmissionPage } from '../../features/events/pages/EventSubmissionPage'
import { HomePage } from '../../features/home/pages/HomePage'
import { RestaurantsPage } from '../../features/restaurants/pages/RestaurantsPage'
import { RestaurantDetailPage } from '../../features/restaurants/pages/RestaurantDetailPage'
import { RestaurantSubmissionPage } from '../../features/restaurants/pages/RestaurantSubmissionPage'
import { ToursPage } from '../../features/tours/pages/ToursPage'
import { TourDetailPage } from '../../features/tours/pages/TourDetailPage'

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
        path: 'events/submit',
        element: <EventSubmissionPage />,
      },
      {
        path: 'events/:id',
        element: <EventDetailPage />,
      },
      {
        path: 'restaurants',
        element: <RestaurantsPage />,
      },
      {
        path: 'restaurants/submit',
        element: <RestaurantSubmissionPage />,
      },
      {
        path: 'restaurants/:id',
        element: <RestaurantDetailPage />,
      },
      {
        path: 'tours',
        element: <ToursPage />,
      },
      {
        path: 'tours/:id',
        element: <TourDetailPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
