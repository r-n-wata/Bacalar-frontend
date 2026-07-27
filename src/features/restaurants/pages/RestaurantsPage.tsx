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
import { getRestaurants, restaurantsQueryKey } from '../api/getRestaurants'
import { FeaturedRestaurantsSection } from '../components/FeaturedRestaurantsSection'
import { RestaurantFiltersBar } from '../components/RestaurantFiltersBar'
import { RestaurantList } from '../components/RestaurantList'
import { RestaurantSubmitCta } from '../components/RestaurantSubmitCta'
import { useRestaurants } from '../hooks/useRestaurants'
import {
  hasActiveRestaurantFilters,
  initialRestaurantFilterState,
  toRestaurantFilters,
  type RestaurantFilterState,
} from '../lib/filters'

export function RestaurantsPage() {
  const { t, i18n } = useTranslation()
  const language = useAppLanguage()
  const [appliedFilters, setAppliedFilters] =
    useState<RestaurantFilterState>(initialRestaurantFilterState)
  const [draftFilters, setDraftFilters] =
    useState<RestaurantFilterState>(initialRestaurantFilterState)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const filtersButtonRef = useRef<HTMLButtonElement | null>(null)
  const appliedQueryFilters = useMemo(
    () => toRestaurantFilters(appliedFilters),
    [appliedFilters],
  )
  const draftQueryFilters = useMemo(
    () => toRestaurantFilters(draftFilters),
    [draftFilters],
  )
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRestaurants(appliedQueryFilters)
  const previewQuery = useQuery({
    queryKey: restaurantsQueryKey(language, draftQueryFilters, 1),
    queryFn: () =>
      getRestaurants(language, {
        limit: 1,
        filters: draftQueryFilters,
      }),
    staleTime: 1000 * 60,
  })
  const firstPage = data?.pages[0]
  const featuredItems = firstPage?.featuredItems ?? []
  const restaurants = data?.pages.flatMap((page) => page.items) ?? []
  const totalCount = firstPage?.totalCount ?? 0
  const hasActiveFilters = hasActiveRestaurantFilters(appliedFilters)
  const emptyTitle = hasActiveFilters
    ? t('restaurants.filters.emptyTitle')
    : t('restaurants.emptyTitle')
  const emptyDescription = hasActiveFilters
    ? t('restaurants.filters.emptyDescription')
    : t('restaurants.emptyDescription', {
        category: t(`restaurants.categories.${appliedFilters.category}`),
      })
  const resolvedLanguage = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const fallbackSeo = seoContentByLanguage[resolvedLanguage].restaurants
  const featuredSeoImage = featuredItems[0]
    ? resolveFeatureImage({
        kind: 'restaurant',
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
          pathname: '/restaurants',
          title: firstPage?.title ?? fallbackSeo.title,
          description: firstPage?.description ?? fallbackSeo.description,
        })}
      />
    </>
  )

  function updateAppliedFilters(
    updater: (current: RestaurantFilterState) => RestaurantFilterState,
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
          label: t('restaurants.filters.searchChip', {
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
          label: t(`restaurants.categories.${appliedFilters.category}`),
          onRemove: () =>
            updateAppliedFilters((current) => ({
              ...current,
              category: 'all',
            })),
        }
      : null,
    appliedFilters.priceBand
      ? {
          key: 'priceBand',
          label: t('restaurants.filters.priceBandChip', {
            value: appliedFilters.priceBand,
          }),
          onRemove: () =>
            updateAppliedFilters((current) => ({
              ...current,
              priceBand: '',
            })),
        }
      : null,
  ].filter(Boolean) as Array<{ key: string; label: string; onRemove: () => void }>

  function syncDraftFromApplied(nextState: RestaurantFilterState) {
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

      {!isLoading && !isError ? (
        <FeaturedRestaurantsSection restaurants={featuredItems} />
      ) : null}

      {!isLoading && !isError ? (
        <RestaurantFiltersBar
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
          onClearDraft={() => setDraftFilters(initialRestaurantFilterState)}
          onSubmitSearch={() => applyFilters(draftFilters)}
          onSearchDraftChange={handleSearchDraftChange}
          onDraftCategoryChange={(value) =>
            setDraftFilters((current) => ({
              ...current,
              category: value,
            }))
          }
          onDraftPriceBandChange={(value) =>
            setDraftFilters((current) => ({
              ...current,
              priceBand: value,
            }))
          }
          restoreFocusRef={filtersButtonRef}
        />
      ) : null}

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
