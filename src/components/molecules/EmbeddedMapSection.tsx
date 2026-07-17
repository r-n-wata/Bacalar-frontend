import { useTranslation } from 'react-i18next'
import pageStyles from '../../styles/FeatureDetailPage.module.scss'
import styles from './EmbeddedMapSection.module.scss'

type EmbeddedMapSectionProps = {
  title: string
  description?: string
  embedUrl?: string
  mapUrl?: string
  frameTitle: string
}

export function EmbeddedMapSection({
  title,
  description,
  embedUrl,
  mapUrl,
  frameTitle,
}: EmbeddedMapSectionProps) {
  const { t } = useTranslation()

  if (!embedUrl) {
    return null
  }

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {description ? <p className={styles.copy}>{description}</p> : null}
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          src={embedUrl}
          title={frameTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      {mapUrl ? (
        <div className={pageStyles.actions}>
          <a
            className={pageStyles.secondaryAction}
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t('common.actions.viewOnMap')}
          </a>
        </div>
      ) : null}
    </section>
  )
}
