import type { AppLanguage } from '../../../app/i18n/config'
import type { TourDetail } from '../types/tour'
import type { ToursContent } from '../types/tours-content'

const toursByLanguage: Record<AppLanguage, ToursContent> = {
  en: {
    eyebrow: 'Bacalar tours',
    title: 'Choose a lagoon experience that fits the day',
    description:
      'Compare a few focused options first, then move into a fuller browse once the right pace becomes clear.',
    items: [
      {
        id: 'tour-sailing',
        name: 'Private Sailing at Sunrise',
        category: 'Premium',
        durationHours: 4,
        priceFrom: 2100,
        route: '/tours/tour-sailing',
      },
      {
        id: 'tour-pontoon',
        name: 'Family Pontoon Loop',
        category: 'Group',
        durationHours: 3,
        priceFrom: 1450,
        route: '/tours/tour-pontoon',
      },
      {
        id: 'tour-kayak',
        name: 'Guided Mangrove Kayak',
        category: 'Adventure',
        durationHours: 2,
        priceFrom: 680,
        route: '/tours/tour-kayak',
      },
    ],
  },
  es: {
    eyebrow: 'Tours en Bacalar',
    title: 'Elige una experiencia en la laguna que encaje con el dia',
    description:
      'Compara primero unas pocas opciones claras y luego entra a una exploracion mas amplia cuando el ritmo del dia ya este definido.',
    items: [
      {
        id: 'tour-sailing',
        name: 'Vela privada al amanecer',
        category: 'Premium',
        durationHours: 4,
        priceFrom: 2100,
        route: '/tours/tour-sailing',
      },
      {
        id: 'tour-pontoon',
        name: 'Recorrido familiar en ponton',
        category: 'Grupo',
        durationHours: 3,
        priceFrom: 1450,
        route: '/tours/tour-pontoon',
      },
      {
        id: 'tour-kayak',
        name: 'Kayak guiado por manglares',
        category: 'Aventura',
        durationHours: 2,
        priceFrom: 680,
        route: '/tours/tour-kayak',
      },
    ],
  },
}

const tourDetailsByLanguage: Record<AppLanguage, Record<string, TourDetail>> = {
  en: {
    'tour-sailing': {
      id: 'tour-sailing',
      name: 'Private Sailing at Sunrise',
      category: 'Premium',
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
    'tour-pontoon': {
      id: 'tour-pontoon',
      name: 'Family Pontoon Loop',
      category: 'Group',
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
    'tour-kayak': {
      id: 'tour-kayak',
      name: 'Guided Mangrove Kayak',
      category: 'Adventure',
      durationHours: 2,
      priceFrom: 680,
      description:
        'A lighter, more active outing through calmer edges of the lagoon for travelers who want a nature-forward experience without committing a full day.',
      route: '/tours/tour-kayak',
    },
  },
  es: {
    'tour-sailing': {
      id: 'tour-sailing',
      name: 'Vela privada al amanecer',
      category: 'Premium',
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
    'tour-pontoon': {
      id: 'tour-pontoon',
      name: 'Recorrido familiar en ponton',
      category: 'Grupo',
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
    'tour-kayak': {
      id: 'tour-kayak',
      name: 'Kayak guiado por manglares',
      category: 'Aventura',
      durationHours: 2,
      priceFrom: 680,
      description:
        'Una salida mas ligera y activa por zonas tranquilas de la laguna para quienes quieren una experiencia cercana a la naturaleza sin ocupar todo el dia.',
      route: '/tours/tour-kayak',
    },
  },
}

export function getToursFixture(language: AppLanguage) {
  return toursByLanguage[language]
}

export function getTourDetailFixture(language: AppLanguage, id: string) {
  return tourDetailsByLanguage[language][id]
}
