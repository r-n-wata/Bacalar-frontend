import { useTranslation } from 'react-i18next'
import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { RestaurantList } from '../components/RestaurantList'
import { useRestaurants } from '../hooks/useRestaurants'

export function RestaurantsPage() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useRestaurants()

  return (
    <section className={pageStyles.page}>
      {data ? (
        <PageIntro
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />
      ) : null}

      {isLoading ? <p>{t('restaurants.loading')}</p> : null}
      {isError ? <p role="alert">{t('common.error')}</p> : null}
      {data && !isLoading && !isError ? (
        <RestaurantList restaurants={data.items} />
      ) : null}
    </section>
  )
}
