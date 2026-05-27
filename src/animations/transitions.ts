import type { Transition } from 'framer-motion'

export const spring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

export const smoothTween: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
}

export const fastTween: Transition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
}

export const pageTransition: Transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
}
