import type { AppLanguage } from '../../../app/i18n/config'
import type {
  RestaurantCategoryFilter,
  RestaurantDetail,
} from '../types/restaurant'
import type { RestaurantsContent } from '../types/restaurants-content'

type RestaurantSeed = {
  item: RestaurantsContent['items'][number]
  detail: RestaurantDetail
  featuredOrder: number
}

type GetRestaurantsFixtureOptions = {
  category?: RestaurantCategoryFilter
  cursor?: string | null
  limit?: number
  forceEmpty?: boolean
}

const restaurantSeedsByLanguage: Record<AppLanguage, RestaurantSeed[]> = {
  en: [
    {
      featuredOrder: 0,
      item: {
        id: 'rest-cielo',
        name: 'Cielo de Maiz',
        cuisine: 'Vegetarian',
        vibe: 'Garden breakfast',
        priceBand: '$$',
        moments: ['breakfast'],
        route: '/restaurants/rest-cielo',
      },
      detail: {
        id: 'rest-cielo',
        name: 'Cielo de Maiz',
        cuisine: 'Vegetarian',
        vibe: 'Garden breakfast',
        priceBand: '$$',
        moments: ['breakfast'],
        description:
          'A relaxed breakfast stop with garden energy, fresh plates, and enough calm to set up a lagoon morning without rushing anyone through it.',
        route: '/restaurants/rest-cielo',
        image: {
          src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
          alt: 'Sunlit breakfast table with tropical greenery',
        },
      },
    },
    {
      featuredOrder: 1,
      item: {
        id: 'rest-ixchel',
        name: 'Ixchel Cocina',
        cuisine: 'Regional Mexican',
        vibe: 'Casual local favorite',
        priceBand: '$$',
        moments: ['lunch'],
        route: '/restaurants/rest-ixchel',
      },
      detail: {
        id: 'rest-ixchel',
        name: 'Ixchel Cocina',
        cuisine: 'Regional Mexican',
        vibe: 'Casual local favorite',
        priceBand: '$$',
        moments: ['lunch'],
        description:
          'A dependable lunch option when the day needs something grounded, regional, and easy to say yes to after a morning on the water.',
        route: '/restaurants/rest-ixchel',
        image: {
          src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
          alt: 'Relaxed restaurant terrace prepared for lunch',
        },
      },
    },
    {
      featuredOrder: 2,
      item: {
        id: 'rest-naao',
        name: 'Nao',
        cuisine: 'Seafood',
        vibe: 'Lagoon-facing dinner',
        priceBand: '$$$',
        moments: ['lunch', 'dinner'],
        route: '/restaurants/rest-naao',
      },
      detail: {
        id: 'rest-naao',
        name: 'Nao',
        cuisine: 'Seafood',
        vibe: 'Lagoon-facing dinner',
        priceBand: '$$$',
        moments: ['lunch', 'dinner'],
        description:
          'An evening pick for when the stay calls for one elevated meal, strong seafood, and a setting that makes sunset feel part of dinner.',
        route: '/restaurants/rest-naao',
        image: {
          src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
          alt: 'Warm evening restaurant setting near the water',
        },
      },
    },
    {
      featuredOrder: 3,
      item: {
        id: 'rest-bruma',
        name: 'Bruma Azul',
        cuisine: 'Cafe plates',
        vibe: 'Slow mid-morning reset',
        priceBand: '$',
        moments: ['breakfast'],
        route: '/restaurants/rest-bruma',
      },
      detail: {
        id: 'rest-bruma',
        name: 'Bruma Azul',
        cuisine: 'Cafe plates',
        vibe: 'Slow mid-morning reset',
        priceBand: '$',
        moments: ['breakfast'],
        description:
          'A lighter breakfast or coffee stop when the morning wants something low-lift before heading back toward the lagoon.',
        route: '/restaurants/rest-bruma',
      },
    },
    {
      featuredOrder: 4,
      item: {
        id: 'rest-orilla',
        name: 'Orilla Comedor',
        cuisine: 'Wood-fired Mexican',
        vibe: 'Longer sunset dinner',
        priceBand: '$$$',
        moments: ['dinner'],
        route: '/restaurants/rest-orilla',
      },
      detail: {
        id: 'rest-orilla',
        name: 'Orilla Comedor',
        cuisine: 'Wood-fired Mexican',
        vibe: 'Longer sunset dinner',
        priceBand: '$$$',
        moments: ['dinner'],
        description:
          'A slower dinner option when the plan wants one more celebratory meal anchored around sunset and a longer table stay.',
        route: '/restaurants/rest-orilla',
      },
    },
  ],
  es: [
    {
      featuredOrder: 0,
      item: {
        id: 'rest-cielo',
        name: 'Cielo de Maiz',
        cuisine: 'Vegetariano',
        vibe: 'Desayuno en jardin',
        priceBand: '$$',
        moments: ['breakfast'],
        route: '/restaurants/rest-cielo',
      },
      detail: {
        id: 'rest-cielo',
        name: 'Cielo de Maiz',
        cuisine: 'Vegetariano',
        vibe: 'Desayuno en jardin',
        priceBand: '$$',
        moments: ['breakfast'],
        description:
          'Un desayuno relajado con ambiente de jardin, platos frescos y la calma suficiente para arrancar una manana de laguna sin prisas.',
        route: '/restaurants/rest-cielo',
        image: {
          src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
          alt: 'Desayuno luminoso en jardin',
        },
      },
    },
    {
      featuredOrder: 1,
      item: {
        id: 'rest-ixchel',
        name: 'Ixchel Cocina',
        cuisine: 'Mexicana regional',
        vibe: 'Favorito local casual',
        priceBand: '$$',
        moments: ['lunch'],
        route: '/restaurants/rest-ixchel',
      },
      detail: {
        id: 'rest-ixchel',
        name: 'Ixchel Cocina',
        cuisine: 'Mexicana regional',
        vibe: 'Favorito local casual',
        priceBand: '$$',
        moments: ['lunch'],
        description:
          'Una opcion confiable para almorzar cuando el dia pide algo regional, cercano y facil de elegir despues de una manana en el agua.',
        route: '/restaurants/rest-ixchel',
        image: {
          src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
          alt: 'Terraza de restaurante preparada para el almuerzo',
        },
      },
    },
    {
      featuredOrder: 2,
      item: {
        id: 'rest-naao',
        name: 'Nao',
        cuisine: 'Mariscos',
        vibe: 'Cena frente a la laguna',
        priceBand: '$$$',
        moments: ['lunch', 'dinner'],
        route: '/restaurants/rest-naao',
      },
      detail: {
        id: 'rest-naao',
        name: 'Nao',
        cuisine: 'Mariscos',
        vibe: 'Cena frente a la laguna',
        priceBand: '$$$',
        moments: ['lunch', 'dinner'],
        description:
          'Una eleccion nocturna para cuando la estancia pide una comida mas especial, buenos mariscos y un entorno donde el atardecer acompana la cena.',
        route: '/restaurants/rest-naao',
        image: {
          src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
          alt: 'Restaurante calido de noche cerca del agua',
        },
      },
    },
    {
      featuredOrder: 3,
      item: {
        id: 'rest-bruma',
        name: 'Bruma Azul',
        cuisine: 'Platos de cafe',
        vibe: 'Pausa lenta de media manana',
        priceBand: '$',
        moments: ['breakfast'],
        route: '/restaurants/rest-bruma',
      },
      detail: {
        id: 'rest-bruma',
        name: 'Bruma Azul',
        cuisine: 'Platos de cafe',
        vibe: 'Pausa lenta de media manana',
        priceBand: '$',
        moments: ['breakfast'],
        description:
          'Una parada ligera para desayuno o cafe cuando la manana pide algo simple antes de volver hacia la laguna.',
        route: '/restaurants/rest-bruma',
      },
    },
    {
      featuredOrder: 4,
      item: {
        id: 'rest-orilla',
        name: 'Orilla Comedor',
        cuisine: 'Mexicana a la lena',
        vibe: 'Cena larga al atardecer',
        priceBand: '$$$',
        moments: ['dinner'],
        route: '/restaurants/rest-orilla',
      },
      detail: {
        id: 'rest-orilla',
        name: 'Orilla Comedor',
        cuisine: 'Mexicana a la lena',
        vibe: 'Cena larga al atardecer',
        priceBand: '$$$',
        moments: ['dinner'],
        description:
          'Una cena mas pausada para cuando el plan pide una mesa larga, un mejor final del dia y tiempo para quedarse.',
        route: '/restaurants/rest-orilla',
      },
    },
  ],
}

