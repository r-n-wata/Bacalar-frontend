import { lazy } from 'react'
export { HomePage } from '../../features/home/pages/HomePage'
export { EventsPage } from '../../features/events/pages/EventsPage'
export { RestaurantsPage } from '../../features/restaurants/pages/RestaurantsPage'
export { ToursPage } from '../../features/tours/pages/ToursPage'

export const EventSubmissionPage = lazy(async () => ({
  default: (await import('../../features/events/pages/EventSubmissionPage'))
    .EventSubmissionPage,
}))

export const EventDetailPage = lazy(async () => ({
  default: (await import('../../features/events/pages/EventDetailPage'))
    .EventDetailPage,
}))

export const AdminLoginPage = lazy(async () => ({
  default: (await import('../../features/admin/pages/AdminLoginPage'))
    .AdminLoginPage,
}))

export const AdminDashboardPage = lazy(async () => ({
  default: (await import('../../features/admin/pages/AdminDashboardPage'))
    .AdminDashboardPage,
}))

export const AdminPublishedContentPage = lazy(async () => ({
  default: (
    await import('../../features/admin/pages/AdminPublishedContentPage')
  ).AdminPublishedContentPage,
}))

export const AdminPublishedContentEditPage = lazy(async () => ({
  default: (
    await import('../../features/admin/pages/AdminPublishedContentEditPage')
  ).AdminPublishedContentEditPage,
}))

export const AdminSubmissionDetailPage = lazy(async () => ({
  default: (
    await import('../../features/admin/pages/AdminSubmissionDetailPage')
  ).AdminSubmissionDetailPage,
}))

export const RestaurantSubmissionPage = lazy(async () => ({
  default: (
    await import('../../features/restaurants/pages/RestaurantSubmissionPage')
  ).RestaurantSubmissionPage,
}))

export const RestaurantDetailPage = lazy(async () => ({
  default: (
    await import('../../features/restaurants/pages/RestaurantDetailPage')
  ).RestaurantDetailPage,
}))

export const TourSubmissionPage = lazy(async () => ({
  default: (await import('../../features/tours/pages/TourSubmissionPage'))
    .TourSubmissionPage,
}))

export const TourDetailPage = lazy(async () => ({
  default: (await import('../../features/tours/pages/TourDetailPage'))
    .TourDetailPage,
}))
