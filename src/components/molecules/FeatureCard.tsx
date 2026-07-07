import { Link } from 'react-router-dom'
import { ContentPanel } from '../atoms/ContentPanel'
import styles from './FeatureCard.module.scss'

type FeatureCardProps = {
  tag: string
  title: string
  description: string
  meta: string
  secondaryMeta?: string
  to?: string
  image?: {
    src: string
    alt: string
  }
  placeholderLabel?: string
}

export function FeatureCard({
  tag,
  title,
  description,
  meta,
  secondaryMeta,
  to,
  image,
  placeholderLabel,
}: FeatureCardProps) {
  const card = (
    <ContentPanel as="article" compact>
      {image ? (
        <div className={styles.media}>
          <img src={image.src} alt={image.alt} />
        </div>
      ) : (
        <div className={styles.mediaFallback} aria-hidden="true">
          <span>{placeholderLabel ?? tag}</span>
        </div>
      )}
      <div className={styles.content}>
        <p className={styles.tag}>{tag}</p>
        <h3>{title}</h3>
        <p>{description}</p>
        {secondaryMeta ? <p>{secondaryMeta}</p> : null}
        <strong>{meta}</strong>
      </div>
    </ContentPanel>
  )

  if (!to) {
    return card
  }

  return (
    <Link className={styles.cardLink} to={to}>
      {card}
    </Link>
  )
}
