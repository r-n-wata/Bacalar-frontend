import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import styles from '../../events/components/EventSubmitCta.module.scss'

export function RestaurantSubmitCta() {
  const { t } = useTranslation()

  return (
    <ContentPanel tone="warm" className={pageStyles.calloutCard}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{t('restaurants.submitCta.eyebrow')}</p>
        <h2 className={styles.title}>{t('restaurants.submitCta.title')}</h2>
        <p className={styles.description}>
          {t('restaurants.submitCta.description')}
        </p>
      </div>
      <Link className={styles.link} to="/restaurants/submit">
        {t('restaurants.submitCta.action')}
      </Link>
    </ContentPanel>
  )
}
