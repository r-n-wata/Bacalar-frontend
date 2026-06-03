import { useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { Button } from '../../../components/atoms/Button'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { queryKeys } from '../../../lib/queryKeys'
import { ApiError } from '../../../services/http'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { useAdminAuth } from '../auth/useAdminAuth'
import { moderateSubmission } from '../api/moderateSubmission'
import { AdminSubmissionCard } from '../components/AdminSubmissionCard'
import { useAdminSubmissions } from '../hooks/useAdminSubmissions'
import type {
  AdminSubmissionFilter,
  AdminSubmissionStatusFilter,
  AdminSubmissionType,
} from '../types/admin'
import styles from './AdminDashboardPage.module.scss'

const statusFilters: AdminSubmissionStatusFilter[] = [
  'pending',
  'all',
  'approved',
  'rejected',
]

const typeFilters: AdminSubmissionFilter[] = [
  'all',
  'events',
  'restaurants',
  'tours',
]

export function AdminDashboardPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { session } = useAdminAuth()
  const token = session?.access_token ?? null
  const [activeStatus, setActiveStatus] = useState<AdminSubmissionStatusFilter>('pending')
  const [activeType, setActiveType] = useState<AdminSubmissionFilter>('all')
  const submissionsQuery = useAdminSubmissions(activeStatus, activeType, token)
  const items = submissionsQuery.data?.items ?? []
  const listErrorMessage =
    submissionsQuery.error instanceof ApiError
      ? submissionsQuery.error.message
      : t('admin.dashboard.error')

  const moderationMutation = useMutation({
    mutationFn: ({
      type,
      submissionId,
      action,
    }: {
      type: AdminSubmissionType
      submissionId: string
      action: 'approve' | 'reject'
    }) => moderateSubmission(type, submissionId, action, token ?? ''),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.admin.submissionsRoot,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.admin.submissionDetail(
            variables.type,
            variables.submissionId,
          ),
        }),
      ])
    },
  })

  const toolbarSummary = useMemo(
    () => [
      t('admin.dashboard.summary.status', {
        status: t(`admin.dashboard.statusFilters.${activeStatus}`),
      }),
      t('admin.dashboard.summary.type', {
        type: t(`admin.dashboard.typeFilters.${activeType}`),
      }),
    ],
    [activeStatus, activeType, t],
  )

  return (
    <section className={pageStyles.page}>
      <PageIntro
        eyebrow={t('admin.dashboard.eyebrow')}
        title={t('admin.dashboard.title')}
        description={t('admin.dashboard.description')}
      />

      <div className={styles.page}>
        <ContentPanel className={styles.toolbar}>
          <div className={styles.filterGroup}>
            <p className={styles.filterLabel}>{t('admin.dashboard.labels.status')}</p>
            <div className={styles.filters}>
              {statusFilters.map((status) => (
                <Button
                  key={status}
                  variant={activeStatus === status ? 'chipActive' : 'chip'}
                  onClick={() => setActiveStatus(status)}
                >
                  {t(`admin.dashboard.statusFilters.${status}`)}
                </Button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <p className={styles.filterLabel}>{t('admin.dashboard.labels.type')}</p>
            <div className={styles.filters}>
              {typeFilters.map((type) => (
                <Button
                  key={type}
                  variant={activeType === type ? 'chipActive' : 'chip'}
                  onClick={() => setActiveType(type)}
                >
                  {t(`admin.dashboard.typeFilters.${type}`)}
                </Button>
              ))}
            </div>
          </div>

          <div className={styles.summaryRow}>
            {toolbarSummary.map((item) => (
              <span key={item} className={styles.summaryPill}>
                {item}
              </span>
            ))}
          </div>
        </ContentPanel>

        {submissionsQuery.isLoading ? <p>{t('admin.dashboard.loading')}</p> : null}
        {submissionsQuery.isError ? (
          <ContentPanel>
            <p className={styles.empty} role="alert">
              {listErrorMessage}
            </p>
          </ContentPanel>
        ) : null}

        {!submissionsQuery.isLoading && !submissionsQuery.isError && items.length === 0 ? (
          <ContentPanel>
            <p className={styles.empty}>{t('admin.dashboard.empty')}</p>
          </ContentPanel>
        ) : null}

        {items.length > 0 ? (
          <div className={styles.cards}>
            {items.map((submission) => {
              const currentMutation = moderationMutation.variables

              return (
                <AdminSubmissionCard
                  key={`${submission.type}:${submission.id}`}
                  submission={submission}
                  isMutating={
                    moderationMutation.isPending &&
                    currentMutation?.submissionId === submission.id &&
                    currentMutation?.type === submission.type
                  }
                  onApprove={() =>
                    moderationMutation.mutate({
                      type: submission.type,
                      submissionId: submission.id,
                      action: 'approve',
                    })
                  }
                  onReject={() =>
                    moderationMutation.mutate({
                      type: submission.type,
                      submissionId: submission.id,
                      action: 'reject',
                    })
                  }
                />
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
