import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/atoms/Button'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import type { AdminSubmissionListItem } from '../types/admin'
import styles from './AdminSubmissionCard.module.scss'

type AdminSubmissionCardProps = {
  submission: AdminSubmissionListItem
  isMutating: boolean
  onApprove: () => void
  onReject: () => void
}

function formatDate(value: string, locale: 'en' | 'es') {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    dateStyle: 'medium',
  }).format(new Date(value))
}

function getTitle(submission: AdminSubmissionListItem) {
  return submission.type === 'events' ? submission.title : submission.name
}

export function AdminSubmissionCard({
  submission,
  isMutating,
  onApprove,
  onReject,
}: AdminSubmissionCardProps) {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const title = getTitle(submission)
  const typeLabel = t(`admin.dashboard.typeFilters.${submission.type}`)
  const statusLabel = t(`admin.status.${submission.status.toLowerCase()}`)
  const isActionable = submission.status === 'PENDING'
  const summaryItems =
    submission.type === 'events'
      ? [
          t(`events.categories.${submission.category}`),
          submission.location,
          formatDate(submission.startsAt, locale),
        ]
      : submission.type === 'restaurants'
        ? [
            submission.cuisine,
            t(`restaurants.categories.${submission.moment}`),
            submission.priceBand,
          ]
        : [
            t(`tours.categories.${submission.category}`),
            t('tours.hours', { count: submission.durationHours }),
            `$${submission.priceFrom}`,
          ]

  return (
    <ContentPanel className={styles.card}>
      <div className={styles.layout}>
        {submission.thumbnail ? (
          <Link
            className={styles.thumbnailLink}
            to={`/admin/submissions/${submission.type}/${submission.id}`}
            aria-label={t('admin.dashboard.openSubmission', { title })}
          >
            <img
              className={styles.thumbnail}
              src={submission.thumbnail.url}
              alt={title}
            />
          </Link>
        ) : (
          <Link
            className={`${styles.thumbnailLink} ${styles.thumbnailFallback}`}
            to={`/admin/submissions/${submission.type}/${submission.id}`}
            aria-label={t('admin.dashboard.openSubmission', { title })}
          >
            <span>{typeLabel}</span>
          </Link>
        )}

        <div className={styles.content}>
          <Link
            className={styles.body}
            to={`/admin/submissions/${submission.type}/${submission.id}`}
          >
            <div className={styles.header}>
              <p className={styles.eyebrow}>{typeLabel}</p>
              <span
                className={`${styles.status} ${styles[`status${submission.status}`]}`}
              >
                {statusLabel}
              </span>
            </div>

            <h2 className={styles.title}>{title}</h2>

            <div className={styles.metaRow}>
              <span>{t('admin.dashboard.meta.submitted')}</span>
              <strong>{formatDate(submission.createdAt, locale)}</strong>
            </div>

            <div className={styles.summaryList}>
              {summaryItems.map((item) => (
                <span key={`${submission.id}-${item}`} className={styles.summaryItem}>
                  {item}
                </span>
              ))}
            </div>
          </Link>

          <div className={styles.actions}>
            <Button
              variant="accent"
              disabled={isMutating || !isActionable}
              onClick={onApprove}
            >
              {t('admin.dashboard.actions.approve')}
            </Button>
            <Button
              variant="secondary"
              disabled={isMutating || !isActionable}
              onClick={onReject}
            >
              {t('admin.dashboard.actions.reject')}
            </Button>
          </div>
        </div>
      </div>
    </ContentPanel>
  )
}
