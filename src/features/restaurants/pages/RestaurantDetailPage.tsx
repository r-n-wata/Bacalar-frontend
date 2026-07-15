import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { buildRestaurantStructuredData } from '../../../app/seo/structuredDataSchema'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import { EmbeddedMapSection } from '../../../components/molecules/EmbeddedMapSection'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
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
      <>
        <Seo
          title={t('shell.nav.restaurants')}
          description={t('restaurants.loading')}
        />
        <LoadingSpinner label={t('restaurants.loading')} />
      </>
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

  return (
    <section className={pageStyles.page}>
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
      <article className={pageStyles.hero}>
        <img
          className={pageStyles.heroImage}
          src={heroImage.src}
          alt={heroImage.alt}
        />
        <div className={pageStyles.heroOverlay} />
        <div className={pageStyles.heroBody}>
          <SectionEyebrow>{t('restaurants.detailEyebrow')}</SectionEyebrow>
          <h1 className={pageStyles.title}>{data.name}</h1>
          <p className={pageStyles.summary}>{data.description}</p>
        </div>
      </article>

      <div className={pageStyles.metaGrid}>
        <article className={pageStyles.metaCard}>
          <span>{t('restaurants.meta.cuisine')}</span>
          <strong>{data.cuisine}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('restaurants.meta.vibe')}</span>
          <strong>{data.vibe}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('restaurants.meta.price')}</span>
          <strong>{data.priceBand}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('restaurants.meta.moment')}</span>
          <strong>{formatRestaurantMoments(data.moments, t)}</strong>
        </article>
      </div>

      <article className={pageStyles.bodyCard}>
        <p className={pageStyles.bodyCopy}>{data.description}</p>
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
    </section>
  )
}
