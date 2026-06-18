import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { seoContentByLanguage } from '../../../app/seo/seoContent'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { HomeHero } from '../components/HomeHero'
import { HomeSection } from '../components/HomeSection'
import { useHomeContent } from '../hooks/useHomeContent'
import styles from './HomePage.module.scss'

export function HomePage() {
  const { t, i18n } = useTranslation()
  const { data, isLoading, isError } = useHomeContent()
  const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const fallbackSeo = seoContentByLanguage[language].home
  const seoTitle = data?.hero.title ?? fallbackSeo.title
  const seoDescription = data?.hero.description ?? fallbackSeo.description
  const heroImage = data?.spotlight.entries.tours.image?.src

  const seo = (
    <Seo
      title={seoTitle}
      description={seoDescription}
      image={heroImage}
    />
  )

  if (isLoading) {
    return (
      <>
        {seo}
        <LoadingSpinner label={t('home.loading')} />
      </>
    )
  }

  if (isError || !data) {
    return (
      <>
        {seo}
        <p role="alert">{t('home.error')}</p>
      </>
    )
  }

  return (
    <div className={styles.page}>
      {seo}
      <HomeHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        description={data.hero.description}
        image={data.spotlight.entries.tours.image}
        ctaLabel={t('home.toursCta')}
      />

      <HomeSection
        intro={data.featuredExperiences.intro}
        items={data.featuredExperiences.items}
        ctaLabel={t('home.toursCta')}
        ctaTo="/tours"
      />

      <HomeSection
        intro={data.diningMoments.intro}
        items={data.diningMoments.items}
        ctaLabel={t('home.restaurantsCta')}
        ctaTo="/restaurants"
      />

      <HomeSection
        intro={data.weeklyHappenings.intro}
        items={data.weeklyHappenings.items}
        ctaLabel={t('home.eventsCta')}
        ctaTo="/events"
      />
    </div>
  )
}
