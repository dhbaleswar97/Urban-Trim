'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageRevealProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  wrapperClassName?: string
  priority?: boolean
  delay?: number
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  fill,
  className,
  wrapperClassName,
  priority,
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className={cn('img-reveal-wrap', wrapperClassName)}>
      <motion.div
        className="img-reveal-inner h-full w-full"
        initial={{ scale: 1.08 }}
        animate={isInView ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={cn('object-cover', className)}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 800}
            height={height ?? 600}
            className={cn('h-full w-full object-cover', className)}
            priority={priority}
          />
        )}
      </motion.div>
    </div>
  )
}
