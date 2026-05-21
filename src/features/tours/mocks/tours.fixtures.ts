import type { AppLanguage } from '../../../app/i18n/config'
import type { ToursContent } from '../types/tours-content'

const toursByLanguage: Record<AppLanguage, ToursContent> = {
  en: {
    eyebrow: 'Tours feature',
    title: 'Boat tours and experience browsing',
    description:
      'React Query owns live availability-ready tour data, while future compare and filter state can stay client-side.',
    items: [
      {
        id: 'tour-sailing',
        name: 'Private Sailing at Sunrise',
        category: 'Premium',
        durationHours: 4,
        priceFrom: 2100,
      },
      {
        id: 'tour-pontoon',
        name: 'Family Pontoon Loop',
        category: 'Group',
        durationHours: 3,
        priceFrom: 1450,
      },
      {
        id: 'tour-kayak',
        name: 'Guided Mangrove Kayak',
        category: 'Adventure',
        durationHours: 2,
        priceFrom: 680,
      },
    ],
  },
  es: {
    eyebrow: 'Funcionalidad de tours',
    title: 'Tours en lancha y exploracion de experiencias',
    description:
      'React Query controla los datos listos para disponibilidad, mientras futuros filtros y comparaciones pueden quedarse del lado del cliente.',
    items: [
      {
        id: 'tour-sailing',
        name: 'Velero privado al amanecer',
        category: 'Premium',
        durationHours: 4,
        priceFrom: 2100,
      },
      {
        id: 'tour-pontoon',
        name: 'Recorrido familiar en ponton',
        category: 'Grupo',
        durationHours: 3,
        priceFrom: 1450,
      },
      {
        id: 'tour-kayak',
        name: 'Kayak guiado por manglares',
        category: 'Aventura',
        durationHours: 2,
        priceFrom: 680,
      },
    ],
  },
}

export function getToursFixture(language: AppLanguage) {
  return toursByLanguage[language]
}
