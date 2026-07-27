import { Link } from 'react-router-dom'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import type { HomeImage } from '../types/home-content'
import styles from './HomeHero.module.scss'

type HomeHeroProps = {
  eyebrow: string
  title: string
  description: string
  image?: HomeImage & {
    avifSrcSet?: string
    srcSet?: string
    webpSrcSet?: string
    sizes?: string
    width?: number
    height?: number
    priority?: boolean
  }
  ctaLabel: string
}

export function HomeHero({
  eyebrow,
  title,
  description,
  image,
  ctaLabel,
}: HomeHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.copyColumn}>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
        <Link className={styles.primaryLink} to="/tours">
          {ctaLabel}
        </Link>
      </div>

      <div className={styles.visualColumn}>
        {image ? (
          <picture className={styles.picture}>
            {image.avifSrcSet ? (
              <source
                type="image/avif"
                srcSet={image.avifSrcSet}
                sizes={image.sizes}
              />
            ) : null}
            {image.webpSrcSet ? (
              <source
                type="image/webp"
                srcSet={image.webpSrcSet}
                sizes={image.sizes}
              />
            ) : null}
            <img
              className={styles.image}
              src={image.src}
              srcSet={image.srcSet}
              sizes={image.sizes}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={image.priority ? 'eager' : 'lazy'}
              fetchPriority={image.priority ? 'high' : 'auto'}
              decoding={image.priority ? 'sync' : 'async'}
            />
          </picture>
        ) : null}
        <div className={styles.overlay} />
      </div>
    </section>
  )
}
