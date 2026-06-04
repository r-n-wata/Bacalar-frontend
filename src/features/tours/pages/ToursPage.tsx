import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { FeaturedToursSection } from '../components/FeaturedToursSection'
import { TourCategoryNav } from '../components/TourCategoryNav'
import { TourList } from '../components/TourList'
import { TourSubmitCta } from '../components/TourSubmitCta'
import { useTours } from '../hooks/useTours'
import type { TourCategoryFilter } from '../types/tour'

export function ToursPage() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] =
    useState<TourCategoryFilter>('all')
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTours(selectedCategory)
  const firstPage = data?.pages[0]
  const featuredItems = firstPage?.featuredItems ?? []
  const tours = data?.pages.flatMap((page) => page.items) ?? []
  const emptyTitle = t('tours.emptyTitle')
  const emptyDescription = t('tours.emptyDescription', {
    category: t(`tours.categories.${selectedCategory}`),
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

      {!isLoading && !isError ? <FeaturedToursSection tours={featuredItems} /> : null}

      <TourCategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {isLoading ? <LoadingSpinner label={t('tours.loading')} /> : null}
      {isError ? <p role="alert">{t('tours.error')}</p> : null}
      {tours.length > 0 && !isLoading && !isError ? (
        <TourList
          tours={tours}
          hasMore={Boolean(hasNextPage)}
          isFetchingMore={isFetchingNextPage}
          onLoadMore={() => void fetchNextPage()}
        />
      ) : null}
      {!isLoading && !isError && tours.length === 0 ? (
        <div>
          <p>{emptyTitle}</p>
          <p>{emptyDescription}</p>
        </div>
      ) : null}

      <TourSubmitCta />
    </section>
  )
}
