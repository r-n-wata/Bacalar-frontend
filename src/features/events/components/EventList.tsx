import { FeatureCard } from '../../../components/molecules/FeatureCard'
import type { Event } from '../types/event'
import cardStyles from '../../../styles/FeatureCards.module.scss'

type EventListProps = {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
  return (
    <div className={cardStyles.grid}>
      {events.map((event) => (
        <FeatureCard
          key={event.id}
          tag={event.category}
          title={event.title}
          description={event.venue}
          meta={event.dateLabel}
        />
      ))}
    </div>
  )
}
