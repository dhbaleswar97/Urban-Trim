'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { staggerContainer } from '@/animations/variants'

type StaggerContainerProps = HTMLMotionProps<'div'>

export function StaggerContainer({ children, ...props }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
      {...props}
    >
      {children}
    </motion.div>
  )
}
