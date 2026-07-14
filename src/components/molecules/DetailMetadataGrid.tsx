import styles from '../../styles/FeatureDetailPage.module.scss'

type DetailMetadataItem = {
  label: string
  value: string
}

type DetailMetadataGridProps = {
  items: DetailMetadataItem[]
  ariaLabel: string
}

export function DetailMetadataGrid({
  items,
  ariaLabel,
}: DetailMetadataGridProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className={styles.metaSection} aria-label={ariaLabel}>
      <dl className={styles.metaGrid}>
        {items.map((item) => (
          <div
            key={`${item.label}-${item.value}`}
            className={styles.metaCard}
          >
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
