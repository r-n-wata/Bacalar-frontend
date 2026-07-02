import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { useRestaurantDetail } from '../hooks/useRestaurantDetail'
import { formatRestaurantMoments } from '../lib/formatRestaurantMoments'

export function RestaurantDetailPage() {
  const { t } = useTranslation()
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

  return (
    <section className={pageStyles.page}>
      <Seo
        title={`${data.name} | ${t('shell.nav.restaurants')}`}
        description={data.description}
        image={data.image?.src}
      />
      <article className={pageStyles.hero}>
        {data.image ? (
          <img
            className={pageStyles.heroImage}
            src={data.image.src}
            alt={data.image.alt}
          />
        ) : null}
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
