import { Link } from 'react-router-dom'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { PublicStatusPanel } from '../../../components/organisms/PublicStatusPanel'
import type {
  HomeSectionIntro,
  HomeSuggestionCard,
} from '../types/home-content'
import { HomePreviewCard } from './HomePreviewCard'
import styles from './HomeSection.module.scss'

type HomeSectionProps = {
  intro: HomeSectionIntro
  items: HomeSuggestionCard[]
  ctaLabel: string
  ctaTo: string
  emptyState?: {
    title: string
    description: string
    ctaLabel: string
    ctaTo: string
  }
}

export function HomeSection({
  intro,
  items,
  ctaLabel,
  ctaTo,
  emptyState,
}: HomeSectionProps) {
  const visibleItems = items.slice(0, 10)

  return (
    <section className={styles.section} aria-label={intro.title}>
      <div className={styles.header}>
        <PageIntro
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />
        <Link className={styles.sectionLink} to={ctaTo}>
          {ctaLabel}
        </Link>
      </div>

      {visibleItems.length > 0 ? (
        <div className={styles.grid}>
          {visibleItems.map((item) => (
            <HomePreviewCard key={item.id} item={item} />
          ))}
        </div>
      ) : emptyState ? (
        <PublicStatusPanel
          compact
          eyebrow={intro.eyebrow}
          title={emptyState.title}
          description={emptyState.description}
          actions={[
            {
              kind: 'link',
              label: emptyState.ctaLabel,
              to: emptyState.ctaTo,
            },
          ]}
        />
      ) : null}
    </section>
  )
}
