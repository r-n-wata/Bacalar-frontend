import type { AppLanguage } from '../../../app/i18n/config'
import type {
  Event,
  EventCategoryFilter,
  EventDetail,
  EventsContent,
} from '../types/event'

type EventSeed = {
  item: Event
  detail: EventDetail
  isFeatured?: boolean
  featuredOrder?: number
}

const eventSeedsByLanguage: Record<AppLanguage, EventSeed[]> = {
  en: [
    {
      item: {
        id: 'event-sunset-jazz',
        title: 'Sunset Jazz by the Lagoon',
        dateLabel: 'Friday, 7:00 PM',
        venue: 'Casa Laguna Deck',
        category: 'music',
        startsAt: '2026-05-29T19:00:00-05:00',
        endsAt: '2026-05-29T21:00:00-05:00',
        route: '/events/event-sunset-jazz',
      },
      isFeatured: true,
      featuredOrder: 0,
      detail: {
        id: 'event-sunset-jazz',
        title: 'Sunset Jazz by the Lagoon',
        category: 'music',
        dateLabel: 'Friday, 7:00 PM',
        venue: 'Casa Laguna Deck',
        description:
          'An easy, high-reward evening add-on with live music, open air, and a sunset window that works especially well after a lighter afternoon.',
        startsAt: '2026-05-29T19:00:00-05:00',
        endsAt: '2026-05-29T21:00:00-05:00',
        route: '/events/event-sunset-jazz',
        image: {
          src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
          alt: 'Live music performance during sunset',
        },
      },
    },
    {
      item: {
        id: 'event-market-brunch',
        title: 'Local Market Brunch Crawl',
        dateLabel: 'Saturday, 10:30 AM',
        venue: 'Centro Bacalar',
        category: 'food',
        startsAt: '2026-05-30T10:30:00-05:00',
        endsAt: '2026-05-30T13:00:00-05:00',
        route: '/events/event-market-brunch',
      },
      isFeatured: true,
      featuredOrder: 1,
      detail: {
        id: 'event-market-brunch',
        title: 'Local Market Brunch Crawl',
        category: 'food',
        dateLabel: 'Saturday, 10:30 AM',
        venue: 'Centro Bacalar',
        description:
          'A social daytime option for travelers who want to spend one morning in town and fold local flavors into the trip without a fixed formal meal.',
        startsAt: '2026-05-30T10:30:00-05:00',
        endsAt: '2026-05-30T13:00:00-05:00',
        route: '/events/event-market-brunch',
        image: {
          src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
          alt: 'Colorful local market with food stalls',
        },
      },
    },
    {
      item: {
        id: 'event-breathwork',
        title: 'Lagoon Breathwork Session',
        dateLabel: 'Sunday, 8:00 AM',
        venue: 'Isla Yoga Garden',
        category: 'wellness',
        startsAt: '2026-05-31T08:00:00-05:00',
        endsAt: '2026-05-31T09:30:00-05:00',
        route: '/events/event-breathwork',
      },
      isFeatured: true,
      featuredOrder: 3,
      detail: {
        id: 'event-breathwork',
        title: 'Lagoon Breathwork Session',
        category: 'wellness',
        dateLabel: 'Sunday, 8:00 AM',
        venue: 'Isla Yoga Garden',
        description:
          'A softer sunrise plan that leans into Bacalar calm, ideal for visitors who want one restorative moment rather than another packed activity.',
        startsAt: '2026-05-31T08:00:00-05:00',
        endsAt: '2026-05-31T09:30:00-05:00',
        route: '/events/event-breathwork',
      },
    },
    {
      item: {
        id: 'event-rooftop-dj',
        title: 'Rooftop DJ Session',
        dateLabel: 'Saturday, 9:30 PM',
        venue: 'Mirador Azul',
        category: 'music',
        startsAt: '2026-05-30T21:30:00-05:00',
        endsAt: '2026-05-31T00:00:00-05:00',
        route: '/events/event-rooftop-dj',
      },
      isFeatured: true,
      featuredOrder: 2,
      detail: {
        id: 'event-rooftop-dj',
        title: 'Rooftop DJ Session',
        category: 'music',
        dateLabel: 'Saturday, 9:30 PM',
        venue: 'Mirador Azul',
        description:
          'A later-night music option for travelers who want one energetic window in town without committing the whole evening.',
        startsAt: '2026-05-30T21:30:00-05:00',
        endsAt: '2026-05-31T00:00:00-05:00',
        route: '/events/event-rooftop-dj',
      },
    },
    {
      item: {
        id: 'event-taco-walk',
        title: 'Lagoon Taco Walk',
        dateLabel: 'Sunday, 1:00 PM',
        venue: 'Centro Bacalar',
        category: 'food',
        startsAt: '2026-05-31T13:00:00-05:00',
        endsAt: '2026-05-31T15:00:00-05:00',
        route: '/events/event-taco-walk',
      },
      isFeatured: true,
      featuredOrder: 4,
      detail: {
        id: 'event-taco-walk',
        title: 'Lagoon Taco Walk',
        category: 'food',
        dateLabel: 'Sunday, 1:00 PM',
        venue: 'Centro Bacalar',
        description:
          'A casual food-led town loop that works well after a slower morning and keeps the logistics light.',
        startsAt: '2026-05-31T13:00:00-05:00',
        endsAt: '2026-05-31T15:00:00-05:00',
        route: '/events/event-taco-walk',
      },
    },
    {
      item: {
        id: 'event-paddle-meditation',
        title: 'Sunrise Paddle Meditation',
        dateLabel: 'Monday, 6:30 AM',
        venue: 'Laguna Launch Pier',
        category: 'wellness',
        startsAt: '2026-06-01T06:30:00-05:00',
        endsAt: '2026-06-01T08:00:00-05:00',
        route: '/events/event-paddle-meditation',
      },
      detail: {
        id: 'event-paddle-meditation',
        title: 'Sunrise Paddle Meditation',
        category: 'wellness',
        dateLabel: 'Monday, 6:30 AM',
        venue: 'Laguna Launch Pier',
        description:
          'A quieter, reset-style start for guests who want a guided wellness moment on the water.',
        startsAt: '2026-06-01T06:30:00-05:00',
        endsAt: '2026-06-01T08:00:00-05:00',
        route: '/events/event-paddle-meditation',
      },
    },
    {
      item: {
        id: 'event-courtyard-jam',
        title: 'Courtyard Vinyl Jam',
        dateLabel: 'New date to be announced',
        venue: 'Casa Centro Courtyard',
        category: 'music',
        route: '/events/event-courtyard-jam',
      },
      detail: {
        id: 'event-courtyard-jam',
        title: 'Courtyard Vinyl Jam',
        category: 'music',
        dateLabel: 'New date to be announced',
        venue: 'Casa Centro Courtyard',
        description:
          'A softer music pick that is still on the weekly radar, but without a locked timing window yet.',
        route: '/events/event-courtyard-jam',
      },
    },
    {
      item: {
        id: 'event-moon-cinema',
        title: 'Moonlight Cinema by the Water',
        dateLabel: 'Monday, 8:30 PM',
        venue: 'Lagoon Screen Lawn',
        category: 'music',
        startsAt: '2026-06-01T20:30:00-05:00',
        endsAt: '2026-06-01T22:30:00-05:00',
        route: '/events/event-moon-cinema',
      },
      detail: {
        id: 'event-moon-cinema',
        title: 'Moonlight Cinema by the Water',
        category: 'music',
        dateLabel: 'Monday, 8:30 PM',
        venue: 'Lagoon Screen Lawn',
        description:
          'An easy evening screening with a more relaxed social pace and a clean after-dinner time slot.',
        startsAt: '2026-06-01T20:30:00-05:00',
        endsAt: '2026-06-01T22:30:00-05:00',
        route: '/events/event-moon-cinema',
      },
    },
    {
      item: {
        id: 'event-ceviche-lab',
        title: 'Ceviche Lab Pop-Up',
        dateLabel: 'Tuesday, 2:00 PM',
        venue: 'Mercado Patio',
        category: 'food',
        startsAt: '2026-06-02T14:00:00-05:00',
        endsAt: '2026-06-02T16:00:00-05:00',
        route: '/events/event-ceviche-lab',
      },
      detail: {
        id: 'event-ceviche-lab',
        title: 'Ceviche Lab Pop-Up',
        category: 'food',
        dateLabel: 'Tuesday, 2:00 PM',
        venue: 'Mercado Patio',
        description:
          'A daytime tasting-style stop for travelers who want one food-forward plan without committing to a full dinner.',
        startsAt: '2026-06-02T14:00:00-05:00',
        endsAt: '2026-06-02T16:00:00-05:00',
        route: '/events/event-ceviche-lab',
      },
    },
    {
      item: {
        id: 'event-temazcal-breath',
        title: 'Temazcal Breath Circle',
        dateLabel: 'Wednesday, 6:00 PM',
        venue: 'Jardin Calmado',
        category: 'wellness',
        startsAt: '2026-06-03T18:00:00-05:00',
        endsAt: '2026-06-03T19:30:00-05:00',
        route: '/events/event-temazcal-breath',
      },
      detail: {
        id: 'event-temazcal-breath',
        title: 'Temazcal Breath Circle',
        category: 'wellness',
        dateLabel: 'Wednesday, 6:00 PM',
        venue: 'Jardin Calmado',
        description:
          'A guided reset option for visitors looking for one deeper wellness window before dinner.',
        startsAt: '2026-06-03T18:00:00-05:00',
        endsAt: '2026-06-03T19:30:00-05:00',
        route: '/events/event-temazcal-breath',
      },
    },
    {
      item: {
        id: 'event-salsa-night',
        title: 'Lagoon Salsa Night',
        dateLabel: 'Thursday, 8:00 PM',
        venue: 'Casa del Muelle',
        category: 'music',
        startsAt: '2026-06-04T20:00:00-05:00',
        endsAt: '2026-06-04T23:00:00-05:00',
        route: '/events/event-salsa-night',
      },
      detail: {
        id: 'event-salsa-night',
        title: 'Lagoon Salsa Night',
        category: 'music',
        dateLabel: 'Thursday, 8:00 PM',
        venue: 'Casa del Muelle',
        description:
          'A more energetic night option that still fits cleanly into a one-evening Bacalar plan.',
        startsAt: '2026-06-04T20:00:00-05:00',
        endsAt: '2026-06-04T23:00:00-05:00',
        route: '/events/event-salsa-night',
      },
    },
    {
      item: {
        id: 'event-cacao-soundbath',
        title: 'Cacao and Sound Bath',
        dateLabel: 'Friday, 5:30 PM',
        venue: 'Holistica Terraza',
        category: 'wellness',
        startsAt: '2026-06-05T17:30:00-05:00',
        endsAt: '2026-06-05T19:00:00-05:00',
        route: '/events/event-cacao-soundbath',
      },
      detail: {
        id: 'event-cacao-soundbath',
        title: 'Cacao and Sound Bath',
        category: 'wellness',
        dateLabel: 'Friday, 5:30 PM',
        venue: 'Holistica Terraza',
        description:
          'A slower sunset-adjacent wellness plan for travelers who want calm rather than another activity push.',
        startsAt: '2026-06-05T17:30:00-05:00',
        endsAt: '2026-06-05T19:00:00-05:00',
        route: '/events/event-cacao-soundbath',
      },
    },
  ],
  es: [
    {
      item: {
        id: 'event-sunset-jazz',
        title: 'Jazz al atardecer junto a la laguna',
        dateLabel: 'Viernes, 7:00 PM',
        venue: 'Terraza Casa Laguna',
        category: 'music',
        startsAt: '2026-05-29T19:00:00-05:00',
        endsAt: '2026-05-29T21:00:00-05:00',
        route: '/events/event-sunset-jazz',
      },
      isFeatured: true,
      featuredOrder: 0,
      detail: {
        id: 'event-sunset-jazz',
        title: 'Jazz al atardecer junto a la laguna',
        category: 'music',
        dateLabel: 'Viernes, 7:00 PM',
        venue: 'Terraza Casa Laguna',
        description:
          'Un extra nocturno facil y muy rendidor con musica en vivo, aire libre y una ventana de atardecer que funciona especialmente bien despues de una tarde ligera.',
        startsAt: '2026-05-29T19:00:00-05:00',
        endsAt: '2026-05-29T21:00:00-05:00',
        route: '/events/event-sunset-jazz',
        image: {
          src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
          alt: 'Musica en vivo al atardecer junto a la laguna',
        },
      },
    },
    {
      item: {
        id: 'event-market-brunch',
        title: 'Ruta de brunch por el mercado local',
        dateLabel: 'Sabado, 10:30 AM',
        venue: 'Centro de Bacalar',
        category: 'food',
        startsAt: '2026-05-30T10:30:00-05:00',
        endsAt: '2026-05-30T13:00:00-05:00',
        route: '/events/event-market-brunch',
      },
      isFeatured: true,
      featuredOrder: 1,
      detail: {
        id: 'event-market-brunch',
        title: 'Ruta de brunch por el mercado local',
        category: 'food',
        dateLabel: 'Sabado, 10:30 AM',
        venue: 'Centro de Bacalar',
        description:
          'Una opcion social de dia para quienes quieren pasar una manana en el centro y sumar sabores locales al viaje sin una comida formal cerrada.',
        startsAt: '2026-05-30T10:30:00-05:00',
        endsAt: '2026-05-30T13:00:00-05:00',
        route: '/events/event-market-brunch',
        image: {
          src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
          alt: 'Mercado local lleno de color y puestos de comida',
        },
      },
    },
    {
      item: {
        id: 'event-breathwork',
        title: 'Sesion de respiracion frente a la laguna',
        dateLabel: 'Domingo, 8:00 AM',
        venue: 'Jardin Isla Yoga',
        category: 'wellness',
        startsAt: '2026-05-31T08:00:00-05:00',
        endsAt: '2026-05-31T09:30:00-05:00',
        route: '/events/event-breathwork',
      },
      isFeatured: true,
      featuredOrder: 3,
      detail: {
        id: 'event-breathwork',
        title: 'Sesion de respiracion frente a la laguna',
        category: 'wellness',
        dateLabel: 'Domingo, 8:00 AM',
        venue: 'Jardin Isla Yoga',
        description:
          'Un plan suave al amanecer que se apoya en la calma de Bacalar, ideal para quienes quieren un momento restaurador en vez de otra actividad cargada.',
        startsAt: '2026-05-31T08:00:00-05:00',
        endsAt: '2026-05-31T09:30:00-05:00',
        route: '/events/event-breathwork',
      },
    },
    {
      item: {
        id: 'event-rooftop-dj',
        title: 'Sesion DJ en la azotea',
        dateLabel: 'Sabado, 9:30 PM',
        venue: 'Mirador Azul',
        category: 'music',
        startsAt: '2026-05-30T21:30:00-05:00',
        endsAt: '2026-05-31T00:00:00-05:00',
        route: '/events/event-rooftop-dj',
      },
      isFeatured: true,
      featuredOrder: 2,
      detail: {
        id: 'event-rooftop-dj',
        title: 'Sesion DJ en la azotea',
        category: 'music',
        dateLabel: 'Sabado, 9:30 PM',
        venue: 'Mirador Azul',
        description:
          'Una opcion musical mas nocturna para quienes quieren una sola ventana de energia en el centro sin entregar toda la noche.',
        startsAt: '2026-05-30T21:30:00-05:00',
        endsAt: '2026-05-31T00:00:00-05:00',
        route: '/events/event-rooftop-dj',
      },
    },
    {
      item: {
        id: 'event-taco-walk',
        title: 'Recorrido de tacos junto a la laguna',
        dateLabel: 'Domingo, 1:00 PM',
        venue: 'Centro de Bacalar',
        category: 'food',
        startsAt: '2026-05-31T13:00:00-05:00',
        endsAt: '2026-05-31T15:00:00-05:00',
        route: '/events/event-taco-walk',
      },
      isFeatured: true,
      featuredOrder: 4,
      detail: {
        id: 'event-taco-walk',
        title: 'Recorrido de tacos junto a la laguna',
        category: 'food',
        dateLabel: 'Domingo, 1:00 PM',
        venue: 'Centro de Bacalar',
        description:
          'Una vuelta casual centrada en comida que funciona bien despues de una manana lenta y mantiene la logistica ligera.',
        startsAt: '2026-05-31T13:00:00-05:00',
        endsAt: '2026-05-31T15:00:00-05:00',
        route: '/events/event-taco-walk',
      },
    },
    {
      item: {
        id: 'event-paddle-meditation',
        title: 'Meditacion al amanecer en paddle',
        dateLabel: 'Lunes, 6:30 AM',
        venue: 'Muelle Laguna Launch',
        category: 'wellness',
        startsAt: '2026-06-01T06:30:00-05:00',
        endsAt: '2026-06-01T08:00:00-05:00',
        route: '/events/event-paddle-meditation',
      },
      detail: {
        id: 'event-paddle-meditation',
        title: 'Meditacion al amanecer en paddle',
        category: 'wellness',
        dateLabel: 'Lunes, 6:30 AM',
        venue: 'Muelle Laguna Launch',
        description:
          'Un arranque mas tranquilo para quienes quieren un momento guiado de bienestar sobre el agua.',
        startsAt: '2026-06-01T06:30:00-05:00',
        endsAt: '2026-06-01T08:00:00-05:00',
        route: '/events/event-paddle-meditation',
      },
    },
    {
      item: {
        id: 'event-courtyard-jam',
        title: 'Sesion de vinilos en el patio',
        dateLabel: 'Nueva fecha por confirmar',
        venue: 'Patio Casa Centro',
        category: 'music',
        route: '/events/event-courtyard-jam',
      },
      detail: {
        id: 'event-courtyard-jam',
        title: 'Sesion de vinilos en el patio',
        category: 'music',
        dateLabel: 'Nueva fecha por confirmar',
        venue: 'Patio Casa Centro',
        description:
          'Una opcion musical mas suave que sigue en el radar de la semana, pero todavia sin horario cerrado.',
        route: '/events/event-courtyard-jam',
      },
    },
    {
      item: {
        id: 'event-moon-cinema',
        title: 'Cine a la luz de la luna junto al agua',
        dateLabel: 'Lunes, 8:30 PM',
        venue: 'Jardin Pantalla Laguna',
        category: 'music',
        startsAt: '2026-06-01T20:30:00-05:00',
        endsAt: '2026-06-01T22:30:00-05:00',
        route: '/events/event-moon-cinema',
      },
      detail: {
        id: 'event-moon-cinema',
        title: 'Cine a la luz de la luna junto al agua',
        category: 'music',
        dateLabel: 'Lunes, 8:30 PM',
        venue: 'Jardin Pantalla Laguna',
        description:
          'Una funcion facil de noche con un ritmo social mas relajado y un horario limpio despues de cenar.',
        startsAt: '2026-06-01T20:30:00-05:00',
        endsAt: '2026-06-01T22:30:00-05:00',
        route: '/events/event-moon-cinema',
      },
    },
    {
      item: {
        id: 'event-ceviche-lab',
        title: 'Pop-up laboratorio de ceviche',
        dateLabel: 'Martes, 2:00 PM',
        venue: 'Patio del mercado',
        category: 'food',
        startsAt: '2026-06-02T14:00:00-05:00',
        endsAt: '2026-06-02T16:00:00-05:00',
        route: '/events/event-ceviche-lab',
      },
      detail: {
        id: 'event-ceviche-lab',
        title: 'Pop-up laboratorio de ceviche',
        category: 'food',
        dateLabel: 'Martes, 2:00 PM',
        venue: 'Patio del mercado',
        description:
          'Una parada de dia pensada para quienes quieren un plan centrado en comida sin convertirlo en una cena completa.',
        startsAt: '2026-06-02T14:00:00-05:00',
        endsAt: '2026-06-02T16:00:00-05:00',
        route: '/events/event-ceviche-lab',
      },
    },
    {
      item: {
        id: 'event-temazcal-breath',
        title: 'Circulo de respiracion temazcal',
        dateLabel: 'Miercoles, 6:00 PM',
        venue: 'Jardin Calmado',
        category: 'wellness',
        startsAt: '2026-06-03T18:00:00-05:00',
        endsAt: '2026-06-03T19:30:00-05:00',
        route: '/events/event-temazcal-breath',
      },
      detail: {
        id: 'event-temazcal-breath',
        title: 'Circulo de respiracion temazcal',
        category: 'wellness',
        dateLabel: 'Miercoles, 6:00 PM',
        venue: 'Jardin Calmado',
        description:
          'Una opcion guiada de reset para quienes buscan una ventana de bienestar mas profunda antes de cenar.',
        startsAt: '2026-06-03T18:00:00-05:00',
        endsAt: '2026-06-03T19:30:00-05:00',
        route: '/events/event-temazcal-breath',
      },
    },
    {
      item: {
        id: 'event-salsa-night',
        title: 'Noche de salsa en la laguna',
        dateLabel: 'Jueves, 8:00 PM',
        venue: 'Casa del Muelle',
        category: 'music',
        startsAt: '2026-06-04T20:00:00-05:00',
        endsAt: '2026-06-04T23:00:00-05:00',
        route: '/events/event-salsa-night',
      },
      detail: {
        id: 'event-salsa-night',
        title: 'Noche de salsa en la laguna',
        category: 'music',
        dateLabel: 'Jueves, 8:00 PM',
        venue: 'Casa del Muelle',
        description:
          'Una opcion mas energetica de noche que aun cabe bien como un solo plan nocturno en Bacalar.',
        startsAt: '2026-06-04T20:00:00-05:00',
        endsAt: '2026-06-04T23:00:00-05:00',
        route: '/events/event-salsa-night',
      },
    },
    {
      item: {
        id: 'event-cacao-soundbath',
        title: 'Cacao y sound bath',
        dateLabel: 'Viernes, 5:30 PM',
        venue: 'Terraza Holistica',
        category: 'wellness',
        startsAt: '2026-06-05T17:30:00-05:00',
        endsAt: '2026-06-05T19:00:00-05:00',
        route: '/events/event-cacao-soundbath',
      },
      detail: {
        id: 'event-cacao-soundbath',
        title: 'Cacao y sound bath',
        category: 'wellness',
        dateLabel: 'Viernes, 5:30 PM',
        venue: 'Terraza Holistica',
        description:
          'Un plan de bienestar mas lento, cerca del atardecer, para quienes quieren calma en vez de otra actividad cargada.',
        startsAt: '2026-06-05T17:30:00-05:00',
        endsAt: '2026-06-05T19:00:00-05:00',
        route: '/events/event-cacao-soundbath',
      },
    },
  ],
}

