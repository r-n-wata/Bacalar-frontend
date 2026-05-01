import type { ElementType, ReactNode } from 'react'
import styles from './ContentPanel.module.scss'

type ContentPanelProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  tone?: 'default' | 'warm'
  compact?: boolean
}

export function ContentPanel({
  as: Component = 'section',
  children,
  className,
  tone = 'default',
  compact = false,
}: ContentPanelProps) {
  const classes = [
    styles.card,
    tone === 'warm' ? styles.warm : '',
    compact ? styles.compact : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}
