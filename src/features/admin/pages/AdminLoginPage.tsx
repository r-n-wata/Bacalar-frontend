import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Seo } from '../../../app/seo/Seo'
import { seoContentByLanguage } from '../../../app/seo/seoContent'
import { Button } from '../../../components/atoms/Button'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { TextInput } from '../../../components/atoms/TextInput'
import { FormField } from '../../../components/molecules/FormField'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { ApiError } from '../../../services/http'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { useAdminAuth } from '../auth/useAdminAuth'
import { getAdminSession } from '../api/getAdminSession'
import { useAdminSession } from '../hooks/useAdminSession'
import styles from './AdminLoginPage.module.scss'

type LoginLocationState = {
  from?: string
  errorMessage?: string
}

export function AdminLoginPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LoginLocationState | null
  const { session, isLoading, login, logout } = useAdminAuth()
  const adminSessionQuery = useAdminSession(session?.access_token ?? null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [requestError, setRequestError] = useState<string | null>(
    state?.errorMessage ?? null,
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const destination = state?.from ?? '/admin/submissions'
  const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const seo = seoContentByLanguage[language].adminLogin

  if (!isLoading && session && adminSessionQuery.data) {
    return <Navigate to={destination} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setRequestError(null)
    setIsSubmitting(true)

    try {
      const { session: nextSession, error } = await login(email, password)

      if (error) {
        setRequestError(error.message)
        return
      }

      if (!nextSession?.access_token) {
        setRequestError(t('admin.login.error'))
        return
      }

      await getAdminSession(nextSession.access_token)
      navigate(destination, { replace: true })
    } catch (error) {
      await logout()
      setRequestError(
        error instanceof ApiError ? error.message : t('admin.login.error'),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={pageStyles.page}>
      <Seo title={seo.title} description={seo.description} noIndex />
      <ContentPanel className={styles.panel} tone="warm">
        <div className={styles.page}>
          <PageIntro
            eyebrow={t('admin.login.eyebrow')}
            title={t('admin.login.title')}
            description={t('admin.login.description')}
          />

          <form className={styles.form} onSubmit={handleSubmit}>
            <FormField label={t('admin.login.fields.email')}>
              <TextInput
                type="email"
                autoComplete="email"
                aria-label={t('admin.login.fields.email')}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </FormField>

            <FormField label={t('admin.login.fields.password')}>
              <TextInput
                type="password"
                autoComplete="current-password"
                aria-label={t('admin.login.fields.password')}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </FormField>

            {requestError ? (
              <p className={styles.error} role="alert">
                {requestError}
              </p>
            ) : null}

            <div className={styles.actions}>
              <Button type="submit" variant="accent" disabled={isSubmitting}>
                {isSubmitting ? t('admin.login.submitting') : t('admin.login.action')}
              </Button>
            </div>
          </form>
        </div>
      </ContentPanel>
    </section>
  )
}
