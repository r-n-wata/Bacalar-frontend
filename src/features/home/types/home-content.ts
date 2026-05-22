import type { ExperienceKey } from '../../../app/store/ui-store'

export type HomeSpotlightMetric = {
  label: string
  value: string
}

export type HomeImage = {
  src: string
  alt: string
}

export type HomeSpotlightEntry = {
  title: string
  description: string
  route: string
  cta: string
  metrics: HomeSpotlightMetric[]
  image?: HomeImage
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
  id: string
  label?: string
  title: string
  subtitle: string
  description: string
  meta: string
  route: string
  image?: HomeImage
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
}
