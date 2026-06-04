import styles from './LoadingSpinner.module.scss'

type LoadingSpinnerProps = {
  label: string
}

export function LoadingSpinner({ label }: LoadingSpinnerProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
    </div>
  )
}
