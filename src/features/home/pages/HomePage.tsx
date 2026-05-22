import { useTranslation } from 'react-i18next'
import { useUiStore } from '../../../app/store/ui-store'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import { HomeHero } from '../components/HomeHero'
import { HomeSection } from '../components/HomeSection'
import { HomeSpotlight } from '../components/HomeSpotlight'
import { useHomeContent } from '../hooks/useHomeContent'
import styles from './HomePage.module.scss'

export function HomePage() {
  const { t } = useTranslation()
  const featuredExperience = useUiStore((state) => state.featuredExperience)
  const setFeaturedExperience = useUiStore(
    (state) => state.setFeaturedExperience,
  )
  const { data, isLoading, isError } = useHomeContent()

  if (isLoading) {
    return <p>{t('home.loading')}</p>
  }

  if (isError || !data) {
    return <p role="alert">{t('home.error')}</p>
  }

  const activeExperience = data.spotlight.entries[featuredExperience]

  return (
    <div className={styles.page}>
      <HomeHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        description={data.hero.description}
        image={activeExperience.image}
        ctaLabel={t('home.toursCta')}
      />

      <HomeSpotlight
        eyebrow={t('home.spotlightEyebrow')}
        title={t('home.spotlightTitle')}
        description={t('home.spotlightDescription')}
        actions={data.spotlight.actions}
        entry={activeExperience}
        selectedAction={featuredExperience}
        onSelectAction={setFeaturedExperience}
      />

      <ContentPanel as="aside" className={styles.calloutCard} tone="warm">
        <SectionEyebrow>{data.planningCallout.eyebrow}</SectionEyebrow>
        <h2>{data.planningCallout.title}</h2>
        <p>{data.planningCallout.description}</p>
        <ul className={styles.plainList}>
          {data.planningCallout.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ContentPanel>

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
