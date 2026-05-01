import type { Event } from '../types/event'
import cardStyles from '../../../styles/FeatureCards.module.scss'

type EventListProps = {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
  return (
    <div className={cardStyles.grid}>
      {events.map((event) => (
        <article key={event.id} className={cardStyles.card}>
          <p className={cardStyles.tag}>{event.category}</p>
          <h3>{event.title}</h3>
          <p>{event.venue}</p>
          <strong>{event.dateLabel}</strong>
        </article>
      ))}
    </div>
  )
}
