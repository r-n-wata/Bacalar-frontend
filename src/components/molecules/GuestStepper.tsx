import { Button } from '../atoms/Button'
import styles from './GuestStepper.module.scss'

type GuestStepperProps = {
  value: number
  onIncrement: () => void
  onDecrement: () => void
}

export function GuestStepper({
  value,
  onIncrement,
  onDecrement,
}: GuestStepperProps) {
  return (
    <div className={styles.stepper}>
      <Button variant="icon" aria-label="Decrease guests" onClick={onDecrement}>
        -
      </Button>
      <strong className={styles.value}>{value}</strong>
      <Button variant="icon" aria-label="Increase guests" onClick={onIncrement}>
        +
      </Button>
    </div>
  )
}
