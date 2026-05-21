import type { AppLanguage } from '../../../app/i18n/config'
import type { EventsContent } from '../types/event'

const eventsByLanguage: Record<AppLanguage, EventsContent> = {
  en: {
    eyebrow: 'Events feature',
    title: 'Recent and upcoming events',
    description:
      'This feature owns event queries, event-specific UI, and future filters without pushing server data into global state.',
    items: [
      {
        id: 'event-sunset-jazz',
        title: 'Sunset Jazz by the Lagoon',
        dateLabel: 'Friday, 7:00 PM',
        venue: 'Casa Laguna Deck',
        category: 'music',
      },
      {
        id: 'event-market-brunch',
        title: 'Local Market Brunch Crawl',
        dateLabel: 'Saturday, 10:30 AM',
        venue: 'Centro Bacalar',
        category: 'food',
      },
      {
        id: 'event-breathwork',
        title: 'Lagoon Breathwork Session',
        dateLabel: 'Sunday, 8:00 AM',
        venue: 'Isla Yoga Garden',
        category: 'wellness',
      },
    ],
  },
  es: {
    eyebrow: 'Funcionalidad de eventos',
    title: 'Eventos recientes y proximos',
    description:
      'Esta funcionalidad controla las consultas de eventos, la UI especifica del dominio y futuros filtros sin mover datos remotos al estado global.',
    items: [
      {
        id: 'event-sunset-jazz',
        title: 'Jazz al atardecer junto a la laguna',
        dateLabel: 'Viernes, 7:00 PM',
        venue: 'Terraza Casa Laguna',
        category: 'music',
      },
      {
        id: 'event-market-brunch',
        title: 'Ruta de brunch por el mercado local',
        dateLabel: 'Sabado, 10:30 AM',
        venue: 'Centro de Bacalar',
        category: 'food',
      },
      {
        id: 'event-breathwork',
        title: 'Sesion de respiracion frente a la laguna',
        dateLabel: 'Domingo, 8:00 AM',
        venue: 'Jardin Isla Yoga',
        category: 'wellness',
      },
    ],
  },
}

export function getEventsFixture(language: AppLanguage) {
  return eventsByLanguage[language]
}
