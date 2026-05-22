import { Link } from 'react-router-dom'
import type { HomeSuggestionCard } from '../types/home-content'
import styles from './HomePreviewCard.module.scss'

type HomePreviewCardProps = {
  item: HomeSuggestionCard
}

export function HomePreviewCard({ item }: HomePreviewCardProps) {
  return (
    <Link className={styles.card} to={item.route}>
      {item.image ? (
        <div className={styles.media}>
          <img src={item.image.src} alt={item.image.alt} />
          <div className={styles.overlay} />
          <div className={styles.mediaRow}>
            {item.label ? <span className={styles.label}>{item.label}</span> : <span />}
            <span className={styles.utilityBadge} aria-hidden="true">
              +
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.mediaFallback} aria-hidden="true">
          <div className={styles.mediaRow}>
            {item.label ? <span className={styles.label}>{item.label}</span> : <span />}
            <span className={styles.utilityBadge}>+</span>
          </div>
        </div>
      )}
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
