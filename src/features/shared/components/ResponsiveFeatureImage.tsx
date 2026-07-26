import type { ResolvedFeatureImage } from '../lib/featureImage'

type ResponsiveFeatureImageProps = {
  image: ResolvedFeatureImage
}

export function ResponsiveFeatureImage({
  image,
}: ResponsiveFeatureImageProps) {
  const width = image.width ?? 1600
  const height = image.height ?? 900
  const aspectRatio = image.aspectRatio ?? `${width} / ${height}`

  return (
    <picture style={{ aspectRatio }}>
      {image.avifSrcSet ? (
        <source
          srcSet={image.avifSrcSet}
          sizes={image.sizes}
          type="image/avif"
        />
      ) : null}
      {image.webpSrcSet ? (
        <source
          srcSet={image.webpSrcSet}
          sizes={image.sizes}
          type="image/webp"
        />
      ) : null}
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.sizes}
        width={width}
        height={height}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        style={{ aspectRatio }}
      />
    </picture>
  )
}
