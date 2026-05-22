import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { useEventDetail } from '../hooks/useEventDetail'

export function EventDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const { data, isLoading, isError } = useEventDetail(id)

  if (isLoading) {
    return <p>{t('events.loading')}</p>
  }

  if (isError || !data) {
    return <p role="alert">{t('events.error')}</p>
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
          <SectionEyebrow>{t('events.detailEyebrow')}</SectionEyebrow>
          <h1 className={pageStyles.title}>{data.title}</h1>
          <p className={pageStyles.summary}>{data.description}</p>
        </div>
      </article>

      <div className={pageStyles.metaGrid}>
        <article className={pageStyles.metaCard}>
          <span>{t('events.meta.when')}</span>
          <strong>{data.dateLabel}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('events.meta.where')}</span>
          <strong>{data.venue}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('events.meta.type')}</span>
          <strong>{data.category}</strong>
        </article>
      </div>

      <article className={pageStyles.bodyCard}>
        <p className={pageStyles.bodyCopy}>{data.description}</p>
        <div className={pageStyles.actions}>
          <Link className={pageStyles.primaryAction} to="/events">
            {t('events.backToList')}
          </Link>
          <Link className={pageStyles.secondaryAction} to="/">
            {t('events.backHome')}
          </Link>
        </div>
      </article>
    </section>
  )
}
