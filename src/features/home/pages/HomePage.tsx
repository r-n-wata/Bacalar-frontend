import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { StructuredData } from '../../../app/seo/StructuredDataScript'
import { seoContentByLanguage } from '../../../app/seo/seoContent'
import {
  buildOrganizationStructuredData,
  buildWebsiteStructuredData,
} from '../../../app/seo/structuredDataSchema'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import homepageImage from '../../../assets/homepageImage.jpg'
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
  const heroImage = homepageImage
  const heroImageAlt =
    language === 'es'
      ? 'Vista de la laguna de Bacalar desde la orilla'
      : 'Bacalar lagoon view from the shoreline'

  const seo = (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        image={heroImage}
      />
      <StructuredData
        data={[
          buildOrganizationStructuredData(),
          buildWebsiteStructuredData(language),
        ]}
      />
    </>
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
        image={{
          src: homepageImage,
          alt: heroImageAlt,
        }}
        ctaLabel={t('home.toursCta')}
      />

      <HomeSection
        intro={data.featuredTours.intro}
        items={data.featuredTours.items}
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
