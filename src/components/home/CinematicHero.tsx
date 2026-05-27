'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'
import { ImageTrail } from '@/components/ui/image-trail'
import { IMG_CDN } from '@/lib/cdn'

/* ─── Background grid ─────────────────────────────────────────────────────── */

const BASE = `${IMG_CDN}/assets/images/Background-grid%20`
const COLS: string[][] = [
  [1, 2, 3, 4, 5, 6, 7].map((n) => `${BASE}(${n}).jpg`),
  [8, 9, 10, 11, 12, 13, 14].map((n) => `${BASE}(${n}).jpg`),
]
const COL_IMG_H = [340, 396]
const FROM_Y = [-10, -55]
const TO_Y = [-60, -5]
const DUR = [52, 65]

/* ─── Services sidebar ────────────────────────────────────────────────────── */

const SERVICES = [
  'Signature Haircut',
  'Precision Fades',
  'Beard Sculpting',
  'Colour & Highlights',
  'Scalp Treatment',
  'Royal Shave',
]

/* ─── Image trail assets ──────────────────────────────────────────────────── */

const H = `${IMG_CDN}/assets/images/Hero-Text-Hover%20Image`

const TRAIL_IMAGES = [
  `${H}/U-letter.png`,
  `${H}/Glossy-R.png`,
  `${H}/Zozo%20Head-1.png`,
  `${H}/A%20Baloon%20text.png`,
  `${H}/N%20Baloon%20text.png`,
  `${H}/Glossy-T.png`,
  `${H}/Fur-R.png`,
  `${H}/Head-2.png`,
  `${H}/M-lettes.png`,
]

/* ─── Per-character hover images ──────────────────────────────────────────── */

type CharConfig = {
  char: string
  img: string
  w?: string
  h?: string
  xPct?: number
  yPct?: number
}

/* "Urban" — 5 chars, 5 images (w/h override in em, falls back to default) */
const URBAN_CHARS: CharConfig[] = [
  { char: 'U', img: `${H}/U-letter.png`, w: '0.70em', h: '0.80em' },
  { char: 'r', img: `${H}/Glossy-R.png` },
  { char: 'b', img: `${H}/Zozo%20Head-1.png` },
  { char: 'a', img: `${H}/A%20Baloon%20text.png` },
  { char: 'n', img: `${H}/N%20Baloon%20text.png`, w: '1.20em' },
]

/* "Trim" — 4 chars, 4 images */
const TRIM_CHARS: CharConfig[] = [
  { char: 'T', img: `${H}/Glossy-T.png` },
  { char: 'r', img: `${H}/Fur-R.png` },
  { char: 'i', img: `${H}/Head-2.png` },
  { char: 'm', img: `${H}/M-lettes.png` },
]

/* ─── HeroChar ────────────────────────────────────────────────────────────── */
/*
 * Each character:
 *   - letterRef  : the text span (scales/rotates out on enter, back in on leave)
 *   - imgWrapRef : absolutely overlays the letter space (scales/rotates in)
 *
 * GSAP timeline is killed + rebuilt on every enter/leave so rapid
 * hovers never stack or glitch.
 */

function HeroChar({
  char,
  img,
  w = '0.92em',
  h = '1.10em',
  xPct = -50,
  yPct = -50,
}: {
  char: string
  img: string
  w?: string
  h?: string
  xPct?: number
  yPct?: number
}) {
  const letterRef = useRef<HTMLSpanElement>(null)
  const imgWrapRef = useRef<HTMLSpanElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    /* Set initial hidden state — xPercent/yPercent centers the fixed-size
       overlay on the character without conflicting with scale/rotation */
    if (imgWrapRef.current) {
      gsap.set(imgWrapRef.current, {
        xPercent: xPct,
        yPercent: yPct,
        scale: 0,
        rotation: -180,
        opacity: 0,
        transformOrigin: 'center center',
      })
    }
    if (letterRef.current) {
      gsap.set(letterRef.current, { transformOrigin: 'center center' })
    }
    return () => {
      tl.current?.kill()
    }
  }, [])

  const onEnter = () => {
    if (!letterRef.current || !imgWrapRef.current) return
    tl.current?.kill()
    tl.current = gsap
      .timeline()
      /* Letter spins out — fast shutter */
      .to(letterRef.current, {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.14,
        ease: 'power4.in',
      })
      /* Image pops in with overshoot — cinematic reveal */
      .fromTo(
        imgWrapRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.8)',
        },
        '-=0.04'
      )
  }

  const onLeave = () => {
    if (!letterRef.current || !imgWrapRef.current) return
    tl.current?.kill()
    tl.current = gsap
      .timeline()
      /* Image spins out — mirror shutter */
      .to(imgWrapRef.current, {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.14,
        ease: 'power4.in',
      })
      /* Letter returns with spring */
      .fromTo(
        letterRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.38,
          ease: 'back.out(1.35)',
        },
        '-=0.04'
      )
  }

  return (
    <span
      style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Visible letter */}
      <span ref={letterRef} style={{ display: 'inline-block' }}>
        {char}
      </span>

      {/* Image overlay — fixed size matching T's bounding box, centered on
          each character regardless of its individual advance width.
          top/left: 50% puts the corner at centre; GSAP xPercent/yPercent
          then shifts it back by half its own dimensions. */}
      <span
        ref={imgWrapRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: w,
          height: h,
          display: 'block',
          overflow: 'hidden',
          borderRadius: '6px',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <Image src={img} alt="" fill className="object-contain" sizes="18vw" />
      </span>
    </span>
  )
}

