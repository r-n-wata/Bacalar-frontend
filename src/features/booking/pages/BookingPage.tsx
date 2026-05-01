import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { BookingDraftCard } from '../components/BookingDraftCard'
import { useBookingChecklist } from '../hooks/useBookingChecklist'
import { useBookingDraftStore } from '../store/bookingDraftStore'

export function BookingPage() {
  const draft = useBookingDraftStore((state) => state.draft)
  const setTravelDate = useBookingDraftStore((state) => state.setTravelDate)
  const incrementGuests = useBookingDraftStore(
    (state) => state.incrementGuests,
  )
  const decrementGuests = useBookingDraftStore(
    (state) => state.decrementGuests,
  )
  const { data = [] } = useBookingChecklist()

  return (
    <section className={pageStyles.page}>
      <div className={pageStyles.intro}>
        <SectionEyebrow>Booking feature</SectionEyebrow>
        <h1>Booking flow foundation</h1>
        <p className={pageStyles.copy}>
          This slice demonstrates the split from the architecture document:
          server-driven checklist data in React Query, user draft input in
          Zustand.
        </p>
      </div>

      <BookingDraftCard
        draft={draft}
        onTravelDateChange={setTravelDate}
        onIncrementGuests={incrementGuests}
        onDecrementGuests={decrementGuests}
      />

      <section className={pageStyles.calloutCard}>
        <SectionEyebrow>Next workflow steps</SectionEyebrow>
        <ul className={pageStyles.plainList}>
          {data.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      </section>
    </section>
  )
}
