'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { IMG_CDN, VID_CDN } from '@/lib/cdn'

/*
 * Layout: section = 120vh (fixed)
 *
 *   ┌─ header (shrink-0) ────────────────────────────┐
 *   │  (Who we are)  ·  heading  ·  3 dots           │
 *   └────────────────────────────────────────────────┘
 *   ┌─ card grid (flex-1, fills remaining) ──────────┐
 *   │  ┌────────────────┐  ┌──────────────────────┐  │
 *   │  │  Dark card     │  │                      │  │
 *   │  │  flex-1 (50%)  │  │  Right card          │  │
 *   │  └────────────────┘  │  h-full (100%)       │  │
 *   │  ┌────────────────┐  │  video + glassmorphic │  │
 *   │  │  Light card    │  │  chat UI             │  │
 *   │  │  flex-1 (50%)  │  │                      │  │
 *   │  └────────────────┘  └──────────────────────┘  │
 *   └────────────────────────────────────────────────┘
 */

const T = `${IMG_CDN}/assets/images/Teams`
const TEAM_IMGS = [
  `${T}/Stefan%20Stefancik.jpg`,
  `${T}/Isaiah%20Beltran.jpg`,
  `${T}/Lucian%20Huerta.jpg`,
  `${T}/Daisy%20Hawkins.jpg`,
]

function DotGrid() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full select-none"
      style={{ opacity: 0.1 }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="ut-dot" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ut-dot)" />
    </svg>
  )
}

/* Individual chat bubble */
function Bubble({
  text,
  align,
  variant = 'light',
}: {
  text: string
  align: 'left' | 'right'
  variant?: 'light' | 'dark'
}) {
  return (
    <div className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
      <span
        className={`font-body px-[14px] py-[9px] text-[12px] leading-snug ${
          variant === 'dark'
            ? 'rounded-[18px] rounded-br-[4px] bg-white text-[#111]'
            : 'rounded-[18px] border border-white/20 bg-white/20 text-white'
        }`}
        style={{ maxWidth: '78%', display: 'inline-block' }}
      >
        {text}
      </span>
    </div>
  )
}

