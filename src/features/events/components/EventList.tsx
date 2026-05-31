import { useEffect, useState } from 'react'
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
  const [showLoadMore, setShowLoadMore] = useState(false)

  useEffect(() => {
    if (!hasMore) {
      setShowLoadMore(false)
      return
    }

    const checkIfBottomReached = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const viewportBottom = scrollTop + window.innerHeight
      const pageBottom = document.documentElement.scrollHeight

      setShowLoadMore(viewportBottom >= pageBottom - 24)
    }

    setShowLoadMore(false)
    checkIfBottomReached()

    window.addEventListener('scroll', checkIfBottomReached, { passive: true })
    window.addEventListener('resize', checkIfBottomReached)

    return () => {
      window.removeEventListener('scroll', checkIfBottomReached)
      window.removeEventListener('resize', checkIfBottomReached)
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

      {hasMore && showLoadMore ? (
        <div className={styles.actions}>
          <Button onClick={onLoadMore} disabled={isFetchingMore}>
            {isFetchingMore ? t('events.loadingMore') : t('events.loadMore')}
          </Button>
        </div>
      ) : null}
    </section>
  )
}
