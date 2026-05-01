import { create } from 'zustand'
import type { BookingDraft } from '../types/booking-draft'

type BookingDraftState = {
  draft: BookingDraft
  setTravelDate: (travelDate: string) => void
  incrementGuests: () => void
  decrementGuests: () => void
}

const initialDraft: BookingDraft = {
  tourId: 'tour-sailing',
  travelDate: '2026-05-12',
  guests: 2,
}

export const useBookingDraftStore = create<BookingDraftState>((set) => ({
  draft: initialDraft,
  setTravelDate: (travelDate) =>
    set((state) => ({ draft: { ...state.draft, travelDate } })),
  incrementGuests: () =>
    set((state) => ({
      draft: { ...state.draft, guests: state.draft.guests + 1 },
    })),
  decrementGuests: () =>
    set((state) => ({
      draft: {
        ...state.draft,
        guests: Math.max(1, state.draft.guests - 1),
      },
    })),
}))
