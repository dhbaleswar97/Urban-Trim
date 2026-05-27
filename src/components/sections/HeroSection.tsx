'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { gsap } from '@/animations/gsap.config'
import { MarqueeText } from '@/components/common/MarqueeText'
import { MagneticButton } from '@/components/common/MagneticButton'
import { IMAGES } from '@/config/images'

const marqueeItems = [
  'Premium Grooming',
  'Luxury Barber Studio',
  'Master Stylists',
  'Bespoke Experience',
  'Artisan Craftsmanship',
  'Signature Treatments',
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  /* ── Entrance timeline ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(
        overlayRef.current,
        { scaleY: 1, transformOrigin: 'top' },
        { scaleY: 0, duration: 1.2, ease: 'power4.inOut' }
      )
        .fromTo(
          '.hero-line-1',
          { y: '110%' },
          { y: '0%', duration: 1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-line-2',
          { y: '110%' },
          { y: '0%', duration: 1, ease: 'power3.out' },
          '-=0.75'
        )
        .fromTo(
          '.hero-sub',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-badge',
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.6'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const scrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="bg-ut-black relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* Cover overlay (entrance wipe) */}
      <div ref={overlayRef} className="bg-ut-black absolute inset-0 z-30 origin-top" />

      {/* Background image with parallax */}
      <motion.div ref={imageRef} className="absolute inset-0 z-0" style={{ y: imgY }}>
        <Image
          src={IMAGES.hero}
          alt="Urban Trim luxury salon"
          fill
          priority
          className="scale-[1.08] object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        {/* Multi-layer dark overlay */}
        <div className="from-ut-black/80 via-ut-black/50 to-ut-black/90 absolute inset-0 bg-gradient-to-b" />
        <div className="from-ut-black/60 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-20"
        style={{ y: contentY, opacity }}
      >
        {/* Badge top-right */}
        <div className="hero-badge absolute top-28 right-8 flex flex-col items-end gap-1 opacity-0 md:right-16">
          <span className="font-body text-ut-muted text-[10px] tracking-[0.3em] uppercase">
            Est.
          </span>
          <span className="font-display text-ut-gold text-4xl italic">2018</span>
        </div>

        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div className="hero-sub mb-6 flex items-center gap-4 opacity-0 md:mb-8">
            <span className="gold-line" />
            <span className="font-body text-ut-gold text-[11px] tracking-[0.3em] uppercase">
              Luxury Barber Studio
            </span>
          </div>

          {/* Display headline */}
          <div className="mb-2 overflow-hidden">
            <h1 className="hero-line-1 font-display text-ut-cream translate-y-full text-[clamp(4.5rem,14vw,13rem)] leading-[0.88] font-light tracking-tight italic">
              Urban
            </h1>
          </div>
          <div className="mb-8 overflow-hidden md:mb-10">
            <h1 className="hero-line-2 font-display text-ut-gold translate-y-full text-[clamp(4.5rem,14vw,13rem)] leading-[0.88] font-light tracking-tight">
              Trim<span className="text-ut-cream">.</span>
            </h1>
          </div>

          {/* Sub text + CTAs */}
          <div className="hero-sub flex flex-col items-start gap-6 opacity-0 sm:flex-row sm:items-center md:gap-10">
            <p className="font-body text-ut-muted max-w-xs text-[15px] leading-relaxed">
              Where precision meets luxury. <br className="hidden sm:block" />
              Bespoke grooming for the discerning gentleman.
            </p>
            <div className="flex items-center gap-4">
              <MagneticButton
                className="hero-cta bg-ut-gold text-ut-black font-body hover:bg-ut-gold-light px-7 py-3.5 text-[12px] tracking-[0.2em] uppercase opacity-0 transition-colors duration-300"
                onClick={() => {
                  const el = document.getElementById('booking')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Book Session
              </MagneticButton>
              <button
                className="hero-cta font-body text-ut-muted hover:text-ut-cream flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase opacity-0 transition-colors duration-300"
                onClick={scrollToAbout}
                data-cursor="hover"
              >
                Our Story <ArrowDownRight size={14} className="text-ut-gold" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom marquee strip */}
      <div className="border-ut-border bg-ut-black/40 absolute right-0 bottom-0 left-0 z-20 overflow-hidden border-t py-3 backdrop-blur-sm">
        <MarqueeText
          items={marqueeItems}
          duration={25}
          className="text-ut-muted text-[11px] tracking-[0.2em] uppercase"
          itemClassName="px-6"
        />
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="hero-cta absolute right-8 bottom-16 z-20 flex flex-col items-center gap-2 opacity-0 md:right-14"
        onClick={scrollToAbout}
        data-cursor="hover"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-body text-ut-muted origin-center translate-x-3 rotate-90 text-[9px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="to-ut-gold h-12 w-px bg-gradient-to-b from-transparent" />
      </motion.button>
    </section>
  )
}
