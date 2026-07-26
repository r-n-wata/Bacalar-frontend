import { Link } from 'react-router-dom'
import { ContentPanel } from '../atoms/ContentPanel'
import { ResponsiveFeatureImage } from '../../features/shared/components/ResponsiveFeatureImage'
import type { ResolvedFeatureImage } from '../../features/shared/lib/featureImage'
import styles from './FeatureCard.module.scss'

type FeatureCardProps = {
  tag: string
  title: string
  description: string
  meta: string
  secondaryMeta?: string
  to?: string
  image?: ResolvedFeatureImage
  priorityImage?: boolean
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
  priorityImage = false,
  placeholderLabel,
}: FeatureCardProps) {
  const card = (
    <ContentPanel as="article" compact>
      {image ? (
        <div className={styles.media}>
          <ResponsiveFeatureImage image={image} priority={priorityImage} />
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
