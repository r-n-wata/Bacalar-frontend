import type { RestaurantMoment } from '../types/restaurant'

export function formatRestaurantMoments(
  moments: RestaurantMoment[],
  t: (key: string) => string,
) {
  return moments.map((moment) => t(`restaurants.categories.${moment}`)).join(' / ')
}
