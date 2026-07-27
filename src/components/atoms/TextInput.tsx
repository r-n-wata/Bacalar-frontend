import { forwardRef, type InputHTMLAttributes } from 'react'
import styles from './TextInput.module.scss'

type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ className, ...props }, ref) {
    const classes = [styles.input, className ?? ''].filter(Boolean).join(' ')

    return <input ref={ref} className={classes} {...props} />
  },
)
