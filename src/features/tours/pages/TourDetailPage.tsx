import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { useTourDetail } from '../hooks/useTourDetail'

export function TourDetailPage() {
  const { t } = useTranslation()
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

  return (
    <section className={pageStyles.page}>
      <Seo
        title={`${data.name} | ${t('shell.nav.tours')}`}
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
          <SectionEyebrow>{t('tours.detailEyebrow')}</SectionEyebrow>
          <h1 className={pageStyles.title}>{data.name}</h1>
          <p className={pageStyles.heroMeta}>
            {t('tours.providedBy', { operator: data.operatorName })}
          </p>
          <p className={pageStyles.summary}>{data.description}</p>
        </div>
      </article>

      <div className={pageStyles.metaGrid}>
        <article className={pageStyles.metaCard}>
          <span>{t('tours.meta.category')}</span>
          <strong>{data.category}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('tours.meta.duration')}</span>
          <strong>{data.duration}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('tours.meta.price')}</span>
          <strong>{data.priceFrom}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('tours.meta.privateOrShared')}</span>
          <strong>{data.privateOrShared}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('tours.meta.bestFor')}</span>
          <strong>{data.bestFor}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('tours.meta.difficulty')}</span>
          <strong>{data.difficulty}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('tours.meta.suitableForKids')}</span>
          <strong>{data.suitableForKids}</strong>
        </article>
      </div>

      {data.imageUrls.length > 1 ? (
        <section className={pageStyles.galleryGrid} aria-label={t('tours.galleryAriaLabel')}>
          {data.imageUrls.slice(1).map((url, index) => (
            <img
              key={`${url}-${index}`}
              className={pageStyles.galleryImage}
              src={url}
              alt={`${data.name} ${index + 2}`}
            />
          ))}
        </section>
      ) : null}

      <article className={pageStyles.bodyCard}>
        <p className={pageStyles.bodyCopy}>{data.description}</p>
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
            <p className={pageStyles.bodyCopy}>{data.meetingPoint}</p>
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
          {data.operatorDescription ? (
            <p className={pageStyles.bodyCopy}>{data.operatorDescription}</p>
          ) : null}
        </section>
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
