'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IMAGES } from '@/config/images'

/*
 * ArtisansGallery — draggable fan-spread photo gallery.
 * Adapted from the PhotoGallery component for Urban Trim's Artisans section.
 *
 * Five photos spring-animate outward from a stacked centre position.
 * Each photo is independently draggable (rubber-band constraints).
 * Designed for use on a dark (black) section background.
 */

/* ─── Types ──────────────────────────────────────────────────────────────── */

type Direction = 'left' | 'right'

interface PhotoConfig {
  id: number
  order: number
  x: string
  y: string
  zIndex: number
  direction: Direction
  src: string
  alt: string
}

/* ─── Photo data — Urban Trim team + salon imagery ───────────────────────── */

const PHOTOS: PhotoConfig[] = [
  {
    id: 1,
    order: 0,
    x: '-310px',
    y: '18px',
    zIndex: 50,
    direction: 'left',
    src: IMAGES.gallery[5],
    alt: 'Urban Trim studio',
  },
  {
    id: 2,
    order: 1,
    x: '-155px',
    y: '30px',
    zIndex: 40,
    direction: 'left',
    src: IMAGES.stylists.one,
    alt: 'Senior stylist',
  },
  {
    id: 3,
    order: 2,
    x: '0px',
    y: '6px',
    zIndex: 30,
    direction: 'right',
    src: IMAGES.stylists.two,
    alt: 'Head stylist',
  },
  {
    id: 4,
    order: 3,
    x: '155px',
    y: '24px',
    zIndex: 20,
    direction: 'right',
    src: IMAGES.stylists.three,
    alt: 'Master barber',
  },
  {
    id: 5,
    order: 4,
    x: '310px',
    y: '42px',
    zIndex: 10,
    direction: 'left',
    src: IMAGES.gallery[6],
    alt: 'Urban Trim craft session',
  },
]

/* ─── Animation variants ─────────────────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const photoVariants = {
  hidden: () => ({ x: 0, y: 0, rotate: 0, scale: 1 }),
  visible: (custom: { x: string; y: string; order: number }) => ({
    x: custom.x,
    y: custom.y,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 65,
      damping: 12,
      mass: 1,
      delay: custom.order * 0.15,
    },
  }),
}

/* ─── ArtisansGallery ────────────────────────────────────────────────────── */

export function ArtisansGallery({ animationDelay = 0.2 }: { animationDelay?: number }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: '-100px' })
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  /* Kick off animations when the section enters the viewport */
  useEffect(() => {
    if (!inView) return
    const t1 = setTimeout(() => setIsVisible(true), animationDelay * 1000)
    const t2 = setTimeout(() => setIsLoaded(true), (animationDelay + 0.4) * 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [inView, animationDelay])

  return (
    <div ref={sectionRef} className="relative w-full">
      {/* ── Section label ── */}
      <p className="font-body mb-5 text-center text-[10px] tracking-[0.32em] text-white/40 uppercase">
        (Our Artisans)
      </p>

      {/* ── Heading ── */}
      <h2 className="font-display mb-3 text-center text-[clamp(2.8rem,6vw,7rem)] leading-[0.9] text-white">
        Masters of
        <br className="md:hidden" /> their craft.
      </h2>

      <p className="font-body mx-auto mb-16 max-w-[280px] text-center text-[13px] leading-relaxed text-white/40">
        Artists who shape identity — one precise cut at a time.
      </p>

      {/* ── Fan gallery ── */}
      <div className="relative flex h-[320px] w-full items-center justify-center">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            <div className="relative h-[220px] w-[220px]">
              {[...PHOTOS].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute top-0 left-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{ x: photo.x, y: photo.y, order: photo.order }}
                >
                  <ArtisanPhoto
                    src={photo.src}
                    alt={photo.alt}
                    width={220}
                    height={220}
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── CTA ── */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/about"
          className="ut-btn ut-btn-dark !rounded-full !border-[#B6F500]"
          data-cursor="hover"
        >
          <span className="ut-btn-fill" aria-hidden="true" />
          <span className="ut-btn-text flex items-center gap-2">
            Meet the Team <ArrowUpRight size={13} />
          </span>
        </Link>
      </div>
    </div>
  )
}

/* ─── ArtisanPhoto — single draggable framed photo ──────────────────────── */

function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function ArtisanPhoto({
  src,
  alt,
  className,
  direction,
  width,
  height,
}: {
  src: string
  alt: string
  className?: string
  direction?: Direction
  width: number
  height: number
}) {
  const [rotation, setRotation] = useState(0)
  const x = useMotionValue(110)
  const y = useMotionValue(110)

  useEffect(() => {
    const sign = direction === 'left' ? -1 : 1
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRotation(getRandomInRange(1, 4) * sign)
  }, [direction])

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  const resetMouse = () => {
    x.set(110)
    y.set(110)
  }

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.18, zIndex: 9999 }}
      whileHover={{
        scale: 1.08,
        rotateZ: 2 * (direction === 'left' ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{ scale: 1.12, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        zIndex: 1,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'none',
      }}
      className={cn('relative mx-auto shrink-0 cursor-grab active:cursor-grabbing', className)}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      {/* White photo-print border + shadow — visible on dark bg */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
        <Image
          className="rounded-2xl object-cover"
          fill
          src={src}
          alt={alt}
          draggable={false}
          sizes="220px"
        />
      </div>
    </motion.div>
  )
}
