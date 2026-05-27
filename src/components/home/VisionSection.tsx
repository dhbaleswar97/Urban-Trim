'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'
import { IMG_CDN } from '@/lib/cdn'

/*
 * Sticky scroll storytelling — Monof "Our Vision" parity.
 *
 * SCROLL_H = 700vh wrapper → 600vh effective pin scroll.
 * Timeline ~13 units  →  600vh / 13 ≈ 46vh per unit (cinematic pace).
 *
 * Stage map (timeline units):
 *   0.0        P1 visible/static from load
 *   0.0 – 0.2  Scroll hint fades
 *   0.3 – 0.9  P1 chars EXIT  (r→l stagger)
 *   0.8 – 2.0  P2 chars ENTER (l→r stagger)
 *   2.2 – 2.8  P2 chars EXIT
 *   2.7 – 3.9  P3 chars ENTER
 *   4.1 – 4.7  P3 chars EXIT
 *   4.6 – 5.8  P4 chars ENTER
 *   6.0 – 6.6  P4 chars EXIT
 *   6.3 – 8.9  Sentences stagger IN  (6 × 0.42 stagger)
 *   9.2 – 9.6  Sentences stagger OUT
 *   9.0 – 10.2 Image scale 0 → 0.28
 *  10.2 – 12.2 Image scale 0.28 → 1 (full bleed)
 *  11.8 – 13.0 Inner image zoom 1 → 1.1
 *   0.5 – 13.0 Dot traces grid path
 */

const SCROLL_H = 750
const VISION_IMG = `${IMG_CDN}/assets/images/web-img%20(2).png`

const PHRASES = ['Cut Different.', 'Craft Above All.', 'Every Line Counts.', 'Built for the Bold.']

const SENTENCES = [
  'Where barbering meets artistry.',
  'Every line drawn with intention.',
  'Every detail, considered.',
  'A mastery built over 14 years.',
  'No two cuts are ever the same.',
  'This is the Urban Trim experience.',
]

function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
      <div className="absolute inset-y-0 left-1/3 w-px bg-white/[0.07]" />
      <div className="absolute inset-y-0 left-2/3 w-px bg-white/[0.07]" />
      <div className="absolute inset-x-0 top-1/3 h-px bg-white/[0.07]" />
      <div className="absolute inset-x-0 top-2/3 h-px bg-white/[0.07]" />
    </div>
  )
}

function buildChars(text: string, visible: boolean) {
  return text.split('').map((ch, ci) => (
    <span
      key={ci}
      className="char inline-block will-change-transform"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {ch === ' ' ? ' ' : ch}
    </span>
  ))
}

