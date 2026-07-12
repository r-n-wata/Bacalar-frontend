import { Link } from 'react-router-dom'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import type { HomeSuggestionCard } from '../types/home-content'
import styles from './HomePreviewCard.module.scss'

type HomePreviewCardProps = {
  item: HomeSuggestionCard
}

function getCardKind(route: string) {
  if (route.startsWith('/restaurants/')) {
    return 'restaurant' as const
  }

  if (route.startsWith('/events/')) {
    return 'event' as const
  }

  return 'tour' as const
}

export function HomePreviewCard({ item }: HomePreviewCardProps) {
  const image = resolveFeatureImage({
    kind: getCardKind(item.route),
    id: item.id,
    image: item.image,
    fallbackAlt: item.title,
  })

  return (
    <Link className={styles.card} to={item.route}>
      <div className={styles.media}>
        <img src={image.src} alt={image.alt} />
        <div className={styles.overlay} />
        <div className={styles.mediaRow}>
          {item.label ? <span className={styles.label}>{item.label}</span> : <span />}
          <span className={styles.utilityBadge} aria-hidden="true">
            +
          </span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.metaRow}>
          <span className={styles.kicker}>{item.subtitle}</span>
        </div>
        <strong>{item.title}</strong>
        <p className={styles.detail}>{item.description}</p>
        <span className={styles.meta}>{item.meta}</span>
      </div>
    </Link>
  )
}
