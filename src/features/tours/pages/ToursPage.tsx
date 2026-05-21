import { useTranslation } from 'react-i18next'
import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { TourList } from '../components/TourList'
import { useTours } from '../hooks/useTours'

export function ToursPage() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useTours()

  return (
    <section className={pageStyles.page}>
      {data ? (
        <PageIntro
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />
      ) : null}

      {isLoading ? <p>{t('tours.loading')}</p> : null}
      {isError ? <p role="alert">{t('common.error')}</p> : null}
      {data && !isLoading && !isError ? <TourList tours={data.items} /> : null}
    </section>
  )
}
