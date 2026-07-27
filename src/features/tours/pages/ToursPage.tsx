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
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import { getTours, toursQueryKey } from '../api/getTours'
import { FeaturedToursSection } from '../components/FeaturedToursSection'
import { TourFiltersBar } from '../components/TourFiltersBar'
import { TourList } from '../components/TourList'
import { TourSubmitCta } from '../components/TourSubmitCta'
import { useTours } from '../hooks/useTours'
import {
  hasActiveTourFilters,
  hasInvalidTourPriceRange,
  initialTourFilterState,
  toTourFilters,
  type TourFilterState,
} from '../lib/filters'

export function ToursPage() {
  const { t, i18n } = useTranslation()
  const language = useAppLanguage()
  const [appliedFilters, setAppliedFilters] =
    useState<TourFilterState>(initialTourFilterState)
  const [draftFilters, setDraftFilters] =
    useState<TourFilterState>(initialTourFilterState)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const filtersButtonRef = useRef<HTMLButtonElement | null>(null)
  const appliedQueryFilters = useMemo(
    () => toTourFilters(appliedFilters),
    [appliedFilters],
  )
  const draftQueryFilters = useMemo(
    () => toTourFilters(draftFilters),
    [draftFilters],
  )
  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTours(appliedQueryFilters)
  const previewQuery = useQuery({
    queryKey: toursQueryKey(language, draftQueryFilters, 1),
    queryFn: () =>
      getTours(language, {
        limit: 1,
        filters: draftQueryFilters,
      }),
    staleTime: 1000 * 60,
    enabled: !hasInvalidTourPriceRange(draftFilters),
  })
  const firstPage = data?.pages[0]
  const featuredItems = firstPage?.featuredItems ?? []
  const categories = firstPage?.categories ?? []
  const durationOptions = firstPage?.durationOptions ?? []
  const tours = data?.pages.flatMap((page) => page.items) ?? []
  const totalCount = firstPage?.totalCount ?? 0
  const shouldShowInitialSpinner = isLoading && !firstPage
  const shouldShowResultsSpinner =
    Boolean(firstPage) && isFetching && !isFetchingNextPage
  const emptyTitle = t('tours.emptyTitle')
  const selectedCategoryLabel = appliedFilters.category || t('tours.categories.all')
  const hasActiveFilters = hasActiveTourFilters(appliedFilters)
  const emptyDescription = hasActiveFilters
    ? t('tours.filters.emptyDescription')
    : t('tours.emptyDescription', {
        category: selectedCategoryLabel,
      })
  const resolvedLanguage = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const fallbackSeo = seoContentByLanguage[resolvedLanguage].tours
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
          language: resolvedLanguage,
          pathname: '/tours',
          title: firstPage?.title ?? fallbackSeo.title,
          description: firstPage?.description ?? fallbackSeo.description,
        })}
      />
    </>
  )

  function updateAppliedFilters(updater: (current: TourFilterState) => TourFilterState) {
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
          label: t('tours.filters.searchChip', {
            value: appliedQueryFilters.search,
          }),
          onRemove: () =>
            updateAppliedFilters((current) => ({
              ...current,
              search: '',
            })),
        }
      : null,
    appliedFilters.category
      ? {
          key: 'category',
          label: appliedFilters.category,
          onRemove: () =>
            updateAppliedFilters((current) => ({
              ...current,
              category: '',
            })),
        }
      : null,
    appliedFilters.priceMin.trim()
      ? {
          key: 'priceMin',
          label: t('tours.filters.priceMinChip', {
            value: appliedFilters.priceMin.trim(),
          }),
          onRemove: () =>
            updateAppliedFilters((current) => ({
              ...current,
              priceMin: '',
            })),
        }
      : null,
    appliedFilters.priceMax.trim()
      ? {
          key: 'priceMax',
          label: t('tours.filters.priceMaxChip', {
            value: appliedFilters.priceMax.trim(),
          }),
          onRemove: () =>
            updateAppliedFilters((current) => ({
              ...current,
              priceMax: '',
            })),
        }
      : null,
    ...appliedFilters.durationHours.map((duration) => ({
      key: `duration-${duration}`,
      label: t('tours.filters.durationChip', { count: duration }),
      onRemove: () =>
        updateAppliedFilters((current) => ({
          ...current,
          durationHours: current.durationHours.filter((item) => item !== duration),
        })),
    })),
  ].filter(Boolean) as Array<{ key: string; label: string; onRemove: () => void }>

  function syncDraftFromApplied(nextState: TourFilterState) {
    setDraftFilters(nextState)
  }

  function applyFilters(nextState = draftFilters) {
    setAppliedFilters(nextState)
    setDraftFilters(nextState)
    setIsFiltersOpen(false)
  }

  function updateDraftField(
    key: Exclude<keyof TourFilterState, 'durationHours'>,
    value: string,
  ) {
    setDraftFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function handleSearchDraftChange(value: string) {
    updateDraftField('search', value)
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

  function toggleDraftDuration(value: number) {
    setDraftFilters((current) => ({
      ...current,
      durationHours: current.durationHours.includes(value)
        ? current.durationHours.filter((item) => item !== value)
        : [...current.durationHours, value].sort((left, right) => left - right),
    }))
  }

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

      {firstPage && !isError ? <FeaturedToursSection tours={featuredItems} /> : null}

      {firstPage && !isError ? (
        <TourFiltersBar
          categories={categories}
          durationOptions={durationOptions}
          draftFilters={draftFilters}
          matchingCount={totalCount}
          previewCount={previewQuery.data?.totalCount}
          previewLoading={previewQuery.isLoading || previewQuery.isFetching}
          isFiltersOpen={isFiltersOpen}
          hasInvalidPriceRange={hasInvalidTourPriceRange(draftFilters)}
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
          onClearDraft={() => setDraftFilters(initialTourFilterState)}
          onSubmitSearch={() => applyFilters(draftFilters)}
          onSearchDraftChange={handleSearchDraftChange}
          onDraftFieldChange={updateDraftField}
          onDraftDurationToggle={toggleDraftDuration}
          restoreFocusRef={filtersButtonRef}
        />
      ) : null}

      {shouldShowInitialSpinner || shouldShowResultsSpinner ? (
        <LoadingSpinner label={t('tours.loading')} />
      ) : null}
      {isError ? <p role="alert">{t('tours.error')}</p> : null}
      {tours.length > 0 && !shouldShowInitialSpinner && !shouldShowResultsSpinner && !isError ? (
        <TourList
          tours={tours}
          hasMore={Boolean(hasNextPage)}
          isFetchingMore={isFetchingNextPage}
          onLoadMore={() => void fetchNextPage()}
        />
      ) : null}
      {!shouldShowInitialSpinner &&
      !shouldShowResultsSpinner &&
      !isError &&
      tours.length === 0 ? (
        <div>
          <p>{emptyTitle}</p>
          <p>{emptyDescription}</p>
        </div>
      ) : null}

      <TourSubmitCta />
    </section>
  )
}
