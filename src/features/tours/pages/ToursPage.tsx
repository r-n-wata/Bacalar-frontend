import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { TourList } from '../components/TourList'
import { useTours } from '../hooks/useTours'

export function ToursPage() {
  const { data = [], isLoading } = useTours()

  return (
    <section className={pageStyles.page}>
      <div className={pageStyles.intro}>
        <SectionEyebrow>Tours feature</SectionEyebrow>
        <h1>Boat tours and experience browsing</h1>
        <p className={pageStyles.copy}>
          React Query owns live availability-ready tour data, while future
          compare and filter state can stay client-side.
        </p>
      </div>

      {isLoading ? <p>Loading tours...</p> : <TourList tours={data} />}
    </section>
  )
}
