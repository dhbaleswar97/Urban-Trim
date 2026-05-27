'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { registerGSAPPlugins, ScrollTrigger, gsap } from '@/animations/gsap.config'
import { useReducedMotion } from '@/hooks'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    registerGSAPPlugins()

    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    lenisRef.current = lenis

    const tickerCb = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
    }
  }, [reducedMotion])

  return <>{children}</>
}
