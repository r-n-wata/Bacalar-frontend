import { useEffect, useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import { TextInput } from '../../../components/atoms/TextInput'
import type { TourFilterState } from '../lib/filters'
import styles from './TourFiltersBar.module.scss'

type ActiveFilterChip = {
  key: string
  label: string
  onRemove: () => void
}

type TourFiltersBarProps = {
  categories: string[]
  durationOptions: number[]
  draftFilters: TourFilterState
  matchingCount: number
  previewCount?: number
  previewLoading: boolean
  isFiltersOpen: boolean
  hasInvalidPriceRange: boolean
  activeChips: ActiveFilterChip[]
  onOpenFilters: () => void
  onCloseFilters: () => void
  onApplyFilters: () => void
  onClearDraft: () => void
  onSubmitSearch: () => void
  onSearchDraftChange: (value: string) => void
  onDraftFieldChange: (
    key: Exclude<keyof TourFilterState, 'durationHours'>,
    value: string,
  ) => void
  onDraftDurationToggle: (value: number) => void
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

export function TourFiltersBar({
  categories,
  durationOptions,
  draftFilters,
  matchingCount,
  previewCount,
  previewLoading,
  isFiltersOpen,
  hasInvalidPriceRange,
  activeChips,
  onOpenFilters,
  onCloseFilters,
  onApplyFilters,
  onClearDraft,
  onSubmitSearch,
  onSearchDraftChange,
  onDraftFieldChange,
  onDraftDurationToggle,
  restoreFocusRef,
}: TourFiltersBarProps) {
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
    <section className={styles.controlsSection} aria-label={t('tours.filters.controlsLabel')}>
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
            aria-label={t('tours.filters.searchLabel')}
            placeholder={t('tours.filters.searchPlaceholder')}
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
          aria-controls="tour-filters-dialog"
          onClick={onOpenFilters}
        >
          {t('tours.filters.button')}
        </Button>
      </form>

      <p className={styles.resultsSummary} aria-live="polite">
        {t('tours.filters.resultsCount', { count: matchingCount })}
      </p>
      <span className={styles.srOnlyLive} aria-live="polite">
        {t('tours.filters.resultsCount', { count: matchingCount })}
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
              aria-label={t('tours.filters.removeFilter', { label: chip.label })}
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
            aria-label={t('tours.filters.close')}
            onClick={onCloseFilters}
          />
          <div className={styles.dialogShell}>
            <div
              id="tour-filters-dialog"
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
                    {t('tours.filters.title')}
                  </h2>
                  <p id={descriptionId} className={styles.dialogDescription}>
                    {t('tours.filters.description')}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className={styles.closeButton}
                  aria-label={t('tours.filters.close')}
                  onClick={onCloseFilters}
                >
                  <span aria-hidden="true">x</span>
                </Button>
              </div>

              <div className={styles.filtersGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="tour-filter-category">
                    {t('tours.meta.category')}
                  </label>
                  <select
                    id="tour-filter-category"
                    className={styles.select}
                    value={draftFilters.category}
                    onChange={(event) =>
                      onDraftFieldChange('category', event.target.value)
                    }
                  >
                    <option value="">{t('tours.categories.all')}</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>{t('tours.filters.priceTitle')}</span>
                  <div className={styles.priceRow}>
                    <TextInput
                      aria-label={t('tours.filters.priceMin')}
                      placeholder={t('tours.filters.priceMin')}
                      value={draftFilters.priceMin}
                      inputMode="numeric"
                      onChange={(event) =>
                        onDraftFieldChange('priceMin', event.target.value)
                      }
                    />
                    <TextInput
                      aria-label={t('tours.filters.priceMax')}
                      placeholder={t('tours.filters.priceMax')}
                      value={draftFilters.priceMax}
                      inputMode="numeric"
                      onChange={(event) =>
                        onDraftFieldChange('priceMax', event.target.value)
                      }
                    />
                  </div>
                  {hasInvalidPriceRange ? (
                    <p className={styles.validationText}>
                      {t('tours.filters.priceValidation')}
                    </p>
                  ) : (
                    <p className={styles.helperText}>{t('tours.filters.priceHint')}</p>
                  )}
                </div>

                <fieldset className={styles.fieldGroup}>
                  <legend className={styles.fieldsetLegend}>
                    {t('tours.filters.durationTitle')}
                  </legend>
                  <div className={styles.checkboxList}>
                    {durationOptions.map((value) => {
                      const checked = draftFilters.durationHours.includes(value)

                      return (
                        <label key={value} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => onDraftDurationToggle(value)}
                          />
                          <span>{t('tours.filters.durationOption', { count: value })}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              </div>

              <div className={styles.footerActions}>
                <Button type="button" variant="secondary" onClick={onClearDraft}>
                  {t('tours.filters.clearAll')}
                </Button>
                <Button
                  type="button"
                  className={styles.applyButton}
                  onClick={onApplyFilters}
                  disabled={hasInvalidPriceRange}
                >
                  {previewLoading
                    ? t('tours.filters.previewLoading')
                    : t('tours.filters.applyCount', {
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
