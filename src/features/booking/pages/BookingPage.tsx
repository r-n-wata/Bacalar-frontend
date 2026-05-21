import { useTranslation } from 'react-i18next'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { BookingDraftCard } from '../components/BookingDraftCard'
import { useBookingChecklist } from '../hooks/useBookingChecklist'
import { useBookingDraftStore } from '../store/bookingDraftStore'

export function BookingPage() {
  const { t } = useTranslation()
  const draft = useBookingDraftStore((state) => state.draft)
  const setTravelDate = useBookingDraftStore((state) => state.setTravelDate)
  const incrementGuests = useBookingDraftStore(
    (state) => state.incrementGuests,
  )
  const decrementGuests = useBookingDraftStore(
    (state) => state.decrementGuests,
  )
  const { data, isLoading, isError } = useBookingChecklist()

  return (
    <section className={pageStyles.page}>
      {data ? (
        <PageIntro
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />
      ) : null}

      {isLoading ? <p>{t('booking.loading')}</p> : null}
      {isError ? <p role="alert">{t('common.error')}</p> : null}

      {data ? (
        <BookingDraftCard
          draft={draft}
          content={data.form}
          onTravelDateChange={setTravelDate}
          onIncrementGuests={incrementGuests}
          onDecrementGuests={decrementGuests}
        />
      ) : null}

      {data ? (
        <ContentPanel className={pageStyles.calloutCard}>
          <PageIntro
            eyebrow={data.nextSteps.eyebrow}
            title={data.nextSteps.title}
            description={data.nextSteps.description}
            compact
          />
          <ul className={pageStyles.plainList}>
            {data.items.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
        </ContentPanel>
      ) : null}
    </section>
  )
}
