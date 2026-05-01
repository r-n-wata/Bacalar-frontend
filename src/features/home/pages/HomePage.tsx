import { Link } from 'react-router-dom'
import {
  type ExperienceKey,
  useUiStore,
} from '../../../app/store/ui-store'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { PageIntro } from '../../../components/molecules/PageIntro'
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
    title: 'Show what is happening in Bacalar this week',
    description:
      'Highlight live music, food gatherings, wellness sessions, and small local moments that help a stay feel current.',
    route: '/events',
    cta: 'Browse events',
    metrics: [
      { label: 'Best for', value: 'Evening plans' },
      { label: 'Focus', value: 'This week' },
      { label: 'Value', value: 'Timely picks' },
    ],
  },
  restaurants: {
    title: 'Choose where to eat in Bacalar throughout the day',
    description:
      'Help guests move from lagoon mornings to breakfast gardens, easy lunches, and memorable dinners without overthinking it.',
    route: '/restaurants',
    cta: 'Browse restaurants',
    metrics: [
      { label: 'Best for', value: 'Meal planning' },
      { label: 'Focus', value: 'Cuisine + vibe' },
      { label: 'Value', value: 'Curated choices' },
    ],
  },
  tours: {
    title: 'Turn lagoon tour browsing into a confident decision',
    description:
      'Compare duration, category, and starting price so travelers can quickly choose the right time on the water.',
    route: '/tours',
    cta: 'Browse tours',
    metrics: [
      { label: 'Best for', value: 'First click' },
      { label: 'Focus', value: 'Time + price' },
      { label: 'Value', value: 'Easy comparison' },
    ],
  },
  booking: {
    title: 'Make booking feel clear, calm, and trustworthy',
    description:
      'Once guests decide what they want, move them into a straightforward flow for dates, party size, and confirmation.',
    route: '/booking',
    cta: 'Open booking flow',
    metrics: [
      { label: 'Best for', value: 'Conversion' },
      { label: 'Focus', value: 'Guest details' },
      { label: 'Value', value: 'Low friction' },
    ],
  },
}

const experienceActions: Array<{ key: ExperienceKey; label: string }> = [
  { key: 'events', label: 'Events' },
  { key: 'restaurants', label: 'Restaurants' },
  { key: 'tours', label: 'Tours' },
  { key: 'booking', label: 'Booking' },
]

const featuredLagoonExperiences = [
  {
    title: 'Private Sailing at Sunrise',
    description:
      'A signature Bacalar experience for travelers who want calm water, soft light, and a premium first memory.',
    meta: '4 hours · From 2,100 MXN',
    route: '/tours',
  },
  {
    title: 'Family Pontoon Loop',
    description:
      'An easy midday option for groups who want swimming, sightseeing, and a relaxed pace on the lagoon.',
    meta: '3 hours · From 1,450 MXN',
    route: '/tours',
  },
  {
    title: 'Guided Mangrove Kayak',
    description:
      'A lighter, more active outing for guests who want to explore quietly and stay close to nature.',
    meta: '2 hours · From 680 MXN',
    route: '/tours',
  },
]

const diningMoments = [
  {
    label: 'Breakfast',
    title: 'Cielo de Maiz',
    description:
      'Start with a garden breakfast that feels unhurried and local before guests head toward the water.',
    meta: 'Vegetarian · $$',
    route: '/restaurants',
  },
  {
    label: 'Lunch',
    title: 'Ixchel Cocina',
    description:
      'A casual local favorite that works well after a morning tour when people want something easy and satisfying.',
    meta: 'Regional Mexican · $$',
    route: '/restaurants',
  },
  {
    label: 'Dinner',
    title: 'Nao',
    description:
      'A lagoon-facing seafood dinner pick for evenings when the trip calls for one elevated meal.',
    meta: 'Seafood · $$$',
    route: '/restaurants',
  },
]

