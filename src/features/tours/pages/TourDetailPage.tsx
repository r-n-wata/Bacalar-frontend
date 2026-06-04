import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { formatCurrency } from '../../../utils/formatCurrency'
import { useTourDetail } from '../hooks/useTourDetail'

export function TourDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const { data, isLoading, isError } = useTourDetail(id)

  if (isLoading) {
    return <LoadingSpinner label={t('tours.loading')} />
  }

  if (isError || !data) {
    return <p role="alert">{t('tours.error')}</p>
  }

  return (
    <section className={pageStyles.page}>
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
          <SectionEyebrow>{t('tours.detailEyebrow')}</SectionEyebrow>
          <h1 className={pageStyles.title}>{data.name}</h1>
          <p className={pageStyles.summary}>{data.description}</p>
        </div>
      </article>

      <div className={pageStyles.metaGrid}>
        <article className={pageStyles.metaCard}>
          <span>{t('tours.meta.category')}</span>
          <strong>{data.categoryLabel}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('tours.meta.duration')}</span>
          <strong>{t('tours.hours', { count: data.durationHours })}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('tours.meta.price')}</span>
          <strong>{formatCurrency(data.priceFrom)}</strong>
        </article>
      </div>

      <article className={pageStyles.bodyCard}>
        <p className={pageStyles.bodyCopy}>{data.description}</p>
        <div className={pageStyles.actions}>
          <Link className={pageStyles.primaryAction} to="/tours">
            {t('tours.backToList')}
          </Link>
          <Link className={pageStyles.secondaryAction} to="/">
            {t('tours.backHome')}
          </Link>
        </div>
      </article>
    </section>
  )
}