function buildRestaurantsContent(
  language: AppLanguage,
  items: RestaurantSeed[],
  cursor: string | null,
  limit: number,
): RestaurantsContent {
  const allItems = items.map((seed) => seed.item)
  const startIndex = cursor
    ? allItems.findIndex((item) => item.id === cursor) + 1
    : 0
  const safeStartIndex = startIndex > 0 ? startIndex : 0
  const pageItems = allItems.slice(safeStartIndex, safeStartIndex + limit)
  const hasMore = safeStartIndex + pageItems.length < allItems.length
  const nextCursor = hasMore ? pageItems.at(-1)?.id ?? null : null

  if (language === 'es') {
    return {
      eyebrow: 'Restaurantes',
      title: 'Donde comer en Bacalar',
      description:
        'Desde desayunos junto a la laguna hasta cenas relajadas, seleccionamos lugares que vale la pena visitar.',
      featuredItems: [...restaurantSeedsByLanguage.es]
        .sort((left, right) => left.featuredOrder - right.featuredOrder)
        .slice(0, 3)
        .map((seed) => seed.item),
      items: pageItems,
      pagination: {
        hasMore,
        nextCursor,
      },
    }
  }

  return {
    eyebrow: 'Restaurants',
    title: 'Where to eat in Bacalar',
    description:
      "From breakfast by the lagoon to relaxed dinners, we've selected places worth visiting.",
    featuredItems: [...restaurantSeedsByLanguage.en]
      .sort((left, right) => left.featuredOrder - right.featuredOrder)
      .slice(0, 3)
      .map((seed) => seed.item),
    items: pageItems,
    pagination: {
      hasMore,
      nextCursor,
    },
  }
}

export function getRestaurantsFixture(
  language: AppLanguage,
  {
    category = 'all',
    cursor = null,
    limit = 10,
    forceEmpty = false,
  }: GetRestaurantsFixtureOptions = {},
) {
  const seeds = restaurantSeedsByLanguage[language]
  const filteredSeeds = forceEmpty
    ? []
    : seeds.filter(
        (seed) =>
          seed.featuredOrder >= 3 &&
          (category === 'all' ? true : seed.item.moments.includes(category)),
      )

  return buildRestaurantsContent(language, filteredSeeds, cursor, limit)
}

export function getRestaurantDetailFixture(language: AppLanguage, id: string) {
  const seed = restaurantSeedsByLanguage[language].find((entry) => entry.item.id === id)

  return seed?.detail
}
