'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useSpring } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'
import { IMG_CDN } from '@/lib/cdn'

/*
 * Stack-card sticky scroll — mirrors the Monof "Work" section.
 *
 * Concept:
 *   Card 0 is fully visible at rest.
 *   Each subsequent card (1…N-1) starts at yPercent:100 (clipped below).
 *   As the user scrolls, card i slides UP and covers card i-1,
 *   while card i-1 subtly recedes (scale 1→0.93) for depth.
 *   Higher z-index cards render on top — so the incoming card always
 *   appears over the outgoing one during the overlap.
 *
 * Scroll math (per transition i, 1-indexed):
 *   start  =  section_top + (i-1) × 100vh
 *   end    =  section_top + i     × 100vh
 *
 * Wrapper height = (N+1) × 100vh
 *   — gives exactly one extra viewport of "sit" on the last card
 *     after all (N-1) transitions complete at (N-1) × 100vh.
 *
 * scrub: 1.5  — cinematic lag that feels scroll-driven, not triggered.
 */

const SERVICES = [
  {
    number: '01',
    name: 'Signature\nHaircut',
    tagline: 'Architecture for the modern gentleman',
    detail: '60 min  ·  From $65',
    image: `${IMG_CDN}/assets/images/web-img%20(1).jpg`,
    href: '/services/signature-haircut',
  },
  {
    number: '02',
    name: 'Beard\nSculpting',
    tagline: 'Define your edge with surgical precision',
    detail: '45 min  ·  From $45',
    image: `${IMG_CDN}/assets/images/web-img%20(2).jpg`,
    href: '/services/beard-sculpting',
  },
  {
    number: '03',
    name: 'Colour &\nHighlights',
    tagline: 'Dimensional colour curated for you',
    detail: '90 min  ·  From $120',
    image: `${IMG_CDN}/assets/images/web-img%20(3).jpg`,
    href: '/services/colour-highlights',
  },
  {
    number: '04',
    name: 'Scalp\nTreatment',
    tagline: 'Restore, nourish, revitalise',
    detail: '60 min  ·  From $80',
    image: `${IMG_CDN}/assets/images/web-img%20(4).jpg`,
    href: '/services/scalp-treatment',
  },
  {
    number: '05',
    name: 'Royal\nShave',
    tagline: 'A ritual passed through generations',
    detail: '50 min  ·  From $55',
    image: `${IMG_CDN}/assets/images/web-img%20(5).jpg`,
    href: '/services/royal-shave',
  },
]

const N = SERVICES.length // 5

/*
 * Magnetic pill — the cursor hides (data-cursor="magnetic") and the pill
 * tracks the pointer with a spring offset, snapping back on leave.
 */
function BookServicePill() {
  const pillRef = useRef<HTMLSpanElement>(null)
  const x = useSpring(0, { stiffness: 280, damping: 18, mass: 0.7 })
  const y = useSpring(0, { stiffness: 280, damping: 18, mass: 0.7 })

  const onMove = (e: React.MouseEvent) => {
    if (!pillRef.current) return
    const rect = pillRef.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.38)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.38)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.span
        ref={pillRef}
        className="font-body rounded-full border border-white/20 bg-white/15 tracking-[0.08em] text-white uppercase backdrop-blur-md select-none"
        style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.78rem)', padding: '9px 22px', x, y }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="magnetic"
      >
        Book Service
      </motion.span>
    </div>
  )
}

