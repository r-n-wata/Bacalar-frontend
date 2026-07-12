import type { AriaRole, ElementType, ReactNode } from 'react'
import styles from './ContentPanel.module.scss'

type ContentPanelProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  tone?: 'default' | 'warm'
  compact?: boolean
  role?: AriaRole
}

export function ContentPanel({
  as: Component = 'section',
  children,
  className,
  tone = 'default',
  compact = false,
  role,
}: ContentPanelProps) {
  const classes = [
    styles.card,
    tone === 'warm' ? styles.warm : '',
    compact ? styles.compact : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} role={role}>
      {children}
    </Component>
  )
}
