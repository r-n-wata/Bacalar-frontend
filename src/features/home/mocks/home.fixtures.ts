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
      title: 'A calmer way to tour Bacalar',
      description:
        'Curated recommendations for visitors who want less noise and better choices.',
    },
    spotlight: {
      actions: [
        { key: 'tours', label: 'Tours' },
        { key: 'restaurants', label: 'Restaurants' },
        { key: 'events', label: 'Events' },
      ],
      entries: {
        tours: {
          title: 'Choose a lagoon tour with less second-guessing',
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

    featuredTours: {
      intro: {
        eyebrow: 'Top tours',
        title: 'Our favourite lagoon tours',
        description:
          'Trusted tours to help you make the most of your time on the lagoon.',
      },
      items: [
        {
          id: 'tour-sailing',
          title: 'Private Sailing at Sunrise',
          subtitle: 'Lagoon, Bacalar',
          description: 'Private crew, sunrise light, slower pace.',
          meta: '4 hours · From 2,100 MXN',
          route: '/tours/tour-sailing',
          image: images.sailing,
        },
        {
          id: 'tour-pontoon',
          title: 'Family Pontoon Loop',
          subtitle: 'South lagoon circuit',
          description: 'Easy group route with swim stops and shade.',
          meta: '3 hours · From 1,450 MXN',
          route: '/tours/tour-pontoon',
          image: images.pontoon,
        },
        {
          id: 'tour-kayak',
          title: 'Guided Mangrove Kayak',
          subtitle: 'Mangrove edge route',
          description: 'Lighter active outing, closer to nature.',
          meta: '2 hours · From 680 MXN',
          route: '/tours/tour-kayak',
        },
      ],
    },
    diningMoments: {
      intro: {
        eyebrow: 'Where to eat',
        title: 'Where to eat in Bacalar',
        description:
          'From breakfast by the lagoon to relaxed dinners, these are the places worth knowing.',
      },
      items: [
        {
          id: 'rest-cielo',
          label: 'Breakfast',
          title: 'Cielo de Maiz',
          subtitle: 'Garden breakfast spot',
          description: 'Quiet first meal before heading to the water.',
          meta: 'Vegetarian · $$',
          route: '/restaurants/rest-cielo',
          image: images.breakfast,
        },
        {
          id: 'rest-ixchel',
          label: 'Lunch',
          title: 'Ixchel Cocina',
          subtitle: 'Regional Mexican',
          description: 'Casual lunch stop after a morning tour.',
          meta: 'Regional Mexican · $$',
          route: '/restaurants/rest-ixchel',
          image: images.lunch,
        },
        {
          id: 'rest-naao',
          label: 'Dinner',
          title: 'Nao',
          subtitle: 'Lagoon-facing seafood',
          description: 'Stronger dinner pick when the day slows down.',
          meta: 'Seafood · $$$',
          route: '/restaurants/rest-naao',
          image: images.dinner,
        },
      ],
    },
    weeklyHappenings: {
      intro: {
        eyebrow: 'This week',
        title: "This week's events",
        description:
          'Just the events worth knowing about.',
      },
      items: [
        {
          id: 'event-sunset-jazz',
          label: 'Friday evening',
          title: 'Sunset Jazz by the Lagoon',
          subtitle: 'Casa Laguna Deck',
          description: 'Live music with an easy sunset time slot.',
          meta: 'Casa Laguna Deck · 7:00 PM',
          route: '/events/event-sunset-jazz',
          image: images.jazz,
        },
        {
          id: 'event-market-brunch',
          label: 'Saturday morning',
          title: 'Local Market Brunch Crawl',
          subtitle: 'Centro Bacalar',
          description: 'Town morning with food discovery and low effort.',
          meta: 'Centro Bacalar · 10:30 AM',
          route: '/events/event-market-brunch',
          image: images.market,
        },
        {
          id: 'event-breathwork',
          label: 'Sunday sunrise',
          title: 'Lagoon Breathwork Session',
          subtitle: 'Isla Yoga Garden',
          description: 'Restorative start for a quieter final morning.',
          meta: 'Isla Yoga Garden · 8:00 AM',
          route: '/events/event-breathwork',
        },
      ],
    },
  },
  es: {
    hero: {
      eyebrow: 'Bacalar, mas simple',
      title: 'Una forma mas tranquila de vivir Bacalar',
      description:
        'Recomendaciones curadas para visitantes que quieren menos ruido y mejores decisiones.',
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

    featuredTours: {
      intro: {
        eyebrow: 'Tours top',
        title: 'Nuestros tours favoritos por la laguna',
        description:
          'Experiencias confiables para aprovechar mejor tu tiempo en la laguna.',
      },
      items: [
        {
          id: 'tour-sailing',
          title: 'Vela privada al amanecer',
          subtitle: 'Laguna, Bacalar',
          description: 'Tripulacion privada, luz suave, ritmo lento.',
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
          subtitle: 'Circuito sur de la laguna',
          description: 'Ruta simple para grupos con paradas para nadar.',
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
          subtitle: 'Ruta junto al manglar',
          description: 'Salida activa y ligera, mas cerca de la naturaleza.',
          meta: '2 horas · Desde 680 MXN',
          route: '/tours/tour-kayak',
        },
      ],
    },
    diningMoments: {
      intro: {
        eyebrow: 'Donde comer',
        title: 'Donde comer en Bacalar',
        description:
          'Desde desayunos junto a la laguna hasta cenas relajadas, estos son los lugares que vale la pena conocer.',
      },
      items: [
        {
          id: 'rest-cielo',
          label: 'Desayuno',
          title: 'Cielo de Maiz',
          subtitle: 'Desayuno en jardin',
          description: 'Primera comida tranquila antes de ir al agua.',
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
          subtitle: 'Mexicana regional',
          description: 'Almuerzo casual para despues del tour.',
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
          subtitle: 'Mariscos frente a la laguna',
          description: 'Mejor opcion cuando el dia pide una cena fuerte.',
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
        title: 'Eventos de esta semana',
        description:
          'Solo los eventos que vale la pena conocer.',
      },
      items: [
        {
          id: 'event-sunset-jazz',
          label: 'Viernes por la tarde',
          title: 'Jazz al atardecer junto a la laguna',
          subtitle: 'Terraza Casa Laguna',
          description: 'Musica en vivo en una franja facil de sumar.',
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
          subtitle: 'Centro Bacalar',
          description: 'Manana social con comida y poco esfuerzo.',
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
          subtitle: 'Jardin Isla Yoga',
          description: 'Inicio restaurador para una manana mas tranquila.',
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
