import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import arrowLeftIcon from '../../../assets/icons/arrow-left.png'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { buildRestaurantStructuredData } from '../../../app/seo/structuredDataSchema'
import { DetailActions } from '../../../components/molecules/DetailActions'
import { DetailSection } from '../../../components/molecules/DetailSection'
import { DetailHero } from '../../../components/molecules/DetailHero'
import { DetailIntro } from '../../../components/molecules/DetailIntro'
import { DetailMetadataGrid } from '../../../components/molecules/DetailMetadataGrid'
import { EmbeddedMapSection } from '../../../components/molecules/EmbeddedMapSection'
import { ListingContactSection } from '../../../components/organisms/ListingContactSection'
import bestForRestaurantIcon from '../../../assets/icons/best-for-restaurant.png'
import cuisineIcon from '../../../assets/icons/cusine.png'
import startFromIcon from '../../../assets/icons/start-from.png'
import vibeIcon from '../../../assets/icons/vibe.png'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { DetailPagePlaceholder } from '../../shared/components/DetailPagePlaceholders'
import { buildContactActions } from '../../shared/lib/contact'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import { buildMapEmbedUrl, buildMapUrl } from '../../shared/lib/maps'
import { useRestaurantDetail } from '../hooks/useRestaurantDetail'
import { formatRestaurantMoments } from '../lib/formatRestaurantMoments'

