import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUiStore } from '../../../app/store/ui-store'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { ExperienceSpotlight } from '../../../components/organisms/ExperienceSpotlight'
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
      <section className={styles.heroGrid}>
        <div className={styles.leadColumn}>
          <SectionEyebrow>{data.hero.eyebrow}</SectionEyebrow>
          <div className={styles.heroCopy}>
            <h1>{data.hero.title}</h1>
            <p>{data.hero.description}</p>
          </div>
          <ExperienceSpotlight
            title={activeExperience.title}
            description={activeExperience.description}
            metrics={activeExperience.metrics}
            actions={data.spotlight.actions}
            selectedAction={featuredExperience}
            onSelectAction={setFeaturedExperience}
          />
          <Link className={styles.primaryLink} to={activeExperience.route}>
            {activeExperience.cta}
          </Link>
        </div>

        <ContentPanel as="aside" className={styles.calloutCard} tone="warm">
          <PageIntro
            eyebrow={data.planningCallout.eyebrow}
            title={data.planningCallout.title}
            description={data.planningCallout.description}
            compact
          />
          <ul className={styles.plainList}>
            {data.planningCallout.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ContentPanel>
      </section>

      <section className={styles.suggestionSection}>
        <PageIntro
          eyebrow={data.featuredExperiences.intro.eyebrow}
          title={data.featuredExperiences.intro.title}
          description={data.featuredExperiences.intro.description}
        />

        <div className={styles.suggestionGrid}>
          {data.featuredExperiences.items.map((item) => (
            <Link
              key={item.title}
              className={styles.suggestionCard}
              to={item.route}
            >
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <span>{item.meta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.suggestionSection}>
        <PageIntro
          eyebrow={data.diningMoments.intro.eyebrow}
          title={data.diningMoments.intro.title}
          description={data.diningMoments.intro.description}
        />

        <div className={styles.suggestionGrid}>
          {data.diningMoments.items.map((item) => (
            <Link
              key={item.title}
              className={styles.suggestionCard}
              to={item.route}
            >
              {item.label ? <small>{item.label}</small> : null}
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <span>{item.meta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.suggestionSection}>
        <PageIntro
          eyebrow={data.weeklyHappenings.intro.eyebrow}
          title={data.weeklyHappenings.intro.title}
          description={data.weeklyHappenings.intro.description}
        />

        <div className={styles.suggestionGrid}>
          {data.weeklyHappenings.items.map((item) => (
            <Link
              key={item.title}
              className={styles.suggestionCard}
              to={item.route}
            >
              {item.label ? <small>{item.label}</small> : null}
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <span>{item.meta}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
