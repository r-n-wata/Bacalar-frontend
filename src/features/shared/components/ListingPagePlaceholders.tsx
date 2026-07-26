import cardStyles from '../../../styles/FeatureCards.module.scss'
import pageStyles from '../../../styles/FeaturePage.module.scss'

type ListingCardsPlaceholderProps = {
  count?: number
  testId?: string
}

export function PageIntroPlaceholder({ testId }: { testId?: string }) {
  return (
    <div
      aria-hidden="true"
      data-testid={testId}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        minBlockSize: '188px',
      }}
    >
      <div
        className="sb-skeleton sb-skeleton-line"
        style={{ width: '120px', height: '16px' }}
      />
      <div
        className="sb-skeleton sb-skeleton-line"
        style={{ width: '68%', height: '52px' }}
      />
      <div
        className="sb-skeleton sb-skeleton-line"
        style={{ width: '84%', height: '18px' }}
      />
    </div>
  )
}

export function ListingCardsPlaceholder({
  count = 6,
  testId,
}: ListingCardsPlaceholderProps) {
  return (
    <section aria-hidden="true" data-testid={testId}>
      <div className={cardStyles.grid}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="sb-skeleton-panel">
            <div
              className="sb-skeleton"
              style={{ height: '180px', borderRadius: '24px 24px 18px 18px' }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '18px',
              }}
            >
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '34%', height: '14px' }}
              />
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '72%', height: '22px' }}
              />
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '88%', height: '16px' }}
              />
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '48%', height: '16px' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FeaturedSectionPlaceholder({
  cardCount = 3,
  testId,
}: {
  cardCount?: number
  testId?: string
}) {
  return (
    <section
      aria-hidden="true"
      data-testid={testId}
      style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div
          className="sb-skeleton sb-skeleton-line"
          style={{ width: '140px', height: '14px' }}
        />
        <div
          className="sb-skeleton sb-skeleton-line"
          style={{ width: '44%', height: '36px' }}
        />
        <div
          className="sb-skeleton sb-skeleton-line"
          style={{ width: '58%', height: '16px' }}
        />
      </div>
      <ListingCardsPlaceholder count={cardCount} />
    </section>
  )
}

export function CalloutCardPlaceholder({ testId }: { testId?: string }) {
  return (
    <section
      aria-hidden="true"
      data-testid={testId}
      className={`sb-skeleton-panel ${pageStyles.calloutCard}`}
      style={{ padding: '24px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div
          className="sb-skeleton sb-skeleton-line"
          style={{ width: '180px', height: '14px' }}
        />
        <div
          className="sb-skeleton sb-skeleton-line"
          style={{ width: '54%', height: '32px' }}
        />
        <div
          className="sb-skeleton sb-skeleton-line"
          style={{ width: '72%', height: '16px' }}
        />
      </div>
      <div
        className="sb-skeleton sb-skeleton-line"
        style={{ width: '160px', height: '48px', borderRadius: '999px' }}
      />
    </section>
  )
}
