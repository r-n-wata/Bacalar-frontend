import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { buildTourStructuredData } from '../../../app/seo/structuredDataSchema'
import { DetailActions } from '../../../components/molecules/DetailActions'
import { DetailSection } from '../../../components/molecules/DetailSection'
import { DetailHero } from '../../../components/molecules/DetailHero'
import { DetailIntro } from '../../../components/molecules/DetailIntro'
import { DetailMetadataGrid } from '../../../components/molecules/DetailMetadataGrid'
import { EmbeddedMapSection } from '../../../components/molecules/EmbeddedMapSection'
import { ListingContactSection } from '../../../components/organisms/ListingContactSection'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { DetailPagePlaceholder } from '../../shared/components/DetailPagePlaceholders'
import { buildContactActions } from '../../shared/lib/contact'
import { getFeaturePlaceholderImage } from '../../shared/lib/featureImage'
import { useTourDetail } from '../hooks/useTourDetail'

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
      <section className={pageStyles.page}>
        <Seo
          title={t('shell.nav.tours')}
          description={t('tours.loading')}
        />
        <DetailPagePlaceholder
          eyebrow={t('tours.detailEyebrow')}
          testIdPrefix="tour-detail"
        />
      </section>
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
  const hasContactActions = buildContactActions(data.contact, language).length > 0
  const includedItems = data.includedItems ?? []
  const includedFallback = t('tours.sections.includedFallback')
  const planningFacts = [
    {
      label: t('tours.meta.category'),
      value: data.category,
    },
    {
      label: t('tours.meta.privateOrShared'),
      value: data.privateOrShared,
    },
  ]
  const factItems = [
    {
      label: t('tours.meta.price'),
      value: data.priceFrom,
    },
    {
      label: t('tours.meta.duration'),
      value: data.duration,
    },
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
    {
      label: t('tours.meta.privateOrShared'),
      value: data.privateOrShared,
    },
  ]

  return (
    <section
      className={`${pageStyles.page} ${hasContactActions ? pageStyles.pageWithStickyContact : ''}`.trim()}
    >
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
      <div className={pageStyles.backLinkRow}>
        <Link className={pageStyles.backLink} to="/tours">
          {t('tours.backToList')}
        </Link>
      </div>

      <div className={pageStyles.layout}>
        <div className={pageStyles.mainColumn}>
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
          />

          <DetailMetadataGrid
            ariaLabel={t('tours.detailMetaAriaLabel')}
            items={factItems}
          />

          <div className={pageStyles.mobileOnlySection}>
            <section className={pageStyles.sidebarCard}>
              <h2 className={pageStyles.sidebarTitle}>{t('tours.sidebar.title')}</h2>
              <div className={pageStyles.sidebarFacts}>
                {planningFacts.map((item) => (
                  <div
                    key={`${item.label}-${item.value}`}
                    className={pageStyles.sidebarFact}
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <article className={pageStyles.bodyCard}>
            <DetailSection title={t('tours.sections.about')}>
              <p className={pageStyles.bodyCopy}>{data.description}</p>
            </DetailSection>

            <section className={`${pageStyles.detailSection} ${pageStyles.mobileOnlySection}`}>
              <h2>{t('tours.sections.included')}</h2>
              {includedItems.length > 0 ? (
                <ul className={pageStyles.checklist}>
                  {includedItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className={pageStyles.bodyCopy}>{includedFallback}</p>
              )}
            </section>

            {data.whatToBring ? (
              <DetailSection title={t('tours.sections.whatToBring')}>
                <p className={pageStyles.bodyCopy}>{data.whatToBring}</p>
              </DetailSection>
            ) : null}

            <ListingContactSection
              contact={data.contact}
              listingType="tours"
              currentLanguage={language}
              eyebrow={t('tours.providerEyebrow')}
              title={data.operatorName}
              description={
                operatorDescription ??
                t('common.contact.provider', {
                  providerName: data.operatorName,
                })
              }
            />

            {data.meetingPoint || data.mapEmbedUrl ? (
              <DetailSection title={t('tours.sections.meetingPoint')}>
                {data.meetingPoint || data.address ? (
                  <p className={pageStyles.bodyCopy}>
                    {data.address ?? data.meetingPoint}
                  </p>
                ) : null}
                {data.mapEmbedUrl ? (
                  <EmbeddedMapSection
                    title={t('common.labels.location')}
                    description={data.address ?? data.meetingPoint}
                    embedUrl={data.mapEmbedUrl}
                    mapUrl={data.mapUrl}
                    frameTitle={`${data.name} map`}
                  />
                ) : null}
              </DetailSection>
            ) : null}
          </article>
        </div>

        <aside className={`${pageStyles.sidebarColumn} ${pageStyles.hideOnNarrow}`}>
          <div className={pageStyles.sidebarStickyStack}>
            <section className={pageStyles.sidebarCard}>
              <h2 className={pageStyles.sidebarTitle}>{t('tours.sidebar.title')}</h2>
              <div className={pageStyles.sidebarFacts}>
                {planningFacts.map((item) => (
                  <div
                    key={`${item.label}-${item.value}`}
                    className={pageStyles.sidebarFact}
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className={pageStyles.sidebarCard}>
              <h2 className={pageStyles.sidebarTitle}>
                {t('tours.sections.included')}
              </h2>
              {includedItems.length > 0 ? (
                <ul className={pageStyles.checklist}>
                  {includedItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className={pageStyles.bodyCopy}>{includedFallback}</p>
              )}
            </section>

            <section className={pageStyles.sidebarCard}>
              <DetailActions
                compact
                actions={[
                  {
                    label: t('tours.backToList'),
                    to: '/tours',
                    variant: 'secondary' as const,
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
