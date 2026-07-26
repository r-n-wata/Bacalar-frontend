import { lazy } from 'react'
export { HomePage } from '../../features/home/pages/HomePage'
export { EventsPage } from '../../features/events/pages/EventsPage'
export { EventDetailPage } from '../../features/events/pages/EventDetailPage'
export { RestaurantsPage } from '../../features/restaurants/pages/RestaurantsPage'
export { RestaurantDetailPage } from '../../features/restaurants/pages/RestaurantDetailPage'
export { ToursPage } from '../../features/tours/pages/ToursPage'
export { TourDetailPage } from '../../features/tours/pages/TourDetailPage'
export { AdminLoginPage } from '../../features/admin/pages/AdminLoginPage'
export { AdminDashboardPage } from '../../features/admin/pages/AdminDashboardPage'
export { AdminPublishedContentPage } from '../../features/admin/pages/AdminPublishedContentPage'
export { AdminPublishedContentEditPage } from '../../features/admin/pages/AdminPublishedContentEditPage'
export { AdminSubmissionDetailPage } from '../../features/admin/pages/AdminSubmissionDetailPage'

export const EventSubmissionPage = lazy(async () => ({
  default: (await import('../../features/events/pages/EventSubmissionPage'))
    .EventSubmissionPage,
}))

export const RestaurantSubmissionPage = lazy(async () => ({
  default: (
    await import('../../features/restaurants/pages/RestaurantSubmissionPage')
  ).RestaurantSubmissionPage,
}))

export const TourSubmissionPage = lazy(async () => ({
  default: (await import('../../features/tours/pages/TourSubmissionPage'))
    .TourSubmissionPage,
}))
