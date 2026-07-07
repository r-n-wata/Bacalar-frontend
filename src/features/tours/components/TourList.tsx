import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import { FeatureCard } from '../../../components/molecules/FeatureCard'
import type { Tour } from '../types/tour'
import cardStyles from '../../../styles/FeatureCards.module.scss'
import styles from '../../restaurants/components/RestaurantList.module.scss'

type TourListProps = {
  tours: Tour[]
  hasMore: boolean
  isFetchingMore: boolean
  onLoadMore: () => void
}

function isPageBottomReached() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
  const viewportBottom = scrollTop + window.innerHeight
  const pageBottom = document.documentElement.scrollHeight

  return viewportBottom >= pageBottom - 24
}

export function TourList({
  tours,
  hasMore,
  isFetchingMore,
  onLoadMore,
}: TourListProps) {
  const { t } = useTranslation()
  const bottomMarkerRef = useRef<HTMLDivElement | null>(null)
  const [isBottomMarkerVisible, setIsBottomMarkerVisible] = useState(false)

  useEffect(() => {
    if (!hasMore) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      const syncFromScrollPosition = () => {
        setIsBottomMarkerVisible(isPageBottomReached())
      }

      window.addEventListener('scroll', syncFromScrollPosition, { passive: true })
      window.addEventListener('resize', syncFromScrollPosition)
      queueMicrotask(syncFromScrollPosition)

      return () => {
        window.removeEventListener('scroll', syncFromScrollPosition)
        window.removeEventListener('resize', syncFromScrollPosition)
      }
    }

    const marker = bottomMarkerRef.current

    if (!marker) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomMarkerVisible(entry?.isIntersecting ?? false)
      },
      {
        root: null,
        rootMargin: '0px 0px 24px 0px',
        threshold: 0,
      },
    )

    observer.observe(marker)

    return () => {
      observer.disconnect()
    }
  }, [tours.length, hasMore])

  return (
    <section className={styles.section} aria-label={t('tours.listAriaLabel')}>
      <p className={styles.summary}>{t('tours.listNote')}</p>

      <div className={cardStyles.grid}>
        {tours.map((tour) => (
          <FeatureCard
            key={tour.id}
            tag={tour.category}
            title={tour.name}
            description={t('tours.bestForLabel', { value: tour.bestFor })}
            secondaryMeta={t('tours.providedBy', { operator: tour.operatorName })}
            meta={`${tour.duration} - ${tour.priceFrom}`}
            to={tour.route}
            image={tour.image}
            placeholderLabel={tour.category}
          />
        ))}
      </div>

      {hasMore ? <div ref={bottomMarkerRef} aria-hidden="true" /> : null}

      {hasMore && isBottomMarkerVisible ? (
        <div className={styles.actions}>
          <Button onClick={onLoadMore} disabled={isFetchingMore}>
            {isFetchingMore ? t('tours.loadingMore') : t('tours.loadMore')}
          </Button>
        </div>
      ) : null}
    </section>
  )
}
