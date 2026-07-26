type FeatureImage = {
  src: string
  alt: string
  width?: number
  height?: number
}

export type ResolvedFeatureImage = FeatureImage & {
  srcSet?: string
  webpSrcSet?: string
  avifSrcSet?: string
  sizes?: string
  width?: number
  height?: number
  aspectRatio?: string
}

type FeatureImageKind = 'event' | 'restaurant' | 'tour'

type ResolveFeatureImageOptions = {
  kind: FeatureImageKind
  id: string
  image?: FeatureImage
  fallbackAlt: string
}

type PlaceholderAsset = {
  base: string
  width: number
  height: number
}

type DefaultImageDimensions = {
  width: number
  height: number
}

const LISTING_CARD_SIZES =
  '(max-width: 767px) calc(100vw - 3rem), (max-width: 1199px) calc(50vw - 3rem), 360px'

const placeholderImagesByKind: Record<FeatureImageKind, PlaceholderAsset[]> = {
  event: [
    { base: 'community', width: 1600, height: 1120 },
    { base: 'community2', width: 1600, height: 1067 },
    { base: 'music', width: 1600, height: 1067 },
    { base: 'music2', width: 1600, height: 1067 },
  ],
  restaurant: [
    { base: 'p1', width: 1600, height: 1067 },
    { base: 'p2', width: 1600, height: 900 },
    { base: 'p3', width: 1600, height: 1200 },
    { base: 'p4', width: 1600, height: 900 },
    { base: 'p5', width: 1600, height: 1067 },
    { base: 'p6', width: 1600, height: 1067 },
  ],
  tour: [
    { base: 'p1', width: 1600, height: 1234 },
    { base: 'p2', width: 1600, height: 900 },
    { base: 'p3', width: 1600, height: 2402 },
    { base: 'p4', width: 1600, height: 1200 },
    { base: 'p5', width: 1600, height: 2324 },
    { base: 'p6', width: 1600, height: 1067 },
    { base: 'p7', width: 1600, height: 1000 },
  ],
}

const defaultImageDimensionsByKind: Record<
  FeatureImageKind,
  DefaultImageDimensions
> = {
  event: {
    width: 1600,
    height: 1067,
  },
  restaurant: {
    width: 1600,
    height: 1067,
  },
  tour: {
    width: 1600,
    height: 1000,
  },
}

function toAspectRatio(width: number, height: number) {
  return `${width} / ${height}`
}

function buildListingPlaceholderPath(
  kind: FeatureImageKind,
  base: string,
  width: number,
  extension: 'avif' | 'jpg' | 'webp',
) {
  const folderByKind: Record<FeatureImageKind, string> = {
    event: 'events',
    restaurant: 'restaurants',
    tour: 'tours',
  }

  return `/images/listings/${folderByKind[kind]}/${base}-${width}.${extension}`
}

function buildPlaceholderImage(kind: FeatureImageKind, asset: PlaceholderAsset) {
  return {
    src: buildListingPlaceholderPath(kind, asset.base, 800, 'jpg'),
    srcSet: [400, 800]
      .map((width) => `${buildListingPlaceholderPath(kind, asset.base, width, 'jpg')} ${width}w`)
      .join(', '),
    webpSrcSet: [400, 800]
      .map((width) => `${buildListingPlaceholderPath(kind, asset.base, width, 'webp')} ${width}w`)
      .join(', '),
    avifSrcSet: [400, 800]
      .map((width) => `${buildListingPlaceholderPath(kind, asset.base, width, 'avif')} ${width}w`)
      .join(', '),
    sizes: LISTING_CARD_SIZES,
    width: asset.width,
    height: asset.height,
    aspectRatio: toAspectRatio(asset.width, asset.height),
  }
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
}: Omit<ResolveFeatureImageOptions, 'image'>): ResolvedFeatureImage {
  const placeholders = placeholderImagesByKind[kind]
  const index = getStableIndex(id, placeholders.length)
  const placeholder = buildPlaceholderImage(kind, placeholders[index])

  return {
    ...placeholder,
    alt: fallbackAlt,
  }
}

export function resolveFeatureImage({
  kind,
  id,
  image,
  fallbackAlt,
}: ResolveFeatureImageOptions): ResolvedFeatureImage {
  if (image?.src) {
    const defaultDimensions = defaultImageDimensionsByKind[kind]
    const width = image.width ?? defaultDimensions.width
    const height = image.height ?? defaultDimensions.height

    return {
      ...image,
      width,
      height,
      aspectRatio: toAspectRatio(width, height),
    }
  }

  return getFeaturePlaceholderImage({
    kind,
    id,
    fallbackAlt,
  })
}
