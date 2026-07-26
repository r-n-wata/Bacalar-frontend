import { lazy } from 'react'

export const HomePage = lazy(async () => ({
  default: (await import('../../features/home/pages/HomePage')).HomePage,
}))

export const EventsPage = lazy(async () => ({
  default: (await import('../../features/events/pages/EventsPage')).EventsPage,
}))

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

export const RestaurantsPage = lazy(async () => ({
  default: (await import('../../features/restaurants/pages/RestaurantsPage'))
    .RestaurantsPage,
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

export const ToursPage = lazy(async () => ({
  default: (await import('../../features/tours/pages/ToursPage')).ToursPage,
}))

export const TourSubmissionPage = lazy(async () => ({
  default: (await import('../../features/tours/pages/TourSubmissionPage'))
    .TourSubmissionPage,
}))

export const TourDetailPage = lazy(async () => ({
  default: (await import('../../features/tours/pages/TourDetailPage'))
    .TourDetailPage,
}))