export function StickyServicesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      for (let i = 1; i < N; i++) {
        const card = cardRefs.current[i]
        const prevCard = cardRefs.current[i - 1]
        if (!card || !prevCard) continue

        /*
         * Single timeline per transition → one ScrollTrigger drives both
         * the incoming card (slides up) and the outgoing card (recedes).
         * Position argument `0` ensures they run in perfect sync.
         */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: () => `top+=${(i - 1) * window.innerHeight}px top`,
            end: () => `top+=${i * window.innerHeight}px top`,
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        })

        /* Incoming card: rise from below → cover previous */
        tl.fromTo(card, { yPercent: 100 }, { yPercent: 0, ease: 'none' }, 0)

        /* Outgoing card: recede slightly (depth illusion) */
        tl.fromTo(prevCard, { scale: 1 }, { scale: 0.93, ease: 'none' }, 0)
      }
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div style={{ marginTop: '5rem' }}>
      {/* ── Scroll budget: (N+1)×100vh ────────────────────── */}
      <div ref={wrapperRef} style={{ height: `${(N + 1) * 100}vh` }}>
        {/* Sticky shell: full viewport, never scrolls */}
        <div className="sticky top-0 flex h-screen overflow-hidden bg-white">
          {/* ══════════════════════════════════════════════
              LEFT SIDEBAR — label + heading + CTA
          ══════════════════════════════════════════════ */}
          <div
            className="hidden shrink-0 flex-col justify-between border-r border-black/[0.07] md:flex"
            style={{
              width: 'clamp(180px, 21vw, 290px)',
              padding: 'clamp(4rem, 6vh, 5.5rem) clamp(1.5rem, 3vw, 3rem) clamp(2rem, 4vh, 3rem)',
            }}
          >
            {/* Top */}
            <div>
              <p className="font-body mb-6 text-[10px] tracking-[0.32em] text-black uppercase">
                (Services 2026©)
              </p>
              <div className="flex flex-wrap items-baseline gap-[6px]">
                <h2
                  className="font-body leading-none font-normal tracking-[-0.03em] text-black"
                  style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
                >
                  Work
                </h2>
                <span
                  className="font-body text-black/35"
                  style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
                >
                  ({N})
                </span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/services"
              className="font-body inline-flex items-center justify-center self-start rounded-full bg-black tracking-[0.03em] text-white transition-all duration-300 hover:bg-[#B6F500] hover:text-black"
              style={{
                fontSize: 'clamp(0.7rem, 0.95vw, 0.85rem)',
                padding: 'clamp(9px, 1.1vh, 13px) clamp(18px, 1.7vw, 24px)',
              }}
              data-cursor="hover"
            >
              View all services
            </Link>
          </div>

          {/* ══════════════════════════════════════════════
              CARD STACK
              overflow-hidden clips cards at yPercent:100
              z-index ascends so each new card renders on top
          ══════════════════════════════════════════════ */}
          <div className="relative flex-1 overflow-hidden">
            {SERVICES.map((s, i) => (
              <div
                key={s.number}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="absolute inset-0"
                style={{ zIndex: i + 1 }}
              >
                <Link href={s.href} className="relative block h-full" data-cursor="view">
                  {/* Full-bleed image */}
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 79vw"
                    className="object-cover"
                    priority={i === 0}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />

                  {/* Magnetic pill — cursor hides, pill follows pointer */}
                  <BookServicePill />

                  {/* Top content row */}
                  <div
                    className="absolute top-0 right-0 left-0 flex items-start justify-between"
                    style={{
                      padding: 'clamp(1.5rem, 3vh, 2.5rem) clamp(1.5rem, 2.5vw, 2.5rem)',
                    }}
                  >
                    {/* Left — tagline + service name */}
                    <div>
                      <p className="font-body mb-3 text-[10px] tracking-[0.26em] text-white/45 uppercase">
                        {s.tagline}
                      </p>
                      <h3
                        className="font-body leading-[0.88] font-normal whitespace-pre-line text-white"
                        style={{
                          fontSize: 'clamp(2.2rem, 4.2vw, 5.2rem)',
                          letterSpacing: '-0.025em',
                        }}
                      >
                        {s.name}
                      </h3>
                    </div>

                    {/* Right — detail + index */}
                    <div className="ml-4 shrink-0 pb-1 text-right">
                      <p className="font-body mb-1 text-[12px] leading-snug text-white/50 tabular-nums">
                        {s.detail}
                      </p>
                      <p className="font-body text-[10px] tracking-[0.2em] text-white/30">
                        {s.number}©
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
