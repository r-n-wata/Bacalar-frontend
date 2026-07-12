import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../seo/Seo'
import { PublicStatusPanel } from '../../components/organisms/PublicStatusPanel'
import pageStyles from '../../styles/FeaturePage.module.scss'

type PublicRouteStatusPageProps = {
  mode?: 'notFound' | 'error'
}

export function PublicRouteStatusPage({
  mode = 'error',
}: PublicRouteStatusPageProps) {
  const { t } = useTranslation()
  const routeError = useRouteError()
  const isNotFoundError =
    mode === 'notFound' ||
    (isRouteErrorResponse(routeError) && routeError.status === 404)

  const title = isNotFoundError
    ? t('status.notFound.title')
    : t('status.error.title')
  const description = isNotFoundError
    ? t('status.notFound.description')
    : t('status.error.description')

  return (
    <section className={pageStyles.page}>
      <Seo title={title} description={description} noIndex />
      <PublicStatusPanel
        eyebrow={isNotFoundError ? t('status.notFound.eyebrow') : t('status.error.eyebrow')}
        title={title}
        description={description}
        actions={[
          {
            kind: 'link',
            label: t('status.actions.home'),
            to: '/',
          },
        ]}
      />
    </section>
  )
}
