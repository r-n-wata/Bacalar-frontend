import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { seoContentByLanguage } from '../../../app/seo/seoContent'
import { buildCollectionPageStructuredData } from '../../../app/seo/structuredDataSchema'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { PublicStatusPanel } from '../../../components/organisms/PublicStatusPanel'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import { getEvents, eventsQueryKey } from '../api/getEvents'
import { EventFiltersBar } from '../components/EventFiltersBar'
import { EventList } from '../components/EventList'
import { EventSubmitCta } from '../components/EventSubmitCta'
import { FeaturedEventsSection } from '../components/FeaturedEventsSection'
import { useEvents } from '../hooks/useEvents'
import {
  hasActiveEventFilters,
  initialEventFilterState,
  toEventFilters,
  type EventFilterState,
} from '../lib/filters'

export function EventsPage() {
  const { t, i18n } = useTranslation()
  const language = useAppLanguage()
  const [appliedFilters, setAppliedFilters] =
    useState<EventFilterState>(initialEventFilterState)
  const [draftFilters, setDraftFilters] =
    useState<EventFilterState>(initialEventFilterState)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const filtersButtonRef = useRef<HTMLButtonElement | null>(null)
  const appliedQueryFilters = useMemo(
    () => toEventFilters(appliedFilters),
    [appliedFilters],
  )
  const draftQueryFilters = useMemo(
    () => toEventFilters(draftFilters),
    [draftFilters],
  )
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useEvents(appliedQueryFilters)
  const previewQuery = useQuery({
    queryKey: eventsQueryKey(language, draftQueryFilters, 1),
    queryFn: () =>
      getEvents(language, {
        limit: 1,
        filters: draftQueryFilters,
      }),
    staleTime: 1000 * 60,
  })
  const firstPage = data?.pages[0]
  const featuredItems = firstPage?.featuredItems ?? []
  const events = data?.pages.flatMap((page) => page.items) ?? []
  const totalCount = firstPage?.totalCount ?? 0
  const hasActiveFilters = hasActiveEventFilters(appliedFilters)
  const resolvedLanguage = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const fallbackSeo = seoContentByLanguage[resolvedLanguage].events
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
          language: resolvedLanguage,
          pathname: '/events',
          title: firstPage?.title ?? fallbackSeo.title,
          description: firstPage?.description ?? fallbackSeo.description,
        })}
      />
    </>
  )

  function updateAppliedFilters(
    updater: (current: EventFilterState) => EventFilterState,
  ) {
    setAppliedFilters((current) => {
      const nextState = updater(current)
      setDraftFilters(nextState)
      return nextState
    })
  }

  const activeChips: Array<{ key: string; label: string; onRemove: () => void }> = [
    appliedQueryFilters.search
      ? {
          key: 'search',
          label: t('events.filters.searchChip', {
            value: appliedQueryFilters.search,
          }),
          onRemove: () =>
            updateAppliedFilters((current) => ({
              ...current,
              search: '',
            })),
        }
      : null,
    appliedFilters.category !== 'all'
      ? {
          key: 'category',
          label: t(`events.categories.${appliedFilters.category}`),
          onRemove: () =>
            updateAppliedFilters((current) => ({
              ...current,
              category: 'all',
            })),
        }
      : null,
  ].filter(Boolean) as Array<{ key: string; label: string; onRemove: () => void }>

  function syncDraftFromApplied(nextState: EventFilterState) {
    setDraftFilters(nextState)
  }

  function applyFilters(nextState = draftFilters) {
    setAppliedFilters(nextState)
    setDraftFilters(nextState)
    setIsFiltersOpen(false)
  }

  function handleSearchDraftChange(value: string) {
    setDraftFilters((current) => ({
      ...current,
      search: value,
    }))
  }

  useEffect(() => {
    const trimmed = draftFilters.search.trim()

    if (trimmed.length > 0 && trimmed.length < 3) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setAppliedFilters((current) =>
        current.search === draftFilters.search
          ? current
          : {
              ...current,
              search: draftFilters.search,
            },
      )
    }, 200)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [draftFilters.search])

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

      {!isLoading && !isError ? (
        <EventFiltersBar
          draftFilters={draftFilters}
          matchingCount={totalCount}
          previewCount={previewQuery.data?.totalCount}
          previewLoading={previewQuery.isLoading || previewQuery.isFetching}
          isFiltersOpen={isFiltersOpen}
          activeChips={activeChips}
          onOpenFilters={() => {
            syncDraftFromApplied(appliedFilters)
            setIsFiltersOpen(true)
          }}
          onCloseFilters={() => {
            syncDraftFromApplied(appliedFilters)
            setIsFiltersOpen(false)
            filtersButtonRef.current?.focus()
          }}
          onApplyFilters={() => applyFilters(draftFilters)}
          onClearDraft={() => setDraftFilters(initialEventFilterState)}
          onSubmitSearch={() => applyFilters(draftFilters)}
          onSearchDraftChange={handleSearchDraftChange}
          onDraftCategoryChange={(value) =>
            setDraftFilters((current) => ({
              ...current,
              category: value,
            }))
          }
          restoreFocusRef={filtersButtonRef}
        />
      ) : null}

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
          title={
            hasActiveFilters
              ? t('events.filters.emptyTitle')
              : t('events.emptyUpcomingTitle')
          }
          description={
            hasActiveFilters
              ? t('events.filters.emptyDescription')
              : t('events.emptyUpcomingDescription')
          }
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
