'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'
import { IMAGES } from '@/config/images'
import { IMG_CDN } from '@/lib/cdn'

/*
 * StatsSection — two parts:
 *
 * A) Sticky pinned section: staggered card cascade entrance (GSAP scrub)
 * B) Static bottom section: editorial image + success story card
 *
 * ── 3-D card flip (Part A cards) ──────────────────────────────────────────
 *
 * DOM hierarchy per card:
 *
 *   [outer]          ← scroll animation target  (y: 900 → 0, opacity: 0 → 1)
 *     [perspective]  ← CSS perspective: 1200px  (perspective context, no 3-D itself)
 *       [flipper]    ← hover animation target   (rotateY: 0 → 180)
 *                       transform-style: preserve-3d
 *         [front]    ← backface-visibility: hidden  (visible at rotateY 0)
 *         [back]     ← backface-visibility: hidden  (pre-rotated 180°; visible at rotateY 180)
 *
 * Keeping the flip target SEPARATE from the scroll target avoids the
 * opacity<1 bug: an element with opacity<1 creates a new stacking context
 * which flattens preserve-3d children. The outer wrapper carries opacity;
 * the flipper (inside, always opacity:1) keeps its 3-D context intact.
 *
 * Flip direction alternates L↔R across cards for visual variety.
 */

/* ─── Data ──────────────────────────────────────────────────────────────── */

interface Stat {
  label: string
  value: string
  desc: string
  backLabel: string
  backMetric: string
  backHeadline: string
  backDetail: string
  flipDir: 1 | -1 /* 1 = rotateY +180, -1 = rotateY -180 */
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

const TOTAL = STATS.length
const CARD_POS = [1.5, 2.0, 2.5, 3.0] as const

/* ─── Dot indicator ─────────────────────────────────────────────────────── */

function Dots({ active, light }: { active: number; light?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[4px]">
      {Array.from({ length: TOTAL }).map((_, di) => (
        <span
          key={di}
          style={{
            display: 'block',
            width: 5,
            height: 5,
            borderRadius: '50%',
            background:
              di <= active
                ? light
                  ? 'rgba(255,255,255,0.85)'
                  : 'rgba(255,255,255,0.85)'
                : 'rgba(255,255,255,0.18)',
          }}
        />
      ))}
    </div>
  )
}

/* ─── StatsSection ──────────────────────────────────────────────────────── */

export function StatsSection() {
  const outerRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  /* outer wrappers — scroll animation (y / opacity) */
  const outerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  /* inner flippers — 3-D flip (rotateY) */
  const flipRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])

  /* ── Scroll entrance ───────────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const outers = outerRefs.current as HTMLDivElement[]

      /*
       * Outer wrappers carry y+opacity.
       * The flippers inside will keep their own 3-D context because they
       * are always at opacity:1 — only the PARENT loses opacity.
       */
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

      /* intro fades up and out */
      tl.to(
        introRef.current,
        {
          yPercent: -35,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 1.5,
        },
        0
      )

      /* cards cascade upward */
      outers.forEach((el, i) => {
        tl.to(
          el,
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 1.5,
          },
          CARD_POS[i]
        )
      })

      /* hold final state */
      tl.to({}, { duration: 2.0 }, 4.5)
    }, outerRef)

    return () => ctx.revert()
  }, [])

  /* ── 3-D flip handlers ─────────────────────────────────────────────────── */

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
    gsap.to(el, {
      rotateX: 0,
      ease: 'power2.inOut',
      duration: 0.72,
      overwrite: 'auto',
    })
  }

  /* ── Render ─────────────────────────────────────────────────────────────── */

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          PART A — Sticky pinned stats section
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={outerRef}>
        <div ref={stickyRef} className="relative h-screen overflow-hidden bg-black">
          {/* Intro text — fades up and out */}
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
                /*
                 * [outer] — scroll animation target.
                 * Must NOT have overflow:hidden (would flatten preserve-3d).
                 */
                <div
                  key={i}
                  ref={(el) => {
                    outerRefs.current[i] = el
                  }}
                  style={{
                    height: 'clamp(280px, 44vh, 460px)',
                    perspective: '1200px',
                  }}
                >
                  {/*
                   * [flipper] — 3-D flip target.
                   * transform-style:preserve-3d keeps front/back in the same 3-D space.
                   */}
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
                    {/* ── FRONT FACE ───────────────────────────────────── */}
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

                    {/* ── BACK FACE ────────────────────────────────────── */}
                    {/*
                     * Pre-rotated 180° in the same axis as the flip direction.
                     * When the flipper reaches rotateY:±180, this face is at
                     * 0° absolute → readable, front is at ±360° → hidden.
                     */}
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
                  {/* /flipper */}
                </div> /* /outer */
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PART B — Static bottom: editorial image + success story
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-black px-6 pt-4 pb-20 md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Left — editorial image */}
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ height: 'clamp(380px, 58vh, 660px)' }}
          >
            <Image
              src={`${IMG_CDN}/assets/images/Background-grid%20(2).jpg`}
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
