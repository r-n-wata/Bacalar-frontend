import { Link } from 'react-router-dom'
import {
  type ExperienceKey,
  useUiStore,
} from '../../../app/store/ui-store'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import { ExperienceSpotlight } from '../../../components/organisms/ExperienceSpotlight'
import styles from './HomePage.module.scss'

const spotlightContent: Record<
  ExperienceKey,
  {
    title: string
    description: string
    route: string
    cta: string
    metrics: Array<{ label: string; value: string }>
  }
> = {
  events: {
    title: 'Surface what is happening in Bacalar this week',
    description:
      'Give visitors a fast read on live music, food pop-ups, workshops, and seasonal experiences.',
    route: '/events',
    cta: 'Browse events',
    metrics: [
      { label: 'Content mode', value: 'Discovery' },
      { label: 'Primary data', value: 'Schedules' },
      { label: 'UI need', value: 'Filters' },
    ],
  },
  restaurants: {
    title: 'Curate places worth leaving the lagoon for',
    description:
      'Structure restaurant discovery around cuisine, atmosphere, and practical travel constraints.',
    route: '/restaurants',
    cta: 'Browse restaurants',
    metrics: [
      { label: 'Content mode', value: 'Editorial' },
      { label: 'Primary data', value: 'Listings' },
      { label: 'UI need', value: 'Cards' },
    ],
  },
  tours: {
    title: 'Turn tour discovery into a confident booking handoff',
    description:
      'Highlight availability, category, and pricing to support browsing and conversion together.',
    route: '/tours',
    cta: 'Browse tours',
    metrics: [
      { label: 'Content mode', value: 'Commerce' },
      { label: 'Primary data', value: 'Availability' },
      { label: 'UI need', value: 'Comparison' },
    ],
  },
  booking: {
    title: 'Keep the booking flow isolated but connected',
    description:
      'Use feature-local state for draft booking details while React Query owns live inventory and confirmations.',
    route: '/booking',
    cta: 'Open booking flow',
    metrics: [
      { label: 'Content mode', value: 'Transactional' },
      { label: 'Primary data', value: 'Inventory' },
      { label: 'UI need', value: 'Stepper' },
    ],
  },
}

const experienceActions: Array<{ key: ExperienceKey; label: string }> = [
  { key: 'events', label: 'Events' },
  { key: 'restaurants', label: 'Restaurants' },
  { key: 'tours', label: 'Tours' },
  { key: 'booking', label: 'Booking' },
]

export function HomePage() {
  const featuredExperience = useUiStore((state) => state.featuredExperience)
  const setFeaturedExperience = useUiStore(
    (state) => state.setFeaturedExperience,
  )
  const activeExperience = spotlightContent[featuredExperience]

  return (
    <div className={styles.page}>
      <section className={styles.heroGrid}>
        <div className={styles.leadColumn}>
          <SectionEyebrow>Architecture overview</SectionEyebrow>
          <ExperienceSpotlight
            title={activeExperience.title}
            description={activeExperience.description}
            metrics={activeExperience.metrics}
            actions={experienceActions}
            selectedAction={featuredExperience}
            onSelectAction={setFeaturedExperience}
          />
          <Link className={styles.primaryLink} to={activeExperience.route}>
            {activeExperience.cta}
          </Link>
        </div>

        <aside className={styles.calloutCard}>
          <SectionEyebrow>Stack choices</SectionEyebrow>
          <ul className={styles.plainList}>
            <li>React + Vite for the SPA shell</li>
            <li>React Query for remote data workflows</li>
            <li>Zustand for UI-only and draft state</li>
            <li>Atomic shared components with feature ownership</li>
          </ul>
        </aside>
      </section>

      <section className={styles.routeGrid}>
        {experienceActions.map((experience) => (
          <Link
            key={experience.key}
            className={styles.routeCard}
            to={spotlightContent[experience.key].route}
          >
            <strong>{experience.label}</strong>
            <span>{spotlightContent[experience.key].description}</span>
          </Link>
        ))}
      </section>
    </div>
  )
}
