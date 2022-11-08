import { ImageLoader, ImageLoaderProps } from 'next/image'

const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL

export const getMediaUrl = (relUrl: string) => {
  return `${MEDIA_URL}/${relUrl}`
}

export const s3ImageLoader: ImageLoader = ({
  src,
  width,
  quality
}: ImageLoaderProps) => {
  const relUrl = `${src}?w=${width}&q=${quality || 75}`
  if (src.startsWith('/')) return relUrl
  return `${MEDIA_URL}/${relUrl}`
}
