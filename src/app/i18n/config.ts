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
        footer: 'Frontend foundation aligned to the feature-based architecture.',
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
        spotlightEyebrow: 'Start here',
        spotlightTitle: 'Pick the next right move',
        spotlightDescription:
          'A compact way to shift between lagoon plans, food, and timely local updates.',
        toursCta: 'See all tours',
        restaurantsCta: 'See all restaurants',
        eventsCta: 'See all events',
        planningEyebrow: 'Use it well',
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
        footer:
          'Base frontend alineada con la arquitectura orientada por funcionalidades.',
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
        spotlightEyebrow: 'Empieza aqui',
        spotlightTitle: 'Elige el siguiente mejor paso',
        spotlightDescription:
          'Una forma compacta de cambiar entre laguna, comida y planes locales del momento.',
        toursCta: 'Ver todos los tours',
        restaurantsCta: 'Ver todos los restaurantes',
        eventsCta: 'Ver todos los eventos',
        planningEyebrow: 'Como usarla',
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
