import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import type { TourCategory, TourCategoryFilter } from '../types/tour'
import styles from '../../restaurants/components/RestaurantCategoryNav.module.scss'

type TourCategoryNavProps = {
  categories: TourCategory[]
  selectedCategory: TourCategoryFilter
  onSelectCategory: (category: TourCategoryFilter) => void
}

export function TourCategoryNav({
  categories,
  selectedCategory,
  onSelectCategory,
}: TourCategoryNavProps) {
  const { t } = useTranslation()
  const options: TourCategoryFilter[] = ['all', ...categories]

  return (
    <div className={styles.nav} aria-label={t('tours.categoryNavLabel')}>
      {options.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'chipActive' : 'chip'}
          onClick={() => onSelectCategory(category)}
          aria-pressed={selectedCategory === category}
        >
          {category === 'all' ? t('tours.categories.all') : category}
        </Button>
      ))}
    </div>
  )
}
