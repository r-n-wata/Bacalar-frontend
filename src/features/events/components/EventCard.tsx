import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { ResponsiveFeatureImage } from '../../shared/components/ResponsiveFeatureImage'
import type { Event } from '../types/event'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import { getMoodTranslationKey } from '../lib/presentation'
import styles from './EventCard.module.scss'

type EventCardProps = {
  event: Event
  featured?: boolean
  priorityImage?: boolean
}

export function EventCard({
  event,
  featured = false,
  priorityImage = false,
}: EventCardProps) {
  const { t } = useTranslation()
  const panelClassName = featured
    ? `${styles.card} ${styles.featuredCard}`
    : styles.card
  const image = resolveFeatureImage({
    kind: 'event',
    id: event.id,
    image: event.image,
    fallbackAlt: event.title,
  })

  return (
    <Link className={styles.cardLink} to={event.route}>
      <ContentPanel as="article" compact className={panelClassName}>
        <div className={styles.media}>
          <ResponsiveFeatureImage image={image} priority={priorityImage} />
        </div>
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
