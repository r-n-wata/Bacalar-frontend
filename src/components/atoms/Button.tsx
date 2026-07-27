import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import styles from './Button.module.scss'

type ButtonVariant =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'inverse'
  | 'chip'
  | 'chipActive'
  | 'icon'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    variant = 'secondary',
    fullWidth = false,
    type = 'button',
    ...props
  },
  ref,
) {
  const classes = [styles.button, styles[variant], fullWidth ? styles.fullWidth : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <button ref={ref} type={type} className={classes} {...props}>
      {children}
    </button>
  )
})
