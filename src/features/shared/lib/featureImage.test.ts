import { describe, expect, it } from 'vitest'
import {
  getFeaturePlaceholderImage,
  resolveFeatureImage,
} from './featureImage'

describe('featureImage', () => {
  it('returns the same placeholder for the same item within a feature kind', () => {
    const cardImage = resolveFeatureImage({
      kind: 'event',
      id: 'event-breathwork',
      fallbackAlt: 'Lagoon Breathwork Session',
    })
    const detailImage = resolveFeatureImage({
      kind: 'event',
      id: 'event-breathwork',
      fallbackAlt: 'Lagoon Breathwork Session',
    })

    expect(cardImage.src).toBe(detailImage.src)
    expect(cardImage.alt).toBe('Lagoon Breathwork Session')
  })

  it('rotates across different placeholders within the same feature kind', () => {
    const first = getFeaturePlaceholderImage({
      kind: 'restaurant',
      id: 'rest-bruma',
      fallbackAlt: 'Bruma Azul',
    })
    const second = getFeaturePlaceholderImage({
      kind: 'restaurant',
      id: 'rest-orilla',
      fallbackAlt: 'Orilla Comedor',
    })

    expect(first.src).not.toBe(second.src)
  })

  it('keeps real images ahead of placeholders', () => {
    const image = resolveFeatureImage({
      kind: 'tour',
      id: 'tour-sailing',
      image: {
        src: 'https://images.example.com/sailing.jpg',
        alt: 'Real sailing image',
      },
      fallbackAlt: 'Private Sailing at Sunrise',
    })

    expect(image).toEqual({
      src: 'https://images.example.com/sailing.jpg',
      alt: 'Real sailing image',
    })
  })
})
