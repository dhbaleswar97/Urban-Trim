'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'
import { TextReveal } from '@/components/common/TextReveal'
import { SectionBadge } from '@/components/common/SectionBadge'
import { IMAGES } from '@/config/images'

const stats = [
  { value: '12+', label: 'Years of Mastery' },
  { value: '8K+', label: 'Clients Served' },
  { value: '24', label: 'Signature Services' },
  { value: '6', label: 'Master Stylists' },
]

const pillars = ['Precision', 'Elegance', 'Ritual', 'Confidence']

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip reveal
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Stats count-up feel
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-row',
            start: 'top 80%',
          },
        }
      )

      // Pillars stagger
      gsap.fromTo(
        '.pillar-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pillars-row',
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pad bg-ut-black relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-[#0d0d0d] to-transparent" />

      <div className="container-wide relative z-10">
        <SectionBadge label="Our Story" number="01" className="mb-12 md:mb-16" />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text */}
          <div ref={textRef}>
            <h2 className="font-display text-ut-cream mb-6 text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.05] font-light italic">
              <TextReveal text="Art Carved" delay={0} />
              <br />
              <TextReveal text="Into Every Cut." delay={0.2} className="text-ut-gold" />
            </h2>

            <p className="font-body text-ut-muted mb-6 max-w-md text-[15px] leading-[1.8]">
              Urban Trim was born from a singular obsession — the belief that a haircut is not
              merely a service. It is a ritual. A moment of transformation where precision technique
              meets personal story.
            </p>
            <p className="font-body text-ut-muted mb-10 max-w-md text-[15px] leading-[1.8]">
              Our master stylists don&apos;t just cut hair. They sculpt identity, restore
              confidence, and craft the version of you that walks out ready to command the room.
            </p>

            {/* Pillars */}
            <div className="pillars-row mb-10 flex flex-wrap gap-3">
              {pillars.map((p) => (
                <span
                  key={p}
                  className="pillar-item font-body text-ut-gold border-ut-border hover:border-ut-gold border px-4 py-2 text-[12px] tracking-[0.2em] uppercase opacity-0 transition-colors duration-300"
                >
                  {p}
                </span>
              ))}
            </div>

            <button
              onClick={() =>
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="hover-underline font-body text-ut-cream flex items-center gap-3 text-[13px] tracking-[0.2em] uppercase"
              data-cursor="hover"
            >
              Explore Services
              <span className="bg-ut-gold inline-block h-px w-8" />
            </button>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div
              ref={imgRef}
              className="relative aspect-[3/4] overflow-hidden"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              <Image
                src={IMAGES.aboutPortrait}
                alt="Master stylist at work"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
              <div className="from-ut-black/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            </div>

            {/* Floating label */}
            <motion.div
              className="bg-ut-card border-ut-border absolute -bottom-4 -left-4 max-w-[200px] border p-6 md:-left-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-ut-gold mb-1 text-4xl italic">NYC</p>
              <p className="font-body text-ut-muted text-[11px] tracking-[0.15em] uppercase">
                Lower East Side
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row border-ut-border mt-16 grid grid-cols-2 gap-px border md:mt-24 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-item border-ut-border bg-ut-surface hover:bg-ut-card group border-r p-8 text-center opacity-0 transition-colors duration-300 last:border-r-0 md:p-10"
            >
              <p className="font-display text-ut-gold group-hover:text-ut-gold-light mb-2 text-[clamp(2.5rem,5vw,4rem)] font-light italic transition-colors">
                {s.value}
              </p>
              <p className="font-body text-ut-muted text-[11px] tracking-[0.2em] uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
