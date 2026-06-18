import type { AppLanguage } from '../../../app/i18n/config'
import type {
  Tour,
  TourCategoryFilter,
  TourDetail,
} from '../types/tour'
import type { ToursContent } from '../types/tours-content'

type TourSeed = {
  item: Tour
  detail: TourDetail
  featuredOrder: number
}

type GetToursFixtureOptions = {
  category?: TourCategoryFilter
  cursor?: string | null
  limit?: number
  forceEmpty?: boolean
}

const tourSeedsByLanguage: Record<AppLanguage, TourSeed[]> = {
  en: [
    {
      featuredOrder: 0,
      item: {
        id: 'tour-sailing',
        name: 'Private Sailing at Sunrise',
        category: 'premium',
        categoryLabel: 'Premium',
        durationHours: 4,
        priceFrom: 2100,
        route: '/tours/tour-sailing',
      },
      detail: {
        id: 'tour-sailing',
        name: 'Private Sailing at Sunrise',
        category: 'premium',
        categoryLabel: 'Premium',
        durationHours: 4,
        priceFrom: 2100,
        description:
          'A quiet sunrise departure with a private crew, slow scenic movement, and the kind of calm water that makes Bacalar unforgettable on day one.',
        route: '/tours/tour-sailing',
        image: {
          src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
          alt: 'Sailboat gliding over bright lagoon water',
        },
      },
    },
    {
      featuredOrder: 1,
      item: {
        id: 'tour-pontoon',
        name: 'Family Pontoon Loop',
        category: 'group',
        categoryLabel: 'Group',
        durationHours: 3,
        priceFrom: 1450,
        route: '/tours/tour-pontoon',
      },
      detail: {
        id: 'tour-pontoon',
        name: 'Family Pontoon Loop',
        category: 'group',
        categoryLabel: 'Group',
        durationHours: 3,
        priceFrom: 1450,
        description:
          'A relaxed midday circuit built for families and small groups that want easy swimming stops, lagoon views, and very little planning friction.',
        route: '/tours/tour-pontoon',
        image: {
          src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
          alt: 'Group enjoying a calm lagoon boat ride',
        },
      },
    },
    {
      featuredOrder: 2,
      item: {
        id: 'tour-kayak',
        name: 'Guided Mangrove Kayak',
        category: 'adventure',
        categoryLabel: 'Adventure',
        durationHours: 2,
        priceFrom: 680,
        route: '/tours/tour-kayak',
      },
      detail: {
        id: 'tour-kayak',
        name: 'Guided Mangrove Kayak',
        category: 'adventure',
        categoryLabel: 'Adventure',
        durationHours: 2,
        priceFrom: 680,
        description:
          'A lighter, more active outing through calmer edges of the lagoon for travelers who want a nature-forward experience without committing a full day.',
        route: '/tours/tour-kayak',
      },
    },
    {
      featuredOrder: 3,
      item: {
        id: 'tour-catamaran',
        name: 'Golden Hour Catamaran',
        category: 'premium',
        categoryLabel: 'Premium',
        durationHours: 4,
        priceFrom: 2400,
        route: '/tours/tour-catamaran',
      },
      detail: {
        id: 'tour-catamaran',
        name: 'Golden Hour Catamaran',
        category: 'premium',
        categoryLabel: 'Premium',
        durationHours: 4,
        priceFrom: 2400,
        description:
          'A slower late-day sail for travelers who want a polished boat, a sunset frame, and more room to stretch into the evening.',
        route: '/tours/tour-catamaran',
      },
    },
    {
      featuredOrder: 4,
      item: {
        id: 'tour-snorkel-loop',
        name: 'Easy Snorkel Loop',
        category: 'group',
        categoryLabel: 'Group',
        durationHours: 3,
        priceFrom: 990,
        route: '/tours/tour-snorkel-loop',
      },
      detail: {
        id: 'tour-snorkel-loop',
        name: 'Easy Snorkel Loop',
        category: 'group',
        categoryLabel: 'Group',
        durationHours: 3,
        priceFrom: 990,
        description:
          'A low-friction group option with short water segments and easy logistics for mixed-energy travelers.',
        route: '/tours/tour-snorkel-loop',
      },
    },
  ],
  es: [
    {
      featuredOrder: 0,
      item: {
        id: 'tour-sailing',
        name: 'Vela privada al amanecer',
        category: 'premium',
        categoryLabel: 'Premium',
        durationHours: 4,
        priceFrom: 2100,
        route: '/tours/tour-sailing',
      },
      detail: {
        id: 'tour-sailing',
        name: 'Vela privada al amanecer',
        category: 'premium',
        categoryLabel: 'Premium',
        durationHours: 4,
        priceFrom: 2100,
        description:
          'Una salida tranquila al amanecer con tripulacion privada, movimiento lento y ese tipo de agua serena que vuelve inolvidable el primer dia en Bacalar.',
        route: '/tours/tour-sailing',
        image: {
          src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
          alt: 'Velero privado navegando por la laguna al amanecer',
        },
      },
    },
    {
      featuredOrder: 1,
      item: {
        id: 'tour-pontoon',
        name: 'Recorrido familiar en ponton',
        category: 'group',
        categoryLabel: 'Grupo',
        durationHours: 3,
        priceFrom: 1450,
        route: '/tours/tour-pontoon',
      },
      detail: {
        id: 'tour-pontoon',
        name: 'Recorrido familiar en ponton',
        category: 'group',
        categoryLabel: 'Grupo',
        durationHours: 3,
        priceFrom: 1450,
        description:
          'Un circuito relajado al mediodia para familias y grupos pequenos que quieren parar a nadar, mirar la laguna y resolver el plan sin esfuerzo.',
        route: '/tours/tour-pontoon',
        image: {
          src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
          alt: 'Grupo disfrutando un paseo calmado en ponton',
        },
      },
    },
    {
      featuredOrder: 2,
      item: {
        id: 'tour-kayak',
        name: 'Kayak guiado por manglares',
        category: 'adventure',
        categoryLabel: 'Aventura',
        durationHours: 2,
        priceFrom: 680,
        route: '/tours/tour-kayak',
      },
      detail: {
        id: 'tour-kayak',
        name: 'Kayak guiado por manglares',
        category: 'adventure',
        categoryLabel: 'Aventura',
        durationHours: 2,
        priceFrom: 680,
        description:
          'Una salida mas ligera y activa por zonas tranquilas de la laguna para quienes quieren una experiencia cercana a la naturaleza sin ocupar todo el dia.',
        route: '/tours/tour-kayak',
      },
    },
    {
      featuredOrder: 3,
      item: {
        id: 'tour-catamaran',
        name: 'Catamaran de hora dorada',
        category: 'premium',
        categoryLabel: 'Premium',
        durationHours: 4,
        priceFrom: 2400,
        route: '/tours/tour-catamaran',
      },
      detail: {
        id: 'tour-catamaran',
        name: 'Catamaran de hora dorada',
        category: 'premium',
        categoryLabel: 'Premium',
        durationHours: 4,
        priceFrom: 2400,
        description:
          'Una navegacion lenta al final del dia para viajeros que quieren un barco mas pulido, buen atardecer y margen para alargar la tarde.',
        route: '/tours/tour-catamaran',
      },
    },
    {
      featuredOrder: 4,
      item: {
        id: 'tour-snorkel-loop',
        name: 'Recorrido facil de snorkel',
        category: 'group',
        categoryLabel: 'Grupo',
        durationHours: 3,
        priceFrom: 990,
        route: '/tours/tour-snorkel-loop',
      },
      detail: {
        id: 'tour-snorkel-loop',
        name: 'Recorrido facil de snorkel',
        category: 'group',
        categoryLabel: 'Grupo',
        durationHours: 3,
        priceFrom: 990,
        description:
          'Una opcion de grupo con poca friccion, trayectos cortos en el agua y logistica simple para energias mixtas.',
        route: '/tours/tour-snorkel-loop',
      },
    },
  ],
}

