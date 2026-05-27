'use client'

import { Fragment, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/animations/gsap.config'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * CinematicTextSection — sticky-scroll storytelling, 3-sentence char reveal.
 *
 * Word-group fix: each word's chars are wrapped in
 *   display:inline-block; white-space:nowrap
 * so the browser can only line-break at the space between words, never
 * mid-word. The space char itself is a separate data-char span that
 * participates in the stagger animation.
 *
 * Timeline (scrub 1.5, end +=700%  →  ~70 vh / unit):
 *   0   → ~2.1  : row 0 char reveal
 *   2.8 → ~5.1  : row 1 char reveal
 *   5.8 → ~7.9  : row 2 char reveal
 *   8.0 → 10.0  : panel exits upward
 */

/* ─── Data ─────────────────────────────────────────────────────── */

const SENTENCES = [
  "We're always ready for your transformation.",
  'Precision crafted for those who demand the very best.',
  'Where artistry meets identity — this is Urban Trim.',
]

/* ─── CharSpans — word-grouped to prevent mid-word line breaks ─── */

function CharSpans({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          {/* Each word is an inline-block with nowrap → chars stay together */}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.split('').map((char, ci) => (
              <span
                key={ci}
                data-char=""
                style={{ display: 'inline-block', willChange: 'transform, opacity' }}
              >
                {char}
              </span>
            ))}
          </span>
          {/* Space between words — data-char so it joins the stagger */}
          {wi < words.length - 1 && (
            <span
              data-char=""
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
            >
              &nbsp;
            </span>
          )}
        </Fragment>
      ))}
    </>
  )
}

/* ─── Component ─────────────────────────────────────────────────── */

export function CinematicTextSection() {
  const outerRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  /* row wrappers — opacity toggled to reveal number + text together */
  const rowRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  /* paragraph elements — used to query [data-char] spans */
  const pRefs = useRef<(HTMLParagraphElement | null)[]>([null, null, null])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const rows = rowRefs.current as HTMLDivElement[]
      const ps = pRefs.current as HTMLParagraphElement[]

      /* ── Initial state ────────────────────────────────────────── */
      /* All chars hidden (opacity 0, translated down) */
      ps.forEach((p) => gsap.set(p.querySelectorAll('[data-char]'), { opacity: 0, y: 52 }))
      /* Rows 1 & 2 fully hidden — number + text invisible together */
      gsap.set([rows[1], rows[2]], { opacity: 0 })

      /* ── ScrollTrigger timeline ───────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          pin: stickyRef.current,
          start: 'top top',
          end: '+=700%',
          scrub: 1.5,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      })

      /* Row 0 — sentence 1 char reveal */
      tl.to(
        ps[0].querySelectorAll('[data-char]'),
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.8, ease: 'power3.out' },
        0
      )

      /* Row 1 — sentence 2 */
      tl.set(rows[1], { opacity: 1 }, 2.8)
      tl.to(
        ps[1].querySelectorAll('[data-char]'),
        { opacity: 1, y: 0, stagger: 0.025, duration: 0.8, ease: 'power3.out' },
        2.8
      )

      /* Row 2 — sentence 3 */
      tl.set(rows[2], { opacity: 1 }, 5.8)
      tl.to(
        ps[2].querySelectorAll('[data-char]'),
        { opacity: 1, y: 0, stagger: 0.025, duration: 0.8, ease: 'power3.out' },
        5.8
      )

      /* Panel exit — slides up, CTA section rises beneath */
      tl.to(stickyRef.current, { yPercent: -100, ease: 'power2.inOut', duration: 2 }, 8.0)
    }, outerRef)

    return () => ctx.revert()
  }, [])

  /* ── Render ─────────────────────────────────────────────────────── */

  return (
    <section ref={outerRef}>
      <div
        ref={stickyRef}
        className="relative flex h-screen items-center justify-center overflow-hidden bg-white"
        style={{ willChange: 'transform' }}
      >
        {/* Section label */}
        <p
          className="font-body pointer-events-none absolute top-8 left-8 text-[9px] tracking-[0.28em] uppercase select-none lg:left-14"
          style={{ color: 'rgba(0,0,0,0.25)' }}
        >
          (Our Promise)
        </p>

        {/* Sentence rows — number + text side by side */}
        <div className="flex w-full max-w-[1200px] flex-col gap-[clamp(1rem,2.2vw,1.8rem)] px-8 md:px-14 lg:px-20">
          {SENTENCES.map((text, i) => (
            <div
              key={i}
              ref={(el) => {
                rowRefs.current[i] = el
              }}
              className="flex items-start gap-5 lg:gap-8"
            >
              {/* Bullet number */}
              <span
                className="font-body shrink-0 leading-none tabular-nums select-none"
                style={{
                  fontSize: 'clamp(0.65rem, 0.9vw, 0.82rem)',
                  color: 'rgba(0,0,0,0.28)',
                  marginTop: 'clamp(0.55rem,0.85vw,1.05rem)',
                  letterSpacing: '0.04em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Sentence text */}
              <p
                ref={(el) => {
                  pRefs.current[i] = el
                }}
                className="font-display flex-1 leading-[1.10] text-black"
                style={{ fontSize: 'clamp(1.9rem,4.4vw,5.4rem)' }}
              >
                <CharSpans text={text} />
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator — bouncing pill badge */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 select-none">
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.35 }}
            className="flex items-center gap-2 rounded-full border border-black/14 px-5 py-[10px]"
            style={{ background: 'rgba(0,0,0,0.03)' }}
          >
            <span className="font-body text-[11px] tracking-[0.14em] whitespace-nowrap text-black/45 uppercase">
              Scroll to explore
            </span>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path
                d="M5.5 1v9M1.5 6.5l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black/45"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
