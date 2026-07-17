import type { ReactNode } from 'react'
import styles from '../../styles/FeatureDetailPage.module.scss'

type DetailSectionProps = {
  title: string
  children: ReactNode
}

export function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <section className={styles.detailSection}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}
