import type { ExperienceKey } from '../../app/store/ui-store'
import { Button } from '../atoms/Button'
import { ContentPanel } from '../atoms/ContentPanel'
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
    <ContentPanel className={styles.card}>
      <div className={styles.copy}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className={styles.actions}>
        {actions.map((action) => (
          <Button
            key={action.key}
            variant={action.key === selectedAction ? 'chipActive' : 'chip'}
            onClick={() => onSelectAction(action.key)}
          >
            {action.label}
          </Button>
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
    </ContentPanel>
  )
}
