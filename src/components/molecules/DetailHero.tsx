import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from 'react'
import { SectionEyebrow } from '../atoms/SectionEyebrow'
import styles from '../../styles/FeatureDetailPage.module.scss'

type GalleryImage = {
  src: string
  alt: string
}

type DetailHeroProps = {
  eyebrow: string
  images?: GalleryImage[]
  galleryAriaLabel: string
  closeLabel: string
  countLabel: (current: number, total: number) => string
}

function getDesktopVisibleCount(total: number) {
  if (total <= 1) return 1
  if (total === 2) return 2
  if (total === 3) return 3
  return 5
}

export function DetailHero({
  eyebrow,
  images = [],
  galleryAriaLabel,
  closeLabel,
  countLabel,
}: DetailHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [lightboxTouchStartX, setLightboxTouchStartX] = useState<number | null>(
    null,
  )
  const [lightboxTouchStartY, setLightboxTouchStartY] = useState<number | null>(
    null,
  )
  const galleryId = useId()
  const mobileTrackRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)
  const desktopVisibleCount = getDesktopVisibleCount(images.length)
  const isSingleImageGallery = images.length === 1

  useEffect(() => {
    if (lightboxIndex === null) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = originalOverflow
      lastTriggerRef.current?.focus()
    }
  }, [lightboxIndex])

  useEffect(() => {
    if (lightboxIndex === null) {
      return
    }

    function handleKeyDown(event: KeyboardEvent | globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setLightboxIndex(null)
      }
      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % images.length,
        )
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) =>
          current === null ? null : (current - 1 + images.length) % images.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [images.length, lightboxIndex])

  function openLightbox(index: number, trigger: HTMLButtonElement | null) {
    lastTriggerRef.current = trigger
    setLightboxIndex(index)
  }

  function goToMobileIndex(index: number) {
    const nextIndex = Math.max(0, Math.min(index, images.length - 1))
    setCurrentIndex(nextIndex)
    const track = mobileTrackRef.current

    if (!track) {
      return
    }

    const item = track.querySelector<HTMLElement>(
      `[data-gallery-index="${nextIndex}"]`,
    )

    item?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }

  function handleTrackScroll() {
    const track = mobileTrackRef.current

    if (!track) {
      return
    }

    const itemWidth = track.clientWidth

    if (itemWidth <= 0) {
      return
    }

    const nextIndex = Math.round(track.scrollLeft / itemWidth)
    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex)
    }
  }

  function handleGalleryKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goToMobileIndex(currentIndex + 1)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goToMobileIndex(currentIndex - 1)
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0]
    setTouchStartX(touch.clientX)
    setTouchStartY(touch.clientY)
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null || touchStartY === null) {
      return
    }

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartX
    const deltaY = touch.clientY - touchStartY

    setTouchStartX(null)
    setTouchStartY(null)

    if (Math.abs(deltaX) < 36 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return
    }

    goToMobileIndex(currentIndex + (deltaX < 0 ? 1 : -1))
  }

  function handleLightboxTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0]
    setLightboxTouchStartX(touch.clientX)
    setLightboxTouchStartY(touch.clientY)
  }

  function handleLightboxTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (lightboxTouchStartX === null || lightboxTouchStartY === null) {
      return
    }

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - lightboxTouchStartX
    const deltaY = touch.clientY - lightboxTouchStartY

    setLightboxTouchStartX(null)
    setLightboxTouchStartY(null)

    if (Math.abs(deltaX) < 36 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return
    }

    setLightboxIndex((current) => {
      if (current === null) {
        return null
      }

      return deltaX < 0
        ? (current + 1) % images.length
        : (current - 1 + images.length) % images.length
    })
  }

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <section className={styles.heroSection}>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>

        <div
          className={styles.mobileGalleryFrame}
          aria-label={galleryAriaLabel}
          onKeyDown={handleGalleryKeyDown}
        >
          <div
            id={galleryId}
            ref={mobileTrackRef}
            className={styles.mobileGalleryTrack}
            onScroll={handleTrackScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
          >
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                className={styles.mobileGallerySlide}
                data-gallery-index={index}
                onClick={(event) =>
                  openLightbox(index, event.currentTarget)
                }
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.heroImage}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : undefined}
                />
                {images.length > 1 && index === currentIndex ? (
                  <span className={styles.mobileGalleryCountOverlay}>
                    {countLabel(currentIndex + 1, images.length)}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`${styles.desktopGallery} ${
            styles[`desktopGalleryCount${Math.min(images.length, 5)}`]
          }`}
          data-gallery-layout={isSingleImageGallery ? 'single' : 'multi'}
          aria-label={galleryAriaLabel}
        >
          {images.map((image, index) => {
            const isHiddenOnDesktop = index >= desktopVisibleCount
            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                className={`${styles.desktopGalleryItem} ${
                  index === 0 ? styles.desktopGalleryPrimary : ''
                } ${isHiddenOnDesktop ? styles.desktopOnlyHidden : ''}`}
                onClick={(event) =>
                  openLightbox(index, event.currentTarget)
                }
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.heroImage}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : undefined}
                />
              </button>
            )
          })}
        </div>
      </section>

      {lightboxIndex !== null ? (
        <div
          className={styles.lightboxBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={galleryAriaLabel}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxIndex(null)
            }
          }}
        >
        <div
          className={styles.lightbox}
          onTouchStart={handleLightboxTouchStart}
          onTouchEnd={handleLightboxTouchEnd}
        >
            <div className={styles.lightboxHeader}>
              <span className={styles.galleryCounter}>
                {countLabel(lightboxIndex + 1, images.length)}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.galleryControl}
                onClick={() => setLightboxIndex(null)}
                aria-label={closeLabel}
              >
                &#10005;
              </button>
            </div>

            <div className={styles.lightboxBody}>
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                className={styles.lightboxImage}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
