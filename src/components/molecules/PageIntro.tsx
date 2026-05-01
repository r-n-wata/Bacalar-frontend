import { SectionEyebrow } from '../atoms/SectionEyebrow'
import styles from './PageIntro.module.scss'

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
  compact?: boolean
}

export function PageIntro({
  eyebrow,
  title,
  description,
  compact = false,
}: PageIntroProps) {
  return (
    <div className={styles.intro}>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h1
        className={
          compact
            ? `${styles.title} ${styles.compactTitle}`
            : styles.title
        }
      >
        {title}
      </h1>
      <p className={styles.copy}>{description}</p>
    </div>
  )
}
