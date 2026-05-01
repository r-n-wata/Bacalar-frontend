import type { ExperienceKey } from '../../app/store/ui-store'
import { MetricBadge } from '../molecules/MetricBadge'
import styles from './ExperienceSpotlight.module.scss'

type ExperienceSpotlightProps = {
  title: string
  description: string
  metrics: Array<{ label: string; value: string }>
  actions: Array<{
    key: ExperienceKey
    label: string
  }>
  selectedAction: ExperienceKey
  onSelectAction: (experience: ExperienceKey) => void
}

export function ExperienceSpotlight({
  title,
  description,
  metrics,
  actions,
  selectedAction,
  onSelectAction,
}: ExperienceSpotlightProps) {
  return (
    <section className={styles.card}>
      <div className={styles.copy}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className={styles.actions}>
        {actions.map((action) => (
          <button
            key={action.key}
            type="button"
            className={
              action.key === selectedAction
                ? `${styles.chip} ${styles.chipActive}`
                : styles.chip
            }
            onClick={() => onSelectAction(action.key)}
          >
            {action.label}
          </button>
        ))}
      </div>
      <div className={styles.metrics}>
        {metrics.map((metric) => (
          <MetricBadge
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </div>
    </section>
  )
}
