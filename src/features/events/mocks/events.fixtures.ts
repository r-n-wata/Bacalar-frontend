import type { AppLanguage } from '../../../app/i18n/config'
import type { Event } from '../types/event'

const eventsByLanguage: Record<AppLanguage, Event[]> = {
  en: [
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
  es: [
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
}

export function getEventsFixture(language: AppLanguage) {
  return eventsByLanguage[language]
}
