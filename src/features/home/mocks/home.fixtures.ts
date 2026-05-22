import type { AppLanguage } from '../../../app/i18n/config'
import type { HomeContent } from '../types/home-content'

const images = {
  hero: {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    alt: 'Turquoise water and white shoreline in Bacalar',
  },
  sailing: {
    src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sailboat gliding over bright lagoon water',
  },
  pontoon: {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    alt: 'Group enjoying a calm lagoon boat ride',
  },
  breakfast: {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sunlit breakfast table with tropical greenery',
  },
  lunch: {
    src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Relaxed restaurant terrace prepared for lunch',
  },
  dinner: {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Warm evening restaurant setting near the water',
  },
  jazz: {
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Live music performance during sunset',
  },
  market: {
    src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Colorful local market with food stalls',
  },
} as const

const homeByLanguage: Record<AppLanguage, HomeContent> = {
  en: {
    hero: {
      eyebrow: 'Bacalar, made simple',
      title: 'Start with the water, then layer in food and what is happening this week.',
      description:
        'A calmer homepage for both first-time visitors and returning travelers, with lagoon picks first and timely events only when they help.',
    },
    spotlight: {
      actions: [
        { key: 'tours', label: 'Tours' },
        { key: 'restaurants', label: 'Restaurants' },
        { key: 'events', label: 'Events' },
      ],
      entries: {
        tours: {
          title: 'Choose a lagoon experience with less second-guessing',
          description:
            'Compare a few high-confidence tour options first, then keep browsing if you want more range.',
          route: '/tours',
          cta: 'Browse tours',
          metrics: [
            { label: 'Best for', value: 'First planning step' },
            { label: 'Focus', value: 'Time + price' },
            { label: 'Mood', value: 'Lagoon first' },
          ],
          image: images.hero,
        },
        restaurants: {
          title: 'Match breakfast, lunch, and dinner to the shape of the day',
          description:
            'Restaurant picks should support the itinerary, not compete with it.',
          route: '/restaurants',
          cta: 'Browse restaurants',
          metrics: [
            { label: 'Best for', value: 'Meal planning' },
            { label: 'Focus', value: 'Cuisine + vibe' },
            { label: 'Mood', value: 'Easy choices' },
          ],
          image: images.breakfast,
        },
        events: {
          title: 'Use events as the timely extra, not the whole plan',
          description:
            'Give returning visitors something fresh while keeping the homepage calm for newcomers.',
          route: '/events',
          cta: 'Browse events',
          metrics: [
            { label: 'Best for', value: 'Returning visits' },
            { label: 'Focus', value: 'This week' },
            { label: 'Mood', value: 'Local texture' },
          ],
          image: images.jazz,
        },
      },
    },
    planningCallout: {
      eyebrow: 'How to use this page',
      title: 'A few strong options beat an overloaded travel homepage',
      description:
        'Pick the water plan first, pair it with the right meal, then add one timely event if it fits.',
      items: [
        'Start with one tour that sets the rhythm of the day.',
        'Use restaurants to support the itinerary, not distract from it.',
        'Treat events as selective upgrades for guests who want something current.',
      ],
    },
    featuredExperiences: {
      intro: {
        eyebrow: 'Top tours',
        title: 'A short list of lagoon experiences worth opening first',
        description:
          'Compact, confidence-building options for people who want to move quickly.',
      },
      items: [
        {
          id: 'tour-sailing',
          title: 'Private Sailing at Sunrise',
          description:
            'A premium first memory for travelers who want still water and soft morning light.',
          meta: '4 hours · From 2,100 MXN',
          route: '/tours/tour-sailing',
          image: images.sailing,
        },
        {
          id: 'tour-pontoon',
          title: 'Family Pontoon Loop',
          description:
            'A relaxed midday option for groups who want swimming and sightseeing without overplanning.',
          meta: '3 hours · From 1,450 MXN',
          route: '/tours/tour-pontoon',
          image: images.pontoon,
        },
        {
          id: 'tour-kayak',
          title: 'Guided Mangrove Kayak',
          description:
            'A quieter, active route for travelers who want something lighter and closer to nature.',
          meta: '2 hours · From 680 MXN',
          route: '/tours/tour-kayak',
        },
      ],
    },
    diningMoments: {
      intro: {
        eyebrow: 'Where to eat',
        title: 'Breakfast, lunch, and dinner that fit the pace of Bacalar',
        description:
          'Keep restaurant decisions short, visual, and easy to scan.',
      },
      items: [
        {
          id: 'rest-cielo',
          label: 'Breakfast',
          title: 'Cielo de Maiz',
          description: 'A garden breakfast stop before a lagoon morning.',
          meta: 'Vegetarian · $$',
          route: '/restaurants/rest-cielo',
          image: images.breakfast,
        },
        {
          id: 'rest-ixchel',
          label: 'Lunch',
          title: 'Ixchel Cocina',
          description: 'A casual local lunch that works well after a tour.',
          meta: 'Regional Mexican · $$',
          route: '/restaurants/rest-ixchel',
          image: images.lunch,
        },
        {
          id: 'rest-naao',
          label: 'Dinner',
          title: 'Nao',
          description:
            'A lagoon-facing dinner pick for the one more elevated meal of the trip.',
          meta: 'Seafood · $$$',
          route: '/restaurants/rest-naao',
          image: images.dinner,
        },
      ],
    },
    weeklyHappenings: {
      intro: {
        eyebrow: 'This week',
        title: 'Current events that add texture without crowding the page',
        description:
          'Fresh enough for repeat visitors, selective enough for everyone else.',
      },
      items: [
        {
          id: 'event-sunset-jazz',
          label: 'Friday evening',
          title: 'Sunset Jazz by the Lagoon',
          description:
            'A memorable evening add-on with very little planning overhead.',
          meta: 'Casa Laguna Deck · 7:00 PM',
          route: '/events/event-sunset-jazz',
          image: images.jazz,
        },
        {
          id: 'event-market-brunch',
          label: 'Saturday morning',
          title: 'Local Market Brunch Crawl',
          description:
            'A useful town morning for travelers who want one social food outing.',
          meta: 'Centro Bacalar · 10:30 AM',
          route: '/events/event-market-brunch',
          image: images.market,
        },
        {
          id: 'event-breathwork',
          label: 'Sunday sunrise',
          title: 'Lagoon Breathwork Session',
          description:
            'A quieter wellness option that leans into Bacalar calm.',
          meta: 'Isla Yoga Garden · 8:00 AM',
          route: '/events/event-breathwork',
        },
      ],
    },
  },
  es: {
    hero: {
      eyebrow: 'Bacalar, mas simple',
      title: 'Empieza por el agua y despues suma comida y lo que esta pasando esta semana.',
      description:
        'Una portada mas calmada para quienes vienen por primera vez y para quienes regresan, con picks de laguna al frente y eventos oportunos solo cuando ayudan.',
    },
    spotlight: {
      actions: [
        { key: 'tours', label: 'Tours' },
        { key: 'restaurants', label: 'Restaurantes' },
        { key: 'events', label: 'Eventos' },
      ],
      entries: {
        tours: {
          title: 'Elige una experiencia en la laguna con menos dudas',
          description:
            'Compara primero unas pocas opciones de alta confianza y sigue explorando solo si quieres mas variedad.',
          route: '/tours',
          cta: 'Ver tours',
          metrics: [
            { label: 'Ideal para', value: 'Primer paso' },
            { label: 'Enfoque', value: 'Tiempo y precio' },
            { label: 'Ambiente', value: 'Laguna primero' },
          ],
          image: {
            ...images.hero,
            alt: 'Agua turquesa y orilla clara en Bacalar',
          },
        },
        restaurants: {
          title: 'Haz que desayuno, almuerzo y cena acompanen el dia',
          description:
            'Los restaurantes deben apoyar el itinerario, no competir con el.',
          route: '/restaurants',
          cta: 'Ver restaurantes',
          metrics: [
            { label: 'Ideal para', value: 'Planear comidas' },
            { label: 'Enfoque', value: 'Cocina y ambiente' },
            { label: 'Ambiente', value: 'Elecciones faciles' },
          ],
          image: {
            ...images.breakfast,
            alt: 'Desayuno luminoso rodeado de vegetacion',
          },
        },
        events: {
          title: 'Usa los eventos como el extra oportuno, no como todo el plan',
          description:
            'Dale algo fresco a quien regresa sin volver caotica la portada para quien llega por primera vez.',
          route: '/events',
          cta: 'Ver eventos',
          metrics: [
            { label: 'Ideal para', value: 'Visitas repetidas' },
            { label: 'Enfoque', value: 'Esta semana' },
            { label: 'Ambiente', value: 'Textura local' },
          ],
          image: {
            ...images.jazz,
            alt: 'Musica en vivo al atardecer',
          },
        },
      },
    },
    planningCallout: {
      eyebrow: 'Como usar esta pagina',
      title: 'Unas pocas opciones fuertes funcionan mejor que una portada saturada',
      description:
        'Elige primero el plan de agua, acompanalo con la comida adecuada y agrega un evento solo si encaja.',
      items: [
        'Empieza con un tour que marque el ritmo del dia.',
        'Usa restaurantes para apoyar el itinerario, no para distraerlo.',
        'Trata los eventos como mejoras selectivas para quien quiere algo actual.',
      ],
    },
    featuredExperiences: {
      intro: {
        eyebrow: 'Tours top',
        title: 'Una lista corta de experiencias en la laguna que vale la pena abrir primero',
        description:
          'Opciones compactas y claras para avanzar rapido con confianza.',
      },
      items: [
        {
          id: 'tour-sailing',
          title: 'Vela privada al amanecer',
          description:
            'Un primer recuerdo premium para quienes buscan agua quieta y luz suave.',
          meta: '4 horas · Desde 2,100 MXN',
          route: '/tours/tour-sailing',
          image: {
            ...images.sailing,
            alt: 'Velero privado al amanecer',
          },
        },
        {
          id: 'tour-pontoon',
          title: 'Recorrido familiar en ponton',
          description:
            'Una opcion relajada al mediodia para grupos que quieren nadar y pasear sin planear demasiado.',
          meta: '3 horas · Desde 1,450 MXN',
          route: '/tours/tour-pontoon',
          image: {
            ...images.pontoon,
            alt: 'Paseo familiar en ponton sobre la laguna',
          },
        },
        {
          id: 'tour-kayak',
          title: 'Kayak guiado por manglares',
          description:
            'Una ruta mas tranquila y activa para quienes quieren algo ligero y cercano a la naturaleza.',
          meta: '2 horas · Desde 680 MXN',
          route: '/tours/tour-kayak',
        },
      ],
    },
    diningMoments: {
      intro: {
        eyebrow: 'Donde comer',
        title: 'Desayuno, almuerzo y cena con el ritmo correcto para Bacalar',
        description:
          'Haz que decidir restaurante sea corto, visual y facil de leer.',
      },
      items: [
        {
          id: 'rest-cielo',
          label: 'Desayuno',
          title: 'Cielo de Maiz',
          description: 'Una parada de desayuno en jardin antes de la manana de laguna.',
          meta: 'Vegetariano · $$',
          route: '/restaurants/rest-cielo',
          image: {
            ...images.breakfast,
            alt: 'Desayuno luminoso en jardin',
          },
        },
        {
          id: 'rest-ixchel',
          label: 'Almuerzo',
          title: 'Ixchel Cocina',
          description: 'Un almuerzo local y casual que funciona muy bien despues de un tour.',
          meta: 'Mexicana regional · $$',
          route: '/restaurants/rest-ixchel',
          image: {
            ...images.lunch,
            alt: 'Terraza casual para almorzar',
          },
        },
        {
          id: 'rest-naao',
          label: 'Cena',
          title: 'Nao',
          description:
            'Una cena frente a la laguna para esa comida mas especial del viaje.',
          meta: 'Mariscos · $$$',
          route: '/restaurants/rest-naao',
          image: {
            ...images.dinner,
            alt: 'Cena calida frente al agua',
          },
        },
      ],
    },
    weeklyHappenings: {
      intro: {
        eyebrow: 'Esta semana',
        title: 'Eventos actuales que suman textura sin saturar la pagina',
        description:
          'Lo bastante fresco para quien vuelve, lo bastante selectivo para todos.',
      },
      items: [
        {
          id: 'event-sunset-jazz',
          label: 'Viernes por la tarde',
          title: 'Jazz al atardecer junto a la laguna',
          description:
            'Un plan nocturno memorable con muy poca friccion para decidir.',
          meta: 'Terraza Casa Laguna · 7:00 PM',
          route: '/events/event-sunset-jazz',
          image: {
            ...images.jazz,
            alt: 'Jazz al atardecer junto a la laguna',
          },
        },
        {
          id: 'event-market-brunch',
          label: 'Sabado por la manana',
          title: 'Ruta de brunch por el mercado local',
          description:
            'Una manana util en el pueblo para quienes quieren una salida social alrededor de la comida.',
          meta: 'Centro Bacalar · 10:30 AM',
          route: '/events/event-market-brunch',
          image: {
            ...images.market,
            alt: 'Mercado local con comida y color',
          },
        },
        {
          id: 'event-breathwork',
          label: 'Domingo al amanecer',
          title: 'Sesion de respiracion frente a la laguna',
          description:
            'Una opcion de bienestar mas silenciosa que se apoya en la calma de Bacalar.',
          meta: 'Jardin Isla Yoga · 8:00 AM',
          route: '/events/event-breathwork',
        },
      ],
    },
  },
}

export function getHomeFixture(language: AppLanguage) {
  return homeByLanguage[language]
}
