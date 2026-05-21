import type { ExperienceKey } from '../../../app/store/ui-store'

export type HomeSpotlightMetric = {
  label: string
  value: string
}

export type HomeSpotlightEntry = {
  title: string
  description: string
  route: string
  cta: string
  metrics: HomeSpotlightMetric[]
}

export type HomeSpotlightAction = {
  key: ExperienceKey
  label: string
}

export type HomeSectionIntro = {
  eyebrow: string
  title: string
  description: string
}

export type HomeSuggestionCard = {
  label?: string
  title: string
  description: string
  meta: string
  route: string
}

export type HomeBookingAction = {
  label: string
  route: string
}

export type HomeContent = {
  hero: {
    eyebrow: string
    title: string
    description: string
  }
  spotlight: {
    actions: HomeSpotlightAction[]
    entries: Record<ExperienceKey, HomeSpotlightEntry>
  }
  planningCallout: HomeSectionIntro & {
    items: string[]
  }
  featuredExperiences: {
    intro: HomeSectionIntro
    items: HomeSuggestionCard[]
  }
  diningMoments: {
    intro: HomeSectionIntro
    items: HomeSuggestionCard[]
  }
  weeklyHappenings: {
    intro: HomeSectionIntro
    items: HomeSuggestionCard[]
  }
  bookingCta: {
    eyebrow: string
    title: string
    description: string
    primaryAction: HomeBookingAction
    secondaryAction: HomeBookingAction
  }
}