export function RestaurantDetailPage() {
  const { t } = useTranslation()
  const language = useAppLanguage()
  const { id } = useParams()
  const { data, isLoading, isError } = useRestaurantDetail(id)

  if (isLoading) {
    return (
      <section className={pageStyles.page}>
        <Seo
          title={t('shell.nav.restaurants')}
          description={t('restaurants.loading')}
        />
        <DetailPagePlaceholder
          eyebrow={t('restaurants.detailEyebrow')}
          testIdPrefix="restaurant-detail"
          showMetaGrid={false}
        />
      </section>
    )
  }

  if (isError || !data) {
    return (
      <>
        <Seo
          title={t('shell.nav.restaurants')}
          description={t('common.error')}
        />
        <p role="alert">{t('common.error')}</p>
      </>
    )
  }

  const heroImage = resolveFeatureImage({
    kind: 'restaurant',
    id: data.id,
    image: data.image,
    fallbackAlt: data.name,
  })
  const heroImages = [heroImage]
  const momentsLabel = formatRestaurantMoments(data.moments, t)
  const hasContactActions = buildContactActions(data.contact, language).length > 0
  const resolvedMapUrl = data.mapUrl ?? buildMapUrl(data.address)
  const resolvedMapEmbedUrl = data.mapEmbedUrl ?? buildMapEmbedUrl(data.address)
  const backToListAction = {
    label: t('restaurants.backToList'),
    to: '/restaurants',
    variant: 'secondary' as const,
  }

  return (
    <section
      className={`${pageStyles.page} ${hasContactActions ? pageStyles.pageWithStickyContact : ''}`.trim()}
    >
      <Seo
        title={`${data.name} | ${t('shell.nav.restaurants')}`}
        description={data.description}
        image={heroImage.src}
      />
      <StructuredData
        data={buildRestaurantStructuredData({
          language,
          pathname: data.route,
          name: data.name,
          description: data.description,
          cuisine: data.cuisine,
          priceRange: data.priceBand,
          address: data.address,
          image: heroImage,
        })}
      />
      <div className={pageStyles.backLinkRow}>
        <Link className={pageStyles.backLink} to="/restaurants">
          <img
            className={pageStyles.backLinkIcon}
            src={arrowLeftIcon}
            alt=""
            aria-hidden="true"
          />
          {t('restaurants.backToList')}
        </Link>
      </div>

      <div className={pageStyles.layout}>
        <div className={pageStyles.mainColumn}>
          <DetailHero
            eyebrow={t('restaurants.detailEyebrow')}
            images={heroImages}
            galleryAriaLabel={t('restaurants.galleryAriaLabel')}
            closeLabel={t('common.gallery.close')}
            countLabel={(current, total) =>
              t('common.gallery.count', { current, total })
            }
          />

          <DetailIntro title={data.name} summary={data.description} />

          <DetailMetadataGrid
            ariaLabel={t('restaurants.detailMetaAriaLabel')}
            items={[
              {
                label: t('restaurants.meta.price'),
                value: data.priceBand,
                iconSrc: startFromIcon,
              },
              {
                label: t('restaurants.meta.moment'),
                value: momentsLabel,
                iconSrc: bestForRestaurantIcon,
              },
              {
                label: t('restaurants.meta.cuisine'),
                value: data.cuisine,
                iconSrc: cuisineIcon,
              },
              {
                label: t('restaurants.meta.vibe'),
                value: data.vibe,
                iconSrc: vibeIcon,
              },
            ]}
          />

          <div className={pageStyles.mobileOnlySection}>
            <section className={pageStyles.sidebarCard}>
              <h2 className={pageStyles.sidebarTitle}>{t('restaurants.sidebar.title')}</h2>
              <div className={pageStyles.sidebarFacts}>
                <div className={pageStyles.sidebarFact}>
                  <span>{t('restaurants.meta.price')}</span>
                  <strong>{data.priceBand}</strong>
                </div>
                <div className={pageStyles.sidebarFact}>
                  <span>{t('restaurants.meta.moment')}</span>
                  <strong>{momentsLabel}</strong>
                </div>
              </div>
            </section>

          </div>

          <article className={pageStyles.bodyCard}>
            <DetailSection title={t('restaurants.sections.about')}>
              <p className={pageStyles.bodyCopy}>{data.description}</p>
            </DetailSection>
            {resolvedMapEmbedUrl ? (
              <section className={`${pageStyles.detailSection} ${pageStyles.mobileOnlySection}`}>
                <EmbeddedMapSection
                  title={t('common.labels.location')}
                  description={data.address}
                  embedUrl={resolvedMapEmbedUrl}
                  mapUrl={resolvedMapUrl}
                  frameTitle={`${data.name} map`}
                />
              </section>
            ) : null}
            <ListingContactSection
              contact={data.contact}
              listingId={data.id}
              listingType="restaurants"
              listingName={data.name}
              currentLanguage={language}
            />
            <div className={pageStyles.actions}>
              <Link className={pageStyles.primaryAction} to="/restaurants">
                {t('restaurants.backToList')}
              </Link>
              <Link className={pageStyles.secondaryAction} to="/">
                {t('restaurants.backHome')}
              </Link>
            </div>
          </article>
        </div>

        <aside className={`${pageStyles.sidebarColumn} ${pageStyles.hideOnNarrow}`}>
          <div className={pageStyles.sidebarStickyStack}>
            <section className={pageStyles.sidebarCard}>
              <h2 className={pageStyles.sidebarTitle}>{t('restaurants.sidebar.title')}</h2>
              <div className={pageStyles.sidebarFacts}>
                <div className={pageStyles.sidebarFact}>
                  <span>{t('restaurants.meta.price')}</span>
                  <strong>{data.priceBand}</strong>
                </div>
                <div className={pageStyles.sidebarFact}>
                  <span>{t('restaurants.meta.moment')}</span>
                  <strong>{momentsLabel}</strong>
                </div>
              </div>
            </section>
            {resolvedMapEmbedUrl ? (
              <section className={pageStyles.sidebarCard}>
                <EmbeddedMapSection
                  title={t('common.labels.location')}
                  description={data.address}
                  embedUrl={resolvedMapEmbedUrl}
                  mapUrl={resolvedMapUrl}
                  frameTitle={`${data.name} map`}
                />
              </section>
            ) : null}
            <section className={pageStyles.sidebarCard}>
              <DetailActions compact actions={[backToListAction]} />
            </section>
          </div>
        </aside>
      </div>
    </section>
  )
}
