import styles from '../../styles/FeatureDetailPage.module.scss'

type ProviderCardAction = {
  label: string
  href: string
}

type ProviderCardProps = {
  eyebrow: string
  title: string
  description?: string
  actions?: ProviderCardAction[]
}

export function ProviderCard({
  eyebrow,
  title,
  description,
  actions = [],
}: ProviderCardProps) {
  return (
    <section className={styles.providerCard}>
      <div className={styles.providerHeader}>
        <p className={styles.providerEyebrow}>{eyebrow}</p>
        <h2 className={styles.providerTitle}>{title}</h2>
        {description ? <p className={styles.bodyCopy}>{description}</p> : null}
      </div>

      {actions.length > 0 ? (
        <div className={styles.inlineActions}>
          {actions.map((action) => (
            <a
              key={`${action.label}-${action.href}`}
              className={styles.inlineAction}
              href={action.href}
              target="_blank"
              rel="noreferrer"
            >
              {action.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  )
}
