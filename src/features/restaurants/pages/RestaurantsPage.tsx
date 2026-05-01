import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { RestaurantList } from '../components/RestaurantList'
import { useRestaurants } from '../hooks/useRestaurants'

export function RestaurantsPage() {
  const { data = [], isLoading } = useRestaurants()

  return (
    <section className={pageStyles.page}>
      <PageIntro
        eyebrow="Restaurants feature"
        title="Restaurant discovery"
        description="Shared cards and layout stay generic, while restaurant copy and queries remain feature-owned."
      />

      {isLoading ? (
        <p>Loading restaurants...</p>
      ) : (
        <RestaurantList restaurants={data} />
      )}
    </section>
  )
}
