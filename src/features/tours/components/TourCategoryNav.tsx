import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import type { TourCategoryFilter } from '../types/tour'
import styles from '../../restaurants/components/RestaurantCategoryNav.module.scss'

const categories: TourCategoryFilter[] = ['all', 'premium', 'group', 'adventure']

type TourCategoryNavProps = {
  selectedCategory: TourCategoryFilter
  onSelectCategory: (category: TourCategoryFilter) => void
}

export function TourCategoryNav({
  selectedCategory,
  onSelectCategory,
}: TourCategoryNavProps) {
  const { t } = useTranslation()

  return (
    <div className={styles.nav} aria-label={t('tours.categoryNavLabel')}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'chipActive' : 'chip'}
          onClick={() => onSelectCategory(category)}
          aria-pressed={selectedCategory === category}
        >
          {t(`tours.categories.${category}`)}
        </Button>
      ))}
    </div>
  )
}
