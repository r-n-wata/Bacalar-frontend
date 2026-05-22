import type { AppLanguage } from '../../../app/i18n/config'
import type { EventDetail, EventsContent } from '../types/event'

const eventsByLanguage: Record<AppLanguage, EventsContent> = {
  en: {
    eyebrow: 'Events',
    title: 'See what feels current in Bacalar this week',
    description:
      'Use events as texture for the trip: a timely extra when the right night or morning opens up.',
    items: [
      {
        id: 'event-sunset-jazz',
        title: 'Sunset Jazz by the Lagoon',
        dateLabel: 'Friday, 7:00 PM',
        venue: 'Casa Laguna Deck',
        category: 'music',
        route: '/events/event-sunset-jazz',
      },
      {
        id: 'event-market-brunch',
        title: 'Local Market Brunch Crawl',
        dateLabel: 'Saturday, 10:30 AM',
        venue: 'Centro Bacalar',
        category: 'food',
        route: '/events/event-market-brunch',
      },
      {
        id: 'event-breathwork',
        title: 'Lagoon Breathwork Session',
        dateLabel: 'Sunday, 8:00 AM',
        venue: 'Isla Yoga Garden',
        category: 'wellness',
        route: '/events/event-breathwork',
      },
    ],
  },
  es: {
    eyebrow: 'Eventos',
    title: 'Mira que se siente vigente en Bacalar esta semana',
    description:
      'Usa los eventos como textura del viaje: un extra oportuno cuando aparece la noche o la manana correcta.',
    items: [
      {
        id: 'event-sunset-jazz',
        title: 'Jazz al atardecer junto a la laguna',
        dateLabel: 'Viernes, 7:00 PM',
        venue: 'Terraza Casa Laguna',
        category: 'music',
        route: '/events/event-sunset-jazz',
      },
      {
        id: 'event-market-brunch',
        title: 'Ruta de brunch por el mercado local',
        dateLabel: 'Sabado, 10:30 AM',
        venue: 'Centro de Bacalar',
        category: 'food',
        route: '/events/event-market-brunch',
      },
      {
        id: 'event-breathwork',
        title: 'Sesion de respiracion frente a la laguna',
        dateLabel: 'Domingo, 8:00 AM',
        venue: 'Jardin Isla Yoga',
        category: 'wellness',
        route: '/events/event-breathwork',
      },
    ],
  },
}

const eventDetailsByLanguage: Record<AppLanguage, Record<string, EventDetail>> = {
  en: {
    'event-sunset-jazz': {
      id: 'event-sunset-jazz',
      title: 'Sunset Jazz by the Lagoon',
      category: 'music',
      dateLabel: 'Friday, 7:00 PM',
      venue: 'Casa Laguna Deck',
      description:
        'An easy, high-reward evening add-on with live music, open air, and a sunset window that works especially well after a lighter afternoon.',
      route: '/events/event-sunset-jazz',
      image: {
        src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Live music performance during sunset',
      },
    },
    'event-market-brunch': {
      id: 'event-market-brunch',
      title: 'Local Market Brunch Crawl',
      category: 'food',
      dateLabel: 'Saturday, 10:30 AM',
      venue: 'Centro Bacalar',
      description:
        'A social daytime option for travelers who want to spend one morning in town and fold local flavors into the trip without a fixed formal meal.',
      route: '/events/event-market-brunch',
      image: {
        src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
        alt: 'Colorful local market with food stalls',
      },
    },
    'event-breathwork': {
      id: 'event-breathwork',
      title: 'Lagoon Breathwork Session',
      category: 'wellness',
      dateLabel: 'Sunday, 8:00 AM',
      venue: 'Isla Yoga Garden',
      description:
        'A softer sunrise plan that leans into Bacalar calm, ideal for visitors who want one restorative moment rather than another packed activity.',
      route: '/events/event-breathwork',
    },
  },
  es: {
    'event-sunset-jazz': {
      id: 'event-sunset-jazz',
      title: 'Jazz al atardecer junto a la laguna',
      category: 'music',
      dateLabel: 'Viernes, 7:00 PM',
      venue: 'Terraza Casa Laguna',
      description:
        'Un extra nocturno facil y muy rendidor con musica en vivo, aire libre y una ventana de atardecer que funciona especialmente bien despues de una tarde ligera.',
      route: '/events/event-sunset-jazz',
      image: {
        src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Musica en vivo al atardecer junto a la laguna',
      },
    },
    'event-market-brunch': {
      id: 'event-market-brunch',
      title: 'Ruta de brunch por el mercado local',
      category: 'food',
      dateLabel: 'Sabado, 10:30 AM',
      venue: 'Centro de Bacalar',
      description:
        'Una opcion social de dia para quienes quieren pasar una manana en el centro y sumar sabores locales al viaje sin una comida formal cerrada.',
      route: '/events/event-market-brunch',
      image: {
        src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
        alt: 'Mercado local lleno de color y puestos de comida',
      },
    },
    'event-breathwork': {
      id: 'event-breathwork',
      title: 'Sesion de respiracion frente a la laguna',
      category: 'wellness',
      dateLabel: 'Domingo, 8:00 AM',
      venue: 'Jardin Isla Yoga',
      description:
        'Un plan suave al amanecer que se apoya en la calma de Bacalar, ideal para quienes quieren un momento restaurador en vez de otra actividad cargada.',
      route: '/events/event-breathwork',
    },
  },
}

export function getEventsFixture(language: AppLanguage) {
  return eventsByLanguage[language]
}

export function getEventDetailFixture(language: AppLanguage, id: string) {
  return eventDetailsByLanguage[language][id]
}
