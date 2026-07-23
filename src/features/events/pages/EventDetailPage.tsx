import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { buildEventStructuredData } from '../../../app/seo/structuredDataSchema'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { DetailActions } from '../../../components/molecules/DetailActions'
import { DetailHero } from '../../../components/molecules/DetailHero'
import { DetailIntro } from '../../../components/molecules/DetailIntro'
import { DetailSidebar } from '../../../components/molecules/DetailSidebar'
import { EmbeddedMapSection } from '../../../components/molecules/EmbeddedMapSection'
import { ListingContactSection } from '../../../components/organisms/ListingContactSection'
import { PublicStatusPanel } from '../../../components/organisms/PublicStatusPanel'
import { ApiError } from '../../../services/http'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { buildContactActions } from '../../shared/lib/contact'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import { getMoodTranslationKey, isUpcomingEvent } from '../lib/presentation'
import { useEventDetail } from '../hooks/useEventDetail'

export function EventDetailPage() {
  const { t } = useTranslation()
  const language = useAppLanguage()
  const { id } = useParams()
  const { data, isLoading, isError, error, refetch } = useEventDetail(id)

  if (isLoading) {
    return (
      <>
        <Seo
          title={t('shell.nav.events')}
          description={t('events.loading')}
        />
        <LoadingSpinner label={t('events.loading')} />
      </>
    )
  }

  if (isError || !data) {
    const isMissing = error instanceof ApiError && error.status === 404
    const description = isMissing
      ? t('events.detailUnavailableDescription')
      : t('events.error')

    return (
      <>
        <Seo
          title={t('shell.nav.events')}
          description={description}
        />
        <PublicStatusPanel
          role="alert"
          eyebrow={
            isMissing ? t('events.detailUnavailableEyebrow') : t('events.errorEyebrow')
          }
          title={
            isMissing ? t('events.detailUnavailableTitle') : t('events.errorTitle')
          }
          description={description}
          actions={
            isMissing
              ? [
                  {
                    kind: 'link' as const,
                    label: t('events.backToList'),
                    to: '/events',
                  },
                ]
              : [
                  {
                    kind: 'button' as const,
                    label: t('common.retry'),
                    onClick: () => void refetch(),
                  },
                  {
                    kind: 'link' as const,
                    label: t('events.backToList'),
                    to: '/events',
                  },
                ]
          }
        />
      </>
    )
  }

  const moodLabel = t(getMoodTranslationKey(data.category))
  const showUpcoming = isUpcomingEvent(data)
  const hasContactActions = buildContactActions(data.contact, language).length > 0
  const heroImage = resolveFeatureImage({
    kind: 'event',
    id: data.id,
    image: data.image,
    fallbackAlt: data.title,
  })
  const heroImages = [heroImage]

  return (
    <section
      className={`${pageStyles.page} ${hasContactActions ? pageStyles.pageWithStickyContact : ''}`.trim()}
    >
      <Seo
        title={`${data.title} | ${t('shell.nav.events')}`}
        description={data.description}
        image={heroImage.src}
      />
      <StructuredData
        data={buildEventStructuredData({
          language,
          pathname: data.route,
          title: data.title,
          description: data.description,
          dateLabel: data.dateLabel,
          venue: data.venue,
          address: data.address,
          startsAt: data.startsAt,
          endsAt: data.endsAt,
          image: heroImage,
        })}
      />
      <DetailHero
        eyebrow={t('events.detailEyebrow')}
        images={heroImages}
        galleryAriaLabel={t('events.galleryAriaLabel')}
        viewAllLabel={t('common.gallery.viewAllPhotos')}
        closeLabel={t('common.gallery.close')}
        previousLabel={t('common.gallery.previous')}
        nextLabel={t('common.gallery.next')}
        countLabel={(current, total) =>
          t('common.gallery.count', { current, total })
        }
      />

      <DetailIntro
        title={data.title}
        summary={data.description}
        badges={[
          ...(showUpcoming ? [t('events.badges.upcoming')] : []),
          t(`events.categories.${data.category}`),
        ]}
        highlights={[
          {
            label: t('events.meta.when'),
            value: data.dateLabel,
          },
          {
            label: t('events.meta.where'),
            value: data.venue,
          },
        ]}
      />

      <div className={pageStyles.layout}>
        <div className={pageStyles.mainColumn}>
          <article className={pageStyles.bodyCard}>
            <p className={pageStyles.bodyLead}>
              {showUpcoming
                ? t('events.detailNote.upcoming')
                : t('events.detailNote.thisWeek')}
            </p>
            <p className={pageStyles.bodyCopy}>{data.description}</p>
            <ListingContactSection
              contact={data.contact}
              listingId={data.id}
              listingType="events"
              listingName={data.title}
              currentLanguage={language}
            />
            {data.mapEmbedUrl ? (
              <section className={pageStyles.detailSection}>
                <EmbeddedMapSection
                  title={t('common.labels.location')}
                  description={data.address ?? data.venue}
                  embedUrl={data.mapEmbedUrl}
                  mapUrl={data.mapUrl}
                  frameTitle={`${data.title} map`}
                />
              </section>
            ) : null}
            <div className={pageStyles.actions}>
              <Link className={pageStyles.primaryAction} to="/events">
                {t('events.backToList')}
              </Link>
              <Link className={pageStyles.secondaryAction} to="/">
                {t('events.backHome')}
              </Link>
            </div>
          </article>
        </div>

        <DetailSidebar title={t('events.sidebar.title')}>
          <div className={pageStyles.sidebarFacts}>
            <div className={pageStyles.sidebarFact}>
              <span>{t('events.meta.type')}</span>
              <strong>{t(`events.categories.${data.category}`)}</strong>
            </div>
            <div className={pageStyles.sidebarFact}>
              <span>{t('events.meta.mood')}</span>
              <strong>{moodLabel}</strong>
            </div>
          </div>
          <DetailActions
            compact
            actions={[
              {
                label: t('events.backToList'),
                to: '/events',
                variant: 'secondary',
              },
            ]}
          />
        </DetailSidebar>
      </div>
    </section>
  )
}
