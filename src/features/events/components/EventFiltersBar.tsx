import { useEffect, useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import { TextInput } from '../../../components/atoms/TextInput'
import type { EventCategoryFilter } from '../types/event'
import type { EventFilterState } from '../lib/filters'
import styles from '../../tours/components/TourFiltersBar.module.scss'

type ActiveFilterChip = {
  key: string
  label: string
  onRemove: () => void
}

type EventFiltersBarProps = {
  draftFilters: EventFilterState
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
  onDraftCategoryChange: (value: EventCategoryFilter) => void
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

export function EventFiltersBar({
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
  restoreFocusRef,
}: EventFiltersBarProps) {
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
      aria-label={t('events.filters.controlsLabel')}
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
            aria-label={t('events.filters.searchLabel')}
            placeholder={t('events.filters.searchPlaceholder')}
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
          aria-controls="event-filters-dialog"
          onClick={onOpenFilters}
        >
          {t('events.filters.button')}
        </Button>
      </form>

      <p className={styles.resultsSummary} aria-live="polite">
        {t('events.filters.resultsCount', { count: matchingCount })}
      </p>
      <span className={styles.srOnlyLive} aria-live="polite">
        {t('events.filters.resultsCount', { count: matchingCount })}
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
              aria-label={t('events.filters.removeFilter', { label: chip.label })}
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
            aria-label={t('events.filters.close')}
            onClick={onCloseFilters}
          />
          <div className={styles.dialogShell}>
            <div
              id="event-filters-dialog"
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
                    {t('events.filters.title')}
                  </h2>
                  <p id={descriptionId} className={styles.dialogDescription}>
                    {t('events.filters.description')}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className={styles.closeButton}
                  aria-label={t('events.filters.close')}
                  onClick={onCloseFilters}
                >
                  <span aria-hidden="true">x</span>
                </Button>
              </div>

              <div className={styles.filtersGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="event-filter-category">
                    {t('events.meta.type')}
                  </label>
                  <select
                    id="event-filter-category"
                    className={styles.select}
                    value={draftFilters.category}
                    onChange={(event) =>
                      onDraftCategoryChange(event.target.value as EventCategoryFilter)
                    }
                  >
                    <option value="all">{t('events.categories.all')}</option>
                    <option value="music">{t('events.categories.music')}</option>
                    <option value="food">{t('events.categories.food')}</option>
                    <option value="wellness">{t('events.categories.wellness')}</option>
                  </select>
                </div>
              </div>

              <div className={styles.footerActions}>
                <Button type="button" variant="secondary" onClick={onClearDraft}>
                  {t('events.filters.clearAll')}
                </Button>
                <Button
                  type="button"
                  className={styles.applyButton}
                  onClick={onApplyFilters}
                >
                  {previewLoading
                    ? t('events.filters.previewLoading')
                    : t('events.filters.applyCount', {
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
