'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'

/*
 * 2 columns × 7 images each (all 14 local assets), doubled → 14 per
 * column for a seamless infinite loop.
 *
 * Filenames contain spaces → paths are URL-encoded (%20).
 *
 * yPercent loop math (each col):
 *   Strip = 14 images + 13 gaps (doubled set).
 *   Δ = ±50 % of strip height = exactly one set of 7 → seamless.
 *     Col 0 (up):   -10 → -60  (Δ = -50)
 *     Col 1 (down): -55 → -5   (Δ = +50)
 */

const BASE = '/assets/images/Background-grid%20'

const COLS: string[][] = [
  /* Column 0 (LEFT) — images 1–7, scrolls upward */
  [1, 2, 3, 4, 5, 6, 7].map((n) => `${BASE}(${n}).jpg`),
  /* Column 1 (RIGHT) — images 8–14, scrolls downward */
  [8, 9, 10, 11, 12, 13, 14].map((n) => `${BASE}(${n}).jpg`),
]

/* Render height per column (px). Width fills the flex-1 column. */
const COL_IMG_H = [340, 396]

const FROM_Y = [-10, -55]
const TO_Y = [-60, -5]
const DUR = [52, 65]

const SERVICES = [
  'Signature Haircut',
  'Precision Fades',
  'Beard Sculpting',
  'Colour & Highlights',
  'Scalp Treatment',
  'Royal Shave',
]

export function CinematicHero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const heroPanelRef = useRef<HTMLDivElement>(null)
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
          {
            yPercent: TO_Y[i],
            duration: DUR[i],
            repeat: -1,
            ease: 'linear',
          }
        )
      })

      /*
       * ── Hero panel: aggressive scale-down, zero border-radius ──
       *
       * Wrapper is 400vh. The sticky child pins for 300vh of scroll
       * (400vh − 100vh viewport). Over that distance the panel shrinks
       * from scale(1) → scale(0.54), exposing the grid on all sides.
       *
       * scrub: 2.5 gives the smooth "cinematic lag" feel.
       */
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
    /*
     * 400vh wrapper → 300vh of usable scroll animation budget.
     * The sticky inner div stays glued to top: 0 throughout.
     */
    <div ref={wrapperRef} style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ══════════════════════════════════════════════════
            BACKGROUND — 2-column large image grid
            Fixed column widths: 612.28 px each
            Image heights: 340.15 px (left) / 396.85 px (right)
            Gap: 2rem between columns and between every image item
        ══════════════════════════════════════════════════ */}
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

        {/* ══════════════════════════════════════════════════
            HERO PANEL — white card, GSAP scales to 0.54
            origin-center keeps it centered as it shrinks.
            No border-radius — stays sharp-edged throughout.
        ══════════════════════════════════════════════════ */}
        <div
          ref={heroPanelRef}
          className="absolute inset-0 z-10 origin-center bg-white"
          style={{ willChange: 'transform' }}
        >
          <div className="relative flex h-full flex-col overflow-hidden">
            {/* Body: left sidebar + right content */}
            <div className="flex flex-1 pt-[72px]">
              {/* Left sidebar — service list */}
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

              {/* Right — tagline + pill CTA */}
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

            {/* Bottom giant type */}
            <div className="flex shrink-0 items-end justify-between px-4 leading-none lg:px-8">
              <div className="overflow-hidden">
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
                  Urban
                </motion.h1>
              </div>
              <div className="overflow-hidden">
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
                  Trim
                </motion.h1>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SCROLL INDICATOR — z-[5]: sits between the image
            grid (z-0) and the hero panel (z-10).
            The hero panel itself masks it when full-screen;
            as it scales down the bottom strip reveals this badge.
        ══════════════════════════════════════════════════ */}
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
