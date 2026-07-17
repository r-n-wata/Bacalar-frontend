import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Seo } from '../../../app/seo/Seo'
import { seoContentByLanguage } from '../../../app/seo/seoContent'
import { Button } from '../../../components/atoms/Button'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { queryKeys } from '../../../lib/queryKeys'
import { ApiError } from '../../../services/http'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { useAdminAuth } from '../auth/useAdminAuth'
import { archiveAdminPublishedContent } from '../api/archiveAdminPublishedContent'
import { updateAdminPublishedContentFeature } from '../api/updateAdminPublishedContentFeature'
import { useAdminPublishedContent } from '../hooks/useAdminPublishedContent'
import type { AdminPublishedContentItem, AdminPublishedContentType } from '../types/admin'
import styles from './AdminPublishedContentPage.module.scss'
import { formatRestaurantMoments } from '../../restaurants/lib/formatRestaurantMoments'

const contentTypes: AdminPublishedContentType[] = ['events', 'restaurants', 'tours']

function getTypeMeta(
  item: AdminPublishedContentItem,
  t: (key: string) => string,
) {
  switch (item.type) {
    case 'events':
      return t(`events.categories.${item.category}`)
    case 'restaurants':
      return formatRestaurantMoments(item.moments, t)
    case 'tours':
      return t(`tours.categories.${item.category}`)
  }
}

