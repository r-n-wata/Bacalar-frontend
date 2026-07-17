import type { AppLanguage } from '../../../app/i18n/config'
import type { Tour, TourCategoryFilter, TourDetail } from '../types/tour'
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

function createTourSeed(input: {
  id: string
  name: string
  category: string
  duration: string
  priceFrom: string
  privateOrShared: string
  bestFor: string
  difficulty: string
  suitableForKids: string
  description: string
  included?: string
  whatToBring?: string
  meetingPoint?: string
  operatorName: string
  operatorDescription?: string
  operatorWhatsapp?: string
  operatorInstagram?: string
  operatorWebsite?: string
  operatorPrimaryContactMethod?: string
  route: string
  featuredOrder: number
  image?: { src: string; alt: string }
  imageUrls?: string[]
}): TourSeed {
  return {
    featuredOrder: input.featuredOrder,
    item: {
      id: input.id,
      name: input.name,
      category: input.category,
      duration: input.duration,
      priceFrom: input.priceFrom,
      bestFor: input.bestFor,
      operatorName: input.operatorName,
      route: input.route,
      image: input.image,
    },
    detail: {
      id: input.id,
      name: input.name,
      category: input.category,
      duration: input.duration,
      priceFrom: input.priceFrom,
      privateOrShared: input.privateOrShared,
      bestFor: input.bestFor,
      difficulty: input.difficulty,
      suitableForKids: input.suitableForKids,
      description: input.description,
      included: input.included,
      whatToBring: input.whatToBring,
      meetingPoint: input.meetingPoint,
      imageUrls: input.imageUrls ?? (input.image ? [input.image.src] : []),
      operatorName: input.operatorName,
      operatorDescription: input.operatorDescription,
      operatorWhatsapp: input.operatorWhatsapp,
      operatorInstagram: input.operatorInstagram,
      operatorWebsite: input.operatorWebsite,
      operatorPrimaryContactMethod: input.operatorPrimaryContactMethod,
      route: input.route,
      image: input.image,
    },
  }
}