const weeklyHappenings = [
  {
    label: 'Friday evening',
    title: 'Sunset Jazz by the Lagoon',
    description:
      'A strong end-of-day upgrade for travelers who want one memorable local event without overplanning.',
    meta: 'Casa Laguna Deck · 7:00 PM',
    route: '/events',
  },
  {
    label: 'Saturday morning',
    title: 'Local Market Brunch Crawl',
    description:
      'Useful for guests who want to spend one morning in town and mix food discovery into the stay.',
    meta: 'Centro Bacalar · 10:30 AM',
    route: '/events',
  },
  {
    label: 'Sunday sunrise',
    title: 'Lagoon Breathwork Session',
    description:
      'A wellness-forward option that reinforces Bacalar’s quieter, restorative side.',
    meta: 'Isla Yoga Garden · 8:00 AM',
    route: '/events',
  },
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
          <SectionEyebrow>Plan Bacalar with intention</SectionEyebrow>
          <div className={styles.heroCopy}>
            <h1>Help travelers build an easy, beautiful first plan for Bacalar.</h1>
            <p>
              This page should feel like a calm travel concierge: lead with the
              lagoon, suggest the best next decisions, and make booking feel
              straightforward from the very first screen.
            </p>
          </div>
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

        <ContentPanel as="aside" className={styles.calloutCard} tone="warm">
          <PageIntro
            eyebrow="Start here"
            title="A clear first plan beats a crowded homepage"
            description="Lead with the lagoon, support the day with a few strong restaurant picks, add timely events as optional upgrades, and keep the booking path visible from the start."
            compact
          />
          <ul className={styles.plainList}>
            <li>Choose one standout lagoon experience first.</li>
            <li>Pair it with the right breakfast, lunch, or dinner stop.</li>
            <li>Add an event only if it improves the day, not because it fills space.</li>
            <li>Offer a booking path that feels simple and reassuring.</li>
          </ul>
        </ContentPanel>
      </section>

      <section className={styles.suggestionSection}>
        <PageIntro
          eyebrow="Featured lagoon experiences"
          title="Start with the water because that is the clearest hero offer"
          description="These are the kinds of featured picks that belong high on the home page: easy to compare, emotionally strong, and useful for first-time visitors."
        />

        <div className={styles.suggestionGrid}>
          {featuredLagoonExperiences.map((item) => (
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
          eyebrow="Where to eat by moment"
          title="Breakfast, lunch, and dinner picks for Bacalar"
          description="Instead of a generic restaurant list on the home page, show one strong recommendation for each part of the day."
        />

        <div className={styles.suggestionGrid}>
          {diningMoments.map((item) => (
            <Link
              key={item.title}
              className={styles.suggestionCard}
              to={item.route}
            >
              <small>{item.label}</small>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <span>{item.meta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.suggestionSection}>
        <PageIntro
          eyebrow="This week in Bacalar"
          title="Use events as timely local add-ons"
          description="Event content should feel current and selective. It works best when it gives travelers one or two good reasons to shape an evening or weekend around what is happening now."
        />

        <div className={styles.suggestionGrid}>
          {weeklyHappenings.map((item) => (
            <Link
              key={item.title}
              className={styles.suggestionCard}
              to={item.route}
            >
              <small>{item.label}</small>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <span>{item.meta}</span>
            </Link>
          ))}
        </div>
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

      <ContentPanel className={styles.bookingPanel}>
        <div className={styles.bookingCopy}>
          <SectionEyebrow>Ready to book</SectionEyebrow>
          <h2>Once a guest has chosen the experience, the next step should be obvious.</h2>
          <p>
            Keep the final handoff simple: travel date, guest count, and clear
            confirmation expectations. The homepage should end by showing that
            the booking flow is easy to start.
          </p>
        </div>

        <div className={styles.bookingActions}>
          <Link className={styles.primaryLink} to="/booking">
            Start booking
          </Link>
          <Link className={styles.secondaryLink} to="/tours">
            Compare tours first
          </Link>
        </div>
      </ContentPanel>
    </div>
  )
}