export function AdminPublishedContentPage() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const location = useLocation()
  const navigate = useNavigate()
  const { session } = useAdminAuth()
  const token = session?.access_token ?? null
  const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const seo = seoContentByLanguage[language].adminContent
  const [activeType, setActiveType] = useState<AdminPublishedContentType>('events')
  const [flashMessage, setFlashMessage] = useState<string | null>(
    typeof location.state === 'object' &&
      location.state !== null &&
      'flashMessage' in location.state &&
      typeof location.state.flashMessage === 'string'
      ? location.state.flashMessage
      : null,
  )
  const [deleteTarget, setDeleteTarget] = useState<AdminPublishedContentItem | null>(null)
  const contentQuery = useAdminPublishedContent(activeType, token)
  const items = contentQuery.data?.items ?? []
  const featuredCount = contentQuery.data?.featuredCount ?? 0
  const featuredCap = contentQuery.data?.featuredCap ?? 5
  const listErrorMessage =
    contentQuery.error instanceof ApiError
      ? contentQuery.error.message
      : t('admin.content.error')

  const featureMutation = useMutation({
    mutationFn: ({
      id,
      isFeatured,
    }: {
      id: string
      isFeatured: boolean
    }) => updateAdminPublishedContentFeature(activeType, id, isFeatured, token ?? ''),
    onSuccess: async () => {
      setFlashMessage(t('admin.content.featureUpdated'))
      await queryClient.invalidateQueries({
        queryKey: queryKeys.admin.content(language, activeType),
      })
      await queryClient.invalidateQueries({
        queryKey: queryKeys.home.content(language),
      })
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.events.list(language, 'all', 10) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.list(language, 'all', 2) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.tours.list(language, 'all', 2) }),
      ])
    },
  })

  const archiveMutation = useMutation({
    mutationFn: ({ type, id }: { type: AdminPublishedContentType; id: string }) =>
      archiveAdminPublishedContent(type, id, token ?? ''),
    onSuccess: async () => {
      setDeleteTarget(null)
      setFlashMessage(t('admin.content.delete.success'))
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.admin.contentRoot }),
        queryClient.invalidateQueries({ queryKey: ['home'] }),
        queryClient.invalidateQueries({ queryKey: ['events'] }),
        queryClient.invalidateQueries({ queryKey: ['restaurants'] }),
        queryClient.invalidateQueries({ queryKey: ['tours'] }),
      ])
    },
  })

  function clearFlash() {
    setFlashMessage(null)
    navigate(location.pathname, { replace: true, state: null })
  }

  return (
    <section className={pageStyles.page}>
      <Seo title={seo.title} description={seo.description} noIndex />
      <PageIntro
        eyebrow={t('admin.content.eyebrow')}
        title={t('admin.content.title')}
        description={t('admin.content.description')}
      />

      <div className={styles.page}>
        <ContentPanel className={styles.toolbar}>
          <div className={styles.navRow}>
            <Link className={styles.link} to="/admin/submissions">
              {t('admin.content.links.submissions')}
            </Link>
          </div>
          <div className={styles.navRow}>
            {contentTypes.map((type) => (
              <Button
                key={type}
                variant={activeType === type ? 'chipActive' : 'chip'}
                onClick={() => setActiveType(type)}
              >
                {t(`admin.dashboard.typeFilters.${type}`)}
              </Button>
            ))}
          </div>
          <div className={styles.summary}>
            <span className={styles.summaryPill}>
              {t('admin.content.summary.count', {
                count: featuredCount,
                cap: featuredCap,
              })}
            </span>
          </div>
        </ContentPanel>

        {flashMessage ? (
          <ContentPanel>
            <div className={styles.flashRow}>
              <p className={styles.flashMessage}>{flashMessage}</p>
              <button className={styles.dismissButton} type="button" onClick={clearFlash}>
                {t('admin.content.actions.dismiss')}
              </button>
            </div>
          </ContentPanel>
        ) : null}

        {contentQuery.isLoading ? (
          <LoadingSpinner label={t('admin.content.loading')} />
        ) : null}
        {contentQuery.isError ? (
          <ContentPanel>
            <p className={styles.empty} role="alert">
              {listErrorMessage}
            </p>
          </ContentPanel>
        ) : null}
        {!contentQuery.isLoading && !contentQuery.isError && items.length === 0 ? (
          <ContentPanel>
            <p className={styles.empty}>{t('admin.content.empty')}</p>
          </ContentPanel>
        ) : null}

        {items.length > 0 ? (
          <div className={styles.cards}>
            {items.map((item) => {
              const isBusy =
                featureMutation.isPending && featureMutation.variables?.id === item.id
              const isDeleting =
                archiveMutation.isPending &&
                archiveMutation.variables?.id === item.id
              const disableFeature =
                !item.isFeatured && featuredCount >= featuredCap

              return (
                <ContentPanel key={`${item.type}:${item.id}`} className={styles.card}>
                  {item.image ? (
                    <div className={styles.media}>
                      <img src={item.image.src} alt={item.image.alt} />
                    </div>
                  ) : (
                    <div className={styles.mediaFallback} aria-hidden="true">
                      <span>{getTypeMeta(item, t)}</span>
                    </div>
                  )}

                  <div className={styles.cardBody}>
                    <p className={styles.eyebrow}>
                      {t(`admin.dashboard.typeFilters.${item.type}`)}
                    </p>
                    <h2 className={styles.title}>{item.title}</h2>
                    <p className={styles.subtitle}>{item.subtitle}</p>
                    <div className={styles.statusRow}>
                      <span className={styles.statusPill}>
                        {item.isFeatured
                          ? t('admin.content.featured')
                          : t('admin.content.notFeatured')}
                      </span>
                      <span className={styles.statusPill}>{getTypeMeta(item, t)}</span>
                    </div>
                    <div className={styles.actions}>
                      <Button
                        variant={item.isFeatured ? 'secondary' : 'accent'}
                        disabled={isBusy || isDeleting || disableFeature}
                        onClick={() =>
                          featureMutation.mutate({
                            id: item.id,
                            isFeatured: !item.isFeatured,
                          })
                        }
                      >
                        {item.isFeatured
                          ? t('admin.content.actions.remove')
                          : t('admin.content.actions.add')}
                      </Button>
                      <Link className={styles.link} to={`/admin/content/${item.type}/${item.id}/edit`}>
                        {t('admin.content.actions.edit')}
                      </Link>
                      <Button
                        variant="secondary"
                        disabled={isDeleting}
                        onClick={() => setDeleteTarget(item)}
                      >
                        {isDeleting
                          ? t('admin.content.delete.deleting')
                          : t('admin.content.actions.delete')}
                      </Button>
                      <Link className={styles.link} to={item.route}>
                        {t('admin.content.actions.open')}
                      </Link>
                    </div>
                  </div>
                </ContentPanel>
              )
            })}
          </div>
        ) : null}

        {archiveMutation.isError ? (
          <ContentPanel>
            <p role="alert" className={styles.empty}>
              {archiveMutation.error instanceof ApiError
                ? archiveMutation.error.message
                : t('admin.content.delete.error')}
            </p>
          </ContentPanel>
        ) : null}

        {deleteTarget ? (
          <div className={styles.dialogBackdrop}>
            <ContentPanel className={styles.dialog} role="dialog" aria-modal="true">
              <p className={styles.dialogTitle}>{t('admin.content.delete.title')}</p>
              <p className={styles.dialogCopy}>
                {t('admin.content.delete.description', {
                  title: deleteTarget.title,
                })}
              </p>
              <div className={styles.actions}>
                <Button
                  variant="accent"
                  disabled={archiveMutation.isPending}
                  onClick={() =>
                    archiveMutation.mutate({
                      type: deleteTarget.type,
                      id: deleteTarget.id,
                    })
                  }
                >
                  {archiveMutation.isPending
                    ? t('admin.content.delete.deleting')
                    : t('admin.content.delete.confirm')}
                </Button>
                <Button
                  variant="secondary"
                  disabled={archiveMutation.isPending}
                  onClick={() => setDeleteTarget(null)}
                >
                  {t('admin.content.delete.cancel')}
                </Button>
              </div>
            </ContentPanel>
          </div>
        ) : null}
      </div>
    </section>
  )
}
