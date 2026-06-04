import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { FeaturedRestaurantsSection } from '../components/FeaturedRestaurantsSection'
import { RestaurantCategoryNav } from '../components/RestaurantCategoryNav'
import { RestaurantList } from '../components/RestaurantList'
import { RestaurantSubmitCta } from '../components/RestaurantSubmitCta'
import { useRestaurants } from '../hooks/useRestaurants'
import type { RestaurantCategoryFilter } from '../types/restaurant'

export function RestaurantsPage() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] =
    useState<RestaurantCategoryFilter>('all')
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRestaurants(selectedCategory)
  const firstPage = data?.pages[0]
  const featuredItems = firstPage?.featuredItems ?? []
  const restaurants = data?.pages.flatMap((page) => page.items) ?? []
  const emptyTitle = t('restaurants.emptyTitle')
  const emptyDescription = t('restaurants.emptyDescription', {
    category: t(`restaurants.categories.${selectedCategory}`),
  })

  return (
    <section className={pageStyles.page}>
      {firstPage ? (
        <PageIntro
          eyebrow={firstPage.eyebrow}
          title={firstPage.title}
          description={firstPage.description}
        />
      ) : null}

      {!isLoading && !isError ? (
        <FeaturedRestaurantsSection restaurants={featuredItems} />
      ) : null}

      <RestaurantCategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {isLoading ? <LoadingSpinner label={t('restaurants.loading')} /> : null}
      {isError ? <p role="alert">{t('restaurants.error')}</p> : null}
      {restaurants.length > 0 && !isLoading && !isError ? (
        <RestaurantList
          restaurants={restaurants}
          hasMore={Boolean(hasNextPage)}
          isFetchingMore={isFetchingNextPage}
          onLoadMore={() => void fetchNextPage()}
        />
      ) : null}
      {!isLoading && !isError && restaurants.length === 0 ? (
        <div>
          <p>{emptyTitle}</p>
          <p>{emptyDescription}</p>
        </div>
      ) : null}

      <RestaurantSubmitCta />
    </section>
  )
}
