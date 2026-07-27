import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import arrowLeftIcon from '../../../assets/icons/arrow-left.png'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { buildEventStructuredData } from '../../../app/seo/structuredDataSchema'
import { DetailActions } from '../../../components/molecules/DetailActions'
import { DetailSection } from '../../../components/molecules/DetailSection'
import { DetailHero } from '../../../components/molecules/DetailHero'
import { DetailIntro } from '../../../components/molecules/DetailIntro'
import { DetailMetadataGrid } from '../../../components/molecules/DetailMetadataGrid'
import { EmbeddedMapSection } from '../../../components/molecules/EmbeddedMapSection'
import { ListingContactSection } from '../../../components/organisms/ListingContactSection'
import { PublicStatusPanel } from '../../../components/organisms/PublicStatusPanel'
import { ApiError } from '../../../services/http'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { DetailPagePlaceholder } from '../../shared/components/DetailPagePlaceholders'
import { buildContactActions } from '../../shared/lib/contact'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import { buildMapEmbedUrl, buildMapUrl } from '../../shared/lib/maps'
import { getMoodTranslationKey, isUpcomingEvent } from '../lib/presentation'
import { useEventDetail } from '../hooks/useEventDetail'

export function EventDetailPage() {
  const { t } = useTranslation()
  const language = useAppLanguage()
  const { id } = useParams()
  const { data, isLoading, isError, error, refetch } = useEventDetail(id)

  if (isLoading) {
    return (
      <section className={pageStyles.page}>
        <Seo
          title={t('shell.nav.events')}
          description={t('events.loading')}
        />
        <DetailPagePlaceholder
          eyebrow={t('events.detailEyebrow')}
          testIdPrefix="event-detail"
          showMetaGrid={false}
        />
      </section>
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
  const resolvedMapUrl = data.mapUrl ?? buildMapUrl(data.address ?? data.venue)
  const resolvedMapEmbedUrl =
    data.mapEmbedUrl ?? buildMapEmbedUrl(data.address ?? data.venue)
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
      <div className={pageStyles.backLinkRow}>
        <Link className={pageStyles.backLink} to="/events">
          <img
            className={pageStyles.backLinkIcon}
            src={arrowLeftIcon}
            alt=""
            aria-hidden="true"
          />
          {t('events.backToList')}
        </Link>
      </div>

      <div className={pageStyles.layout}>
        <div className={pageStyles.mainColumn}>
          <DetailHero
            eyebrow={t('events.detailEyebrow')}
            images={heroImages}
            galleryAriaLabel={t('events.galleryAriaLabel')}
            closeLabel={t('common.gallery.close')}
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
          />

          <DetailMetadataGrid
            ariaLabel={t('events.detailMetaAriaLabel')}
            items={[
              {
                label: t('events.meta.when'),
                value: data.dateLabel,
              },
              {
                label: t('events.meta.where'),
                value: data.venue,
              },
              {
                label: t('events.meta.type'),
                value: t(`events.categories.${data.category}`),
              },
              {
                label: t('events.meta.mood'),
                value: moodLabel,
              },
            ]}
          />

          <div className={pageStyles.mobileOnlySection}>
            <section className={pageStyles.sidebarCard}>
              <h2 className={pageStyles.sidebarTitle}>{t('events.sidebar.title')}</h2>
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
            </section>

          </div>

          <article className={pageStyles.bodyCard}>
            <DetailSection title={t('events.sections.about')}>
              <p className={pageStyles.bodyCopy}>
                {showUpcoming
                  ? t('events.detailNote.upcoming')
                  : t('events.detailNote.thisWeek')}
              </p>
              <p className={pageStyles.bodyCopy}>{data.description}</p>
            </DetailSection>
            {resolvedMapEmbedUrl ? (
              <section className={`${pageStyles.detailSection} ${pageStyles.mobileOnlySection}`}>
                <EmbeddedMapSection
                  title={t('common.labels.location')}
                  description={data.address ?? data.venue}
                  embedUrl={resolvedMapEmbedUrl}
                  mapUrl={resolvedMapUrl}
                  frameTitle={`${data.title} map`}
                />
              </section>
            ) : null}
            <ListingContactSection
              contact={data.contact}
              listingId={data.id}
              listingType="events"
              listingName={data.title}
              currentLanguage={language}
            />
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

        <aside className={`${pageStyles.sidebarColumn} ${pageStyles.hideOnNarrow}`}>
          <div className={pageStyles.sidebarStickyStack}>
            <section className={pageStyles.sidebarCard}>
              <h2 className={pageStyles.sidebarTitle}>{t('events.sidebar.title')}</h2>
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
            </section>
            {resolvedMapEmbedUrl ? (
              <section className={pageStyles.sidebarCard}>
                <EmbeddedMapSection
                  title={t('common.labels.location')}
                  description={data.address ?? data.venue}
                  embedUrl={resolvedMapEmbedUrl}
                  mapUrl={resolvedMapUrl}
                  frameTitle={`${data.title} map`}
                />
              </section>
            ) : null}
            <section className={pageStyles.sidebarCard}>
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
            </section>
          </div>
        </aside>
      </div>
    </section>
  )
}
