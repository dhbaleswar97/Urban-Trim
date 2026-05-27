'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'

/*
 * Sticky showreel — Monof "Showreel 26" parity.
 *
 * SCROLL_H = 700vh wrapper → 600vh effective pin scroll.
 * Timeline ~6 units → 600/6 = 100vh per unit.
 *
 * Grid geometry (gap: 0, height: 100vh):
 *   Columns: 1fr 1fr 1.8fr 1.8fr 1fr 1fr  → total 7.6fr
 *   Center cell (cols 3/5): 3.6/7.6 = 47.37% width — at 1440px ≈ 682px
 *     vs. equal-col baseline 480px → +101px per side ✓
 *   Center row (1.3fr of 3.3fr total): 1.3/3.3 × 100vh = 39.39vh
 *   With gap 10px: center row = 1.3/3.3 × (100vh − 20px) → 294–417px across
 *   viewports. Scale range 2.59–2.61; GRID_INIT_SCALE = 2.65 for full bleed
 *   at all common viewport heights (≥13px overflow on each edge → no strip).
 *
 * "Showreel 26©" title lives INSIDE the center cell div so it scales
 *  with the grid during the 2.58 → 1 animation, achieving perfect sync.
 *  char y-offsets are in local (pre-scale) space; visual displacement at
 *  initial scale = y × 2.58.
 *
 * Stage map (timeline units):
 *   0.0        Grid at INIT_SCALE, center cell fills viewport
 *   0.3 – 1.5  "Showreel 26©" chars stagger IN (inside center cell)
 *   2.5 – 5.0  Grid scales 2.58 → 1 (masonry 2-3-2 reveals)
 *   4.5 – 5.2  Title chars stagger OUT upward
 *   5.3 – 6.0  Circular play button appears
 */

const SCROLL_H = 700
const GRID_INIT_SCALE = 2.65

const SRC = {
  topLeft: '/assets/videos/Showreel-video/Top-left-reel.mp4',
  topRight: '/assets/videos/Showreel-video/Top-right-reel.mp4',
  centerLeft: '/assets/videos/Showreel-video/Center-left-reel.mp4',
  center: '/assets/videos/Showreel-video/Center-reel.mp4',
  centerRight: '/assets/videos/Showreel-video/Center-right-reel.mp4',
  bottomLeft: '/assets/videos/Showreel-video/Bottom-left-reel.mp4',
  bottomRight: '/assets/videos/Showreel-video/Bottom-right-reel.mp4',
}

interface Cell {
  src: string
  col: string
  row: string
  isCenter?: boolean
}

/*
 * 2-3-2 masonry — 6-column grid with wider center pair.
 * Top/bottom rows split 50/50 (3.8fr each).
 * Middle row: center-left 26.32% | center 47.37% | center-right 26.32%.
 * Center of center cell = 50% of grid width = viewport center. ✓
 */
const CELLS: Cell[] = [
  { src: SRC.topLeft, col: '1 / 4', row: '1 / 2' },
  { src: SRC.topRight, col: '4 / 7', row: '1 / 2' },
  { src: SRC.centerLeft, col: '1 / 3', row: '2 / 3' },
  { src: SRC.center, col: '3 / 5', row: '2 / 3', isCenter: true },
  { src: SRC.centerRight, col: '5 / 7', row: '2 / 3' },
  { src: SRC.bottomLeft, col: '1 / 4', row: '3 / 4' },
  { src: SRC.bottomRight, col: '4 / 7', row: '3 / 4' },
]

const TITLE = 'Showreel 26©'

