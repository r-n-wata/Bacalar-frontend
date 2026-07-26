import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import pageStyles from '../../../styles/FeatureDetailPage.module.scss'

type DetailPagePlaceholderProps = {
  eyebrow: string
  testIdPrefix: string
  showMetaGrid?: boolean
}

export function DetailPagePlaceholder({
  eyebrow,
  testIdPrefix,
  showMetaGrid = true,
}: DetailPagePlaceholderProps) {
  return (
    <>
      <section
        className={pageStyles.heroSection}
        aria-hidden="true"
        data-testid={`${testIdPrefix}-hero-placeholder`}
      >
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <div className={pageStyles.mobileGalleryFrame}>
          <div
            className="sb-skeleton"
            style={{
              minHeight: '290px',
              maxHeight: 'min(58vh, 420px)',
              borderRadius: '18px',
            }}
          />
        </div>
        <div
          className={`${pageStyles.desktopGallery} ${pageStyles.desktopGalleryCount1}`}
        >
          <div
            className={`${pageStyles.desktopGalleryItem} ${pageStyles.desktopGalleryPrimary} sb-skeleton`}
            style={{ borderRadius: '18px' }}
          />
        </div>
      </section>

      <section
        className={pageStyles.introCard}
        aria-hidden="true"
        data-testid={`${testIdPrefix}-intro-placeholder`}
      >
        <div className={pageStyles.introContent}>
          <div className={pageStyles.inlineBadges}>
            <div
              className="sb-skeleton sb-skeleton-line"
              style={{ width: '164px', height: '28px', borderRadius: '999px' }}
            />
          </div>
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '60%', height: '54px' }}
          />
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '78%', height: '18px' }}
          />
          <div
            className="sb-skeleton sb-skeleton-line"
            style={{ width: '66%', height: '18px' }}
          />
          <div className={pageStyles.introHighlights}>
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index} className={pageStyles.introHighlight}>
                <div
                  className="sb-skeleton sb-skeleton-line"
                  style={{ width: '72%', height: '12px' }}
                />
                <div
                  className="sb-skeleton sb-skeleton-line"
                  style={{ width: '56%', height: '18px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className={pageStyles.layout}
        aria-hidden="true"
        data-testid={`${testIdPrefix}-layout-placeholder`}
      >
        <div className={pageStyles.mainColumn}>
          {showMetaGrid ? (
            <section className={pageStyles.metaSection}>
              <div className={pageStyles.metaGrid}>
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className={pageStyles.metaCard}>
                    <div
                      className="sb-skeleton sb-skeleton-line"
                      style={{ width: '62%', height: '12px' }}
                    />
                    <div
                      className="sb-skeleton sb-skeleton-line"
                      style={{ width: '74%', height: '18px' }}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="sb-skeleton-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '92%', height: '18px' }}
              />
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '88%', height: '18px' }}
              />
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '84%', height: '18px' }}
              />
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '48%', height: '12px', marginTop: '8px' }}
              />
              <div
                className="sb-skeleton"
                style={{ width: '100%', height: '220px', borderRadius: '18px' }}
              />
            </div>
          </section>
        </div>

        <aside className={pageStyles.sidebarColumn}>
          <section className="sb-skeleton-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '44%', height: '20px' }}
              />
              <div className={pageStyles.sidebarFacts}>
                {Array.from({ length: 2 }, (_, index) => (
                  <div key={index} className={pageStyles.sidebarFact}>
                    <div
                      className="sb-skeleton sb-skeleton-line"
                      style={{ width: '58%', height: '12px' }}
                    />
                    <div
                      className="sb-skeleton sb-skeleton-line"
                      style={{ width: '72%', height: '18px' }}
                    />
                  </div>
                ))}
              </div>
              <div
                className="sb-skeleton sb-skeleton-line"
                style={{ width: '100%', height: '44px', borderRadius: '999px' }}
              />
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}