export function EditorialAboutSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-40px' })

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-white px-6 md:h-[120vh] md:px-10 lg:px-14"
      style={{ marginTop: '16vh' }}
    >
      <div
        className="mx-auto flex h-full max-w-[1400px] flex-col"
        style={{
          paddingTop: 'clamp(2.5rem, 3.5vh, 4rem)',
          paddingBottom: 'clamp(1.5rem, 2.5vh, 2.5rem)',
        }}
      >
        {/* ── HEADER ─────────────────────────────────────── */}
        <div className="mb-7 shrink-0 md:mb-8">
          <span className="font-body mb-6 block text-[10px] tracking-[0.32em] text-black uppercase">
            (Who we are)
          </span>

          <div className="flex items-start justify-between gap-10">
            <motion.h2
              className="font-body mb-4 leading-[0.9] font-normal tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 6rem)' }}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              We craft looks with
              <br />
              precision, artistry,
              <br />
              and care.
            </motion.h2>

            <motion.p
              className="font-body hidden max-w-[230px] shrink-0 pt-2 text-[13px] leading-relaxed text-black/45 md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              A collective of master barbers and stylists dedicated to the art of personal grooming
              — where every visit is a considered, intentional experience.
            </motion.p>
          </div>

          {/* Three decorative dots */}
          <div className="mt-6 flex items-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="flex flex-1 justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.22 + i * 0.09, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="h-[5px] w-[5px] rounded-full bg-black/25" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CARD GRID ──────────────────────────────────── */}
        <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-[1fr_1.12fr]">
          {/* Left column — two equal 50/50 cards */}
          <div className="flex h-full flex-col gap-3">
            {/* ── Dark stat card (flex-1 = 50%) ── */}
            <motion.div
              className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-[#0d0d0d]"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <DotGrid />

              <div
                className="relative z-10 flex h-full flex-col justify-between"
                style={{ padding: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}
              >
                {/* Top — big stat + avatar stack */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className="font-body leading-none font-normal tracking-[-0.05em] text-white"
                      style={{ fontSize: 'clamp(4.5rem, 8.5vw, 9rem)' }}
                    >
                      +14
                    </p>
                    <p className="font-body mt-2 text-[12px] leading-snug text-white/40">
                      years of
                      <br />
                      precision craft
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-body mb-3 text-[9px] tracking-[0.28em] text-white/25 uppercase">
                      (Our Artisans)
                    </p>
                    <div className="flex items-center justify-end">
                      {TEAM_IMGS.map((src, i) => (
                        <div
                          key={src}
                          className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#0d0d0d]"
                          style={{ marginLeft: i === 0 ? 0 : '-10px', zIndex: i + 1 }}
                        >
                          <Image
                            src={src}
                            alt="artisan"
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                      <div
                        className="font-body relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0d0d0d] bg-[#B6F500] text-[10px] font-semibold text-black"
                        style={{ marginLeft: '-10px', zIndex: TEAM_IMGS.length + 1 }}
                      >
                        +3
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <p className="font-body text-[9px] tracking-[0.26em] text-white/15 uppercase">
                  Founded 2018 · New York City
                </p>
              </div>
            </motion.div>

            {/* ── Light booking card (flex-1 = 50%) ── */}
            <motion.div
              className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-[#EDEDE9]"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="flex h-full flex-col justify-between"
                style={{ padding: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-[10px]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black">
                      <span className="font-body text-[8px] font-bold text-white">UT</span>
                    </div>
                    <span className="font-body text-[13px] font-medium tracking-[-0.01em]">
                      Urban Trim™
                    </span>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-body block text-[9px] tracking-[0.26em] text-black/35 uppercase">
                      (5★ Reviews)
                    </span>
                    <p className="font-body mt-[3px] text-[11px] text-black/40">
                      Rated by 8,000+ clients
                    </p>
                  </div>
                </div>

                {/* Heading */}
                <h3
                  className="font-body leading-[1.05] font-normal tracking-[-0.025em]"
                  style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)' }}
                >
                  Book your session,
                  <br />
                  simply.
                </h3>

                {/* CTA */}
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href="/booking"
                    className="font-body inline-flex items-center gap-[6px] rounded-full bg-black text-[12px] tracking-[0.02em] text-white transition-all duration-300 hover:bg-[#B6F500] hover:text-black"
                    style={{ padding: '11px 22px' }}
                    data-cursor="hover"
                  >
                    Reserve now <ArrowUpRight size={11} />
                  </Link>
                  <p className="font-body text-[11px] text-black/40">From $45 · 45 min</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right card — video bg + glassmorphic chat ── */}
          <motion.div
            className="relative h-full min-h-[480px] overflow-hidden rounded-2xl md:min-h-0"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Looping gradient video background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
            >
              <source src={`${VID_CDN}/assets/videos/Gradient-BG.mp4`} type="video/mp4" />
            </video>

            {/* Blue/black gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(45deg, #000000, #0B2273)',
                mixBlendMode: 'overlay',
                opacity: 0.88,
              }}
            />

            {/* Top label */}
            <p className="font-body absolute inset-x-0 top-6 z-10 text-center text-[9px] tracking-[0.3em] text-white/55 uppercase">
              (Client Experience)
            </p>

            {/* ── Glassmorphic chat card ── */}
            <div
              className="absolute z-10"
              style={{
                left: '8%',
                right: '8%',
                top: '14%',
                bottom: '8%',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '20px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)',
                overflow: 'hidden',
              }}
            >
              <div className="flex h-full flex-col overflow-hidden">
                {/* Timestamp 1 */}
                <p
                  className="font-body pt-5 pb-3 text-center text-[10px] tracking-wide"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  Today 14:32
                </p>

                <div className="flex flex-col gap-[8px] px-4">
                  {/* Client — left with avatar */}
                  <div className="flex items-end gap-[8px]">
                    <div className="h-[28px] w-[28px] shrink-0 overflow-hidden rounded-full border border-black/10">
                      <Image
                        src={`${IMG_CDN}/assets/images/Testimonial/Hassan-khan.jpg`}
                        alt="client"
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    </div>
                    <Bubble text="Hey, any slots this Saturday?" align="left" />
                  </div>

                  {/* Studio replies */}
                  <Bubble text="Of course — 2pm is open ✦" align="right" />
                  <Bubble text="Shall I confirm it for you?" align="right" />
                </div>

                {/* Timestamp 2 */}
                <p
                  className="font-body mt-4 mb-3 text-center text-[10px] tracking-wide"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  Today 14:33
                </p>

                <div className="flex flex-col gap-[8px] px-4 pb-5">
                  {/* Studio confirm — dark bubble + small gradient orb */}
                  <div className="flex items-center justify-end gap-[8px]">
                    <Bubble text="You're booked ✦" align="right" variant="dark" />
                    <div
                      className="h-[30px] w-[30px] shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md"
                      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
                    >
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full scale-110 object-cover"
                        aria-hidden="true"
                      >
                        <source src={`${VID_CDN}/assets/videos/Gradient-BG.mp4`} type="video/mp4" />
                      </video>
                    </div>
                  </div>

                  <Bubble text="We'll have everything ready." align="right" variant="dark" />

                  {/* Client reply */}
                  <div className="flex items-end gap-[8px]">
                    <div className="h-[28px] w-[28px] shrink-0 overflow-hidden rounded-full border border-black/10">
                      <Image
                        src={`${IMG_CDN}/assets/images/Testimonial/Hassan-khan.jpg`}
                        alt="client"
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    </div>
                    <Bubble text="Perfect! Thank you." align="left" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
