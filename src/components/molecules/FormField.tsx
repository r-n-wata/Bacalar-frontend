import type { ReactNode } from 'react'
import styles from './FormField.module.scss'

type FormFieldProps = {
  label: string
  children: ReactNode
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      {children}
    </div>
  )
}
