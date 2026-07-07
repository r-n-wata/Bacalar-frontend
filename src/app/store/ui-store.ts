import { create } from 'zustand'

export type TourKey = 'events' | 'restaurants' | 'tours'

type UiState = {
  featuredTour: TourKey
  setFeaturedTour: (tour: TourKey) => void
}

export const useUiStore = create<UiState>((set) => ({
  featuredTour: 'tours',
  setFeaturedTour: (featuredTour) => set({ featuredTour }),
}))