const tourSeedsByLanguage: Record<AppLanguage, TourSeed[]> = {
  en: [
    createTourSeed({
      id: 'tour-sailing',
      name: 'Private Sailing at Sunrise',
      category: 'Sailing',
      duration: '4 hours',
      priceFrom: 'From MXN 2,800',
      privateOrShared: 'Private',
      bestFor: 'Sunrise',
      difficulty: 'Easy',
      suitableForKids: 'Yes',
      description:
        'A quiet sunrise departure with a private crew, slow scenic movement, and calm lagoon water.',
      included: 'Captain, safety gear, fruit, and chilled water.',
      whatToBring: 'Swimwear, a light layer, reef-safe sunscreen, and cash for extras.',
      meetingPoint: 'Main marina dock near the lagoon boulevard.',
      operatorName: 'Laguna Vela',
      operatorDescription:
        'A small Bacalar sailing crew focused on private sunrise departures and calm pacing.',
      operatorWhatsapp: '+52 983 123 4567',
      operatorInstagram: '@lagunavela',
      operatorWebsite: 'https://lagunavela.example.com',
      operatorPrimaryContactMethod: 'WhatsApp',
      route: '/tours/tour-sailing',
      featuredOrder: 0,
      image: {
        src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        alt: 'Sailboat gliding over bright lagoon water',
      },
      imageUrls: [
        'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      ],
    }),
    createTourSeed({
      id: 'tour-pontoon',
      name: 'Family Pontoon Loop',
      category: 'Boat Tour',
      duration: '3 hours',
      priceFrom: 'From MXN 1,600',
      privateOrShared: 'Shared',
      bestFor: 'Families',
      difficulty: 'Easy',
      suitableForKids: 'Yes',
      description:
        'A relaxed midday circuit with swim stops and soft pacing for mixed-age groups.',
      included: 'Life jackets, lagoon stops, and cooler with water.',
      whatToBring: 'Towels, sunscreen, and a waterproof phone pouch.',
      operatorName: 'Casa Ponton',
      route: '/tours/tour-pontoon',
      featuredOrder: 1,
      image: {
        src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        alt: 'Pontoon on the lagoon',
      },
      imageUrls: [],
    }),
    createTourSeed({
      id: 'tour-kayak',
      name: 'Guided Mangrove Kayak',
      category: 'Kayak Tour',
      duration: '2 hours',
      priceFrom: 'From MXN 900',
      privateOrShared: 'Shared',
      bestFor: 'Nature',
      difficulty: 'Moderate',
      suitableForKids: 'Older kids',
      description:
        'An active paddle through calmer edges of the lagoon for travelers who want a shorter outing.',
      operatorName: 'Manglar Guides',
      operatorPrimaryContactMethod: 'Instagram',
      route: '/tours/tour-kayak',
      featuredOrder: 2,
    }),
    createTourSeed({
      id: 'tour-birdwatching',
      name: 'Lagoon Birdwatching Drift',
      category: 'Boat Tour',
      duration: '2 hours',
      priceFrom: 'From MXN 1,100',
      privateOrShared: 'Shared',
      bestFor: 'Birdwatching',
      difficulty: 'Easy',
      suitableForKids: 'Yes',
      description: 'A calm morning drift built around shoreline birdlife and slower pacing.',
      operatorName: 'Aves Bacalar',
      route: '/tours/tour-birdwatching',
      featuredOrder: 3,
    }),
    createTourSeed({
      id: 'tour-snorkel',
      name: 'Shallow Snorkel Circuit',
      category: 'Adventure',
      duration: '3 hours',
      priceFrom: 'From MXN 1,450',
      privateOrShared: 'Shared',
      bestFor: 'Swimming',
      difficulty: 'Moderate',
      suitableForKids: 'Older kids',
      description: 'A lighter active outing for travelers who want swim stops without a full-day commitment.',
      operatorName: 'Agua Clara',
      route: '/tours/tour-snorkel',
      featuredOrder: 4,
    }),
  ],
  es: [
    createTourSeed({
      id: 'tour-sailing',
      name: 'Vela privada al amanecer',
      category: 'Sailing',
      duration: '4 hours',
      priceFrom: 'Desde MXN 2,800',
      privateOrShared: 'Privado',
      bestFor: 'Amanecer',
      difficulty: 'Facil',
      suitableForKids: 'Si',
      description:
        'Una salida tranquila al amanecer con tripulacion privada y agua serena en la laguna.',
      included: 'Capitan, equipo de seguridad, fruta y agua fria.',
      whatToBring: 'Traje de bano, capa ligera, bloqueador y efectivo.',
      meetingPoint: 'Muelle principal cerca del boulevard de la laguna.',
      operatorName: 'Laguna Vela',
      operatorDescription:
        'Un equipo pequeno de vela en Bacalar enfocado en salidas privadas al amanecer.',
      operatorWhatsapp: '+52 983 123 4567',
      operatorInstagram: '@lagunavela',
      operatorWebsite: 'https://lagunavela.example.com',
      operatorPrimaryContactMethod: 'WhatsApp',
      route: '/tours/tour-sailing',
      featuredOrder: 0,
      image: {
        src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        alt: 'Velero navegando por la laguna al amanecer',
      },
      imageUrls: [
        'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      ],
    }),
    createTourSeed({
      id: 'tour-pontoon',
      name: 'Recorrido familiar en ponton',
      category: 'Boat Tour',
      duration: '3 hours',
      priceFrom: 'Desde MXN 1,600',
      privateOrShared: 'Compartido',
      bestFor: 'Familias',
      difficulty: 'Facil',
      suitableForKids: 'Si',
      description:
        'Un circuito relajado con paradas para nadar y ritmo amable para grupos mixtos.',
      included: 'Chalecos salvavidas, paradas en la laguna y agua fria.',
      whatToBring: 'Toallas, bloqueador y funda impermeable.',
      operatorName: 'Casa Ponton',
      route: '/tours/tour-pontoon',
      featuredOrder: 1,
      image: {
        src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        alt: 'Ponton en la laguna',
      },
      imageUrls: [],
    }),
    createTourSeed({
      id: 'tour-kayak',
      name: 'Kayak guiado por manglares',
      category: 'Kayak Tour',
      duration: '2 hours',
      priceFrom: 'Desde MXN 900',
      privateOrShared: 'Compartido',
      bestFor: 'Naturaleza',
      difficulty: 'Moderada',
      suitableForKids: 'Ninos grandes',
      description:
        'Un paseo activo por zonas tranquilas de la laguna para quienes quieren una salida corta.',
      operatorName: 'Manglar Guides',
      operatorPrimaryContactMethod: 'Instagram',
      route: '/tours/tour-kayak',
      featuredOrder: 2,
    }),
    createTourSeed({
      id: 'tour-birdwatching',
      name: 'Paseo de avistamiento en la laguna',
      category: 'Boat Tour',
      duration: '2 hours',
      priceFrom: 'Desde MXN 1,100',
      privateOrShared: 'Compartido',
      bestFor: 'Aves',
      difficulty: 'Facil',
      suitableForKids: 'Si',
      description: 'Un recorrido matutino sereno pensado para observar aves y moverse sin prisa.',
      operatorName: 'Aves Bacalar',
      route: '/tours/tour-birdwatching',
      featuredOrder: 3,
    }),
    createTourSeed({
      id: 'tour-snorkel',
      name: 'Circuito de snorkel poco profundo',
      category: 'Adventure',
      duration: '3 hours',
      priceFrom: 'Desde MXN 1,450',
      privateOrShared: 'Compartido',
      bestFor: 'Nado',
      difficulty: 'Moderada',
      suitableForKids: 'Ninos grandes',
      description: 'Una salida activa mas ligera para quienes quieren nadar sin comprometer todo el dia.',
      operatorName: 'Agua Clara',
      route: '/tours/tour-snorkel',
      featuredOrder: 4,
    }),
  ],
}

function encodeCursor(sortOrder: number, slug: string) {
  return `${sortOrder}:${slug}`
}

export function getToursFixture(
  language: AppLanguage,
  { category = 'all', cursor, limit = 10, forceEmpty = false }: GetToursFixtureOptions = {},
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
        .filter((seed) => seed.featuredOrder >= 3)
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
    eyebrow: language === 'es' ? 'Tours en Bacalar' : 'Bacalar tours',
    title:
      language === 'es'
        ? 'Descubre los mejores tours en Bacalar'
        : 'Discover the best tours in Bacalar',
    description:
      language === 'es'
        ? 'Explora actividades, aventuras y salidas en la laguna por tour.'
        : 'Browse lagoon outings, water activities, and local adventures by tour.',
    categories: [...new Set(seeds.map((seed) => seed.item.category))],
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
