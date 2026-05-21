import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { TextInput } from '../../../components/atoms/TextInput'
import { FormField } from '../../../components/molecules/FormField'
import { GuestStepper } from '../../../components/molecules/GuestStepper'
import type { BookingContent } from '../types/booking-content'
import type { BookingDraft } from '../types/booking-draft'
import styles from './BookingDraftCard.module.scss'

type BookingDraftCardProps = {
  draft: BookingDraft
  content: BookingContent['form']
  onTravelDateChange: (travelDate: string) => void
  onIncrementGuests: () => void
  onDecrementGuests: () => void
}

export function BookingDraftCard({
  draft,
  content,
  onTravelDateChange,
  onIncrementGuests,
  onDecrementGuests,
}: BookingDraftCardProps) {
  return (
    <ContentPanel className={styles.card}>
      <div className={styles.grid}>
        <FormField
          label={content.travelDateLabel}
          hint={content.travelDateHint}
        >
          <TextInput
            type="date"
            placeholder={content.travelDatePlaceholder}
            aria-label={content.travelDateAriaLabel}
            value={draft.travelDate}
            onChange={(event) => onTravelDateChange(event.target.value)}
          />
        </FormField>
        <FormField
          label={content.guestsLabel}
          hint={content.guestsHint}
        >
          <GuestStepper
            value={draft.guests}
            onDecrement={onDecrementGuests}
            onIncrement={onIncrementGuests}
          />
        </FormField>
      </div>
      <p className={styles.copy}>{content.draftCopy}</p>
    </ContentPanel>
  )
}
