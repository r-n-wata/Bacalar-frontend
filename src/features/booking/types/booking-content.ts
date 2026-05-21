import type { BookingChecklistItem } from '../api/getBookingChecklist'

export type BookingContent = {
  eyebrow: string
  title: string
  description: string
  form: {
    travelDateLabel: string
    travelDateHint: string
    travelDatePlaceholder: string
    travelDateAriaLabel: string
    guestsLabel: string
    guestsHint: string
    draftCopy: string
  }
  nextSteps: {
    eyebrow: string
    title: string
    description: string
  }
  items: BookingChecklistItem[]
}
