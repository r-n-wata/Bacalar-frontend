import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { seoContentByLanguage } from '../../../app/seo/seoContent'
import {
  buildOrganizationStructuredData,
  buildWebsiteStructuredData,
} from '../../../app/seo/structuredDataSchema'
import { HomeHero } from '../components/HomeHero'
import { HomeSection } from '../components/HomeSection'
import { useHomeContent } from '../hooks/useHomeContent'
import styles from './HomePage.module.scss'

const HOME_HERO_FALLBACK = {
  en: {
    eyebrow: 'Bacalar, made simple',
    title: 'A calmer way to tour Bacalar',
    description:
      'Curated recommendations for visitors who want less noise and better choices.',
  },
  es: {
    eyebrow: 'Bacalar, mas simple',
    title: 'Una forma mas tranquila de vivir Bacalar',
    description:
      'Recomendaciones curadas para visitantes que quieren menos ruido y mejores decisiones.',
  },
} as const

const HERO_IMAGE = {
  src: '/images/home/hero-home-1600.jpg',
  avifSrcSet:
    '/images/home/hero-home-960.avif 960w, /images/home/hero-home-1600.avif 1600w',
  srcSet:
    '/images/home/hero-home-960.jpg 960w, /images/home/hero-home-1600.jpg 1600w',
  webpSrcSet:
    '/images/home/hero-home-960.webp 960w, /images/home/hero-home-1600.webp 1600w',
  sizes: '(max-width: 920px) 100vw, 42vw',
  width: 3992,
  height: 2242,
} as const

function HomeSectionSkeleton({
  title,
  ctaLabel,
  ctaTo,
}: {
  title: string
  ctaLabel: string
  ctaTo: string
}) {
  return (
    <section className={styles.loadingSection} aria-label={title} aria-busy="true">
      <div className={styles.loadingHeaderRow}>
        <div className={styles.loadingHeader}>
          <div className="sb-skeleton sb-skeleton-line" />
          <div className="sb-skeleton sb-skeleton-line" />
          <div className="sb-skeleton sb-skeleton-line" />
        </div>
        <a className={styles.loadingLink} href={ctaTo}>
          {ctaLabel}
        </a>
      </div>

      <div className={styles.loadingGrid}>
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="sb-skeleton-panel">
            <div className={`${styles.loadingMedia} sb-skeleton`} />
            <div className={styles.loadingBody}>
              <div className={`${styles.loadingKicker} sb-skeleton sb-skeleton-line`} />
              <div className={`${styles.loadingTitle} sb-skeleton sb-skeleton-line`} />
              <div className={`${styles.loadingCopy} sb-skeleton sb-skeleton-line`} />
              <div className={`${styles.loadingMeta} sb-skeleton sb-skeleton-line`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function HomePage() {
  const { t, i18n } = useTranslation()
  const { data, isError } = useHomeContent()
  const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const fallbackHero = HOME_HERO_FALLBACK[language]
  const fallbackSeo = seoContentByLanguage[language].home
  const seoTitle = data?.hero.title ?? fallbackSeo.title
  const seoDescription = data?.hero.description ?? fallbackSeo.description
  const heroImageAlt =
    language === 'es'
      ? 'Vista de la laguna de Bacalar desde la orilla'
      : 'Bacalar lagoon view from the shoreline'

  const seo = (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        image={HERO_IMAGE.src}
      />
      <StructuredData
        data={[
          buildOrganizationStructuredData(),
          buildWebsiteStructuredData(language),
        ]}
      />
    </>
  )

  if (isError && !data) {
    return (
      <div className={styles.page}>
        {seo}
        <HomeHero
          eyebrow={fallbackHero.eyebrow}
          title={fallbackHero.title}
          description={fallbackHero.description}
          image={{
            ...HERO_IMAGE,
            alt: heroImageAlt,
            priority: true,
          }}
          ctaLabel={t('home.toursCta')}
        />
        <p role="alert">{t('home.error')}</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {seo}
      <HomeHero
        eyebrow={data?.hero.eyebrow ?? fallbackHero.eyebrow}
        title={data?.hero.title ?? fallbackHero.title}
        description={data?.hero.description ?? fallbackHero.description}
        image={{
          ...HERO_IMAGE,
          alt: heroImageAlt,
          priority: true,
        }}
        ctaLabel={t('home.toursCta')}
      />

      {data ? (
        <HomeSection
          intro={data.featuredTours.intro}
          items={data.featuredTours.items}
          ctaLabel={t('home.toursCta')}
          ctaTo="/tours"
        />
      ) : (
        <HomeSectionSkeleton
          title={t('home.toursCta')}
          ctaLabel={t('home.toursCta')}
          ctaTo="/tours"
        />
      )}

      {data ? (
        <HomeSection
          intro={data.diningMoments.intro}
          items={data.diningMoments.items}
          ctaLabel={t('home.restaurantsCta')}
          ctaTo="/restaurants"
        />
      ) : (
        <HomeSectionSkeleton
          title={t('home.restaurantsCta')}
          ctaLabel={t('home.restaurantsCta')}
          ctaTo="/restaurants"
        />
      )}

      {data ? (
        <HomeSection
          intro={data.weeklyHappenings.intro}
          items={data.weeklyHappenings.items}
          ctaLabel={t('home.eventsCta')}
          ctaTo="/events"
          emptyState={{
            title: t('events.emptyUpcomingTitle'),
            description: t('home.eventsEmptyDescription'),
            ctaLabel: t('events.submitCta.action'),
            ctaTo: '/events/submit',
          }}
        />
      ) : (
        <HomeSectionSkeleton
          title={t('home.eventsCta')}
          ctaLabel={t('home.eventsCta')}
          ctaTo="/events"
        />
      )}
    </div>
  )
}
