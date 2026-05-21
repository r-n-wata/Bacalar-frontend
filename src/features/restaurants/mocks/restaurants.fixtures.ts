import type { AppLanguage } from '../../../app/i18n/config'
import type { RestaurantsContent } from '../types/restaurants-content'

const restaurantsByLanguage: Record<AppLanguage, RestaurantsContent> = {
  en: {
    eyebrow: 'Restaurants feature',
    title: 'Restaurant discovery',
    description:
      'Shared cards and layout stay generic, while restaurant copy and queries remain feature-owned.',
    items: [
      {
        id: 'rest-naao',
        name: 'Nao',
        cuisine: 'Seafood',
        vibe: 'Lagoon-facing dinner',
        priceBand: '$$$',
      },
      {
        id: 'rest-ixchel',
        name: 'Ixchel Cocina',
        cuisine: 'Regional Mexican',
        vibe: 'Casual local favorite',
        priceBand: '$$',
      },
      {
        id: 'rest-cielo',
        name: 'Cielo de Maiz',
        cuisine: 'Vegetarian',
        vibe: 'Garden breakfast',
        priceBand: '$$',
      },
    ],
  },
  es: {
    eyebrow: 'Funcionalidad de restaurantes',
    title: 'Descubrimiento de restaurantes',
    description:
      'Las tarjetas y el layout compartidos se mantienen genericos, mientras la copia y las consultas quedan dentro de la funcionalidad.',
    items: [
      {
        id: 'rest-naao',
        name: 'Nao',
        cuisine: 'Mariscos',
        vibe: 'Cena frente a la laguna',
        priceBand: '$$$',
      },
      {
        id: 'rest-ixchel',
        name: 'Ixchel Cocina',
        cuisine: 'Mexicana regional',
        vibe: 'Favorito local casual',
        priceBand: '$$',
      },
      {
        id: 'rest-cielo',
        name: 'Cielo de Maiz',
        cuisine: 'Vegetariano',
        vibe: 'Desayuno en el jardin',
        priceBand: '$$',
      },
    ],
  },
}

export function getRestaurantsFixture(language: AppLanguage) {
  return restaurantsByLanguage[language]
}
