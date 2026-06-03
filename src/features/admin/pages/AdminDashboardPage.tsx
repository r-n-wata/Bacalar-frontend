import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { queryKeys } from '../../../lib/queryKeys'
import { ApiError } from '../../../services/http'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { useAdminAuth } from '../auth/useAdminAuth'
import { moderateSubmission } from '../api/moderateSubmission'
import { AdminSubmissionCard } from '../components/AdminSubmissionCard'
import { usePendingSubmissions } from '../hooks/usePendingSubmissions'
import type { AdminSubmissionFilter, AdminSubmissionType } from '../types/admin'
import styles from './AdminDashboardPage.module.scss'

const filters: AdminSubmissionFilter[] = [
  'all',
  'events',
  'restaurants',
  'tours',
]

export function AdminDashboardPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { session, logout } = useAdminAuth()
  const [activeFilter, setActiveFilter] = useState<AdminSubmissionFilter>('all')
  const token = session?.access_token ?? null
  const submissionsQuery = usePendingSubmissions(activeFilter, token)
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.admin.submissionsRoot,
      })
    },
  })

  async function handleLogout() {
    await logout()
  }

  return (
    <section className={pageStyles.page}>
      <PageIntro
        eyebrow={t('admin.dashboard.eyebrow')}
        title={t('admin.dashboard.title')}
        description={t('admin.dashboard.description')}
      />

      <div className={styles.page}>
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'chipActive' : 'chip'}
                onClick={() => setActiveFilter(filter)}
              >
                {t(`admin.dashboard.filters.${filter}`)}
              </Button>
            ))}
          </div>

          <Button variant="secondary" onClick={() => void handleLogout()}>
            {t('admin.dashboard.actions.logout')}
          </Button>
        </div>

        {submissionsQuery.isLoading ? <p>{t('admin.dashboard.loading')}</p> : null}
        {submissionsQuery.isError ? (
          <ContentPanel>
            <p className={styles.empty} role="alert">
              {listErrorMessage}
            </p>
          </ContentPanel>
        ) : null}

        {!submissionsQuery.isLoading &&
        !submissionsQuery.isError &&
        items.length === 0 ? (
          <ContentPanel>
            <p className={styles.empty}>{t('admin.dashboard.empty')}</p>
          </ContentPanel>
        ) : null}

        {items.length > 0 ? (
          <div className={styles.cards}>
            {items.map((submission) => {
              const pendingKey = `${submission.type}:${submission.id}`
              const currentMutation = moderationMutation.variables

              return (
                <AdminSubmissionCard
                  key={pendingKey}
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
