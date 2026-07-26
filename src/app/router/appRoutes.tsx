import { Suspense, type ReactNode } from 'react'
import { AppShell } from '../../components/templates/AppShell'
import { LoadingSpinner } from '../../components/atoms/LoadingSpinner'
import { ProtectedAdminRoute } from '../../features/admin/pages/ProtectedAdminRoute'
import { PublicRouteStatusPage } from './PublicRouteStatusPage'
import {
  AdminDashboardPage,
  AdminLoginPage,
  AdminPublishedContentEditPage,
  AdminPublishedContentPage,
  AdminSubmissionDetailPage,
  EventDetailPage,
  EventsPage,
  EventSubmissionPage,
  HomePage,
  RestaurantDetailPage,
  RestaurantsPage,
  RestaurantSubmissionPage,
  TourDetailPage,
  ToursPage,
  TourSubmissionPage,
} from './LazyRoutePages'

function withSuspense(element: ReactNode) {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading..." />}>
      {element}
    </Suspense>
  )
}

function withoutSuspense(element: ReactNode) {
  return element
}

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
        element: withoutSuspense(<HomePage />),
      },
      {
        path: 'events',
        element: withoutSuspense(<EventsPage />),
      },
      {
        path: 'events/submit',
        element: withSuspense(<EventSubmissionPage />),
      },
      {
        path: 'events/:id',
        element: withSuspense(<EventDetailPage />),
      },
      {
        path: 'admin/login',
        element: withSuspense(<AdminLoginPage />),
      },
      {
        path: 'admin',
        element: <ProtectedAdminRoute />,
        children: [
          {
            path: 'submissions',
            element: withSuspense(<AdminDashboardPage />),
          },
          {
            path: 'content',
            element: withSuspense(<AdminPublishedContentPage />),
          },
          {
            path: 'content/:type/:id/edit',
            element: withSuspense(<AdminPublishedContentEditPage />),
          },
          {
            path: 'submissions/:type/:id',
            element: withSuspense(<AdminSubmissionDetailPage />),
          },
        ],
      },
      {
        path: 'restaurants',
        element: withoutSuspense(<RestaurantsPage />),
      },
      {
        path: 'restaurants/submit',
        element: withSuspense(<RestaurantSubmissionPage />),
      },
      {
        path: 'restaurants/:id',
        element: withSuspense(<RestaurantDetailPage />),
      },
      {
        path: 'tours',
        element: withoutSuspense(<ToursPage />),
      },
      {
        path: 'tours/submit',
        element: withSuspense(<TourSubmissionPage />),
      },
      {
        path: 'tours/:id',
        element: withSuspense(<TourDetailPage />),
      },
      {
        path: '*',
        element: <PublicRouteStatusPage mode="notFound" />,
      },
    ],
  },
]