export function VisionSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const phraseRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const sentRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const imgInnerRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      /* Convert NodeLists to arrays for GSAP */
      const charSets = phraseRefs.current.map((ref) =>
        ref ? Array.from(ref.querySelectorAll<HTMLElement>('.char')) : []
      )
      const sents = sentRef.current
        ? Array.from(sentRef.current.querySelectorAll<HTMLElement>('.sent'))
        : []

      const vw = window.innerWidth
      const vh = window.innerHeight

      /* ── Initial states ───────────────────────────────── */
      /* P1: already visible, static — no entry animation */
      if (charSets[0].length) gsap.set(charSets[0], { opacity: 1, y: 0, filter: 'none' })
      /* P2–P4: hidden, offset down, blurred */
      for (let i = 1; i < PHRASES.length; i++) {
        if (charSets[i].length) gsap.set(charSets[i], { opacity: 0, y: 30, filter: 'blur(14px)' })
      }
      if (sents.length) gsap.set(sents, { opacity: 0, y: 16, filter: 'blur(5px)' })
      /* clipPath-based reveal: inset() hides → square crop → landscape → full */
      const sq = Math.min(vw, vh) * 0.38
      const clipT = +(((vh - sq) / (2 * vh)) * 100).toFixed(2) // top/bottom %
      const clipH = +(((vw - sq) / (2 * vw)) * 100).toFixed(2) // left/right % for square
      const clipL = +(((vw - vw * 0.6) / (2 * vw)) * 100).toFixed(2) // left/right % for landscape
      /* opacity: 0 keeps the element truly invisible — clipPath alone can bleed on some engines */
      gsap.set(imgWrapRef.current, { clipPath: 'inset(50% 50% 50% 50%)', opacity: 0 })
      gsap.set(imgInnerRef.current, { scale: 1 })

      /* ── Master scrub timeline ────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.8,
          invalidateOnRefresh: true,
        },
      })

      /* ── P1 EXIT ── */
      if (charSets[0].length) {
        tl.to(
          charSets[0],
          {
            opacity: 0,
            y: -28,
            filter: 'blur(8px)',
            stagger: { each: 0.016, from: 'end' },
            ease: 'power2.in',
            duration: 0.4,
          },
          0.3
        )
      }

      /* ── P2 ENTER / EXIT ── */
      if (charSets[1].length) {
        tl.to(
          charSets[1],
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.024,
            ease: 'power3.out',
            duration: 0.55,
          },
          0.8
        )
        tl.to(
          charSets[1],
          {
            opacity: 0,
            y: -26,
            filter: 'blur(8px)',
            stagger: { each: 0.015, from: 'end' },
            ease: 'power2.in',
            duration: 0.4,
          },
          2.2
        )
      }

      /* ── P3 ENTER / EXIT ── */
      if (charSets[2].length) {
        tl.to(
          charSets[2],
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.024,
            ease: 'power3.out',
            duration: 0.55,
          },
          2.7
        )
        tl.to(
          charSets[2],
          {
            opacity: 0,
            y: -26,
            filter: 'blur(8px)',
            stagger: { each: 0.015, from: 'end' },
            ease: 'power2.in',
            duration: 0.4,
          },
          4.1
        )
      }

      /* ── P4 ENTER / EXIT ── */
      if (charSets[3].length) {
        tl.to(
          charSets[3],
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.024,
            ease: 'power3.out',
            duration: 0.55,
          },
          4.6
        )
        tl.to(
          charSets[3],
          {
            opacity: 0,
            y: -26,
            filter: 'blur(8px)',
            stagger: { each: 0.015, from: 'end' },
            ease: 'power2.in',
            duration: 0.4,
          },
          6.0
        )
      }

      /* ── Sentences ENTER ── */
      if (sents.length) {
        tl.to(
          sents,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.42,
            ease: 'power2.out',
            duration: 0.5,
          },
          6.3
        )

        /* ── Sentences EXIT ── */
        tl.to(
          sents,
          {
            opacity: 0,
            y: -14,
            stagger: { each: 0.07, from: 'end' },
            ease: 'power2.in',
            duration: 0.35,
          },
          9.2
        )
      }

      /* ── Image un-hide: fires only after all text has exited (sentences exit ends at 9.6) ──
         opacity 0→1 coincides with Phase A so the clipPath handles the visual reveal.
         Starting at 9.8 guarantees zero overlap with any text layer. */
      tl.to(imgWrapRef.current, { opacity: 1, duration: 0.3, ease: 'none' }, 9.8)

      /* ── Phase A: hidden → small square (9.8 → 11.0) ── */
      tl.fromTo(
        imgWrapRef.current,
        { clipPath: 'inset(50% 50% 50% 50%)' },
        {
          clipPath: `inset(${clipT}% ${clipH}% ${clipT}% ${clipH}%)`,
          ease: 'power2.out',
          duration: 1.2,
        },
        9.8
      )

      /* ── Phase B: square → landscape (11.0 → 11.9, contiguous) ── */
      tl.fromTo(
        imgWrapRef.current,
        { clipPath: `inset(${clipT}% ${clipH}% ${clipT}% ${clipH}%)` },
        {
          clipPath: `inset(${clipT}% ${clipL}% ${clipT}% ${clipL}%)`,
          ease: 'power2.inOut',
          duration: 0.9,
        },
        11.0
      )

      /* ── Phase C: landscape → full bleed (11.9 → 14.1, contiguous) ── */
      tl.fromTo(
        imgWrapRef.current,
        { clipPath: `inset(${clipT}% ${clipL}% ${clipT}% ${clipL}%)` },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power1.inOut', duration: 2.2 },
        11.9
      )

      /* ── Cinematic zoom synced with Phase C (11.9 → 14.1) ── */
      tl.fromTo(
        imgInnerRef.current,
        { scale: 1 },
        { scale: 1.12, ease: 'none', duration: 2.2 },
        11.9
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ height: `${SCROLL_H}vh`, marginTop: '16vh' }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-black">
        <GridLines />

        {/* Persistent top label */}
        <p className="font-body pointer-events-none absolute inset-x-0 top-9 z-[50] text-center text-[9px] tracking-[0.32em] text-white/40 uppercase select-none">
          (Our Vision)
        </p>

        {/* Scroll More indicator — persistent, always above image */}
        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-[50] flex flex-col items-center gap-[7px] select-none"
        >
          <p className="font-body text-[9px] tracking-[0.28em] text-white/35 uppercase">
            Scroll More
          </p>
          <div className="h-5 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>

        {/* ── All 4 phrase headings — single line, centred ── */}
        {PHRASES.map((phrase, i) => (
          <div
            key={i}
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          >
            <h2
              ref={(el) => {
                phraseRefs.current[i] = el
              }}
              className="font-body text-center leading-none font-normal tracking-[-0.02em] whitespace-nowrap text-white"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 7.5rem)' }}
            >
              {buildChars(phrase, i === 0)}
            </h2>
          </div>
        ))}

        {/* ── Storytelling sentences ── */}
        <div
          ref={sentRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-[10px]"
        >
          {SENTENCES.map((s, i) => (
            <p
              key={i}
              className="sent font-body text-center text-[13px] tracking-[0.04em] text-white/55 md:text-[15px]"
              style={{ opacity: 0 }}
            >
              {s}
            </p>
          ))}
        </div>

        {/* ── Image: clipPath inset reveal — square → landscape → full bleed ── */}
        <div
          ref={imgWrapRef}
          className="absolute inset-0 z-20"
          style={{ clipPath: 'inset(50% 50% 50% 50%)', opacity: 0, willChange: 'clip-path' }}
        >
          <div
            ref={imgInnerRef}
            className="absolute inset-0"
            style={{ transformOrigin: 'center', willChange: 'transform' }}
          >
            <Image
              src={VISION_IMG}
              alt="Urban Trim — Our Vision"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
