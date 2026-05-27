'use client'

import { useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { services } from '@/data/services'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'
import { IMAGES } from '@/config/images'
import { PricingSection } from '@/components/home/PricingSection'
import { FAQSection } from '@/components/home/FAQSection'

// ─── WORK SHOWCASE DATA ────────────────────────────────────────────────────────

const G = '/assets/images/Urban-trim-web-Gallery'

const WORKS = [
  {
    id: 'precision-cut',
    label: 'Precision Haircut & Styling',
    year: '26©',
    cover: `${G}/Precision%20Haircut%20%26%20Styling/Precision%20Haircut%20%26%20Styling%20(3).jpg`,
  },
  {
    id: 'beard-sculpting',
    label: 'Luxury Beard Sculpting',
    year: '25©',
    cover: `${G}/Luxury%20Beard%20Sculpting/Luxury%20Beard%20Sculpting%20(3).jpg`,
  },
  {
    id: 'colour-highlights',
    label: 'Hair Coloring & Highlights',
    year: '25©',
    cover: `${G}/Hair%20Coloring%20%26%20Highlights/Hair%20Coloring%20%26%20Highlights%20(2).jpg`,
  },
  {
    id: 'spa-therapy',
    label: 'Advanced Hair Spa Therapy',
    year: '24©',
    cover: `${G}/Advanced%20Hair%20Spa%20Therapy/Advanced%20Hair%20Spa%20Therapy%20(2).jpg`,
  },
]

// ─── STATS DATA ────────────────────────────────────────────────────────────────

interface Stat {
  label: string
  value: string
  desc: string
  backLabel: string
  backMetric: string
  backHeadline: string
  backDetail: string
  flipDir: 1 | -1
}

const STATS: Stat[] = [
  {
    label: 'Clients served',
    value: '+2,400',
    desc: 'Precision grooming delivered to every walk of life.',
    backLabel: 'Our reach',
    backMetric: '500+',
    backHeadline: 'New clients welcomed every year.',
    backDetail: '1,900+ loyal returning guests alongside every first-time visitor.',
    flipDir: 1,
  },
  {
    label: 'Satisfaction rate',
    value: '97%',
    desc: "Consistently rated as NYC's finest grooming experience.",
    backLabel: 'Reviews',
    backMetric: '4.9★',
    backHeadline: 'Average rating across all platforms.',
    backDetail: 'Verified across 2,000+ visits on Google, Yelp, and direct feedback.',
    flipDir: -1,
  },
  {
    label: 'Years of mastery',
    value: '8+',
    desc: 'Every cut refined through years of dedicated artistry.',
    backLabel: 'Est. 2016',
    backMetric: 'BK',
    backHeadline: 'Brooklyn born. NYC proven.',
    backDetail: "Founded in Williamsburg. Now the city's most trusted grooming destination.",
    flipDir: 1,
  },
  {
    label: 'Return client rate',
    value: '94%',
    desc: 'Once you visit, Urban Trim becomes your standard.',
    backLabel: 'Loyalty',
    backMetric: '3.8×',
    backHeadline: 'Average visits per client, per year.',
    backDetail: 'Once you experience it, nothing else compares.',
    flipDir: -1,
  },
]

const STATS_TOTAL = STATS.length
const CARD_POS = [1.5, 2.0, 2.5, 3.0] as const

// ─── GALLERY CARD ─────────────────────────────────────────────────────────────

function GalleryCard({ work, index }: { work: (typeof WORKS)[0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    badgeRef.current.style.transform = `translate(${e.clientX - rect.left - 56}px, ${e.clientY - rect.top - 22}px)`
    badgeRef.current.style.opacity = '1'
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (badgeRef.current) badgeRef.current.style.opacity = '0'
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{ cursor: 'none' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={work.cover}
        alt={work.label}
        fill
        className="object-cover"
        sizes="100vw"
        priority={index === 0}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Bottom-right frosted label */}
      <div
        className="absolute right-6 bottom-6 flex items-center gap-3 rounded-full px-4 py-[10px]"
        style={{
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <span className="font-body text-[12px] tracking-[0.04em] text-white">{work.label}</span>
        <span className="font-body text-[10px] text-white/45">{work.year}</span>
      </div>

      {/* Index counter */}
      <p className="font-body pointer-events-none absolute bottom-6 left-8 text-[11px] tracking-[0.20em] text-white/30 tabular-nums select-none">
        {String(index + 1).padStart(2, '0')} / {String(WORKS.length).padStart(2, '0')}
      </p>

      {/* Cursor badge */}
      <div
        ref={badgeRef}
        className="pointer-events-none absolute top-0 left-0 z-20"
        style={{ opacity: 0, transition: 'opacity 0.18s ease' }}
      >
        <div
          className="flex items-center gap-2 rounded-full px-5 py-[11px] whitespace-nowrap"
          style={{
            background: 'rgba(10,10,14,0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <span className="font-body text-[12px] text-white">View Work</span>
          <ArrowUpRight size={11} className="text-white/60" />
        </div>
      </div>
    </div>
  )
}

// ─── DOTS INDICATOR ───────────────────────────────────────────────────────────

function Dots({ active }: { active: number }) {
  return (
    <div className="flex shrink-0 items-center gap-[4px]">
      {Array.from({ length: STATS_TOTAL }).map((_, di) => (
        <span
          key={di}
          style={{
            display: 'block',
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: di <= active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.18)',
          }}
        />
      ))}
    </div>
  )
}

// ─── INLINE STATS SECTION ─────────────────────────────────────────────────────
/*
 * Inlined directly (not imported) to avoid GSAP ScrollTrigger conflicts when
 * multiple pinned sections coexist on the same page.
 *
 * DOM per card:
 *   [outer]       → scroll animation target   (y: 900→0, opacity: 0→1)
 *     [perspective] → CSS perspective: 1200px
 *       [flipper]   → hover flip target        (rotateX: 0→±180)
 *         [front]   backface-visibility: hidden
 *         [back]    backface-visibility: hidden, pre-rotated ±180°
 */
function InlineStatsSection() {
  const outerRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const outerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const flipRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])

  /* ── Scroll cascade entrance ─────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const outers = outerRefs.current as HTMLDivElement[]

      gsap.set(outers, { y: 900, opacity: 0, willChange: 'transform, opacity' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: '+=700%',
          scrub: 1.5,
          pin: stickyRef.current,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      })

      /* Intro fades up and out */
      tl.to(introRef.current, { yPercent: -35, opacity: 0, ease: 'power2.inOut', duration: 1.5 }, 0)

      /* Cards cascade upward */
      outers.forEach((el, i) => {
        tl.to(el, { y: 0, opacity: 1, ease: 'power3.out', duration: 1.5 }, CARD_POS[i])
      })

      tl.to({}, { duration: 2.0 }, 4.5)
    }, outerRef)

    return () => ctx.revert()
  }, [])

  /* ── 3-D flip handlers ───────────────────────────────────────────────────── */
  const onFlipIn = (i: number) => {
    const el = flipRefs.current[i]
    if (!el) return
    gsap.to(el, {
      rotateX: STATS[i].flipDir * 180,
      ease: 'power2.inOut',
      duration: 0.72,
      overwrite: 'auto',
    })
  }

  const onFlipOut = (i: number) => {
    const el = flipRefs.current[i]
    if (!el) return
    gsap.to(el, { rotateX: 0, ease: 'power2.inOut', duration: 0.72, overwrite: 'auto' })
  }

  return (
    <>
      {/* ── PART A — sticky pinned cascade ─────────────────────────────────── */}
      <section ref={outerRef}>
        <div ref={stickyRef} className="relative h-screen overflow-hidden bg-black">
          {/* Intro — fades up and away */}
          <div
            ref={introRef}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-body mb-7 text-[10px] tracking-[0.32em] text-white/35 uppercase select-none">
              (Stats)
            </p>
            <h2 className="font-display mb-6 max-w-[820px] text-[clamp(3rem,7vw,8rem)] leading-[0.9] text-white">
              Urban Trim stands
              <br />
              behind the numbers.
            </h2>
            <p className="font-body mb-10 max-w-[340px] text-[13px] leading-relaxed text-white/40">
              Our craft is reflected in the results we achieve for every client who sits in the
              chair.
            </p>
            <Link
              href="/booking"
              className="font-body pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-[11px] text-[12px] tracking-[0.06em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              data-cursor="hover"
            >
              Reserve a session <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Stats grid */}
          <div className="absolute inset-0 flex items-center px-6 md:px-10 lg:px-14">
            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    outerRefs.current[i] = el
                  }}
                  style={{ height: 'clamp(280px, 44vh, 460px)', perspective: '1200px' }}
                >
                  <div
                    ref={(el) => {
                      flipRefs.current[i] = el
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                    }}
                    className="cursor-none"
                    onMouseEnter={() => onFlipIn(i)}
                    onMouseLeave={() => onFlipOut(i)}
                  >
                    {/* Front */}
                    <div
                      style={{ backfaceVisibility: 'hidden' }}
                      className="absolute inset-0 flex flex-col rounded-2xl bg-[#141414] p-6 lg:p-8"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-body text-[9px] leading-snug tracking-[0.24em] text-white/35 uppercase">
                          ({stat.label})
                        </p>
                        <Dots active={i} />
                      </div>
                      <div className="mt-auto">
                        <p
                          className="font-body mb-3 leading-none font-black text-white"
                          style={{ fontSize: 'clamp(3rem, 4.6vw, 5.8rem)' }}
                        >
                          {stat.value}
                        </p>
                        <p className="font-body max-w-[200px] text-[12px] leading-relaxed text-white/40">
                          {stat.desc}
                        </p>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: `rotateX(${STATS[i].flipDir * 180}deg)`,
                      }}
                      className="absolute inset-0 flex flex-col rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-6 lg:p-8"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-body text-[9px] leading-snug tracking-[0.24em] text-[#B6F500]/70 uppercase">
                          ({stat.backLabel})
                        </p>
                        <Dots active={i} />
                      </div>
                      <div className="mt-auto">
                        <p
                          className="font-body mb-3 leading-none font-black text-white"
                          style={{ fontSize: 'clamp(2.5rem, 4vw, 5rem)' }}
                        >
                          {stat.backMetric}
                        </p>
                        <p className="font-body mb-2 text-[13px] leading-snug font-medium text-white">
                          {stat.backHeadline}
                        </p>
                        <p className="font-body max-w-[220px] text-[11px] leading-relaxed text-white/40">
                          {stat.backDetail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PART B — static editorial + success story ──────────────────────── */}
      <section className="bg-black px-6 pt-4 pb-20 md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Left — editorial image */}
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ height: 'clamp(380px, 58vh, 660px)' }}
          >
            <Image
              src="/assets/images/Background-grid%20(2).jpg"
              fill
              alt="Urban Trim craftsmanship"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right — success story */}
          <div
            className="flex flex-col rounded-2xl bg-[#141414] p-8 lg:p-10"
            style={{ height: 'clamp(380px, 58vh, 660px)' }}
          >
            <p className="font-body mb-auto text-[9px] tracking-[0.26em] text-white/35 uppercase">
              (Success stories)
            </p>
            <div className="mt-auto">
              <p
                className="font-body mb-8 leading-[1.6] text-white"
                style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.55rem)', fontWeight: 500 }}
              >
                &ldquo;Worth every penny. Urban Trim has redefined what a grooming visit should feel
                like — I leave looking, and feeling, elevated. There is simply no other experience
                like it in the city.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                  <Image
                    src={IMAGES.testimonials.four}
                    fill
                    alt="Gabriel Santos"
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-body text-[13px] font-semibold tracking-[0.02em] text-white">
                    Gabriel Santos
                  </p>
                  <p className="font-body text-[11px] text-white/40">Product Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const gridRef = useRef<HTMLElement>(null)
  const gridInView = useInView(gridRef as React.RefObject<Element>, { once: true, margin: '-60px' })

  /* Works sticky-stack refs */
  const worksOuterRef = useRef<HTMLElement>(null)
  const worksPinnedRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null)
      const N = cards.length
      if (N < 2) return

      gsap.set(cards.slice(1), { yPercent: 100 })

      const vh = window.innerHeight

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: worksOuterRef.current,
          start: 'top top',
          end: `+=${(N - 1) * vh}`,
          scrub: 1,
          pin: worksPinnedRef.current,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      })

      cards.slice(1).forEach((card, i) => {
        tl.to(cards[i], { scale: 0.93, ease: 'none', duration: 1 }, i)
        tl.to(card, { yPercent: 0, ease: 'none', duration: 1 }, i)
      })
    }, worksOuterRef)

    return () => ctx.revert()
  }, [])

  return (
    <main>
      {/* ══════════════════════════════════════════════════════════════════════
          §1  PAGE HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1400px] px-6 pt-40 pb-20 md:px-10 lg:px-14">
        <motion.div
          className="mb-10 flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="h-px w-8 bg-[#B6F500]" />
          <span className="font-body text-[10px] tracking-[0.32em] text-[#a0a0a0] uppercase">
            Our Services
          </span>
        </motion.div>

        <div className="mb-20 grid items-end gap-12 lg:grid-cols-[1fr_0.5fr]">
          <motion.h1
            className="font-display text-[clamp(3.5rem,8vw,9rem)] leading-[0.88]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Six rituals.
            <br />
            One standard:
            <br />
            <span style={{ color: 'black' }}>extraordinary.</span>
          </motion.h1>
          <motion.p
            className="font-body mb-2 max-w-xs text-[15px] leading-relaxed text-[#555]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Each service is designed as a complete experience — from consultation to finish. No
            shortcuts, no compromises.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-wrap gap-10 border-t border-[#e8e8e8] pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { value: '6', label: 'Signature Services' },
            { value: '45–90', label: 'Minutes Per Session' },
            { value: '100%', label: 'Custom to You' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-light">{stat.value}</p>
              <p className="font-body mt-1 text-[10px] tracking-[0.2em] text-[#a0a0a0] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          §2  SERVICES LIST — accordion rows with hover-expand image
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={gridRef} className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 lg:px-14">
        {services.map((service, i) => (
          <motion.div
            key={service.slug}
            className="group border-t border-[#e8e8e8] last:border-b"
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/services/${service.slug}`}
              className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-0 md:py-10"
              data-cursor="view"
            >
              <span className="font-display w-32 shrink-0 text-[clamp(3.5rem,6vw,6rem)] leading-none text-black/[0.06] transition-colors duration-500 group-hover:text-[#B6F500]">
                {service.number}
              </span>
              <div className="flex-1 md:px-10">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-3xl md:text-4xl">{service.name}</h2>
                  <span
                    className="pill"
                    style={{ borderColor: service.accentColor, color: service.accentColor }}
                  >
                    {service.duration}
                  </span>
                </div>
                <p className="font-body max-w-lg text-[14px] leading-relaxed text-[#555]">
                  {service.description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-8 md:gap-12">
                <div className="text-right">
                  <p className="font-display text-2xl">{service.price}</p>
                  <p className="font-body mt-1 flex items-center gap-1 text-[10px] tracking-[0.18em] text-[#a0a0a0] uppercase">
                    <Clock size={10} /> {service.duration}
                  </p>
                </div>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: service.accentColor }}
                >
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </Link>

            <div className="hidden h-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-64 md:block">
              <div className="relative h-64 w-full">
                <Image src={service.image} alt={service.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                <p className="font-display absolute bottom-6 left-8 text-3xl text-white">
                  {service.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          §3  SELECTED WORKS — editorial header + GSAP sticky-scroll card stack
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: '#f0f0f0' }}>
        {/* Header — scrolls away naturally before pin activates */}
        <div className="mx-auto flex max-w-[1400px] items-end justify-between px-8 pt-20 pb-10 md:px-14">
          <div>
            <p className="font-body mb-5 text-[9px] tracking-[0.30em] text-black/30 uppercase">
              (Selected Works)
            </p>
            <motion.h2
              className="font-display text-black"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 8rem)',
                lineHeight: '0.92',
                letterSpacing: '-0.02em',
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Signature Work
              <sup
                className="font-body font-normal text-black/28"
                style={{
                  fontSize: '0.2em',
                  verticalAlign: 'super',
                  marginLeft: '0.5em',
                  letterSpacing: '0.02em',
                }}
              >
                ({WORKS.length})
              </sup>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/gallery"
              className="font-body inline-flex items-center gap-2 text-[12px] tracking-[0.04em] text-black/40 transition-colors duration-200 hover:text-black"
              data-cursor="hover"
            >
              Full archive <ArrowUpRight size={12} />
            </Link>
          </motion.div>
        </div>

        {/* Sticky-stack outer — GSAP uses its scroll range for the pin duration */}
        <section ref={worksOuterRef} style={{ background: '#f0f0f0' }}>
          {/* Pinned 100vh container */}
          <div
            ref={worksPinnedRef}
            className="relative overflow-hidden"
            style={{ height: '100vh' }}
          >
            {/* Floating labels */}
            <div className="pointer-events-none absolute top-5 left-7 z-50 select-none">
              <p className="font-body text-[9px] tracking-[0.26em] text-white/35 uppercase">
                (Selected Works)
              </p>
            </div>
            <div className="pointer-events-none absolute top-5 right-7 z-50 select-none">
              <p className="font-body text-[9px] tracking-[0.26em] text-white/35 uppercase">
                Urban Trim™
              </p>
            </div>

            {/* Cards stacked — each occupies the full pinned container */}
            {WORKS.map((work, i) => (
              <div
                key={work.id}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="absolute px-3 py-3 md:px-5"
                style={{ inset: 0, zIndex: i + 1 }}
              >
                <GalleryCard work={work} index={i} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          §4  PRICING — reused home component
      ══════════════════════════════════════════════════════════════════════ */}
      <PricingSection />

      {/* ══════════════════════════════════════════════════════════════════════
          §5  FAQ — reused home component
      ══════════════════════════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ══════════════════════════════════════════════════════════════════════
          §6  STATS — inlined to avoid ScrollTrigger conflicts with pinned sections
      ══════════════════════════════════════════════════════════════════════ */}
      <InlineStatsSection />
    </main>
  )
}
