import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { EventList } from '../components/EventList'
import { useEvents } from '../hooks/useEvents'

export function EventsPage() {
  const { data = [], isLoading } = useEvents()

  return (
    <section className={pageStyles.page}>
      <PageIntro
        eyebrow="Events feature"
        title="Recent and upcoming events"
        description="This feature owns event queries, event-specific UI, and future filters without pushing server data into global state."
      />

      {isLoading ? <p>Loading events...</p> : <EventList events={data} />}
    </section>
  )
}
