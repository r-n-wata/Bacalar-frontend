import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import type { RestaurantCategoryFilter } from '../types/restaurant'
import styles from './RestaurantCategoryNav.module.scss'

const categories: RestaurantCategoryFilter[] = [
  'all',
  'breakfast',
  'lunch',
  'dinner',
]

type RestaurantCategoryNavProps = {
  selectedCategory: RestaurantCategoryFilter
  onSelectCategory: (category: RestaurantCategoryFilter) => void
}

export function RestaurantCategoryNav({
  selectedCategory,
  onSelectCategory,
}: RestaurantCategoryNavProps) {
  const { t } = useTranslation()

  return (
    <div className={styles.nav} aria-label={t('restaurants.categoryNavLabel')}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'chipActive' : 'chip'}
          onClick={() => onSelectCategory(category)}
          aria-pressed={selectedCategory === category}
        >
          {t(`restaurants.categories.${category}`)}
        </Button>
      ))}
    </div>
  )
}
