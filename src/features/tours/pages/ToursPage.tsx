import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { seoContentByLanguage } from '../../../app/seo/seoContent'
import { buildCollectionPageStructuredData } from '../../../app/seo/structuredDataSchema'
import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import cardStyles from '../../../styles/FeatureCards.module.scss'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import { FeaturedToursSection } from '../components/FeaturedToursSection'
import { TourCategoryNav } from '../components/TourCategoryNav'
import { TourList } from '../components/TourList'
import { TourSubmitCta } from '../components/TourSubmitCta'
import { useTours } from '../hooks/useTours'
import type { TourCategory, TourCategoryFilter } from '../types/tour'

const FALLBACK_TOUR_CATEGORIES: TourCategory[] = ['premium', 'group', 'adventure']

function PageIntroPlaceholder() {
  return (
    <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', gap: '12px', minBlockSize: '188px' }}>
      <div className="sb-skeleton sb-skeleton-line" style={{ width: '120px', height: '16px' }} />
      <div className="sb-skeleton sb-skeleton-line" style={{ width: '68%', height: '52px' }} />
      <div className="sb-skeleton sb-skeleton-line" style={{ width: '84%', height: '18px' }} />
    </div>
  )
}

function ToursListPlaceholder() {
  return (
    <section aria-hidden="true">
      <div className={cardStyles.grid}>
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="sb-skeleton-panel">
            <div className="sb-skeleton" style={{ aspectRatio: '16 / 10', borderRadius: '24px 24px 18px 18px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '18px' }}>
              <div className="sb-skeleton sb-skeleton-line" style={{ width: '34%', height: '14px' }} />
              <div className="sb-skeleton sb-skeleton-line" style={{ width: '72%', height: '22px' }} />
              <div className="sb-skeleton sb-skeleton-line" style={{ width: '88%', height: '16px' }} />
              <div className="sb-skeleton sb-skeleton-line" style={{ width: '48%', height: '16px' }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ToursPage() {
  const { t, i18n } = useTranslation()
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
  const categories = firstPage?.categories ?? []
  const tours = data?.pages.flatMap((page) => page.items) ?? []
  const emptyTitle = t('tours.emptyTitle')
  const selectedCategoryLabel =
    selectedCategory === 'all'
      ? t('tours.categories.all')
      : selectedCategory
  const emptyDescription = t('tours.emptyDescription', {
    category: selectedCategoryLabel,
  })
  const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const fallbackSeo = seoContentByLanguage[language].tours
  const featuredSeoImage = featuredItems[0]
    ? resolveFeatureImage({
        kind: 'tour',
        id: featuredItems[0].id,
        image: featuredItems[0].image,
        fallbackAlt: featuredItems[0].name,
      }).src
    : undefined
  const seo = (
    <>
      <Seo
        title={firstPage?.title ?? fallbackSeo.title}
        description={firstPage?.description ?? fallbackSeo.description}
        image={featuredSeoImage}
      />
      <StructuredData
        data={buildCollectionPageStructuredData({
          language,
          pathname: '/tours',
          title: firstPage?.title ?? fallbackSeo.title,
          description: firstPage?.description ?? fallbackSeo.description,
        })}
      />
    </>
  )

  return (
    <section className={pageStyles.page}>
      {seo}
      {firstPage ? (
        <PageIntro
          eyebrow={firstPage.eyebrow}
          title={firstPage.title}
          description={firstPage.description}
        />
      ) : (
        <PageIntroPlaceholder />
      )}

      {!isError ? (
        featuredItems.length > 0 ? (
          <FeaturedToursSection tours={featuredItems} />
        ) : (
          <>
            <div>
              <p>{t('tours.featured.eyebrow')}</p>
              <h2>{t('tours.featured.title')}</h2>
              <p>{t('tours.featured.description')}</p>
            </div>
            <ToursListPlaceholder />
          </>
        )
      ) : null}

      <TourCategoryNav
        categories={categories.length > 0 ? categories : FALLBACK_TOUR_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {isError ? <p role="alert">{t('tours.error')}</p> : null}
      {tours.length > 0 && !isLoading && !isError ? (
        <TourList
          tours={tours}
          hasMore={Boolean(hasNextPage)}
          isFetchingMore={isFetchingNextPage}
          onLoadMore={() => void fetchNextPage()}
        />
      ) : !isError ? (
        <ToursListPlaceholder />
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
