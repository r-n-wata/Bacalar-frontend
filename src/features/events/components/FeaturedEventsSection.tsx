import { useTranslation } from 'react-i18next'
import type { Event } from '../types/event'
import { EventCard } from './EventCard'
import styles from './FeaturedEventsSection.module.scss'

type FeaturedEventsSectionProps = {
  events: Event[]
}

export function FeaturedEventsSection({ events }: FeaturedEventsSectionProps) {
  const { t } = useTranslation()

  if (events.length === 0) {
    return null
  }

  return (
    <section className={styles.section} aria-label={t('events.featured.ariaLabel')}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{t('events.featured.eyebrow')}</p>
        <h2>{t('events.featured.title')}</h2>
        <p className={styles.description}>{t('events.featured.description')}</p>
      </div>

      <div className={styles.scroller}>
        {events.map((event) => (
          <div key={event.id} className={styles.cardWrap}>
            <EventCard event={event} featured />
          </div>
        ))}
      </div>
    </section>
  )
}
