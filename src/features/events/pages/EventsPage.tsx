import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { EventCategoryNav } from '../components/EventCategoryNav'
import { EventList } from '../components/EventList'
import { EventSubmitCta } from '../components/EventSubmitCta'
import { FeaturedEventsSection } from '../components/FeaturedEventsSection'
import { useEvents } from '../hooks/useEvents'
import type { EventCategoryFilter } from '../types/event'

export function EventsPage() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] =
    useState<EventCategoryFilter>('all')
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEvents(selectedCategory)
  const firstPage = data?.pages[0]
  const featuredItems = firstPage?.featuredItems ?? []
  const events = data?.pages.flatMap((page) => page.items) ?? []
  const emptyTitle = t('events.emptyTitle')
  const emptyDescription = t('events.emptyDescription', {
    category: t(`events.categories.${selectedCategory}`),
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

      {!isLoading && !isError ? <FeaturedEventsSection events={featuredItems} /> : null}

      <EventCategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {isLoading ? <LoadingSpinner label={t('events.loading')} /> : null}
      {isError ? <p role="alert">{t('events.error')}</p> : null}
      {events.length > 0 && !isLoading && !isError ? (
        <EventList
          events={events}
          hasMore={Boolean(hasNextPage)}
          isFetchingMore={isFetchingNextPage}
          onLoadMore={() => void fetchNextPage()}
        />
      ) : null}
      {!isLoading && !isError && events.length === 0 ? (
        <div>
          <p>{emptyTitle}</p>
          <p>{emptyDescription}</p>
        </div>
      ) : null}

      <EventSubmitCta />
    </section>
  )
}
