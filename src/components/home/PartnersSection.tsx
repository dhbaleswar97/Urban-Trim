'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── SVG partner marks (use currentColor so parent text-black drives fill) ── */

function ScissorsMark() {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
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

/* Pre-computed at module load with fixed precision — prevents SSR/client
   floating-point mismatch (Math.cos/sin differ between Node.js and browser). */
const STARBURST_SPOKES = Array.from({ length: 22 }, (_, i) => {
  const a = (i * (360 / 22) - 90) * (Math.PI / 180)
  return {
    x: +(32 + 26 * Math.cos(a)).toFixed(3),
    y: +(32 + 26 * Math.sin(a)).toFixed(3),
  }
})

function StarburstMark() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
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
    <svg width="96" height="38" viewBox="0 0 96 38" fill="none" aria-hidden="true">
      <circle cx="19" cy="19" r="17" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="48" cy="19" r="17" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="77" cy="19" r="17" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  )
}

function BarberPoleMark() {
  return (
    <svg width="38" height="54" viewBox="0 0 38 54" fill="none" aria-hidden="true">
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
    <svg width="80" height="34" viewBox="0 0 80 34" fill="none" aria-hidden="true">
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

/* ── Partner data ─────────────────────────────────────── */

type Partner = { id: string; logo: ReactNode }

const PARTNERS: Partner[] = [
  {
    id: 'andis',
    logo: <ScissorsMark />,
  },
  {
    id: 'wahl',
    logo: (
      <span
        className="font-body leading-none font-black text-black"
        style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', letterSpacing: '-0.05em' }}
      >
        WAHL
      </span>
    ),
  },
  {
    id: 'kerastase',
    logo: <StarburstMark />,
  },
  {
    id: 'reuzel',
    logo: (
      <span
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
          fontStyle: 'italic',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        Reuzel
      </span>
    ),
  },
  {
    id: 'american-crew',
    logo: <OverlapCirclesMark />,
  },
  {
    id: 'uppercut',
    logo: (
      <span
        className="font-body leading-none font-black text-black uppercase"
        style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', letterSpacing: '0.06em' }}
      >
        UPPERCUT™
      </span>
    ),
  },
  {
    id: 'baxter',
    logo: <BarberPoleMark />,
  },
  {
    id: 'osmo',
    logo: <DoubleArrowMark />,
  },
]

/* ── Component ────────────────────────────────────────── */

export function PartnersSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-[#EDEDE9] px-6 pt-16 pb-24 md:px-10 lg:px-14">
      {/* Header row — matches reference layout */}
      <div className="mx-auto mb-4 flex max-w-[1400px] items-center justify-between">
        <span className="font-body text-[12px] tracking-[0.28em] text-black uppercase">
          (Partners)
        </span>
        <span className="hidden h-[6px] w-[6px] rounded-full bg-black/50 md:block" />
        <span className="font-body text-[12px] tracking-[0.08em] text-black/60">2024–26©</span>
        <span className="hidden h-[6px] w-[6px] rounded-full bg-black/50 md:block" />
        <span className="font-body hidden text-[11px] tracking-[0.22em] text-black/60 uppercase md:block">
          Urban Trim Studio
        </span>
      </div>

      {/* Description */}
      <div className="mx-auto mb-10 max-w-[1400px]">
        <p className="font-body max-w-sm text-[13px] leading-relaxed font-normal text-black/40">
          We work exclusively with the world&apos;s leading grooming brands — because the tools
          matter as much as the talent.
        </p>
      </div>

      {/* 4 × 2 logo grid */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-3 md:grid-cols-4">
        {PARTNERS.map((p, i) => (
          <motion.div
            key={p.id}
            className="flex items-center justify-center rounded-2xl bg-white text-black"
            style={{ aspectRatio: '2.2 / 1' }}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {p.logo}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
