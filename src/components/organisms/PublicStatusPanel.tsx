import type { AriaRole, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../atoms/Button'
import { ContentPanel } from '../atoms/ContentPanel'
import styles from './PublicStatusPanel.module.scss'

type PublicStatusAction =
  | {
      kind: 'link'
      label: string
      to: string
    }
  | {
      kind: 'button'
      label: string
      onClick: () => void
    }

type PublicStatusPanelProps = {
  eyebrow?: string
  title: string
  description: string
  actions?: PublicStatusAction[]
  tone?: 'default' | 'warm'
  compact?: boolean
  role?: AriaRole
  className?: string
  children?: ReactNode
}

export function PublicStatusPanel({
  eyebrow,
  title,
  description,
  actions = [],
  tone = 'warm',
  compact = false,
  role,
  className,
  children,
}: PublicStatusPanelProps) {
  return (
    <ContentPanel
      className={className}
      tone={tone}
      compact={compact}
      role={role}
    >
      <div className={compact ? `${styles.panel} ${styles.compact}` : styles.panel}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h2 className={compact ? `${styles.title} ${styles.compactTitle}` : styles.title}>
          {title}
        </h2>
        <p className={styles.description}>{description}</p>
        {actions.length > 0 ? (
          <div className={styles.actions}>
            {actions.map((action) =>
              action.kind === 'link' ? (
                <Link key={`${action.kind}:${action.to}`} className={styles.linkButton} to={action.to}>
                  {action.label}
                </Link>
              ) : (
                <Button
                  key={`${action.kind}:${action.label}`}
                  variant="accent"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ),
            )}
          </div>
        ) : null}
        {children}
      </div>
    </ContentPanel>
  )
}
