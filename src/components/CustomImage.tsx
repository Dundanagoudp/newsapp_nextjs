'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface CustomImageProps extends ImageProps {
  fallbackSrc?: string
}

export default function CustomImage({
  src,
  alt,
  fallbackSrc = '/placeholder-movie.png',
  className,
  ...props
}: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(() => {
    if (!src || src === 'N/A') return fallbackSrc
    return src
  })

  return (
    <Image
      {...props}
      alt={alt}
      src={imgSrc}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}