function encodeCursor(sortOrder: number, slug: string) {
  return `${sortOrder}:${slug}`
}

export function getToursFixture(
  language: AppLanguage,
  {
    category = 'all',
    cursor,
    limit = 2,
    forceEmpty = false,
  }: GetToursFixtureOptions = {},
): ToursContent {
  const seeds = tourSeedsByLanguage[language]
  const featuredItems = seeds
    .slice()
    .sort((left, right) => left.featuredOrder - right.featuredOrder)
    .slice(0, 3)
    .map((seed) => seed.item)
  const filteredItems = forceEmpty
    ? []
    : seeds
        .map((seed) => seed.item)
        .filter((item) => (category === 'all' ? true : item.category === category))

  const startIndex = cursor
    ? filteredItems.findIndex((item, index) => encodeCursor(index, item.id) === cursor) + 1
    : 0
  const safeStartIndex = startIndex > 0 ? startIndex : 0
  const items = filteredItems.slice(safeStartIndex, safeStartIndex + limit)
  const hasMore = safeStartIndex + items.length < filteredItems.length
  const nextCursor =
    hasMore && items.length > 0
      ? encodeCursor(safeStartIndex + items.length - 1, items.at(-1)?.id ?? '')
      : null

  return {
    eyebrow:
      language === 'es' ? 'Tours en Bacalar' : 'Bacalar tours',
    title:
      language === 'es'
        ? 'Descubre los mejores tours por la laguna en Bacalar'
        : 'Discover the best lagoon tours in Bacalar',
    description:
      language === 'es'
        ? 'Explora experiencias confiables en la laguna para todo tipo de viaje.'
        : 'Browse trusted lagoon experiences for every type of trip.',
    featuredItems,
    items,
    pagination: {
      hasMore,
      nextCursor,
    },
  }
}

export function getTourDetailFixture(language: AppLanguage, id: string) {
  return tourSeedsByLanguage[language].find((seed) => seed.item.id === id)?.detail
}
