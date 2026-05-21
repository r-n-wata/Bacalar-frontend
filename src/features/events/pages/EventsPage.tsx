import { useTranslation } from 'react-i18next'
import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { EventList } from '../components/EventList'
import { useEvents } from '../hooks/useEvents'

export function EventsPage() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useEvents()

  return (
    <section className={pageStyles.page}>
      {data ? (
        <PageIntro
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />
      ) : null}

      {isLoading ? <p>{t('events.loading')}</p> : null}
      {isError ? <p role="alert">{t('events.error')}</p> : null}
      {data && !isLoading && !isError ? <EventList events={data.items} /> : null}
    </section>
  )
}
