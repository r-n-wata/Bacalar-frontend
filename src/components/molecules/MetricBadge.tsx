import styles from './MetricBadge.module.scss'

type MetricBadgeProps = {
  label: string
  value: string
}

export function MetricBadge({ label, value }: MetricBadgeProps) {
  return (
    <div className={styles.badge}>
      <span className={styles.label}>{label}</span>
      <strong className={styles.value}>{value}</strong>
    </div>
  )
}
