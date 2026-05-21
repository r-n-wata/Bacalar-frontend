import { create } from 'zustand'

export type ExperienceKey = 'events' | 'restaurants' | 'tours'

type UiState = {
  featuredExperience: ExperienceKey
  setFeaturedExperience: (experience: ExperienceKey) => void
}

export const useUiStore = create<UiState>((set) => ({
  featuredExperience: 'tours',
  setFeaturedExperience: (featuredExperience) => set({ featuredExperience }),
}))
