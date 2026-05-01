import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { EventList } from '../components/EventList'
import { useEvents } from '../hooks/useEvents'

export function EventsPage() {
  const { data = [], isLoading } = useEvents()

  return (
    <section className={pageStyles.page}>
      <div className={pageStyles.intro}>
        <SectionEyebrow>Events feature</SectionEyebrow>
        <h1>Recent and upcoming events</h1>
        <p className={pageStyles.copy}>
          This feature owns event queries, event-specific UI, and future filters
          without pushing server data into global state.
        </p>
      </div>

      {isLoading ? <p>Loading events...</p> : <EventList events={data} />}
    </section>
  )
}
