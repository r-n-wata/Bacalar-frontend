import { AppShell } from '../../components/templates/AppShell'
import { AdminDashboardPage } from '../../features/admin/pages/AdminDashboardPage'
import { AdminLoginPage } from '../../features/admin/pages/AdminLoginPage'
import { AdminPublishedContentEditPage } from '../../features/admin/pages/AdminPublishedContentEditPage'
import { AdminPublishedContentPage } from '../../features/admin/pages/AdminPublishedContentPage'
import { AdminSubmissionDetailPage } from '../../features/admin/pages/AdminSubmissionDetailPage'
import { ProtectedAdminRoute } from '../../features/admin/pages/ProtectedAdminRoute'
import { EventDetailPage } from '../../features/events/pages/EventDetailPage'
import { EventsPage } from '../../features/events/pages/EventsPage'
import { EventSubmissionPage } from '../../features/events/pages/EventSubmissionPage'
import { HomePage } from '../../features/home/pages/HomePage'
import { RestaurantDetailPage } from '../../features/restaurants/pages/RestaurantDetailPage'
import { RestaurantsPage } from '../../features/restaurants/pages/RestaurantsPage'
import { RestaurantSubmissionPage } from '../../features/restaurants/pages/RestaurantSubmissionPage'
import { TourDetailPage } from '../../features/tours/pages/TourDetailPage'
import { ToursPage } from '../../features/tours/pages/ToursPage'
import { TourSubmissionPage } from '../../features/tours/pages/TourSubmissionPage'
import { PublicRouteStatusPage } from './PublicRouteStatusPage'

export const appRoutes = [
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
        path: 'tours/submit',
        element: <TourSubmissionPage />,
      },
      {
        path: 'tours/:id',
        element: <TourDetailPage />,
      },
      {
        path: '*',
        element: <PublicRouteStatusPage mode="notFound" />,
      },
    ],
  },
]
