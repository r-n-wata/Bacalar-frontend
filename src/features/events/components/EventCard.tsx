import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import type { Event } from '../types/event'
import { getMoodTranslationKey } from '../lib/presentation'
import styles from './EventCard.module.scss'

type EventCardProps = {
  event: Event
  featured?: boolean
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const { t } = useTranslation()
  const panelClassName = featured
    ? `${styles.card} ${styles.featuredCard}`
    : styles.card

  return (
    <Link className={styles.cardLink} to={event.route}>
      <ContentPanel as="article" compact className={panelClassName}>
        {event.image ? (
          <div className={styles.media}>
            <img src={event.image.src} alt={event.image.alt} />
          </div>
        ) : (
          <div className={styles.mediaFallback} aria-hidden="true">
            <span>{t(`events.categories.${event.category}`)}</span>
          </div>
        )}
        <div className={styles.topRow}>
          {featured ? (
            <span className={`${styles.pill} ${styles.featuredPill}`}>
              {t('events.badges.featured')}
            </span>
          ) : null}
          <span className={styles.pill}>{t(getMoodTranslationKey(event.category))}</span>
        </div>

        <div className={styles.content}>
          <h3>{event.title}</h3>
          <p className={styles.dateLabel}>{event.dateLabel}</p>
          <p className={styles.venue}>{event.venue}</p>
        </div>

        <div className={styles.metaRow}>
          <span>{t('events.badges.thisWeek')}</span>
          <span className={styles.typeLabel}>
            {t(`events.categories.${event.category}`)}
          </span>
        </div>
      </ContentPanel>
    </Link>
  )
}
