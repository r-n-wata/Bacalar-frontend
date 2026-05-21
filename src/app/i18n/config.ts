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
          booking: 'Booking',
        },
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong. Please try again.',
      },
      home: {
        loading: 'Loading homepage...',
        error: 'We could not load the homepage right now. Please try again.',
      },
      events: {
        loading: 'Loading events...',
        error:
          'We could not load events right now. Please refresh or try another language.',
      },
      restaurants: {
        loading: 'Loading restaurants...',
      },
      tours: {
        loading: 'Loading tours...',
      },
      booking: {
        loading: 'Loading booking details...',
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
          booking: 'Reservas',
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
      },
      events: {
        loading: 'Cargando eventos...',
        error:
          'No pudimos cargar los eventos en este momento. Actualiza o prueba otro idioma.',
      },
      restaurants: {
        loading: 'Cargando restaurantes...',
      },
      tours: {
        loading: 'Cargando tours...',
      },
      booking: {
        loading: 'Cargando detalles de la reserva...',
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
