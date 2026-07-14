import styles from '../../styles/FeatureDetailPage.module.scss'

type IntroHighlight = {
  label: string
  value: string
}

type DetailIntroProps = {
  title: string
  summary: string
  badges?: string[]
  highlights?: IntroHighlight[]
}

export function DetailIntro({
  title,
  summary,
  badges = [],
  highlights = [],
}: DetailIntroProps) {
  return (
    <section className={styles.introCard}>
      <div className={styles.introContent}>
        {badges.length > 0 ? (
          <div className={styles.inlineBadges}>
            {badges.map((badge) => (
              <span key={badge} className={styles.inlineBadge}>
                {badge}
              </span>
            ))}
          </div>
        ) : null}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summary}>{summary}</p>
        {highlights.length > 0 ? (
          <dl className={styles.introHighlights}>
            {highlights.map((item) => (
              <div
                key={`${item.label}-${item.value}`}
                className={styles.introHighlight}
              >
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  )
}
