import { formatCurrency } from '../../../utils/formatCurrency'
import type { Tour } from '../types/tour'
import cardStyles from '../../../styles/FeatureCards.module.scss'

type TourListProps = {
  tours: Tour[]
}

export function TourList({ tours }: TourListProps) {
  return (
    <div className={cardStyles.grid}>
      {tours.map((tour) => (
        <article key={tour.id} className={cardStyles.card}>
          <p className={cardStyles.tag}>{tour.category}</p>
          <h3>{tour.name}</h3>
          <p>{tour.durationHours} hours on the water</p>
          <strong>From {formatCurrency(tour.priceFrom)}</strong>
        </article>
      ))}
    </div>
  )
}
