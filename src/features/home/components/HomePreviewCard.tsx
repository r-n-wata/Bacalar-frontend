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
        </div>
      ) : (
        <div className={styles.mediaFallback} aria-hidden="true" />
      )}
      <div className={styles.body}>
        {item.label ? <span className={styles.label}>{item.label}</span> : null}
        <strong>{item.title}</strong>
        <p>{item.description}</p>
        <span className={styles.meta}>{item.meta}</span>
      </div>
    </Link>
  )
}
