'use client'

import { useRef, type ElementType } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: ElementType
  once?: boolean
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.06,
  as: Tag = 'span',
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once, margin: '-80px' })
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={`inline ${className}`} aria-label={text}>
      {words.map((word: string, i: number) => (
        <span key={i} className="split-word mr-[0.3em]">
          <motion.span
            className="split-word-inner"
            animate={inView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function CharReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
}: Omit<TextRevealProps, 'as'>) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {text.split('').map((char: string, i: number) => (
        <span key={i} className="split-word">
          <motion.span
            className="split-word-inner"
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
