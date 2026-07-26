import { useTranslation } from 'react-i18next'
import { FeatureCard } from '../../../components/molecules/FeatureCard'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import type { Tour } from '../types/tour'
import styles from '../../restaurants/components/FeaturedRestaurantsSection.module.scss'

type FeaturedToursSectionProps = {
  tours: Tour[]
}

export function FeaturedToursSection({ tours }: FeaturedToursSectionProps) {
  const { t } = useTranslation()

  if (tours.length === 0) {
    return null
  }

  return (
    <section className={styles.section} aria-label={t('tours.featured.ariaLabel')}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{t('tours.featured.eyebrow')}</p>
        <h2>{t('tours.featured.title')}</h2>
        <p className={styles.description}>{t('tours.featured.description')}</p>
      </div>

      <div className={styles.scroller}>
        {tours.map((tour) => (
          <div key={tour.id} className={styles.cardWrap}>
            <FeatureCard
              tag={tour.category}
              title={tour.name}
              description={t('tours.bestForLabel', { value: tour.bestFor })}
              secondaryMeta={t('tours.providedBy', { operator: tour.operatorName })}
              meta={`${tour.duration} - ${tour.priceFrom}`}
              to={tour.route}
              image={resolveFeatureImage({
                kind: 'tour',
                id: tour.id,
                image: tour.image,
                fallbackAlt: tour.name,
              })}
              priorityImage={tour.id === tours[0]?.id}
              placeholderLabel={tour.category}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