export function ShowreelSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])
  const playBtnRef = useRef<HTMLButtonElement>(null)
  const overlayVid = useRef<HTMLVideoElement>(null)
  const [playerOpen, setPlayerOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[]

      /* ── Initial states ── */
      gsap.set(gridRef.current, { scale: GRID_INIT_SCALE })
      /* y in local (pre-scale) space: 20 × 2.58 = ~52px visual */
      gsap.set(chars, { opacity: 0, y: 20, filter: 'blur(6px)' })
      gsap.set(playBtnRef.current, { opacity: 0, scale: 0.75 })

      /* ── Master scrub timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.8,
          invalidateOnRefresh: true,
        },
      })

      /* 0.3 – 1.5: Title chars stagger in */
      tl.to(
        chars,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.05,
          ease: 'power3.out',
          duration: 0.55,
        },
        0.3
      )

      /* 2.5 – 5.0: Grid scales down → masonry reveals */
      tl.to(
        gridRef.current,
        {
          scale: 1,
          ease: 'power2.inOut',
          duration: 2.5,
        },
        2.5
      )

      /* 4.5 – 5.2: Title chars exit upward
         Grid is at ~scale 1.12 here; y: -40 → ~45px visual exit */
      tl.to(
        chars,
        {
          opacity: 0,
          y: -40,
          filter: 'blur(5px)',
          stagger: { each: 0.03, from: 'end' },
          ease: 'power2.in',
          duration: 0.7,
        },
        4.5
      )

      /* 5.3 – 6.0: Circular play button appears */
      tl.to(
        playBtnRef.current,
        {
          opacity: 1,
          scale: 1,
          ease: 'back.out(1.4)',
          duration: 0.7,
        },
        5.3
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  const closePlayer = () => {
    overlayVid.current?.pause()
    setPlayerOpen(false)
  }

  return (
    <>
      <div ref={wrapperRef} style={{ height: `${SCROLL_H}vh` }}>
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-black">
          {/* Section label */}
          <p className="font-body pointer-events-none absolute inset-x-0 top-9 z-30 text-center text-[9px] tracking-[0.32em] text-white/40 uppercase select-none">
            (Our Showreel)
          </p>

          {/* ══════════════════════════════════════════════════
              2-3-2 Video Grid
              height: 100vh (edge-to-edge, no top/bottom padding)
              gap: 0 (cells touch each other directly)
              cols: 1fr 1fr 1.8fr 1.8fr 1fr 1fr (wider center pair)
          ══════════════════════════════════════════════════ */}
          <div
            ref={gridRef}
            style={{
              width: '100%',
              height: '100vh',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1.8fr 1.8fr 1fr 1fr',
              gridTemplateRows: '1fr 1.3fr 1fr',
              gap: '10px',
              willChange: 'transform',
            }}
          >
            {CELLS.map((cell, i) => (
              <div
                key={i}
                style={{
                  gridColumn: cell.col,
                  gridRow: cell.row,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <video
                  src={cell.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* ── Title lives inside center cell ──
                    Scales with the grid so text + video move as one unit. */}
                {cell.isCenter && (
                  <>
                    {/* Gradient overlay for text legibility */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.18) 100%)',
                        zIndex: 1,
                      }}
                    />

                    {/* "Showreel 26©" — centered in cell, scales with grid */}
                    <div
                      className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
                      style={{ zIndex: 2 }}
                    >
                      <h2
                        className="font-body text-center leading-none font-black tracking-[-0.02em] whitespace-nowrap text-white"
                        style={{ fontSize: 'clamp(1.6rem, 4vw, 4.8rem)' }}
                      >
                        {TITLE.split('').map((ch, ci) => (
                          <span
                            key={ci}
                            ref={(el) => {
                              charRefs.current[ci] = el
                            }}
                            className="inline-block will-change-transform"
                            style={{ opacity: 0 }}
                          >
                            {ch === ' ' ? ' ' : ch}
                          </span>
                        ))}
                      </h2>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* ── Circular play button — viewport-absolute, appears after grid reveals ── */}
          <button
            ref={playBtnRef}
            onClick={() => setPlayerOpen(true)}
            className="absolute z-30 flex flex-col items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
            style={{
              width: 'clamp(100px, 11vw, 140px)',
              height: 'clamp(100px, 11vw, 140px)',
              opacity: 0,
            }}
            aria-label="Play showreel"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white"
              style={{ width: '30%', marginLeft: '8%' }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="font-body mt-[6px] text-[9px] tracking-[0.2em] text-white uppercase">
              Play
            </span>
          </button>

          {/* Scroll hint */}
          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-[7px] select-none">
            <p className="font-body text-[9px] tracking-[0.28em] text-white/35 uppercase">
              Scroll More
            </p>
            <div className="h-5 w-px bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* ── Fullscreen overlay player ── */}
      {playerOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
          onClick={closePlayer}
        >
          <video
            ref={overlayVid}
            src={SRC.center}
            autoPlay
            controls
            className="h-full w-full"
            style={{ objectFit: 'contain' }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={closePlayer}
            className="font-body absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
            aria-label="Close player"
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}
