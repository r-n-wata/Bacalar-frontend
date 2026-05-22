import { FeatureCard } from '../../../components/molecules/FeatureCard'
import type { Restaurant } from '../types/restaurant'
import cardStyles from '../../../styles/FeatureCards.module.scss'

type RestaurantListProps = {
  restaurants: Restaurant[]
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <div className={cardStyles.grid}>
      {restaurants.map((restaurant) => (
        <FeatureCard
          key={restaurant.id}
          tag={restaurant.cuisine}
          title={restaurant.name}
          description={restaurant.vibe}
          meta={restaurant.priceBand}
          to={restaurant.route}
        />
      ))}
    </div>
  )
}
