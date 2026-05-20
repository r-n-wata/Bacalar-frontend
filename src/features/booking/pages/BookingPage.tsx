import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { PageIntro } from '../../../components/molecules/PageIntro'
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
      <PageIntro
        eyebrow="Booking feature"
        title="Booking flow foundation"
        description="This slice demonstrates the split from the architecture document: server-driven checklist data in React Query, user draft input in Zustand."
      />

      <BookingDraftCard
        draft={draft}
        onTravelDateChange={setTravelDate}
        onIncrementGuests={incrementGuests}
        onDecrementGuests={decrementGuests}
      />

      <ContentPanel className={pageStyles.calloutCard}>
        <PageIntro
          eyebrow="Next workflow steps"
          title="Ready for confirmation"
          description="These next steps stay close to the booking flow so API-backed checklist updates and local draft state stay easy to reason about."
          compact
        />
        <ul className={pageStyles.plainList}>
          {data.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      </ContentPanel>
    </section>
  )
}
