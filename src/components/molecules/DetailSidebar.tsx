import type { ReactNode } from 'react'
import { ContentPanel } from '../atoms/ContentPanel'
import styles from '../../styles/FeatureDetailPage.module.scss'

type DetailSidebarProps = {
  title?: string
  children: ReactNode
}

export function DetailSidebar({ title, children }: DetailSidebarProps) {
  return (
    <aside className={styles.sidebarColumn}>
      <ContentPanel className={styles.sidebarCard}>
        {title ? <h2 className={styles.sidebarTitle}>{title}</h2> : null}
        <div className={styles.sidebarStack}>{children}</div>
      </ContentPanel>
    </aside>
  )
}
