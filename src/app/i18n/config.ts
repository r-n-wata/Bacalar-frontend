import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const resources = {
  en: {
    translation: {
      shell: {
        brandKicker: 'Bacalar',
        brandTitle: 'Plan your lagoon stay with confidence',
        summary:
          'Discover stays, food, tours, and timely local picks built around the colors and calm of Bacalar.',
        startExploring: 'Start exploring',
        menu: 'Menu',
        footer: {
          brandTitle: 'Bacalar',
          brandCopy:
            'Curated lagoon experiences, food, and timely local plans for a calmer Bacalar trip.',
          navTitle: 'Explore',
          supportTitle: 'Plan with confidence',
          location: 'Bacalar, Quintana Roo',
          contact: 'Planning support available daily',
          legal: 'Curated Bacalar guide for browsing and trip planning.',
        },
        languageLabel: 'Language',
        nav: {
          overview: 'Overview',
          events: 'Events',
          restaurants: 'Restaurants',
          tours: 'Tours',
        },
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong. Please try again.',
      },
      home: {
        loading: 'Loading homepage...',
        error: 'We could not load the homepage right now. Please try again.',
        spotlightEyebrow: 'Browse quickly',
        spotlightTitle: 'Pick the next right move',
        spotlightDescription:
          'A compact way to shift between lagoon plans, food, and timely local updates.',
        toursCta: 'See all tours',
        restaurantsCta: 'See all restaurants',
        eventsCta: 'See all events',
      },
      events: {
        loading: 'Loading events...',
        error:
          'We could not load events right now. Please refresh or try another language.',
        detailEyebrow: 'Featured event',
        backToList: 'See all events',
        backHome: 'Back to homepage',
        meta: {
          when: 'When',
          where: 'Where',
          type: 'Type',
        },
      },
      restaurants: {
        loading: 'Loading restaurants...',
        detailEyebrow: 'Featured restaurant',
        backToList: 'See all restaurants',
        backHome: 'Back to homepage',
        meta: {
          cuisine: 'Cuisine',
          vibe: 'Vibe',
          price: 'Price',
        },
      },
      tours: {
        loading: 'Loading tours...',
        detailEyebrow: 'Featured tour',
        backToList: 'See all tours',
        backHome: 'Back to homepage',
        hours_one: '{{count}} hour on the water',
        hours_other: '{{count}} hours on the water',
        meta: {
          category: 'Category',
          duration: 'Duration',
          price: 'Starting from',
        },
      },
    },
  },
  es: {
    translation: {
      shell: {
        brandKicker: 'Bacalar',
        brandTitle: 'Planea tu estancia en la laguna con confianza',
        summary:
          'Descubre hospedajes, comida, tours y planes locales pensados alrededor del color y la calma de Bacalar.',
        startExploring: 'Comenzar a explorar',
        menu: 'Menu',
        footer: {
          brandTitle: 'Bacalar',
          brandCopy:
            'Experiencias curadas de laguna, comida y planes locales para un viaje a Bacalar mas claro.',
          navTitle: 'Explorar',
          supportTitle: 'Planea con confianza',
          location: 'Bacalar, Quintana Roo',
          contact: 'Apoyo de planeacion disponible todos los dias',
          legal: 'Guia curada de Bacalar para explorar y planear el viaje.',
        },
        languageLabel: 'Idioma',
        nav: {
          overview: 'Inicio',
          events: 'Eventos',
          restaurants: 'Restaurantes',
          tours: 'Tours',
        },
      },
      common: {
        loading: 'Cargando...',
        error: 'Algo salio mal. Intentalo de nuevo.',
      },
      home: {
        loading: 'Cargando inicio...',
        error:
          'No pudimos cargar la pagina principal en este momento. Intentalo de nuevo.',
        spotlightEyebrow: 'Explora rapido',
        spotlightTitle: 'Elige el siguiente mejor paso',
        spotlightDescription:
          'Una forma compacta de cambiar entre laguna, comida y planes locales del momento.',
        toursCta: 'Ver todos los tours',
        restaurantsCta: 'Ver todos los restaurantes',
        eventsCta: 'Ver todos los eventos',
      },
      events: {
        loading: 'Cargando eventos...',
        error:
          'No pudimos cargar los eventos en este momento. Actualiza o prueba otro idioma.',
        detailEyebrow: 'Evento destacado',
        backToList: 'Ver todos los eventos',
        backHome: 'Volver a inicio',
        meta: {
          when: 'Cuando',
          where: 'Donde',
          type: 'Tipo',
        },
      },
      restaurants: {
        loading: 'Cargando restaurantes...',
        detailEyebrow: 'Restaurante destacado',
        backToList: 'Ver todos los restaurantes',
        backHome: 'Volver a inicio',
        meta: {
          cuisine: 'Cocina',
          vibe: 'Ambiente',
          price: 'Precio',
        },
      },
      tours: {
        loading: 'Cargando tours...',
        detailEyebrow: 'Tour destacado',
        backToList: 'Ver todos los tours',
        backHome: 'Volver a inicio',
        hours_one: '{{count}} hora en el agua',
        hours_other: '{{count}} horas en el agua',
        meta: {
          category: 'Categoria',
          duration: 'Duracion',
          price: 'Desde',
        },
      },
    },
  },
} as const

export type AppLanguage = keyof typeof resources

export const defaultLanguage: AppLanguage = 'en'

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  })
}

export default i18n
