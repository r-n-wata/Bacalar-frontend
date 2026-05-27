import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import styles from './EventSubmitCta.module.scss'

export function EventSubmitCta() {
  const { t } = useTranslation()

  return (
    <ContentPanel tone="warm" className={pageStyles.calloutCard}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{t('events.submitCta.eyebrow')}</p>
        <h2 className={styles.title}>{t('events.submitCta.title')}</h2>
        <p className={styles.description}>{t('events.submitCta.description')}</p>
      </div>
      <Link className={styles.link} to="/events/submit">
        {t('events.submitCta.action')}
      </Link>
    </ContentPanel>
  )
}
