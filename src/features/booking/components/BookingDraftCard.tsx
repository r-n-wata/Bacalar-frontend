import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { TextInput } from '../../../components/atoms/TextInput'
import { FormField } from '../../../components/molecules/FormField'
import { GuestStepper } from '../../../components/molecules/GuestStepper'
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
    <ContentPanel className={styles.card}>
      <div className={styles.grid}>
        <FormField
          label="Travel date"
          hint="Choose the date you want to be on the lagoon."
        >
          <TextInput
            type="date"
            placeholder="Select your travel date"
            aria-label="Select your travel date"
            value={draft.travelDate}
            onChange={(event) => onTravelDateChange(event.target.value)}
          />
        </FormField>
        <FormField
          label="Guests"
          hint="Start with your expected party size and adjust if needed."
        >
          <GuestStepper
            value={draft.guests}
            onDecrement={onDecrementGuests}
            onIncrement={onIncrementGuests}
          />
        </FormField>
      </div>
      <p className={styles.copy}>
        Draft state stays in Zustand here because it is user-entered UI state,
        not API-owned data.
      </p>
    </ContentPanel>
  )
}
