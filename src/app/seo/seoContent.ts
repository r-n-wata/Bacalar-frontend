import type { AppLanguage } from '../i18n/config'

type StaticSeoEntry = {
  title: string
  description: string
}

type SeoContent = Record<
  AppLanguage,
  {
    home: StaticSeoEntry
    tours: StaticSeoEntry
    restaurants: StaticSeoEntry
    events: StaticSeoEntry
    tourSubmit: StaticSeoEntry
    restaurantSubmit: StaticSeoEntry
    eventSubmit: StaticSeoEntry
    adminLogin: StaticSeoEntry
    adminSubmissions: StaticSeoEntry
    adminContent: StaticSeoEntry
  }
>

export const seoContentByLanguage: SeoContent = {
  en: {
    home: {
      title: 'A calmer way to experience Bacalar',
      description:
        'Curated recommendations for visitors who want less noise and better choices in Bacalar.',
    },
    tours: {
      title: 'Discover the best lagoon tours in Bacalar',
      description:
        'Browse trusted lagoon experiences in Bacalar for every type of trip, from premium sails to easy group outings.',
    },
    restaurants: {
      title: 'Where to eat in Bacalar',
      description:
        "From breakfast by the lagoon to relaxed dinners, explore Bacalar restaurants we've selected as worth visiting.",
    },
    events: {
      title: 'Events happening this week',
      description:
        'Discover Bacalar events this week, including music, food and wellness experiences worth adding to your itinerary.',
    },
    tourSubmit: {
      title: 'Submit a tour in Bacalar',
      description:
        'Share a Bacalar tour for editorial review before it is considered for the guide.',
    },
    restaurantSubmit: {
      title: 'Submit a restaurant in Bacalar',
      description:
        'Share a Bacalar restaurant for editorial review before it is considered for the guide.',
    },
    eventSubmit: {
      title: 'Submit an event in Bacalar',
      description:
        'Share a Bacalar event for editorial review before it is considered for publication.',
    },
    adminLogin: {
      title: 'Admin login',
      description: 'Private access for guide editors.',
    },
    adminSubmissions: {
      title: 'Submission review',
      description: 'Private editorial queue for reviewing submissions.',
    },
    adminContent: {
      title: 'Featured content management',
      description: 'Private editorial tools for managing featured guide content.',
    },
  },
  es: {
    home: {
      title: 'Una forma mas tranquila de vivir Bacalar',
      description:
        'Recomendaciones curadas para visitantes que quieren menos ruido y mejores decisiones en Bacalar.',
    },
    tours: {
      title: 'Descubre los mejores tours por la laguna en Bacalar',
      description:
        'Explora experiencias confiables en la laguna de Bacalar para todo tipo de viaje, desde opciones premium hasta salidas en grupo.',
    },
    restaurants: {
      title: 'Donde comer en Bacalar',
      description:
        'Desde desayunos junto a la laguna hasta cenas relajadas, explora restaurantes en Bacalar que vale la pena visitar.',
    },
    events: {
      title: 'Eventos de esta semana',
      description:
        'Descubre eventos en Bacalar esta semana, con planes de musica, comida y bienestar para sumar al itinerario.',
    },
    tourSubmit: {
      title: 'Enviar un tour en Bacalar',
      description:
        'Comparte un tour en Bacalar para revision editorial antes de considerarlo para la guia.',
    },
    restaurantSubmit: {
      title: 'Enviar un restaurante en Bacalar',
      description:
        'Comparte un restaurante en Bacalar para revision editorial antes de considerarlo para la guia.',
    },
    eventSubmit: {
      title: 'Enviar un evento en Bacalar',
      description:
        'Comparte un evento en Bacalar para revision editorial antes de considerarlo para publicacion.',
    },
    adminLogin: {
      title: 'Acceso administrativo',
      description: 'Acceso privado para el equipo editorial.',
    },
    adminSubmissions: {
      title: 'Revision de envios',
      description: 'Cola editorial privada para revisar envios.',
    },
    adminContent: {
      title: 'Gestion de contenido destacado',
      description: 'Herramientas editoriales privadas para gestionar contenido destacado.',
    },
  },
}
