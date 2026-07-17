import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { buildTourStructuredData } from '../../../app/seo/structuredDataSchema'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { DetailActions } from '../../../components/molecules/DetailActions'
import { DetailHero } from '../../../components/molecules/DetailHero'
import { DetailIntro } from '../../../components/molecules/DetailIntro'
import { DetailMetadataGrid } from '../../../components/molecules/DetailMetadataGrid'
import { DetailSidebar } from '../../../components/molecules/DetailSidebar'
import { EmbeddedMapSection } from '../../../components/molecules/EmbeddedMapSection'
import { ProviderCard } from '../../../components/molecules/ProviderCard'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { getFeaturePlaceholderImage } from '../../shared/lib/featureImage'
import { useTourDetail } from '../hooks/useTourDetail'

function getWhatsappHref(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : ''
}

function getInstagramHref(value: string) {
  const handle = value.replace(/^@/, '').trim()
  return handle ? `https://instagram.com/${handle}` : ''
}

function normalizeLongformText(value?: string) {
  return value?.replace(/\s+/g, ' ').trim().toLowerCase() ?? ''
}

export function TourDetailPage() {
  const { t } = useTranslation()
  const language = useAppLanguage()
  const { id } = useParams()
  const { data, isLoading, isError } = useTourDetail(id)

  if (isLoading) {
    return (
      <>
        <Seo
          title={t('shell.nav.tours')}
          description={t('tours.loading')}
        />
        <LoadingSpinner label={t('tours.loading')} />
      </>
    )
  }

  if (isError || !data) {
    return (
      <>
        <Seo
          title={t('shell.nav.tours')}
          description={t('tours.error')}
        />
        <p role="alert">{t('tours.error')}</p>
      </>
    )
  }

  const heroImage = data.image?.src
    ? data.image
    : data.imageUrls[0]
      ? { src: data.imageUrls[0], alt: data.name }
      : getFeaturePlaceholderImage({
          kind: 'tour',
          id: data.id,
          fallbackAlt: data.name,
        })
  const galleryImages = Array.from(
    new Set(
      [heroImage.src, ...data.imageUrls].filter(
        (url): url is string => Boolean(url),
      ),
    ),
  ).map((url, index) => ({
    src: url,
    alt: index === 0 ? data.name : `${data.name} ${index + 1}`,
  }))
  const operatorDescription =
    normalizeLongformText(data.operatorDescription) ===
    normalizeLongformText(data.description)
      ? undefined
      : data.operatorDescription
  const primarySidebarActions = [
    data.operatorWhatsapp
      ? {
          label: t('tours.actions.contactOperator'),
          href: getWhatsappHref(data.operatorWhatsapp),
        }
      : data.operatorWebsite
        ? {
            label: t('tours.actions.checkAvailability'),
            href: data.operatorWebsite,
          }
        : data.operatorInstagram
          ? {
              label: t('tours.actions.messageOnInstagram'),
              href: getInstagramHref(data.operatorInstagram),
            }
          : {
              label: t('tours.backToList'),
              to: '/tours',
              variant: 'secondary' as const,
            },
  ].filter((action) => ('href' in action ? Boolean(action.href) : true))

  return (
    <section className={pageStyles.page}>
      <Seo
        title={`${data.name} | ${t('shell.nav.tours')}`}
        description={data.description}
        image={heroImage.src}
      />
      <StructuredData
        data={buildTourStructuredData({
          language,
          pathname: data.route,
          name: data.name,
          description: data.description,
          duration: data.duration,
          image: heroImage,
          providerName: data.operatorName,
          address: data.address,
        })}
      />
      <DetailHero
        eyebrow={t('tours.detailEyebrow')}
        images={galleryImages}
        galleryAriaLabel={t('tours.galleryAriaLabel')}
        viewAllLabel={t('common.gallery.viewAllPhotos')}
        closeLabel={t('common.gallery.close')}
        previousLabel={t('common.gallery.previous')}
        nextLabel={t('common.gallery.next')}
        countLabel={(current, total) =>
          t('common.gallery.count', { current, total })
        }
      />

      <DetailIntro
        title={data.name}
        summary={data.description}
        badges={[data.category]}
        highlights={[
          {
            label: t('tours.meta.price'),
            value: data.priceFrom,
          },
          {
            label: t('tours.meta.duration'),
            value: data.duration,
          },
        ]}
      />

      <div className={pageStyles.layout}>
        <div className={pageStyles.mainColumn}>
          <DetailMetadataGrid
            ariaLabel={t('tours.detailMetaAriaLabel')}
            items={[
              {
                label: t('tours.meta.difficulty'),
                value: data.difficulty,
              },
              {
                label: t('tours.meta.bestFor'),
                value: data.bestFor,
              },
              {
                label: t('tours.meta.suitableForKids'),
                value: data.suitableForKids,
              },
            ]}
          />

          <article className={pageStyles.bodyCard}>
            {data.included ? (
              <section className={pageStyles.detailSection}>
                <h2>{t('tours.sections.included')}</h2>
                <p className={pageStyles.bodyCopy}>{data.included}</p>
              </section>
            ) : null}
            {data.whatToBring ? (
              <section className={pageStyles.detailSection}>
                <h2>{t('tours.sections.whatToBring')}</h2>
                <p className={pageStyles.bodyCopy}>{data.whatToBring}</p>
              </section>
            ) : null}
            {data.meetingPoint ? (
              <section className={pageStyles.detailSection}>
                <h2>{t('tours.sections.meetingPoint')}</h2>
                <p className={pageStyles.bodyCopy}>
                  {data.address ?? data.meetingPoint}
                </p>
              </section>
            ) : null}
            {data.mapEmbedUrl ? (
              <section className={pageStyles.detailSection}>
                <EmbeddedMapSection
                  title={t('common.labels.location')}
                  description={data.address ?? data.meetingPoint}
                  embedUrl={data.mapEmbedUrl}
                  mapUrl={data.mapUrl}
                  frameTitle={`${data.name} map`}
                />
              </section>
            ) : null}
            <section className={pageStyles.detailSection}>
              <h2>{t('tours.sections.operator')}</h2>
              <div className={pageStyles.metaGrid}>
                <article className={pageStyles.metaCard}>
                  <span>{t('tours.operator.name')}</span>
                  <strong>{data.operatorName}</strong>
                </article>
                {data.operatorPrimaryContactMethod ? (
                  <article className={pageStyles.metaCard}>
                    <span>{t('tours.operator.primaryContactMethod')}</span>
                    <strong>{data.operatorPrimaryContactMethod}</strong>
                  </article>
                ) : null}
                {data.operatorWhatsapp ? (
                  <article className={pageStyles.metaCard}>
                    <span>{t('tours.operator.whatsapp')}</span>
                    <strong>{data.operatorWhatsapp}</strong>
                  </article>
                ) : null}
                {data.operatorInstagram ? (
                  <article className={pageStyles.metaCard}>
                    <span>{t('tours.operator.instagram')}</span>
                    <strong>{data.operatorInstagram}</strong>
                  </article>
                ) : null}
                {data.operatorWebsite ? (
                  <article className={pageStyles.metaCard}>
                    <span>{t('tours.operator.website')}</span>
                    <strong>{data.operatorWebsite}</strong>
                  </article>
                ) : null}
              </div>
             
              <ProviderCard
                eyebrow={t('tours.providerEyebrow')}
                title={data.operatorName}
                description={operatorDescription}
                actions={[
                  ...(data.operatorWhatsapp
                    ? [
                        {
                          label: t('tours.operator.whatsapp'),
                          href: getWhatsappHref(data.operatorWhatsapp),
                        },
                      ]
                    : []),
                  ...(data.operatorInstagram
                    ? [
                        {
                          label: t('tours.operator.instagram'),
                          href: getInstagramHref(data.operatorInstagram),
                        },
                      ]
                    : []),
                  ...(data.operatorWebsite
                    ? [
                        {
                          label: t('tours.operator.website'),
                          href: data.operatorWebsite,
                        },
                      ]
                    : []),
                ]}
              />
            </section>
          </article>
        </div>

        <div className={pageStyles.hideOnNarrow}>
          <DetailSidebar title={t('tours.sidebar.title')}>
            <div className={pageStyles.sidebarFacts}>
              <div className={pageStyles.sidebarFact}>
                <span>{t('tours.meta.category')}</span>
                <strong>{data.category}</strong>
              </div>
              <div className={pageStyles.sidebarFact}>
                <span>{t('tours.meta.privateOrShared')}</span>
                <strong>{data.privateOrShared}</strong>
              </div>
            </div>
            <DetailActions compact actions={primarySidebarActions} />
            <DetailActions
              compact
              actions={[
                ...('to' in primarySidebarActions[0] &&
                primarySidebarActions[0].to === '/tours'
                  ? []
                  : [
                      {
                        label: t('tours.backToList'),
                        to: '/tours',
                        variant: 'secondary' as const,
                      },
                    ]),
              ]}
            />
          </DetailSidebar>
        </div>
      </div>
    </section>
  )
}
