import { ContentPanel } from '../../../components/atoms/ContentPanel'

type AdminCollectionPlaceholderProps = {
  cardCount?: number
  testIdPrefix: string
}

export function AdminGatePlaceholder({
  testIdPrefix,
}: {
  testIdPrefix: string
}) {
  return (
    <section aria-hidden="true" data-testid={`${testIdPrefix}-placeholder`}>
      <ContentPanel>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '180px', height: '14px' }}
          />
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '48%', height: '40px' }}
          />
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '72%', height: '18px' }}
          />
        </div>
      </ContentPanel>
    </section>
  )
}

export function AdminCollectionPlaceholder({
  cardCount = 3,
  testIdPrefix,
}: AdminCollectionPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      data-testid={`${testIdPrefix}-placeholder`}
      style={{ display: 'grid', gap: '18px' }}
    >
      <ContentPanel>
        <div style={{ display: 'grid', gap: '14px' }}>
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '140px', height: '16px' }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '110px', height: '40px', borderRadius: '999px' }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {Array.from({ length: 2 }, (_, index) => (
              <div
                key={index}
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '150px', height: '32px', borderRadius: '999px' }}
              />
            ))}
          </div>
        </div>
      </ContentPanel>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}
      >
        {Array.from({ length: cardCount }, (_, index) => (
          <ContentPanel key={index}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div
                className="sb-skeleton"
                style={{ width: '100%', height: '180px', borderRadius: '22px' }}
              />
              <div style={{ display: 'grid', gap: '12px' }}>
                <div
                  className="sb-skeleton sb-skeleton-line"
                  style={{ width: '34%', height: '12px' }}
                />
                <div
                  className="sb-skeleton sb-skeleton-line"
                  style={{ width: '72%', height: '26px' }}
                />
                <div
                  className="sb-skeleton sb-skeleton-line"
                  style={{ width: '86%', height: '16px' }}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {Array.from({ length: 2 }, (_, pillIndex) => (
                    <div
                      key={pillIndex}
                      className="sb-skeleton sb-skeleton-line"
                      style={{ width: '112px', height: '28px', borderRadius: '999px' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ContentPanel>
        ))}
      </div>
    </div>
  )
}

export function AdminDetailPlaceholder({
  testIdPrefix,
}: {
  testIdPrefix: string
}) {
  return (
    <div
      aria-hidden="true"
      data-testid={`${testIdPrefix}-placeholder`}
      style={{ display: 'grid', gap: '18px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div
          className="sb-skeleton sb-skeleton-line"
          style={{ width: '180px', height: '20px' }}
        />
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '130px', height: '42px', borderRadius: '999px' }}
          />
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '130px', height: '42px', borderRadius: '999px' }}
          />
        </div>
      </div>

      <ContentPanel>
        <div style={{ display: 'grid', gap: '18px' }}>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div
              className="sb-skeleton sb-skeleton-line"
              style={{ width: '26%', height: '12px' }}
            />
            <div
              className="sb-skeleton sb-skeleton-line"
              style={{ width: '52%', height: '30px' }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gap: '12px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            }}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="sb-skeleton-panel" style={{ padding: '16px' }}>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div
                    className="sb-skeleton sb-skeleton-line"
                    style={{ width: '58%', height: '12px' }}
                  />
                  <div
                    className="sb-skeleton sb-skeleton-line"
                    style={{ width: '74%', height: '18px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentPanel>

      <ContentPanel>
        <div style={{ display: 'grid', gap: '14px' }}>
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '180px', height: '20px' }}
          />
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="sb-skeleton sb-skeleton-line"
              style={{ width: `${92 - index * 8}%`, height: '16px' }}
            />
          ))}
        </div>
      </ContentPanel>
    </div>
  )
}

export function AdminEditPlaceholder({
  testIdPrefix,
}: {
  testIdPrefix: string
}) {
  return (
    <div
      aria-hidden="true"
      data-testid={`${testIdPrefix}-placeholder`}
      style={{ display: 'grid', gap: '20px' }}
    >
      <ContentPanel>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '170px', height: '18px' }}
          />
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '160px', height: '18px' }}
          />
        </div>
      </ContentPanel>

      <ContentPanel>
        <div
          style={{
            display: 'grid',
            gap: '18px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} style={{ display: 'grid', gap: '10px' }}>
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '42%', height: '12px' }}
              />
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '100%', height: '48px', borderRadius: '18px' }}
              />
            </div>
          ))}
        </div>
      </ContentPanel>

      <div
        style={{
          display: 'grid',
          gap: '18px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {Array.from({ length: 2 }, (_, index) => (
          <ContentPanel key={index}>
            <div style={{ display: 'grid', gap: '14px' }}>
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '38%', height: '18px' }}
              />
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '100%', height: '180px', borderRadius: '18px' }}
              />
            </div>
          </ContentPanel>
        ))}
      </div>
    </div>
  )
}
