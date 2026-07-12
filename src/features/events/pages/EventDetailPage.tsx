import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { buildEventStructuredData } from '../../../app/seo/structuredDataSchema'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'
import { resolveFeatureImage } from '../../shared/lib/featureImage'
import { getMoodTranslationKey, isUpcomingEvent } from '../lib/presentation'
import { useEventDetail } from '../hooks/useEventDetail'

export function EventDetailPage() {
  const { t } = useTranslation()
  const language = useAppLanguage()
  const { id } = useParams()
  const { data, isLoading, isError } = useEventDetail(id)

  if (isLoading) {
    return (
      <>
        <Seo
          title={t('shell.nav.events')}
          description={t('events.loading')}
        />
        <LoadingSpinner label={t('events.loading')} />
      </>
    )
  }

  if (isError || !data) {
    return (
      <>
        <Seo
          title={t('shell.nav.events')}
          description={t('events.error')}
        />
        <p role="alert">{t('events.error')}</p>
      </>
    )
  }

  const moodLabel = t(getMoodTranslationKey(data.category))
  const showUpcoming = isUpcomingEvent(data)
  const heroImage = resolveFeatureImage({
    kind: 'event',
    id: data.id,
    image: data.image,
    fallbackAlt: data.title,
  })

  return (
    <section className={pageStyles.page}>
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
          startsAt: data.startsAt,
          endsAt: data.endsAt,
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
          <SectionEyebrow>{t('events.detailEyebrow')}</SectionEyebrow>
          <div className={pageStyles.heroPills}>
            {showUpcoming ? (
              <span className={pageStyles.heroPill}>
                {t('events.badges.upcoming')}
              </span>
            ) : null}
            <span className={pageStyles.heroPill}>{moodLabel}</span>
          </div>
          <h1 className={pageStyles.title}>{data.title}</h1>
          <p className={pageStyles.summary}>{data.description}</p>
          <p className={pageStyles.heroMeta}>
            {data.dateLabel} · {data.venue}
          </p>
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
          <strong>{t(`events.categories.${data.category}`)}</strong>
        </article>
        <article className={pageStyles.metaCard}>
          <span>{t('events.meta.mood')}</span>
          <strong>{moodLabel}</strong>
        </article>
      </div>

      <article className={pageStyles.bodyCard}>
        <p className={pageStyles.bodyLead}>
          {showUpcoming ? t('events.detailNote.upcoming') : t('events.detailNote.thisWeek')}
        </p>
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
