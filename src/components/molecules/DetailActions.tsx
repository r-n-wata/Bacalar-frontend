import { Link } from 'react-router-dom'
import styles from '../../styles/FeatureDetailPage.module.scss'

type DetailAction =
  | {
      label: string
      to: string
      variant?: 'primary' | 'secondary' | 'link'
    }
  | {
      label: string
      href: string
      variant?: 'primary' | 'secondary' | 'link'
    }

type DetailActionsProps = {
  actions: DetailAction[]
  compact?: boolean
}

export function DetailActions({
  actions,
  compact = false,
}: DetailActionsProps) {
  if (actions.length === 0) {
    return null
  }

  return (
    <div className={compact ? styles.actionsCompact : styles.actions}>
      {actions.map((action) => {
        const className =
          action.variant === 'link'
            ? styles.textLinkAction
            : action.variant === 'secondary'
              ? styles.secondaryAction
              : styles.primaryAction

        if ('to' in action) {
          return (
            <Link
              key={`${action.label}-${action.to}`}
              className={className}
              to={action.to}
            >
              {action.label}
            </Link>
          )
        }

        return (
          <a
            key={`${action.label}-${action.href}`}
            className={className}
            href={action.href}
            target="_blank"
            rel="noreferrer"
          >
            {action.label}
          </a>
        )
      })}
    </div>
  )
}
