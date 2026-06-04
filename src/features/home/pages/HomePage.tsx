import { useTranslation } from 'react-i18next'
import { LoadingSpinner } from '../../../components/atoms/LoadingSpinner'
import { HomeHero } from '../components/HomeHero'
import { HomeSection } from '../components/HomeSection'
import { useHomeContent } from '../hooks/useHomeContent'
import styles from './HomePage.module.scss'

export function HomePage() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useHomeContent()

  if (isLoading) {
    return <LoadingSpinner label={t('home.loading')} />
  }

  if (isError || !data) {
    return <p role="alert">{t('home.error')}</p>
  }

  const heroImage = data.spotlight.entries.tours.image

  return (
    <div className={styles.page}>
      <HomeHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        description={data.hero.description}
        image={heroImage}
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
