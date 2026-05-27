'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'

interface MotionDivProps extends HTMLMotionProps<'div'> {
  delay?: number
}

export function MotionDiv({ children, delay = 0, variants = fadeInUp, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
