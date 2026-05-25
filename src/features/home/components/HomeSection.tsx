import { Link } from 'react-router-dom'
import { PageIntro } from '../../../components/molecules/PageIntro'
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
}

export function HomeSection({
  intro,
  items,
  ctaLabel,
  ctaTo,
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

      <div className={styles.grid}>
        {visibleItems.map((item) => (
          <HomePreviewCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
