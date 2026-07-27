import { useEffect, useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import { TextInput } from '../../../components/atoms/TextInput'
import type { RestaurantCategoryFilter } from '../types/restaurant'
import type { RestaurantFilterState } from '../lib/filters'
import styles from '../../tours/components/TourFiltersBar.module.scss'

type ActiveFilterChip = {
  key: string
  label: string
  onRemove: () => void
}

type RestaurantFiltersBarProps = {
  draftFilters: RestaurantFilterState
  matchingCount: number
  previewCount?: number
  previewLoading: boolean
  isFiltersOpen: boolean
  activeChips: ActiveFilterChip[]
  onOpenFilters: () => void
  onCloseFilters: () => void
  onApplyFilters: () => void
  onClearDraft: () => void
  onSubmitSearch: () => void
  onSearchDraftChange: (value: string) => void
  onDraftCategoryChange: (value: RestaurantCategoryFilter) => void
  onDraftPriceBandChange: (value: '' | '$' | '$$' | '$$$') => void
  restoreFocusRef: React.RefObject<HTMLButtonElement | null>
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return []
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('disabled'))
}

export function RestaurantFiltersBar({
  draftFilters,
  matchingCount,
  previewCount,
  previewLoading,
  isFiltersOpen,
  activeChips,
  onOpenFilters,
  onCloseFilters,
  onApplyFilters,
  onClearDraft,
  onSubmitSearch,
  onSearchDraftChange,
  onDraftCategoryChange,
  onDraftPriceBandChange,
  restoreFocusRef,
}: RestaurantFiltersBarProps) {
  const { t } = useTranslation()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!isFiltersOpen) {
      return
    }

    const dialog = dialogRef.current
    const focusables = getFocusableElements(dialog)
    focusables[0]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseFilters()
        restoreFocusRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const currentFocusables = getFocusableElements(dialog)

      if (currentFocusables.length === 0) {
        return
      }

      const firstElement = currentFocusables[0]
      const lastElement = currentFocusables[currentFocusables.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFiltersOpen, onCloseFilters, restoreFocusRef])

  return (
    <section
      className={styles.controlsSection}
      aria-label={t('restaurants.filters.controlsLabel')}
    >
      <form
        className={styles.controlsRow}
        onSubmit={(event) => {
          event.preventDefault()
          onSubmitSearch()
        }}
      >
        <div className={styles.searchForm}>
          <TextInput
            className={styles.searchInput}
            aria-label={t('restaurants.filters.searchLabel')}
            placeholder={t('restaurants.filters.searchPlaceholder')}
            value={draftFilters.search}
            onChange={(event) => onSearchDraftChange(event.target.value)}
          />
        </div>
        <Button
          ref={restoreFocusRef}
          type="button"
          variant="secondary"
          className={styles.filtersButton}
          aria-haspopup="dialog"
          aria-expanded={isFiltersOpen}
          aria-controls="restaurant-filters-dialog"
          onClick={onOpenFilters}
        >
          {t('restaurants.filters.button')}
        </Button>
      </form>

      <p className={styles.resultsSummary} aria-live="polite">
        {t('restaurants.filters.resultsCount', { count: matchingCount })}
      </p>
      <span className={styles.srOnlyLive} aria-live="polite">
        {t('restaurants.filters.resultsCount', { count: matchingCount })}
      </span>

      {activeChips.length > 0 ? (
        <div className={styles.chipRow}>
          {activeChips.map((chip) => (
            <Button
              key={chip.key}
              type="button"
              variant="chip"
              className={styles.activeChip}
              onClick={chip.onRemove}
              aria-label={t('restaurants.filters.removeFilter', {
                label: chip.label,
              })}
            >
              <span className={styles.activeChipLabel}>
                <span>{chip.label}</span>
                <span aria-hidden="true">x</span>
              </span>
            </Button>
          ))}
        </div>
      ) : null}

      {isFiltersOpen ? (
        <>
          <button
            type="button"
            className={styles.backdrop}
            aria-label={t('restaurants.filters.close')}
            onClick={onCloseFilters}
          />
          <div className={styles.dialogShell}>
            <div
              id="restaurant-filters-dialog"
              ref={dialogRef}
              className={styles.dialogPanel}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
            >
              <div className={styles.dialogHeader}>
                <div>
                  <h2 id={titleId} className={styles.dialogTitle}>
                    {t('restaurants.filters.title')}
                  </h2>
                  <p id={descriptionId} className={styles.dialogDescription}>
                    {t('restaurants.filters.description')}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className={styles.closeButton}
                  aria-label={t('restaurants.filters.close')}
                  onClick={onCloseFilters}
                >
                  <span aria-hidden="true">x</span>
                </Button>
              </div>

              <div className={styles.filtersGrid}>
                <div className={styles.fieldGroup}>
                  <label
                    className={styles.fieldLabel}
                    htmlFor="restaurant-filter-category"
                  >
                    {t('restaurants.meta.moment')}
                  </label>
                  <select
                    id="restaurant-filter-category"
                    className={styles.select}
                    value={draftFilters.category}
                    onChange={(event) =>
                      onDraftCategoryChange(
                        event.target.value as RestaurantCategoryFilter,
                      )
                    }
                  >
                    <option value="all">{t('restaurants.categories.all')}</option>
                    <option value="breakfast">
                      {t('restaurants.categories.breakfast')}
                    </option>
                    <option value="lunch">{t('restaurants.categories.lunch')}</option>
                    <option value="dinner">{t('restaurants.categories.dinner')}</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label
                    className={styles.fieldLabel}
                    htmlFor="restaurant-filter-price-band"
                  >
                    {t('restaurants.filters.priceTitle')}
                  </label>
                  <select
                    id="restaurant-filter-price-band"
                    className={styles.select}
                    value={draftFilters.priceBand}
                    onChange={(event) =>
                      onDraftPriceBandChange(
                        event.target.value as '' | '$' | '$$' | '$$$',
                      )
                    }
                  >
                    <option value="">{t('restaurants.filters.priceAll')}</option>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                  </select>
                </div>
              </div>

              <div className={styles.footerActions}>
                <Button type="button" variant="secondary" onClick={onClearDraft}>
                  {t('restaurants.filters.clearAll')}
                </Button>
                <Button
                  type="button"
                  className={styles.applyButton}
                  onClick={onApplyFilters}
                >
                  {previewLoading
                    ? t('restaurants.filters.previewLoading')
                    : t('restaurants.filters.applyCount', {
                        count:
                          typeof previewCount === 'number'
                            ? previewCount
                            : matchingCount,
                      })}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  )
}
