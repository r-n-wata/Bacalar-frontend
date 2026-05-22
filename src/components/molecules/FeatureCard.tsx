import { Link } from 'react-router-dom'
import { ContentPanel } from '../atoms/ContentPanel'
import styles from './FeatureCard.module.scss'

type FeatureCardProps = {
  tag: string
  title: string
  description: string
  meta: string
  to?: string
}

export function FeatureCard({
  tag,
  title,
  description,
  meta,
  to,
}: FeatureCardProps) {
  const card = (
    <ContentPanel as="article" compact>
      <div className={styles.content}>
        <p className={styles.tag}>{tag}</p>
        <h3>{title}</h3>
        <p>{description}</p>
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
