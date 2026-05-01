import type { BookingDraft } from '../types/booking-draft'
import styles from './BookingDraftCard.module.scss'

type BookingDraftCardProps = {
  draft: BookingDraft
  onTravelDateChange: (travelDate: string) => void
  onIncrementGuests: () => void
  onDecrementGuests: () => void
}

export function BookingDraftCard({
  draft,
  onTravelDateChange,
  onIncrementGuests,
  onDecrementGuests,
}: BookingDraftCardProps) {
  return (
    <section className={styles.card}>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Travel date</span>
          <input
            className={styles.input}
            type="date"
            value={draft.travelDate}
            onChange={(event) => onTravelDateChange(event.target.value)}
          />
        </label>
        <div className={styles.field}>
          <span>Guests</span>
          <div className={styles.guestStepper}>
            <button
              className={styles.stepperButton}
              type="button"
              onClick={onDecrementGuests}
            >
              -
            </button>
            <strong>{draft.guests}</strong>
            <button
              className={styles.stepperButton}
              type="button"
              onClick={onIncrementGuests}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <p className={styles.copy}>
        Draft state stays in Zustand here because it is user-entered UI state,
        not API-owned data.
      </p>
    </section>
  )
}
