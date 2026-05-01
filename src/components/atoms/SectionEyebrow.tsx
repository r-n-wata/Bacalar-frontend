import styles from './SectionEyebrow.module.scss'

type SectionEyebrowProps = {
  children: string
}

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return <span className={styles.eyebrow}>{children}</span>
}
