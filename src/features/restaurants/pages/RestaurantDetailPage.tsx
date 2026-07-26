import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { buildRestaurantStructuredData } from '../../../app/seo/structuredDataSchema'
import { DetailActions } from '../../../components/molecules/DetailActions'
import { DetailHero } from '../../../components/molecules/DetailHero'
import { DetailIntro } from '../../../components/molecules/DetailIntro'
import { DetailSidebar } from '../../../components/molecules/DetailSidebar'
import { EmbeddedMapSection } from '../../../components/molecules/EmbeddedMapSection'
import { ListingContactSection } from '../../../components/organisms/ListingContactSection'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { DetailPagePlaceholder } from '../../shared/components/DetailPagePlaceholders'
import { buildContactActions } from '../../shared/lib/contact'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
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
      <DetailHero
        eyebrow={t('restaurants.detailEyebrow')}
        images={heroImages}
        galleryAriaLabel={t('restaurants.galleryAriaLabel')}
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
        highlights={[
          {
            label: t('restaurants.meta.price'),
            value: data.priceBand,
          },
          {
            label: t('restaurants.meta.moment'),
            value: momentsLabel,
          },
        ]}
      />

      <div className={pageStyles.layout}>
        <div className={pageStyles.mainColumn}>
          <article className={pageStyles.bodyCard}>
            <p className={pageStyles.bodyCopy}>{data.description}</p>
            <ListingContactSection
              contact={data.contact}
              listingType="restaurants"
              currentLanguage={language}
            />
            {data.mapEmbedUrl ? (
              <section className={pageStyles.detailSection}>
                <EmbeddedMapSection
                  title={t('common.labels.location')}
                  description={data.address}
                  embedUrl={data.mapEmbedUrl}
                  mapUrl={data.mapUrl}
                  frameTitle={`${data.name} map`}
                />
              </section>
            ) : null}
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

        <div className={pageStyles.hideOnNarrow}>
          <DetailSidebar title={t('restaurants.sidebar.title')}>
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
            <DetailActions compact actions={[backToListAction]} />
          </DetailSidebar>
        </div>
      </div>
    </section>
  )
}
