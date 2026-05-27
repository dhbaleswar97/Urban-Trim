'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import { useMouseVector } from '@/hooks/use-mouse-vector'

/* ─── Constants ────────────────────────────────────────────────────────────── */

const ITEM_W = 138 // px — trail image width
const ITEM_H = 162 // px — trail image height
const LIFETIME = 950 // ms — how long each image lives before exit begins

/* ─── Types ─────────────────────────────────────────────────────────────────── */

interface TrailItem {
  id: string
  x: number
  y: number
  src: string
  rotation: number
}

export interface ImageTrailProps {
  images: string[]
  containerRef: React.RefObject<HTMLDivElement | null>
  /* px of mouse travel before spawning the next image (default 85) */
  threshold?: number
  /* max images alive at once (default 7) */
  maxItems?: number
}

/* ─── Component ─────────────────────────────────────────────────────────────── */

export function ImageTrail({
  images,
  containerRef,
  threshold = 85,
  maxItems = 7,
}: ImageTrailProps) {
  const [items, setItems] = useState<TrailItem[]>([])
  const indexRef = useRef(0)
  const distRef = useRef(0)
  const getVector = useMouseVector()
  const shuffledRef = useRef<string[]>([])

  /* Shuffle image order once on mount — must live in effect, not render body */
  useEffect(() => {
    shuffledRef.current = [...images].sort(() => Math.random() - 0.5)
    indexRef.current = 0
  }, [images])

  const handleMove = useCallback(
    (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return

      const pool = shuffledRef.current
      if (pool.length === 0) return

      const rect = el.getBoundingClientRect()
      const vec = getVector(e.clientX, e.clientY, rect)
      distRef.current += vec.speed

      if (distRef.current < threshold) return
      distRef.current = 0

      const src = pool[indexRef.current % pool.length]
      indexRef.current++

      const item: TrailItem = {
        id: uuidv4(),
        x: vec.x,
        y: vec.y,
        src,
        rotation: (Math.random() - 0.5) * 20, // -10° … +10°
      }

      setItems((prev) => {
        const next = [...prev, item]
        return next.length > maxItems ? next.slice(1) : next
      })

      const { id } = item
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id))
      }, LIFETIME)
    },
    [containerRef, threshold, maxItems, getVector]
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('mousemove', handleMove)
    return () => el.removeEventListener('mousemove', handleMove)
  }, [containerRef, handleMove])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 0.72,
              opacity: 0,
              y: -18,
              transition: {
                duration: 0.44,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              },
            }}
            transition={{
              scale: { type: 'spring', stiffness: 260, damping: 22, mass: 0.8 },
              opacity: { duration: 0.2 },
            }}
            style={{
              position: 'absolute',
              left: item.x - ITEM_W / 2,
              top: item.y - ITEM_H / 2,
              width: ITEM_W,
              height: ITEM_H,
              rotate: item.rotation,
              willChange: 'transform, opacity',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={item.src}
                alt=""
                fill
                className="object-contain"
                sizes="160px"
                draggable={false}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
