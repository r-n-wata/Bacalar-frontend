import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { RestaurantList } from '../components/RestaurantList'
import { useRestaurants } from '../hooks/useRestaurants'

export function RestaurantsPage() {
  const { data = [], isLoading } = useRestaurants()

  return (
    <section className={pageStyles.page}>
      <div className={pageStyles.intro}>
        <SectionEyebrow>Restaurants feature</SectionEyebrow>
        <h1>Restaurant discovery</h1>
        <p className={pageStyles.copy}>
          Shared cards and layout stay generic, while restaurant copy and
          queries remain feature-owned.
        </p>
      </div>

      {isLoading ? (
        <p>Loading restaurants...</p>
      ) : (
        <RestaurantList restaurants={data} />
      )}
    </section>
  )
}
