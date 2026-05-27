'use client'

import { useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { gsap } from '@/animations/gsap.config'

/*
 * Pricing section — Monof template parity.
 *
 * Headline rotates through 3 texts via GSAP split-char stagger:
 *   → chars exit upward (from:'end' stagger)
 *   → chars enter from below (from:'start' stagger)
 * Cycling starts only after the initial entry animation completes.
 */

const HEADLINES = ['Look Sharp.', 'Pay Smart.', 'Own It.']

const PLANS = [
  {
    name: 'Starter',
    description:
      'Perfect for those ready to elevate their everyday grooming with expert precision.',
    price: '$65',
    unit: 'per session',
    features: [
      'Signature Haircut & expert styling',
      'Warm towel & scalp massage prep',
      'Professional blow-dry finish',
      'Tailored product consultation',
      'First-time client guarantee',
    ],
    timeline: '60 min',
  },
  {
    name: 'Growth',
    description:
      'The complete Urban Trim experience — for those who demand nothing less than the best.',
    price: '$145',
    unit: 'per session',
    features: [
      'Haircut + Beard Sculpting combo',
      'Royal Shave straight-razor ritual',
      'Deep scalp treatment session',
      'Luxury grooming product samples',
      'Priority VIP booking access',
    ],
    timeline: '90 min',
  },
] as const

/* ─────────────────────────────────────────────────── */

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  })
  const activeIdxRef = useRef(0)
  const isAnimating = useRef(false)
  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  /* Stable transition fn — refs only, no stale closures */
  const animateToNext = useCallback(() => {
    if (!headlineRef.current || isAnimating.current) return
    const from = activeIdxRef.current
    const to = (from + 1) % HEADLINES.length
    const outChars = Array.from(
      headlineRef.current.querySelectorAll<HTMLElement>(`[data-hi="${from}"]`)
    )
    const inChars = Array.from(
      headlineRef.current.querySelectorAll<HTMLElement>(`[data-hi="${to}"]`)
    )
    isAnimating.current = true

    gsap.to(outChars, {
      y: -26,
      opacity: 0,
      stagger: { each: 0.016, from: 'end' },
      ease: 'power2.in',
      duration: 0.3,
      onComplete: () => {
        gsap.set(outChars, { y: 30, opacity: 0 })
        gsap.to(inChars, {
          y: 0,
          opacity: 1,
          stagger: 0.026,
          ease: 'power3.out',
          duration: 0.46,
          onComplete: () => {
            activeIdxRef.current = to
            isAnimating.current = false
          },
        })
      },
    })
  }, [])

  /* Entry + start cycling */
  useEffect(() => {
    if (!isInView || !headlineRef.current) return

    /* Hide all headlines up-front */
    for (let i = 0; i < HEADLINES.length; i++) {
      const chars = Array.from(
        headlineRef.current.querySelectorAll<HTMLElement>(`[data-hi="${i}"]`)
      )
      gsap.set(chars, { y: 30, opacity: 0 })
    }

    /* Stagger in headline 0, then kick off cycle */
    const firstChars = Array.from(
      headlineRef.current.querySelectorAll<HTMLElement>('[data-hi="0"]')
    )
    gsap.to(firstChars, {
      y: 0,
      opacity: 1,
      stagger: 0.038,
      ease: 'power3.out',
      duration: 0.65,
      delay: 0.15,
      onComplete: () => {
        cycleTimerRef.current = setInterval(animateToNext, 3200)
      },
    })

    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current)
    }
  }, [isInView, animateToNext])

  return (
    <section ref={sectionRef} className="section-pad bg-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        {/* ── Label ── */}
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="font-body text-[10px] tracking-[0.32em] text-[#a0a0a0] uppercase">
            (Pricing)
          </span>
        </motion.div>

        {/* ── Cycling headline ── */}
        <div
          ref={headlineRef}
          className="relative flex justify-center"
          style={{ height: 'clamp(52px, 10.5vw, 175px)', marginBottom: 'clamp(14px, 2vw, 28px)' }}
        >
          {HEADLINES.map((headline, hi) => (
            <div
              key={hi}
              className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
            >
              <h2
                className="font-body leading-none font-normal tracking-[-0.025em] text-black"
                style={{ fontSize: 'clamp(3rem, 9.5vw, 12rem)' }}
              >
                {headline.split('').map((ch, ci) => (
                  <span
                    key={ci}
                    data-hi={hi}
                    className="inline-block will-change-transform"
                    style={{ opacity: 0 }}
                  >
                    {ch === ' ' ? ' ' : ch}
                  </span>
                ))}
              </h2>
            </div>
          ))}
        </div>

        {/* ── Subtitle ── */}
        <motion.p
          className="font-display mb-16 text-center text-[14px] text-[#888] italic md:text-[15px]"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Choose the plan that fits you best.
        </motion.p>

        {/* ── Cards ── */}
        <motion.div
          className="grid grid-cols-1 gap-3 overflow-hidden rounded-[20px] bg-[#eaeaea] p-3 md:grid-cols-2"
          initial={{ opacity: 0, y: 44 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <PricingCard plan={PLANS[0]} variant="starter" />
          <PricingCard plan={PLANS[1]} variant="growth" />
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────── */

function PricingCard({
  plan,
  variant,
}: {
  plan: (typeof PLANS)[number]
  variant: 'starter' | 'growth'
}) {
  const isGrowth = variant === 'growth'

  return (
    <div
      className={`relative flex flex-col rounded-[16px] p-8 transition-shadow duration-500 lg:p-10 ${
        isGrowth
          ? 'bg-white hover:shadow-[0_12px_48px_rgba(0,0,0,0.07)]'
          : 'bg-[#e0e0e0] hover:shadow-[0_12px_48px_rgba(0,0,0,0.05)]'
      }`}
    >
      {/* Orb icon — top-right */}
      <div
        className="absolute top-8 right-8 h-[46px] w-[46px] flex-shrink-0 rounded-full"
        style={{
          background: isGrowth
            ? 'radial-gradient(circle at 28% 28%, #ff9ff3, #f368e0 30%, #6c5ce7 58%, #0984e3 80%)'
            : 'radial-gradient(circle at 28% 28%, #e8e8e8, #b8b8b8 30%, #888 60%, #505050 100%)',
          boxShadow: isGrowth ? '0 6px 22px rgba(108,92,231,0.35)' : '0 4px 14px rgba(0,0,0,0.14)',
        }}
      />

      {/* Plan name */}
      <h3 className="font-body mb-[10px] pr-16 text-[1.05rem] font-semibold">{plan.name}</h3>

      {/* Description */}
      <p className="font-body mb-8 max-w-[260px] text-[13px] leading-[1.75] text-[#888]">
        {plan.description}
      </p>

      {/* Price */}
      <div className="mb-8 flex items-baseline gap-[10px]">
        <span className="font-body text-[3.4rem] leading-none font-black tracking-tight">
          {plan.price}
        </span>
        <span className="font-body text-[13px] text-[#bbb]">({plan.unit})</span>
      </div>

      {/* Divider */}
      <div className={`mb-7 h-px ${isGrowth ? 'bg-[#ebebeb]' : 'bg-[#c8c8c8]'}`} />

      {/* Feature list */}
      <p className="font-body mb-5 text-[10px] tracking-[0.22em] text-[#bbb] uppercase">
        What&apos;s included:
      </p>
      <ul className="flex-1 space-y-[13px]">
        {plan.features.map((f, i) => (
          <li key={i} className="font-body flex items-center gap-[13px] text-[13px] text-[#555]">
            <span
              className="h-[7px] w-[7px] flex-shrink-0 rounded-full"
              style={{ background: isGrowth ? '#111' : '#777' }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* Footer: duration + CTA */}
      <div
        className={`mt-10 flex items-center justify-between border-t border-dashed pt-7 ${isGrowth ? 'border-[#e8e8e8]' : 'border-[#c4c4c4]'}`}
      >
        <div>
          <p className="font-body mb-[3px] text-[10px] tracking-[0.18em] text-[#bbb] uppercase">
            Duration:
          </p>
          <p className="font-body text-[14px] font-semibold">{plan.timeline}</p>
        </div>
        <Link
          href="/booking"
          className="font-body inline-flex items-center rounded-full bg-black px-7 py-[11px] text-[12px] tracking-[0.06em] text-white shadow-[0_8px_28px_rgba(0,0,0,0.22)] transition-all duration-300 hover:bg-[#B6F500] hover:text-black hover:shadow-[0_8px_28px_rgba(182,245,0,0.28)]"
          data-cursor="hover"
        >
          Book a call
        </Link>
      </div>
    </div>
  )
}
