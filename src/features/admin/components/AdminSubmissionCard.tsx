import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import type { AdminSubmission } from '../types/admin'
import styles from './AdminSubmissionCard.module.scss'

type AdminSubmissionCardProps = {
  submission: AdminSubmission
  isMutating: boolean
  onApprove: () => void
  onReject: () => void
}

function formatDate(value: string, locale: 'en' | 'es') {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function AdminSubmissionCard({
  submission,
  isMutating,
  onApprove,
  onReject,
}: AdminSubmissionCardProps) {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage === 'es' ? 'es' : 'en'

  const baseMeta = [
    {
      label: t('admin.dashboard.meta.submitted'),
      value: formatDate(submission.createdAt, locale),
    },
    {
      label: t('admin.dashboard.meta.locale'),
      value: submission.submittedLocale.toUpperCase(),
    },
    {
      label: t('admin.dashboard.meta.contact'),
      value: submission.contactMethod,
    },
  ]

  const typeSpecificMeta =
    submission.type === 'events'
      ? [
          {
            label: t('admin.dashboard.meta.category'),
            value: t(`events.categories.${submission.category}`),
          },
          {
            label: t('admin.dashboard.meta.startsAt'),
            value: formatDate(submission.startsAt, locale),
          },
          {
            label: t('admin.dashboard.meta.location'),
            value: submission.location,
          },
        ]
      : submission.type === 'restaurants'
        ? [
            {
              label: t('admin.dashboard.meta.cuisine'),
              value: submission.cuisine,
            },
            {
              label: t('admin.dashboard.meta.moment'),
              value: t(`restaurants.categories.${submission.moment}`),
            },
            {
              label: t('admin.dashboard.meta.priceBand'),
              value: submission.priceBand,
            },
          ]
        : [
            {
              label: t('admin.dashboard.meta.category'),
              value: t(`tours.categories.${submission.category}`),
            },
            {
              label: t('admin.dashboard.meta.duration'),
              value: t('tours.hours', { count: submission.durationHours }),
            },
            {
              label: t('admin.dashboard.meta.priceFrom'),
              value: `$${submission.priceFrom}`,
            },
          ]

  const title =
    submission.type === 'events'
      ? submission.title
      : submission.name

  return (
    <ContentPanel className={styles.card}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{t(`admin.dashboard.filters.${submission.type}`)}</p>
          <h2 className={styles.title}>{title}</h2>
        </div>
      </header>

      <div className={styles.metaGrid}>
        {[...baseMeta, ...typeSpecificMeta].map((item) => (
          <div key={`${submission.id}-${item.label}`} className={styles.metaItem}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className={styles.metaItem}>
        <span>{t('admin.dashboard.meta.contactName')}</span>
        <p>{submission.contactName}</p>
      </div>

      <p className={styles.description}>{submission.description}</p>

      {submission.images.length > 0 ? (
        <div className={styles.imageGrid}>
          {submission.images.map((image) => (
            <img
              key={image.id}
              className={styles.image}
              src={image.url}
              alt={title}
            />
          ))}
        </div>
      ) : null}

      <div className={styles.actions}>
        <Button variant="accent" disabled={isMutating} onClick={onApprove}>
          {t('admin.dashboard.actions.approve')}
        </Button>
        <Button variant="secondary" disabled={isMutating} onClick={onReject}>
          {t('admin.dashboard.actions.reject')}
        </Button>
      </div>
    </ContentPanel>
  )
}
