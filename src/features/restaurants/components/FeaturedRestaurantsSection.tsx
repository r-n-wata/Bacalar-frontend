import { useTranslation } from 'react-i18next'
import { FeatureCard } from '../../../components/molecules/FeatureCard'
import type { Restaurant } from '../types/restaurant'
import styles from './FeaturedRestaurantsSection.module.scss'

type FeaturedRestaurantsSectionProps = {
  restaurants: Restaurant[]
}

export function FeaturedRestaurantsSection({
  restaurants,
}: FeaturedRestaurantsSectionProps) {
  const { t } = useTranslation()

  if (restaurants.length === 0) {
    return null
  }

  return (
    <section
      className={styles.section}
      aria-label={t('restaurants.featured.ariaLabel')}
    >
      <div className={styles.header}>
        <p className={styles.eyebrow}>{t('restaurants.featured.eyebrow')}</p>
        <h2>{t('restaurants.featured.title')}</h2>
        <p className={styles.description}>
          {t('restaurants.featured.description')}
        </p>
      </div>

      <div className={styles.scroller}>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className={styles.cardWrap}>
            <FeatureCard
              tag={t(`restaurants.categories.${restaurant.moment}`)}
              title={restaurant.name}
              description={restaurant.vibe}
              meta={`${restaurant.cuisine} - ${restaurant.priceBand}`}
              to={restaurant.route}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
