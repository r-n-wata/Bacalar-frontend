import { FeatureCard } from '../../../components/molecules/FeatureCard'
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
        <FeatureCard
          key={tour.id}
          tag={tour.category}
          title={tour.name}
          description={`${tour.durationHours} hours on the water`}
          meta={`From ${formatCurrency(tour.priceFrom)}`}
          to={tour.route}
        />
      ))}
    </div>
  )
}
