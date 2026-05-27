'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { gsap } from '@/animations/gsap.config'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { team } from '@/data/team'
import { IMAGES } from '@/config/images'
import { IMG_CDN } from '@/lib/cdn'

// ─── SVG PARTNER MARKS ────────────────────────────────────────────────────────

function ScissorsMark() {
  return (
    <svg width="44" height="44" viewBox="0 0 54 54" fill="none" aria-hidden="true">
      <circle cx="13" cy="40" r="10" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="41" cy="40" r="10" stroke="currentColor" strokeWidth="2.2" />
      <line
        x1="20"
        y1="33"
        x2="44"
        y2="9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="33"
        x2="10"
        y2="9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const STARBURST_SPOKES = Array.from({ length: 22 }, (_, i) => {
  const a = (i * (360 / 22) - 90) * (Math.PI / 180)
  return { x: +(32 + 26 * Math.cos(a)).toFixed(3), y: +(32 + 26 * Math.sin(a)).toFixed(3) }
})

function StarburstMark() {
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {STARBURST_SPOKES.map((p, i) => (
        <line
          key={i}
          x1="32"
          y1="32"
          x2={p.x}
          y2={p.y}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

function OverlapCirclesMark() {
  return (
    <svg width="80" height="32" viewBox="0 0 96 38" fill="none" aria-hidden="true">
      <circle cx="19" cy="19" r="17" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="48" cy="19" r="17" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="77" cy="19" r="17" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  )
}

function BarberPoleMark() {
  return (
    <svg width="32" height="46" viewBox="0 0 38 54" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="28" height="44" rx="14" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M5 17 Q19 24 33 17"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M5 33 Q19 40 33 33"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="2" y="1" width="34" height="7" rx="3.5" fill="currentColor" />
      <rect x="2" y="46" width="34" height="7" rx="3.5" fill="currentColor" />
    </svg>
  )
}

function DoubleArrowMark() {
  return (
    <svg width="68" height="28" viewBox="0 0 80 34" fill="none" aria-hidden="true">
      <path
        d="M1 17L11 5V12H31V5L41 17L31 29V22H11V29Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M39 17L49 5V12H69V5L79 17L69 29V22H49V29Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CrownMark() {
  return (
    <svg width="48" height="36" viewBox="0 0 56 42" fill="none" aria-hidden="true">
      <path
        d="M4 36L8 16L18 28L28 8L38 28L48 16L52 36Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="4"
        y1="38"
        x2="52"
        y2="38"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DiamondMark() {
  return (
    <svg width="36" height="44" viewBox="0 0 42 52" fill="none" aria-hidden="true">
      <path
        d="M21 4L38 20L21 48L4 20Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M4 20H38" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const APPROACH_LINES = [
  'Consult deeply.',
  'Execute precisely.',
  'Refine constantly.',
  'Deliver excellence.',
]

const STATS_DATA = [
  {
    value: '2,400+',
    desc: 'Precision grooming delivered to every walk of life in New York City.',
  },
  {
    value: '97%',
    desc: "Consistently rated as NYC's finest grooming experience across all platforms.",
  },
  {
    value: '8+',
    desc: 'Years of dedicated artistry, each cut refined through obsession with craft.',
  },
]

type Partner = { id: string; logo: ReactNode }

const PARTNERS: Partner[] = [
  { id: 'andis', logo: <ScissorsMark /> },
  {
    id: 'wahl',
    logo: (
      <span
        className="font-body leading-none font-black text-black/55"
        style={{ fontSize: '1.6rem', letterSpacing: '-0.05em' }}
      >
        WAHL
      </span>
    ),
  },
  { id: 'kerastase', logo: <StarburstMark /> },
  {
    id: 'reuzel',
    logo: (
      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1.5rem',
          fontStyle: 'italic',
          fontWeight: 700,
          lineHeight: 1,
          color: 'rgba(0,0,0,0.55)',
        }}
      >
        Reuzel
      </span>
    ),
  },
  { id: 'american', logo: <OverlapCirclesMark /> },
  {
    id: 'uppercut',
    logo: (
      <span
        className="font-body leading-none font-black text-black/55 uppercase"
        style={{ fontSize: '1.1rem', letterSpacing: '0.04em' }}
      >
        UPPERCUT™
      </span>
    ),
  },
  { id: 'baxter', logo: <BarberPoleMark /> },
  { id: 'crown', logo: <CrownMark /> },
]

const AWARDS = [
  { org: 'GQ Magazine', recognition: 'Top Barbershop in NYC', year: '25©' },
  { org: 'Yelp', recognition: 'Award of Excellence', year: '24©' },
  { org: 'New York Times', recognition: 'Best Grooming Experience', year: '23©' },
  { org: 'Esquire', recognition: "Editor's Choice — NYC Barbershops", year: '22©' },
  { org: 'Allure', recognition: 'Best New Salon Award', year: '21©' },
  { org: 'Time Out New York', recognition: 'Best of New York — Grooming', year: '20©' },
  { org: 'Brooklyn Magazine', recognition: 'Neighbourhood Favourite', year: '18©' },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  /* section inView refs */
  const introRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)
  const partnersRef = useRef<HTMLElement>(null)
  const awardsRef = useRef<HTMLElement>(null)

  const introInView = useInView(introRef as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  })
  const statsInView = useInView(statsRef as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  })
  const teamInView = useInView(teamRef as React.RefObject<Element>, { once: true, margin: '-80px' })
  const partnersInView = useInView(partnersRef as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  })
  const awardsInView = useInView(awardsRef as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  })

  /* ── Parallax refs ── */
  const heroSectionRef = useRef<HTMLElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImgRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )
    }, heroSectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <main>
      {/* ═══════════════════════════════════════════════════════════════════════
          §1 + §2  HERO — flat white card + parallax portrait below
          ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={heroSectionRef} className="relative overflow-hidden bg-black">
        {/* Full-bleed portrait image — parallax layer (oversized ±12% to prevent gaps) */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={heroImgRef}
            className="absolute"
            style={{ inset: '-12% 0', willChange: 'transform' }}
          >
            <Image
              src={`${IMG_CDN}/assets/images/Background-grid%20(3).jpg`}
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
        </div>

        {/* ── White card — flat bottom edge ────────────────────────────────── */}
        <motion.div
          className="relative z-10 bg-white"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center justify-center px-8 pt-36 pb-28 text-center md:pt-44 md:pb-36">
            <motion.p
              className="font-body mb-8 text-[10px] tracking-[0.30em] text-black/32 uppercase select-none"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              (Our Studio ©26)
            </motion.p>

            <motion.h1
              className="font-display text-black"
              style={{
                fontSize: 'clamp(3rem, 9vw, 10.5rem)',
                lineHeight: '0.93',
                letterSpacing: '-0.025em',
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              About Urban Trim™
            </motion.h1>
          </div>
        </motion.div>

        {/* ── Dark content below arch ───────────────────────────────────────── */}
        <div className="relative z-10 px-8 pt-20 pb-32 md:px-14">
          {/* Scroll line indicator */}
          <motion.div
            className="absolute top-10 right-8 mb-16 flex flex-col items-end gap-3 md:right-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="block h-10 w-px bg-white/25" />
            <span
              className="font-body text-[9px] tracking-[0.28em] text-white/30 uppercase"
              style={{ writingMode: 'vertical-rl' }}
            >
              Scroll
            </span>
          </motion.div>

          {/* Year mark */}
          <motion.p
            className="font-body leading-none font-black text-white"
            style={{ fontSize: 'clamp(5rem, 14vw, 13rem)', letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            (©16)
          </motion.p>

          {/* Description paragraph */}
          <motion.p
            className="font-body mt-5 max-w-[520px] text-[14px] leading-[1.9] font-medium text-white/50"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            We refined Urban Trim&apos;s identity and positioned the brand around craftsmanship,
            precision, and artistry. Our focus shifted toward high-end grooming experiences —
            blending technique, deep consultation, and environment. We serve NYC&apos;s most
            discerning clientele while strengthening long-term relationships with every returning
            guest.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          §3  INTRODUCTION / APPROACH — two-col with sticky left + images right
          ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={introRef} className="bg-white">
        {/* Thin top rule */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }} />

        <div className="flex min-h-screen flex-col lg:flex-row">
          {/* LEFT — sticky content */}
          <div className="relative px-8 py-20 md:px-14 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[50%] lg:flex-col lg:justify-center">
            {/* Vertical divider + dot */}
            <div
              className="absolute top-0 right-0 bottom-0 hidden w-px lg:block"
              style={{ background: 'rgba(0,0,0,0.07)' }}
            />
            <div
              className="absolute top-1/2 right-0 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full bg-black lg:block"
              style={{ width: 12, height: 12 }}
            />

            {/* Introduction label */}
            <motion.p
              className="font-body mb-8 text-[9px] tracking-[0.30em] text-black/35 uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              (Introduction)
            </motion.p>

            {/* Manifesto paragraph */}
            <motion.p
              className="font-body mb-12 leading-[1.6] font-semibold text-black"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.22rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Urban Trim believes precision grooming has the power to transform how a man presents
              himself to the world and those around him. We craft experiences that perform
              seamlessly across every dimension — driven by craft, shaped through consultation, and
              executed with uncompromising precision.
            </motion.p>

            {/* As featured in */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 14 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="font-body mb-4 text-[10px] text-black/30">As featured in</p>
              <div className="flex flex-wrap items-center gap-7">
                {['GQ', 'ESQUIRE', 'NYT', 'TIME OUT'].map((pub) => (
                  <span
                    key={pub}
                    className="font-body text-[11px] font-black tracking-[0.1em] text-black/30"
                  >
                    {pub}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Thin divider */}
            <div className="mb-10" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }} />

            {/* Approach lines */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-body mb-5 text-[9px] tracking-[0.30em] text-black/35 uppercase">
                (Approach)
              </p>
              <div className="mb-8">
                {APPROACH_LINES.map((line) => (
                  <p
                    key={line}
                    className="font-body leading-[2.0] font-medium text-black"
                    style={{ fontSize: '15px' }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.42 }}
            >
              <Link
                href="/booking"
                className="font-body inline-flex items-center rounded-full bg-black px-7 py-[13px] text-[12px] tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#B6F500] hover:text-black"
                data-cursor="hover"
              >
                Begin experience
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — two stacked editorial images */}
          <div className="flex flex-col gap-5 px-8 py-20 lg:w-[50%] lg:pr-14 lg:pl-16">
            <motion.div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '4/3' }}
              initial={{ opacity: 0, y: 32 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={`${IMG_CDN}/assets/images/web-img%20(2).jpg`}
                alt="Urban Trim craftsmanship"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '4/3' }}
              initial={{ opacity: 0, y: 44 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={`${IMG_CDN}/assets/images/web-img%20(3).jpg`}
                alt="Urban Trim artistry"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          §4  STATS + SUCCESS STORY
          ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="bg-white px-8 pt-0 pb-0 md:px-14">
        {/* Thin top rule */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }} />

        {/* ── Stats label ── */}
        <div className="relative py-3">
          {/* Dot on left edge */}
          <span
            className="absolute top-1/2 left-0 hidden -translate-y-1/2 rounded-full bg-black lg:block"
            style={{ width: 10, height: 10, marginLeft: -5 }}
          />
          <motion.p
            className="font-body pl-4 text-[9px] tracking-[0.30em] text-black/35 uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            (Stats)
          </motion.p>
        </div>

        {/* ── Three large numbers, stacked vertically ── */}
        <div className="pt-10 pb-16">
          {STATS_DATA.map((stat, i) => (
            <motion.div
              key={stat.value}
              className="mb-10 flex flex-col gap-4 pb-10 md:flex-row md:items-center md:gap-12"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
              initial={{ opacity: 0, y: 28 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="font-body shrink-0 font-black text-black"
                style={{
                  fontSize: 'clamp(4.5rem, 10vw, 10rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  minWidth: 'clamp(180px, 16vw, 280px)',
                }}
              >
                {stat.value}
              </p>
              <p className="font-body max-w-[440px] text-[14px] leading-[1.8] font-medium text-black/45">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Success story 2-col ── */}
        <div className="grid grid-cols-1 gap-4 pb-0 lg:grid-cols-2">
          {/* Left: editorial image */}
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            style={{ height: 'clamp(380px, 55vh, 620px)' }}
            initial={{ opacity: 0, x: -24 }}
            animate={statsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={`${IMG_CDN}/assets/images/Background-grid%20(2).jpg`}
              alt="Urban Trim craftsmanship"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </motion.div>

          {/* Right: testimonial card */}
          <motion.div
            className="flex flex-col rounded-2xl p-8 lg:p-10"
            style={{ height: 'clamp(380px, 55vh, 620px)', background: '#f5f5f5' }}
            initial={{ opacity: 0, x: 24 }}
            animate={statsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-[9px] tracking-[0.30em] text-black/30 uppercase">
              (Success stories)
            </p>

            <div className="mt-auto">
              <p
                className="font-body mb-10 leading-[1.65] font-medium text-black"
                style={{ fontSize: 'clamp(1rem, 1.7vw, 1.42rem)' }}
              >
                &ldquo;Urban Trim helped us simplify luxury. They redefined what a grooming visit
                should feel like — elevating the entire experience from the moment you walk in. The
                results were immediate — higher confidence, immediate second bookings.&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10">
                  <Image
                    src={IMAGES.testimonials.four}
                    alt="Gabriel Santos"
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div>
                  <p className="font-body text-[13px] font-semibold text-black">Gabriel Santos</p>
                  <p className="font-body text-[11px] text-black/40">Product Designer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          §5  TEAM — light gray bg, big heading, sticky left, 3-col grid
          ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={teamRef} style={{ backgroundColor: '#f5f5f5' }}>
        {/* ── Section heading row ── */}
        <div
          className="px-8 pt-24 md:px-14"
          style={{
            borderTop: '1px solid rgba(0,0,0,0.07)',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
          }}
        >
          <motion.h2
            className="font-display pb-6 text-black"
            style={{
              fontSize: 'clamp(3rem, 8.5vw, 9.5rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.03em',
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            The Artisans
            <sup
              className="font-body font-normal text-black/30"
              style={{
                fontSize: '0.22em',
                letterSpacing: '0.02em',
                verticalAlign: 'super',
                marginLeft: '0.3em',
              }}
            >
              ({team.length})
            </sup>
          </motion.h2>
        </div>

        {/* ── Two-col: sticky left + card grid right ── */}
        <div className="flex flex-col gap-16 px-8 py-16 md:px-14 lg:flex-row">
          {/* LEFT — sticky sidebar */}
          <div className="lg:sticky lg:top-32 lg:h-fit lg:w-[240px] lg:shrink-0">
            <motion.p
              className="font-body mb-5 text-[9px] tracking-[0.30em] text-black/35 uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              (Leadership)
            </motion.p>

            <motion.p
              className="font-body mb-8 max-w-[220px] text-[13px] leading-[1.8] text-black/45"
              initial={{ opacity: 0, y: 16 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A collective of barbers, artists, and innovators united by precision, craft, and
              shared ambition.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/contact"
                className="font-body inline-flex items-center rounded-full bg-black px-6 py-[11px] text-[12px] tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#B6F500] hover:text-black"
                data-cursor="hover"
              >
                Join us
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — 3-col team image cards */}
          <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
            {team.map((member, i) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 36 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image */}
                <div
                  className="relative mb-4 overflow-hidden rounded-2xl"
                  style={{ aspectRatio: '3/4', backgroundColor: '#e2e2e2' }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Info */}
                <p className="font-body mb-[3px] text-[15px] leading-snug font-medium text-black">
                  {member.name}
                </p>
                <p className="font-body text-[12px] text-black/40">({member.title})</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          §6  PARTNERS — 4×2 white card grid
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={partnersRef}
        className="px-8 py-16 md:px-14"
        style={{ backgroundColor: '#f5f5f5', borderTop: '1px solid rgba(0,0,0,0.07)' }}
      >
        {/* Header row */}
        <div className="mb-10 flex items-center justify-between">
          <motion.p
            className="font-body text-[9px] tracking-[0.30em] text-black/35 uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={partnersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            (Partners)
          </motion.p>

          {/* Dot marker */}
          <span className="hidden h-[6px] w-[6px] rounded-full bg-black/30 md:block" />

          <motion.p
            className="font-body text-[9px] tracking-[0.28em] text-black/35 uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={partnersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            2016-26©
          </motion.p>

          <span className="hidden h-[6px] w-[6px] rounded-full bg-black/30 md:block" />

          <motion.p
            className="font-body hidden text-[9px] tracking-[0.22em] text-black/30 uppercase md:block"
            initial={{ opacity: 0 }}
            animate={partnersInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Urban Trim Studio
          </motion.p>
        </div>

        {/* 4×2 logo grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={p.id}
              className="flex items-center justify-center rounded-2xl bg-white text-black"
              style={{ aspectRatio: '2.2 / 1' }}
              initial={{ opacity: 0, y: 18 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {p.logo}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          §7  AWARDS — left label+heading+CTA, right dark table card
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={awardsRef}
        className="bg-white"
        style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
      >
        <div className="flex min-h-[640px] flex-col lg:flex-row">
          {/* ── LEFT column — label, heading, dot, CTA ── */}
          <div className="relative flex flex-col px-8 pt-16 pb-16 md:px-14 lg:w-[30%] lg:shrink-0">
            {/* Thin vertical column line on right edge (matches reference grid) */}
            <div
              className="absolute top-0 right-0 bottom-0 hidden w-px lg:block"
              style={{ background: 'rgba(0,0,0,0.07)' }}
            />
            {/* Bullet dot on the vertical line — reference shows it at mid-height */}
            <div
              className="absolute top-[44%] right-0 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full bg-black lg:block"
              style={{ width: 10, height: 10 }}
            />

            {/* Label */}
            <motion.p
              className="font-body mb-5 text-[9px] tracking-[0.30em] text-black/35 uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={awardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              (Awards 16-26©)
            </motion.p>

            {/* Large heading */}
            <motion.h2
              className="font-display leading-none text-black"
              style={{ fontSize: 'clamp(3.5rem, 5.5vw, 7rem)', letterSpacing: '-0.035em' }}
              initial={{ opacity: 0, y: 24 }}
              animate={awardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Awards
              <sup
                className="font-body font-normal text-black/28"
                style={{
                  fontSize: '0.22em',
                  letterSpacing: '0.02em',
                  verticalAlign: 'super',
                  marginLeft: '0.5em',
                }}
              >
                ({AWARDS.length})
              </sup>
            </motion.h2>

            {/* Spacer pushes button toward bottom */}
            <div className="flex-1" />

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={awardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/services"
                className="font-body inline-flex items-center rounded-full bg-black px-7 py-[13px] text-[12px] tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#B6F500] hover:text-black"
                data-cursor="hover"
              >
                View all work
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT column — dark table card ── */}
          <div className="flex flex-1 flex-col justify-center px-8 py-16 md:px-10 lg:px-12">
            <motion.div
              className="overflow-hidden rounded-2xl"
              style={{ backgroundColor: '#0d0d0d' }}
              initial={{ opacity: 0, y: 32 }}
              animate={awardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Table header row */}
              <div
                className="grid gap-4 px-8 py-5"
                style={{
                  gridTemplateColumns: '2fr 2fr 80px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="font-body text-[9px] tracking-[0.26em] text-white/30 uppercase">
                  (Awards)
                </p>
                <p className="font-body text-[9px] tracking-[0.26em] text-white/30 uppercase">
                  (Recognition)
                </p>
                <p className="font-body text-right text-[9px] tracking-[0.26em] text-white/30 uppercase">
                  (Year)
                </p>
              </div>

              {/* Award rows — white highlight on hover */}
              {AWARDS.map((award, i) => (
                <div
                  key={i}
                  className="group grid cursor-default gap-4 px-8 py-[18px] transition-colors duration-200 hover:bg-white"
                  style={{
                    gridTemplateColumns: '2fr 2fr 80px',
                    borderBottom:
                      i < AWARDS.length - 1 ? '1px dashed rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  <p className="font-body text-[13px] text-white/55 transition-colors duration-200 group-hover:text-black">
                    {award.org}
                  </p>
                  <p className="font-body text-[13px] text-white/55 transition-colors duration-200 group-hover:text-black">
                    {award.recognition}
                  </p>
                  <p className="font-body text-right text-[13px] text-white/30 transition-colors duration-200 group-hover:text-black/50">
                    {award.year}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
