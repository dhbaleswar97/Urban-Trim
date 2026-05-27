'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionBadge } from '@/components/common/SectionBadge'
import { TextReveal } from '@/components/common/TextReveal'
import { MarqueeText } from '@/components/common/MarqueeText'
import { IMAGES } from '@/config/images'

const testimonials = [
  {
    id: 1,
    quote:
      "Urban Trim didn't just cut my hair — they redefined how I see myself. The attention to detail, the atmosphere, the craft. It's unlike any salon I've experienced in the city.",
    name: 'Alexander Voss',
    role: 'Creative Director',
    rating: 5,
    image: IMAGES.testimonials.one,
    service: 'Signature Haircut',
  },
  {
    id: 2,
    quote:
      "I've been coming here for two years and I cannot imagine trusting anyone else with my hair. Sofia's colour work is genuinely transformative. People stop me on the street.",
    name: 'Priya Mehta',
    role: 'Fashion Editor',
    rating: 5,
    image: IMAGES.testimonials.two,
    service: 'Colour & Highlights',
  },
  {
    id: 3,
    quote:
      "The Royal Shave experience alone is worth every penny. It's a ritual, not a service. Marcus has steady hands and an extraordinary eye for what suits each person.",
    name: 'Thomas Keller',
    role: 'Entrepreneur',
    rating: 5,
    image: IMAGES.testimonials.three,
    service: 'Royal Shave',
  },
  {
    id: 4,
    quote:
      'From the moment you walk in, you feel the difference. The music, the scent, the warmth. Urban Trim has turned a simple haircut into something I genuinely look forward to.',
    name: 'Jordan Williams',
    role: 'Architect',
    rating: 5,
    image: IMAGES.testimonials.four,
    service: 'Beard Sculpting',
  },
]

const marqueeItems = [
  '"Transformative."',
  '"Extraordinary Craft."',
  '"Unmatched Precision."',
  '"Genuine Luxury."',
  '"My Favourite Place."',
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((p) => (p + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(next, 6000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [next])

  const t = testimonials[current]

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -60 }),
  }

  return (
    <section id="testimonials" className="section-pad bg-ut-black relative overflow-hidden">
      {/* Background large quote mark */}
      <div className="font-display text-ut-gold/3 pointer-events-none absolute top-12 right-8 text-[20rem] leading-none select-none md:right-20">
        &ldquo;
      </div>

      <div className="container-wide">
        <SectionBadge label="Testimonials" number="05" className="mb-12 md:mb-16" />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Testimonial card */}
          <div className="relative min-h-[360px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6 flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} className="fill-ut-gold text-ut-gold" />
                    ))}
                    <span className="font-body text-ut-muted ml-2 text-[11px] tracking-[0.15em] uppercase">
                      {t.service}
                    </span>
                  </div>

                  <blockquote className="font-display text-ut-cream mb-8 text-[clamp(1.3rem,2.5vw,2rem)] leading-[1.55] font-light italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="flex items-center gap-4">
                  <div className="ring-ut-gold/30 relative h-12 w-12 overflow-hidden rounded-full ring-1">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-body text-ut-cream text-[14px] font-medium">{t.name}</p>
                    <p className="font-body text-ut-muted text-[12px]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Controls + dots */}
          <div className="flex h-full flex-col justify-between gap-10">
            {/* Big heading */}
            <h2 className="font-display text-ut-cream text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-light italic">
              <TextReveal text="Trusted" />
              <br />
              <TextReveal text="by Thousands." delay={0.15} className="text-ut-gold" />
            </h2>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              <button
                onClick={prev}
                className="border-ut-border text-ut-muted hover:border-ut-gold hover:text-ut-gold flex h-12 w-12 items-center justify-center border transition-all duration-300"
                data-cursor="hover"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="border-ut-border text-ut-muted hover:border-ut-gold hover:text-ut-gold flex h-12 w-12 items-center justify-center border transition-all duration-300"
                data-cursor="hover"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>

              {/* Dots */}
              <div className="ml-4 flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1)
                      setCurrent(i)
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? 'bg-ut-gold h-1.5 w-6'
                        : 'bg-ut-muted/40 hover:bg-ut-muted h-1.5 w-1.5'
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                    data-cursor="hover"
                  />
                ))}
              </div>

              <span className="font-body text-ut-muted ml-auto text-[12px]">
                {String(current + 1).padStart(2, '0')} /{' '}
                {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="border-ut-border mt-16 overflow-hidden border-t pt-6 md:mt-20">
        <MarqueeText
          items={marqueeItems}
          duration={28}
          reverse
          className="font-display text-ut-cream/20 text-[clamp(1.2rem,2.5vw,2rem)] italic"
          separator="·"
        />
      </div>
    </section>
  )
}
