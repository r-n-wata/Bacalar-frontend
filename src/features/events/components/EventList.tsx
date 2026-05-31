import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import cardStyles from '../../../styles/FeatureCards.module.scss'
import type { Event } from '../types/event'
import { EventCard } from './EventCard'
import styles from './EventList.module.scss'

type EventListProps = {
  events: Event[]
  hasMore: boolean
  isFetchingMore: boolean
  onLoadMore: () => void
}

export function EventList({
  events,
  hasMore,
  isFetchingMore,
  onLoadMore,
}: EventListProps) {
  const { t } = useTranslation()
  const bottomMarkerRef = useRef<HTMLDivElement | null>(null)
  const [isBottomMarkerVisible, setIsBottomMarkerVisible] = useState(false)

  useEffect(() => {
    const marker = bottomMarkerRef.current

    if (!marker || !hasMore) {
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
  }, [events.length, hasMore])

  return (
    <section className={styles.section} aria-label={t('events.listAriaLabel')}>
      <p className={styles.summary}>{t('events.thisWeekNote')}</p>

      <div className={cardStyles.grid}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {hasMore ? <div ref={bottomMarkerRef} aria-hidden="true" /> : null}

      {hasMore && isBottomMarkerVisible ? (
        <div className={styles.actions}>
          <Button onClick={onLoadMore} disabled={isFetchingMore}>
            {isFetchingMore ? t('events.loadingMore') : t('events.loadMore')}
          </Button>
        </div>
      ) : null}
    </section>
  )
}
