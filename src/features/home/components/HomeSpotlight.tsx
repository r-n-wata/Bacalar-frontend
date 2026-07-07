import { Link } from 'react-router-dom'
import { Button } from '../../../components/atoms/Button'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { MetricBadge } from '../../../components/molecules/MetricBadge'
import type { TourKey } from '../../../app/store/ui-store'
import type {
  HomeSpotlightAction,
  HomeSpotlightEntry,
} from '../types/home-content'
import styles from './HomeSpotlight.module.scss'

type HomeSpotlightProps = {
  eyebrow: string
  title: string
  description: string
  actions: HomeSpotlightAction[]
  entry: HomeSpotlightEntry
  selectedAction: TourKey
  onSelectAction: (tour: TourKey) => void
}

export function HomeSpotlight({
  eyebrow,
  title,
  description,
  actions,
  entry,
  selectedAction,
  onSelectAction,
}: HomeSpotlightProps) {
  return (
    <section className={styles.grid}>
      <ContentPanel className={styles.copyCard}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.actionRow}>
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

        <div className={styles.entryCopy}>
          <h3>{entry.title}</h3>
          <p>{entry.description}</p>
        </div>

        <div className={styles.metrics}>
          {entry.metrics.map((metric) => (
            <MetricBadge
              key={`${metric.label}-${metric.value}`}
              label={metric.label}
              value={metric.value}
            />
          ))}
        </div>

        <Link className={styles.primaryLink} to={entry.route}>
          {entry.cta}
        </Link>
      </ContentPanel>

      <article className={styles.visualCard}>
        {entry.image ? (
          <img
            className={styles.image}
            src={entry.image.src}
            alt={entry.image.alt}
          />
        ) : null}
        <div className={styles.overlay} />
      </article>
    </section>
  )
}
