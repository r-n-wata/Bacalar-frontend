import type { Restaurant } from '../types/restaurant'
import cardStyles from '../../../styles/FeatureCards.module.scss'

type RestaurantListProps = {
  restaurants: Restaurant[]
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <div className={cardStyles.grid}>
      {restaurants.map((restaurant) => (
        <article key={restaurant.id} className={cardStyles.card}>
          <p className={cardStyles.tag}>{restaurant.cuisine}</p>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.vibe}</p>
          <strong>{restaurant.priceBand}</strong>
        </article>
      ))}
    </div>
  )
}