const pageMetadataByLanguage = {
  en: {
    eyebrow: 'Events',
    title: 'Events happening this week',
    description:
      'Music, food and wellness events worth adding to your itinerary.',
  },
  es: {
    eyebrow: 'Eventos',
    title: 'Eventos de esta semana',
    description:
      'Eventos de musica, comida y bienestar que vale la pena sumar a tu itinerario.',
  },
} satisfies Record<AppLanguage, Pick<EventsContent, 'eyebrow' | 'title' | 'description'>>

const DEFAULT_PAGE_SIZE = 10



function compareStartsAt(left?: string, right?: string) {
  if (!left && !right) {
    return 0
  }

  if (!left) {
    return 1
  }

  if (!right) {
    return -1
  }

  return left.localeCompare(right)
}

function sortEvents(items: Event[]) {
  return [...items].sort((left, right) => {
    const startsAtComparison = compareStartsAt(left.startsAt, right.startsAt)

    if (startsAtComparison !== 0) {
      return startsAtComparison
    }

    return left.id.localeCompare(right.id)
  })
}

function getFilteredItems(
  language: AppLanguage,
  category: EventCategoryFilter = 'all',
) {
  const items = eventSeedsByLanguage[language]
    .filter((entry) => !entry.isFeatured)
    .map((entry) => entry.item)

  return sortEvents(
    category === 'all'
      ? items
      : items.filter((event) => event.category === category),
  )
}