/* ─── CinematicHero ───────────────────────────────────────────────────────── */

export function CinematicHero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const heroPanelRef = useRef<HTMLDivElement>(null)
  const trailZoneRef = useRef<HTMLDivElement>(null)
  const colInnerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      /* ── Infinite auto-scroll per column ── */
      colInnerRefs.current.forEach((inner, i) => {
        if (!inner) return
        gsap.fromTo(
          inner,
          { yPercent: FROM_Y[i] },
          { yPercent: TO_Y[i], duration: DUR[i], repeat: -1, ease: 'linear' }
        )
      })

      /* ── Hero panel cinematic scale-shrink on scroll ── */
      gsap.to(heroPanelRef.current, {
        scale: 0.54,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
          invalidateOnRefresh: true,
        },
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ══════════════════════════════════════════
            BACKGROUND — 2-column scrolling image grid
        ══════════════════════════════════════════ */}
        <div className="absolute inset-0 z-0 flex items-start" style={{ gap: '4rem' }}>
          {COLS.map((col, ci) => (
            <div key={ci} style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <div
                ref={(el) => {
                  colInnerRefs.current[ci] = el
                }}
                className="flex flex-col"
                style={{ gap: '4rem', willChange: 'transform' }}
              >
                {[...col, ...col].map((src, ii) => (
                  <div
                    key={ii}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: `${COL_IMG_H[ci]}px`,
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="50vw"
                      className="object-cover"
                      priority={ii < 4}
                      loading={ii < 8 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            HERO PANEL — white card, scales to 0.54
        ══════════════════════════════════════════ */}
        <div
          ref={heroPanelRef}
          className="absolute inset-0 z-10 origin-center bg-white"
          style={{ willChange: 'transform' }}
        >
          {/* ── Hero content — z-[2], always above trail ── */}
          <div className="relative z-[2] flex h-full flex-col">
            {/* Header row: sidebar + tagline — trail active only here */}
            <div ref={trailZoneRef} className="relative flex flex-1 pt-[72px]">
              <ImageTrail images={TRAIL_IMAGES} containerRef={trailZoneRef} />
              {/* Left — service list */}
              <motion.aside
                className="hidden shrink-0 flex-col justify-start pt-10 md:flex"
                style={{
                  width: 'clamp(140px, 14vw, 200px)',
                  paddingLeft: 'clamp(1.5rem, 3vw, 3.5rem)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {SERVICES.map((name, i) => (
                  <motion.p
                    key={name}
                    className="font-body mb-[10px] text-[13px] leading-snug"
                    style={{ color: '#888' }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {name}
                  </motion.p>
                ))}
              </motion.aside>

              {/* Right — tagline + CTA */}
              <div className="relative flex-1">
                <motion.div
                  className="absolute top-8 right-8 max-w-[270px] text-right lg:right-16"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-body mb-8 text-[14px] leading-[1.7] text-[#555]">
                    No cookie-cutter cuts. No rushed sessions. Only precision grooming and expert
                    artistry that elevates your look and builds your confidence.
                  </p>
                  <Link
                    href="/booking"
                    className="font-body inline-flex items-center rounded-full bg-black px-7 py-[11px] text-[13px] tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#B6F500] hover:text-black"
                    data-cursor="hover"
                  >
                    Book Now
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* ── Giant headline — split per character ── */}
            <div className="flex shrink-0 items-end justify-between px-4 leading-none lg:px-8">
              {/* "Urban" */}
              <div style={{ clipPath: 'inset(0 -50vw)' }}>
                <motion.h1
                  className="font-body block font-black"
                  style={{
                    fontSize: 'clamp(6.5rem, 17.5vw, 22rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em',
                  }}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {URBAN_CHARS.map(({ char, img, w, h }, i) => (
                    <HeroChar key={i} char={char} img={img} w={w} h={h} />
                  ))}
                </motion.h1>
              </div>

              {/* "Trim" */}
              <div style={{ clipPath: 'inset(0 -50vw)' }}>
                <motion.h1
                  className="font-body block font-black"
                  style={{
                    fontSize: 'clamp(6.5rem, 17.5vw, 22rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em',
                  }}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {TRIM_CHARS.map(({ char, img, xPct, yPct }, i) => (
                    <HeroChar key={i} char={char} img={img} xPct={xPct} yPct={yPct} />
                  ))}
                </motion.h1>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SCROLL INDICATOR — between grid and panel
        ══════════════════════════════════════════ */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-[5] -translate-x-1/2">
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.3,
            }}
            className="font-body flex items-center gap-2 rounded-full bg-black/90 px-5 py-[10px] text-[11px] tracking-[0.14em] whitespace-nowrap text-white uppercase backdrop-blur-sm select-none"
          >
            Scroll Down
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path
                d="M5.5 1v9M1.5 6.5l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
