import { Link } from 'react-router-dom'
import { SectionEyebrow } from '../../../components/atoms/SectionEyebrow'
import type { HomeImage } from '../types/home-content'
import styles from './HomeHero.module.scss'

type HomeHeroProps = {
  eyebrow: string
  title: string
  description: string
  image?: HomeImage
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
          <img className={styles.image} src={image.src} alt={image.alt} />
        ) : null}
        <div className={styles.overlay} />
      </div>
    </section>
  )
}
