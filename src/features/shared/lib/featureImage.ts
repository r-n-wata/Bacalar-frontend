import eventCommunityPlaceholder from '../../../assets/events-placeholder/community.jpg'
import eventCommunityTwoPlaceholder from '../../../assets/events-placeholder/community2.jpg'
import eventMusicPlaceholder from '../../../assets/events-placeholder/music.jpg'
import eventMusicTwoPlaceholder from '../../../assets/events-placeholder/music2.jpg'
import restaurantPlaceholderOne from '../../../assets/restaurant-placeholder/p1.jpg'
import restaurantPlaceholderTwo from '../../../assets/restaurant-placeholder/p2.jpg'
import restaurantPlaceholderThree from '../../../assets/restaurant-placeholder/p3.jpg'
import restaurantPlaceholderFour from '../../../assets/restaurant-placeholder/p4.jpg'
import restaurantPlaceholderFive from '../../../assets/restaurant-placeholder/p5.jpg'
import restaurantPlaceholderSix from '../../../assets/restaurant-placeholder/p6.jpg'
import tourPlaceholderOne from '../../../assets/tours-placeholder/p1.jpg'
import tourPlaceholderTwo from '../../../assets/tours-placeholder/p2.jpg'
import tourPlaceholderThree from '../../../assets/tours-placeholder/p3.jpg'
import tourPlaceholderFour from '../../../assets/tours-placeholder/p4.jpg'
import tourPlaceholderFive from '../../../assets/tours-placeholder/p5.jpg'
import tourPlaceholderSix from '../../../assets/tours-placeholder/p6.jpg'
import tourPlaceholderSeven from '../../../assets/tours-placeholder/p7.jpg'

type FeatureImage = {
  src: string
  alt: string
}

type FeatureImageKind = 'event' | 'restaurant' | 'tour'

type ResolveFeatureImageOptions = {
  kind: FeatureImageKind
  id: string
  image?: FeatureImage
  fallbackAlt: string
}

const placeholderImagesByKind: Record<FeatureImageKind, string[]> = {
  event: [
    eventCommunityPlaceholder,
    eventCommunityTwoPlaceholder,
    eventMusicPlaceholder,
    eventMusicTwoPlaceholder,
  ],
  restaurant: [
    restaurantPlaceholderOne,
    restaurantPlaceholderTwo,
    restaurantPlaceholderThree,
    restaurantPlaceholderFour,
    restaurantPlaceholderFive,
    restaurantPlaceholderSix,
  ],
  tour: [
    tourPlaceholderOne,
    tourPlaceholderTwo,
    tourPlaceholderThree,
    tourPlaceholderFour,
    tourPlaceholderFive,
    tourPlaceholderSix,
    tourPlaceholderSeven,
  ],
}

function getStableIndex(seed: string, poolSize: number) {
  let hash = 0

  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  }

  return hash % poolSize
}

export function getFeaturePlaceholderImage({
  kind,
  id,
  fallbackAlt,
}: Omit<ResolveFeatureImageOptions, 'image'>): FeatureImage {
  const placeholders = placeholderImagesByKind[kind]
  const index = getStableIndex(id, placeholders.length)

  return {
    src: placeholders[index],
    alt: fallbackAlt,
  }
}

export function resolveFeatureImage({
  kind,
  id,
  image,
  fallbackAlt,
}: ResolveFeatureImageOptions): FeatureImage {
  if (image?.src) {
    return image
  }

  return getFeaturePlaceholderImage({
    kind,
    id,
    fallbackAlt,
  })
}
