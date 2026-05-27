'use client'

import { useRef } from 'react'

interface MarqueeTextProps {
  items: string[]
  duration?: number
  reverse?: boolean
  separator?: string
  className?: string
  itemClassName?: string
}

export function MarqueeText({
  items,
  duration = 30,
  reverse = false,
  separator = '·',
  className = '',
  itemClassName = '',
}: MarqueeTextProps) {
  const doubled = [...items, ...items]

  return (
    <div className={`marquee-track ${className}`} aria-hidden="true">
      <div
        className={`marquee-content ${reverse ? 'reverse' : ''}`}
        style={{ '--duration': `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`flex items-center gap-4 ${itemClassName}`}>
            <span>{item}</span>
            <span className="text-ut-gold opacity-60">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
