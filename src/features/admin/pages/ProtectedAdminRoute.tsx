import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { ApiError } from '../../../services/http'
import { AdminGatePlaceholder } from '../components/AdminPagePlaceholders'
import { useAdminAuth } from '../auth/useAdminAuth'
import { useAdminSession } from '../hooks/useAdminSession'

export function ProtectedAdminRoute() {
  const { t } = useTranslation()
  const location = useLocation()
  const { session, isLoading, logout } = useAdminAuth()
  const token = session?.access_token ?? null
  const adminSessionQuery = useAdminSession(token)
  const authError =
    adminSessionQuery.error instanceof ApiError ? adminSessionQuery.error : null

  useEffect(() => {
    if (authError && (authError.status === 401 || authError.status === 403)) {
      void logout()
    }
  }, [authError, logout])

  if (isLoading) {
    return <AdminGatePlaceholder testIdPrefix="admin-auth-gate" />
  }

  if (!session) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  if (adminSessionQuery.isLoading) {
    return <AdminGatePlaceholder testIdPrefix="admin-session-gate" />
  }

  if (authError && (authError.status === 401 || authError.status === 403)) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: `${location.pathname}${location.search}`,
          errorMessage: authError.message,
        }}
      />
    )
  }

  if (adminSessionQuery.isError) {
    const errorMessage =
      adminSessionQuery.error instanceof ApiError
        ? adminSessionQuery.error.message
        : t('admin.dashboard.error')

    return (
      <ContentPanel>
        <PageIntro
          eyebrow={t('admin.dashboard.eyebrow')}
          title={t('admin.dashboard.title')}
          description={errorMessage}
          compact
        />
      </ContentPanel>
    )
  }

  return <Outlet />
}
