import { lazy, Suspense, type ReactNode } from 'react'
import { AppShell } from '../../components/templates/AppShell'
import { LoadingSpinner } from '../../components/atoms/LoadingSpinner'
import { ProtectedAdminRoute } from '../../features/admin/pages/ProtectedAdminRoute'
import { PublicRouteStatusPage } from './PublicRouteStatusPage'

const HomePage = lazy(async () => ({
  default: (await import('../../features/home/pages/HomePage')).HomePage,
}))
const EventsPage = lazy(async () => ({
  default: (await import('../../features/events/pages/EventsPage')).EventsPage,
}))
const EventSubmissionPage = lazy(async () => ({
  default: (await import('../../features/events/pages/EventSubmissionPage'))
    .EventSubmissionPage,
}))
const EventDetailPage = lazy(async () => ({
  default: (await import('../../features/events/pages/EventDetailPage'))
    .EventDetailPage,
}))
const AdminLoginPage = lazy(async () => ({
  default: (await import('../../features/admin/pages/AdminLoginPage'))
    .AdminLoginPage,
}))
const AdminDashboardPage = lazy(async () => ({
  default: (await import('../../features/admin/pages/AdminDashboardPage'))
    .AdminDashboardPage,
}))
const AdminPublishedContentPage = lazy(async () => ({
  default: (
    await import('../../features/admin/pages/AdminPublishedContentPage')
  ).AdminPublishedContentPage,
}))
const AdminPublishedContentEditPage = lazy(async () => ({
  default: (
    await import('../../features/admin/pages/AdminPublishedContentEditPage')
  ).AdminPublishedContentEditPage,
}))
const AdminSubmissionDetailPage = lazy(async () => ({
  default: (
    await import('../../features/admin/pages/AdminSubmissionDetailPage')
  ).AdminSubmissionDetailPage,
}))
const RestaurantsPage = lazy(async () => ({
  default: (await import('../../features/restaurants/pages/RestaurantsPage'))
    .RestaurantsPage,
}))
const RestaurantSubmissionPage = lazy(async () => ({
  default: (
    await import('../../features/restaurants/pages/RestaurantSubmissionPage')
  ).RestaurantSubmissionPage,
}))
const RestaurantDetailPage = lazy(async () => ({
  default: (
    await import('../../features/restaurants/pages/RestaurantDetailPage')
  ).RestaurantDetailPage,
}))
const ToursPage = lazy(async () => ({
  default: (await import('../../features/tours/pages/ToursPage')).ToursPage,
}))
const TourSubmissionPage = lazy(async () => ({
  default: (await import('../../features/tours/pages/TourSubmissionPage'))
    .TourSubmissionPage,
}))
const TourDetailPage = lazy(async () => ({
  default: (await import('../../features/tours/pages/TourDetailPage'))
    .TourDetailPage,
}))

function withSuspense(element: ReactNode) {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading..." />}>
      {element}
    </Suspense>
  )
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
        element: withSuspense(<HomePage />),
      },
      {
        path: 'events',
        element: withSuspense(<EventsPage />),
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
        element: withSuspense(<RestaurantsPage />),
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
        element: withSuspense(<ToursPage />),
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
