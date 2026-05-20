import { PageIntro } from '../../../components/molecules/PageIntro'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { TourList } from '../components/TourList'
import { useTours } from '../hooks/useTours'

export function ToursPage() {
  const { data = [], isLoading } = useTours()

  return (
    <section className={pageStyles.page}>
      <PageIntro
        eyebrow="Tours feature"
        title="Boat tours and experience browsing"
        description="React Query owns live availability-ready tour data, while future compare and filter state can stay client-side."
      />

      {isLoading ? <p>Loading tours...</p> : <TourList tours={data} />}
    </section>
  )
}
