'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionBadgeProps {
  label: string
  number?: string
  className?: string
}

export function SectionBadge({ label, number, className = '' }: SectionBadgeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={`inline-flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {number && (
        <span className="font-body text-ut-gold text-[11px] tracking-[0.2em]">{number}</span>
      )}
      <span className="gold-line" />
      <span className="font-body text-ut-muted text-[11px] tracking-[0.25em] uppercase">
        {label}
      </span>
    </motion.div>
  )
}
