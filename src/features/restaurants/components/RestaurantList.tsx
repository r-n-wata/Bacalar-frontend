import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import { FeatureCard } from '../../../components/molecules/FeatureCard'
import type { Restaurant } from '../types/restaurant'
import cardStyles from '../../../styles/FeatureCards.module.scss'
import styles from './RestaurantList.module.scss'

type RestaurantListProps = {
  restaurants: Restaurant[]
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

export function RestaurantList({
  restaurants,
  hasMore,
  isFetchingMore,
  onLoadMore,
}: RestaurantListProps) {
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
  }, [restaurants.length, hasMore])

  return (
    <section className={styles.section} aria-label={t('restaurants.listAriaLabel')}>
      <p className={styles.summary}>{t('restaurants.listNote')}</p>

      <div className={cardStyles.grid}>
        {restaurants.map((restaurant) => (
          <FeatureCard
            key={restaurant.id}
            tag={t(`restaurants.categories.${restaurant.moment}`)}
            title={restaurant.name}
            description={restaurant.vibe}
            meta={`${restaurant.cuisine} - ${restaurant.priceBand}`}
            to={restaurant.route}
            image={restaurant.image}
            placeholderLabel={restaurant.cuisine}
          />
        ))}
      </div>

      {hasMore ? <div ref={bottomMarkerRef} aria-hidden="true" /> : null}

      {hasMore && isBottomMarkerVisible ? (
        <div className={styles.actions}>
          <Button onClick={onLoadMore} disabled={isFetchingMore}>
            {isFetchingMore
              ? t('restaurants.loadingMore')
              : t('restaurants.loadMore')}
          </Button>
        </div>
      ) : null}
    </section>
  )
}
