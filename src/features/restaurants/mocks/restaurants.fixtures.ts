import type { AppLanguage } from '../../../app/i18n/config'
import type { RestaurantDetail } from '../types/restaurant'
import type { RestaurantsContent } from '../types/restaurants-content'

const restaurantsByLanguage: Record<AppLanguage, RestaurantsContent> = {
  en: {
    eyebrow: 'Restaurants',
    title: 'Pick the right stop for the moment',
    description:
      'Keep dining simple: one strong breakfast, one easy lunch, and one dinner worth slowing down for.',
    items: [
      {
        id: 'rest-cielo',
        name: 'Cielo de Maiz',
        cuisine: 'Vegetarian',
        vibe: 'Garden breakfast',
        priceBand: '$$',
        route: '/restaurants/rest-cielo',
      },
      {
        id: 'rest-ixchel',
        name: 'Ixchel Cocina',
        cuisine: 'Regional Mexican',
        vibe: 'Casual local favorite',
        priceBand: '$$',
        route: '/restaurants/rest-ixchel',
      },
      {
        id: 'rest-naao',
        name: 'Nao',
        cuisine: 'Seafood',
        vibe: 'Lagoon-facing dinner',
        priceBand: '$$$',
        route: '/restaurants/rest-naao',
      },
    ],
  },
  es: {
    eyebrow: 'Restaurantes',
    title: 'Elige la parada correcta para cada momento',
    description:
      'Haz la comida facil: un gran desayuno, un almuerzo sin vueltas y una cena que valga bajar el ritmo.',
    items: [
      {
        id: 'rest-cielo',
        name: 'Cielo de Maiz',
        cuisine: 'Vegetariano',
        vibe: 'Desayuno en jardin',
        priceBand: '$$',
        route: '/restaurants/rest-cielo',
      },
      {
        id: 'rest-ixchel',
        name: 'Ixchel Cocina',
        cuisine: 'Mexicana regional',
        vibe: 'Favorito local casual',
        priceBand: '$$',
        route: '/restaurants/rest-ixchel',
      },
      {
        id: 'rest-naao',
        name: 'Nao',
        cuisine: 'Mariscos',
        vibe: 'Cena frente a la laguna',
        priceBand: '$$$',
        route: '/restaurants/rest-naao',
      },
    ],
  },
}

const restaurantDetailsByLanguage: Record<
  AppLanguage,
  Record<string, RestaurantDetail>
> = {
  en: {
    'rest-cielo': {
      id: 'rest-cielo',
      name: 'Cielo de Maiz',
      cuisine: 'Vegetarian',
      vibe: 'Garden breakfast',
      priceBand: '$$',
      description:
        'A relaxed breakfast stop with garden energy, fresh plates, and enough calm to set up a lagoon morning without rushing anyone through it.',
      route: '/restaurants/rest-cielo',
      image: {
        src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
        alt: 'Sunlit breakfast table with tropical greenery',
      },
    },
    'rest-ixchel': {
      id: 'rest-ixchel',
      name: 'Ixchel Cocina',
      cuisine: 'Regional Mexican',
      vibe: 'Casual local favorite',
      priceBand: '$$',
      description:
        'A dependable lunch option when the day needs something grounded, regional, and easy to say yes to after a morning on the water.',
      route: '/restaurants/rest-ixchel',
      image: {
        src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
        alt: 'Relaxed restaurant terrace prepared for lunch',
      },
    },
    'rest-naao': {
      id: 'rest-naao',
      name: 'Nao',
      cuisine: 'Seafood',
      vibe: 'Lagoon-facing dinner',
      priceBand: '$$$',
      description:
        'An evening pick for when the stay calls for one elevated meal, strong seafood, and a setting that makes sunset feel part of dinner.',
      route: '/restaurants/rest-naao',
      image: {
        src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        alt: 'Warm evening restaurant setting near the water',
      },
    },
  },
  es: {
    'rest-cielo': {
      id: 'rest-cielo',
      name: 'Cielo de Maiz',
      cuisine: 'Vegetariano',
      vibe: 'Desayuno en jardin',
      priceBand: '$$',
      description:
        'Un desayuno relajado con ambiente de jardin, platos frescos y la calma suficiente para arrancar una manana de laguna sin prisas.',
      route: '/restaurants/rest-cielo',
      image: {
        src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
        alt: 'Desayuno luminoso en jardin',
      },
    },
    'rest-ixchel': {
      id: 'rest-ixchel',
      name: 'Ixchel Cocina',
      cuisine: 'Mexicana regional',
      vibe: 'Favorito local casual',
      priceBand: '$$',
      description:
        'Una opcion confiable para almorzar cuando el dia pide algo regional, cercano y facil de elegir despues de una manana en el agua.',
      route: '/restaurants/rest-ixchel',
      image: {
        src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
        alt: 'Terraza de restaurante preparada para el almuerzo',
      },
    },
    'rest-naao': {
      id: 'rest-naao',
      name: 'Nao',
      cuisine: 'Mariscos',
      vibe: 'Cena frente a la laguna',
      priceBand: '$$$',
      description:
        'Una eleccion nocturna para cuando la estancia pide una comida mas especial, buenos mariscos y un entorno donde el atardecer acompana la cena.',
      route: '/restaurants/rest-naao',
      image: {
        src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        alt: 'Restaurante calido de noche cerca del agua',
      },
    },
  },
}

export function getRestaurantsFixture(language: AppLanguage) {
  return restaurantsByLanguage[language]
}

export function getRestaurantDetailFixture(language: AppLanguage, id: string) {
  return restaurantDetailsByLanguage[language][id]
}
