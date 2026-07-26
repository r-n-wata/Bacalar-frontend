import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import posthog from '../../../services/posthog'
import type { EventCategoryFilter } from '../types/event'
import styles from './EventCategoryNav.module.scss'

const categories: EventCategoryFilter[] = ['all', 'music', 'food', 'wellness']

type EventCategoryNavProps = {
  selectedCategory: EventCategoryFilter
  onSelectCategory: (category: EventCategoryFilter) => void
}

export function EventCategoryNav({
  selectedCategory,
  onSelectCategory,
}: EventCategoryNavProps) {
  const { t } = useTranslation()

  return (
    <div className={styles.nav} aria-label={t('events.categoryNavLabel')}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'chipActive' : 'chip'}
          onClick={() => {
            onSelectCategory(category)
            posthog.capture('listing_category_selected', {
              category,
              listing_type: 'events',
            })
          }}
          aria-pressed={selectedCategory === category}
        >
          {t(`events.categories.${category}`)}
        </Button>
      ))}
    </div>
  )
}
