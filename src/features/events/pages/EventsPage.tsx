import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { seoContentByLanguage } from '../../../app/seo/seoContent'
import { buildCollectionPageStructuredData } from '../../../app/seo/structuredDataSchema'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { PublicStatusPanel } from '../../../components/organisms/PublicStatusPanel'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import { EventCategoryNav } from '../components/EventCategoryNav'
import { EventList } from '../components/EventList'
import { EventSubmitCta } from '../components/EventSubmitCta'
import { FeaturedEventsSection } from '../components/FeaturedEventsSection'
import { useEvents } from '../hooks/useEvents'
import type { EventCategoryFilter } from '../types/event'

export function EventsPage() {
  const { t, i18n } = useTranslation()
  const [selectedCategory, setSelectedCategory] =
    useState<EventCategoryFilter>('all')
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useEvents(selectedCategory)
  const firstPage = data?.pages[0]
  const featuredItems = firstPage?.featuredItems ?? []
  const events = data?.pages.flatMap((page) => page.items) ?? []
  const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const fallbackSeo = seoContentByLanguage[language].events
  const featuredSeoImage = featuredItems[0]
    ? resolveFeatureImage({
        kind: 'event',
        id: featuredItems[0].id,
        image: featuredItems[0].image,
        fallbackAlt: featuredItems[0].title,
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
          pathname: '/events',
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
      ) : null}

      {!isLoading && !isError ? <FeaturedEventsSection events={featuredItems} /> : null}

      <EventCategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {isLoading ? <LoadingSpinner label={t('events.loading')} /> : null}
      {isError ? (
        <PublicStatusPanel
          role="alert"
          eyebrow={t('events.errorEyebrow')}
          title={t('events.errorTitle')}
          description={t('events.error')}
          actions={[
            {
              kind: 'button',
              label: t('common.retry'),
              onClick: () => void refetch(),
            },
          ]}
        />
      ) : null}
      {events.length > 0 && !isLoading && !isError ? (
        <EventList
          events={events}
          hasMore={Boolean(hasNextPage)}
          isFetchingMore={isFetchingNextPage}
          onLoadMore={() => void fetchNextPage()}
        />
      ) : null}
      {!isLoading && !isError && events.length === 0 ? (
        <PublicStatusPanel
          eyebrow={t('events.emptyEyebrow')}
          title={t('events.emptyUpcomingTitle')}
          description={t('events.emptyUpcomingDescription')}
          actions={[
            {
              kind: 'link',
              label: t('events.submitCta.action'),
              to: '/events/submit',
            },
          ]}
        />
      ) : null}

      {!isLoading && !isError && events.length > 0 ? <EventSubmitCta /> : null}
    </section>
  )
}
