import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../../components/atoms/Button'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { queryKeys } from '../../../lib/queryKeys'
import { ApiError } from '../../../services/http'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { useAdminAuth } from '../auth/useAdminAuth'
import { moderateSubmission } from '../api/moderateSubmission'
import { useAdminSubmissionDetail } from '../hooks/useAdminSubmissionDetail'
import type { AdminSubmissionDetail, AdminSubmissionType } from '../types/admin'
import styles from './AdminSubmissionDetailPage.module.scss'

const submissionTypes: AdminSubmissionType[] = ['events', 'restaurants', 'tours']

function formatDate(value: string, locale: 'en' | 'es', includeTime = false) {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    dateStyle: 'medium',
    ...(includeTime ? { timeStyle: 'short' } : {}),
  }).format(new Date(value))
}

function getSubmissionTitle(submission: AdminSubmissionDetail) {
  return submission.type === 'events' ? submission.title : submission.name
}

function getMetaRows(submission: AdminSubmissionDetail, t: (key: string, options?: Record<string, unknown>) => string, locale: 'en' | 'es') {
  const shared = [
    {
      label: t('admin.dashboard.meta.status'),
      value: t(`admin.status.${submission.status.toLowerCase()}`),
    },
    {
      label: t('admin.dashboard.meta.submitted'),
      value: formatDate(submission.createdAt, locale),
    },
    {
      label: t('admin.dashboard.meta.locale'),
      value: submission.submittedLocale.toUpperCase(),
    },
    {
      label: t('admin.dashboard.meta.contactName'),
      value: submission.contactName,
    },
    {
      label: t('admin.dashboard.meta.contact'),
      value: submission.contactMethod,
    },
    ...(submission.address
      ? [
          {
            label: t('admin.dashboard.meta.address'),
            value: submission.address,
          },
        ]
      : []),
    ...(submission.mapUrl
      ? [
          {
            label: t('admin.dashboard.meta.mapUrl'),
            value: submission.mapUrl,
          },
        ]
      : []),
    ...(submission.mapEmbedUrl
      ? [
          {
            label: t('admin.dashboard.meta.mapEmbedUrl'),
            value: submission.mapEmbedUrl,
          },
        ]
      : []),
  ]

  if (submission.type === 'events') {
    return [
      ...shared,
      {
        label: t('admin.dashboard.meta.category'),
        value: t(`events.categories.${submission.category}`),
      },
      {
        label: t('admin.dashboard.meta.startsAt'),
        value: formatDate(submission.startsAt, locale, true),
      },
      {
        label: t('admin.dashboard.meta.location'),
        value: submission.location,
      },
    ]
  }

  if (submission.type === 'restaurants') {
    return [
      ...shared,
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
  }

  return [
    ...shared,
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
}

export function AdminSubmissionDetailPage() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const { session } = useAdminAuth()
  const { type: rawType, id = '' } = useParams()
  const locale = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const token = session?.access_token ?? null
  const type = submissionTypes.includes(rawType as AdminSubmissionType)
    ? (rawType as AdminSubmissionType)
    : null

  const detailQuery = useAdminSubmissionDetail(type, id, token)
  const submission = detailQuery.data?.item
  const detailErrorMessage =
    detailQuery.error instanceof ApiError
      ? detailQuery.error.message
      : t('admin.detail.error')

  const moderationMutation = useMutation({
    mutationFn: (action: 'approve' | 'reject') =>
      moderateSubmission(type ?? 'events', id, action, token ?? ''),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.admin.submissionsRoot }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.admin.submissionDetail(type ?? 'events', id),
        }),
      ])
    },
  })

  if (!type) {
    return (
      <section className={pageStyles.page}>
        <ContentPanel>
          <p className={styles.errorText}>{t('admin.detail.invalidType')}</p>
        </ContentPanel>
      </section>
    )
  }

  return (
    <section className={pageStyles.page}>
      <PageIntro
        eyebrow={t('admin.detail.eyebrow')}
        title={submission ? getSubmissionTitle(submission) : t('admin.detail.title')}
        description={t('admin.detail.description')}
      />

      <div className={styles.page}>
        <div className={styles.topRow}>
          <Link className={styles.backLink} to="/admin/submissions">
            {t('admin.detail.backToDashboard')}
          </Link>

          {submission ? (
            <div className={styles.actions}>
              <Button
                variant="accent"
                disabled={moderationMutation.isPending || submission.status !== 'PENDING'}
                onClick={() => moderationMutation.mutate('approve')}
              >
                {t('admin.dashboard.actions.approve')}
              </Button>
              <Button
                variant="secondary"
                disabled={moderationMutation.isPending || submission.status !== 'PENDING'}
                onClick={() => moderationMutation.mutate('reject')}
              >
                {t('admin.dashboard.actions.reject')}
              </Button>
            </div>
          ) : null}
        </div>

        {detailQuery.isLoading ? (
          <LoadingSpinner label={t('admin.detail.loading')} />
        ) : null}
        {detailQuery.isError ? (
          <ContentPanel>
            <p className={styles.errorText} role="alert">
              {detailErrorMessage}
            </p>
          </ContentPanel>
        ) : null}

        {submission ? (
          <>
            <ContentPanel className={styles.summaryPanel}>
              <div className={styles.headerRow}>
                <div>
                  <p className={styles.eyebrow}>
                    {t(`admin.dashboard.typeFilters.${submission.type}`)}
                  </p>
                  <h2 className={styles.title}>{getSubmissionTitle(submission)}</h2>
                </div>
                <span className={`${styles.status} ${styles[`status${submission.status}`]}`}>
                  {t(`admin.status.${submission.status.toLowerCase()}`)}
                </span>
              </div>

              <div className={styles.metaGrid}>
                {getMetaRows(submission, t, locale).map((item) => (
                  <div key={`${item.label}-${item.value}`} className={styles.metaItem}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </ContentPanel>

            <ContentPanel>
              <h3 className={styles.sectionTitle}>{t('admin.detail.descriptionLabel')}</h3>
              <p className={styles.description}>{submission.description}</p>
            </ContentPanel>

            {submission.images.length > 0 ? (
              <ContentPanel>
                <h3 className={styles.sectionTitle}>{t('admin.detail.galleryTitle')}</h3>
                <div className={styles.gallery}>
                  {submission.images.map((image) => (
                    <img
                      key={image.id}
                      className={styles.galleryImage}
                      src={image.url}
                      alt={getSubmissionTitle(submission)}
                    />
                  ))}
                </div>
              </ContentPanel>
            ) : null}

            {(submission.instagram || submission.whatsapp) ? (
              <ContentPanel>
                <h3 className={styles.sectionTitle}>{t('admin.detail.additionalContacts')}</h3>
                <div className={styles.contactGrid}>
                  {submission.instagram ? (
                    <div className={styles.metaItem}>
                      <span>Instagram</span>
                      <strong>{submission.instagram}</strong>
                    </div>
                  ) : null}
                  {submission.whatsapp ? (
                    <div className={styles.metaItem}>
                      <span>WhatsApp</span>
                      <strong>{submission.whatsapp}</strong>
                    </div>
                  ) : null}
                </div>
              </ContentPanel>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  )
}
