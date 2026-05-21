import { useTranslation } from 'react-i18next'
import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { EventList } from '../components/EventList'
import { useEvents } from '../hooks/useEvents'

export function EventsPage() {
  const { t } = useTranslation()
  const { data = [], isLoading, isError } = useEvents()

  return (
    <section className={pageStyles.page}>
      <PageIntro
        eyebrow={t('events.eyebrow')}
        title={t('events.title')}
        description={t('events.description')}
      />

      {isLoading ? <p>{t('events.loading')}</p> : null}
      {isError ? <p role="alert">{t('events.error')}</p> : null}
      {!isLoading && !isError ? <EventList events={data} /> : null}
    </section>
  )
}
