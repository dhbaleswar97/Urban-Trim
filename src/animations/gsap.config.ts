import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function registerGSAPPlugins() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
  }
}

export const gsapDefaults = {
  ease: 'power3.out',
  duration: 0.8,
}

export { gsap, ScrollTrigger }