function getFeaturedItems(
  language: AppLanguage,
  options?: {
    forceNoFeatured?: boolean
    featuredCount?: number
  },
) {
  if (options?.forceNoFeatured) {
    return []
  }

  return [...eventSeedsByLanguage[language]]
    .filter((entry) => entry.isFeatured)
    .sort((left, right) => {
      const featuredOrderComparison =
        (left.featuredOrder ?? Number.MAX_SAFE_INTEGER) -
        (right.featuredOrder ?? Number.MAX_SAFE_INTEGER)

      if (featuredOrderComparison !== 0) {
        return featuredOrderComparison
      }

      return left.item.id.localeCompare(right.item.id)
    })
    .slice(0, options?.featuredCount ?? 5)
    .map((entry) => entry.item)
}

export function getEventsFixture(
  language: AppLanguage,
  options?: {
    category?: EventCategoryFilter
    cursor?: string | null
    limit?: number
    forceEmpty?: boolean
    forceNoFeatured?: boolean
    featuredCount?: number
  },
): EventsContent {
  const pageSize = options?.limit ?? DEFAULT_PAGE_SIZE
  const content = pageMetadataByLanguage[language]
  const allItems = options?.forceEmpty
    ? []
    : getFilteredItems(language, options?.category)
  const featuredItems = getFeaturedItems(language, {
    forceNoFeatured: options?.forceNoFeatured,
    featuredCount: options?.featuredCount,
  })
  const startIndex = options?.cursor
    ? allItems.findIndex((event) => event.id === options.cursor) + 1
    : 0
  const safeStartIndex = startIndex > 0 ? startIndex : 0
  const items = allItems.slice(safeStartIndex, safeStartIndex + pageSize)
  const lastItem = items.at(-1)

  return {
    ...content,
    featuredItems,
    items,
    pagination: {
      hasMore: safeStartIndex + items.length < allItems.length,
      nextCursor:
        safeStartIndex + items.length < allItems.length && lastItem
          ? lastItem.id
          : null,
    },
  }
}

export function getEventDetailFixture(language: AppLanguage, id: string) {
  return eventSeedsByLanguage[language].find((entry) => entry.detail.id === id)?.detail
}
