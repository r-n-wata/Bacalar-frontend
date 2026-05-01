import { ContentPanel } from '../atoms/ContentPanel'
import styles from './FeatureCard.module.scss'

type FeatureCardProps = {
  tag: string
  title: string
  description: string
  meta: string
}

export function FeatureCard({
  tag,
  title,
  description,
  meta,
}: FeatureCardProps) {
  return (
    <ContentPanel as="article" compact>
      <div className={styles.content}>
        <p className={styles.tag}>{tag}</p>
        <h3>{title}</h3>
        <p>{description}</p>
        <strong>{meta}</strong>
      </div>
    </ContentPanel>
  )
}
