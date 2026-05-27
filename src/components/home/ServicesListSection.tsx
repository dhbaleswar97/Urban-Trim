'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'

/*
 * Sticky services list — mirrors Monof "Services" section.
 *
 * Layout:
 *   Left  57% — stacked service names, all visible, inactive = #ddd, active = #111
 *   Right 43% — absolutely-stacked image cards, crossfade on service change
 *
 * Scroll budget: (N + 1) × 100vh wrapper → N × 100vh of pinned scroll.
 * One ScrollTrigger per service fires at i × vh scroll offset.
 */

const SERVICES = [
  {
    number: '001',
    name: 'Signature Haircut',
    description:
      'Architecture for the modern gentleman — a precise execution from root to fade, crafted for lasting impact.',
    image: '/assets/images/web-img%20(1).jpg',
  },
  {
    number: '002',
    name: 'Beard Sculpting',
    description:
      'Define your edge with surgical precision. Shape, trim and groom for maximum, enduring effect.',
    image: '/assets/images/web-img%20(2).jpg',
  },
  {
    number: '003',
    name: 'Colour & Highlights',
    description:
      'Dimensional colour curated exclusively for you — tones that feel natural, striking, and alive.',
    image: '/assets/images/web-img%20(3).jpg',
  },
  {
    number: '004',
    name: 'Scalp Treatment',
    description:
      'Restore, nourish, revitalise. A clinical approach to scalp health with premium formulations.',
    image: '/assets/images/web-img%20(4).jpg',
  },
  {
    number: '005',
    name: 'Royal Shave',
    description:
      'A ritual passed through generations. Hot towel, straight razor — the art of a flawless finish.',
    image: '/assets/images/web-img%20(5).jpg',
  },
]

const N = SERVICES.length

function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
      {/* Main column divider */}
      <div className="absolute inset-y-0 w-px bg-black/[0.07]" style={{ left: '57%' }} />
      {/* Secondary left line */}
      <div className="absolute inset-y-0 w-px bg-black/[0.05]" style={{ left: '27%' }} />
      {/* Horizontal lines */}
      <div className="absolute inset-x-0 h-px bg-black/[0.05]" style={{ top: '11%' }} />
      <div className="absolute inset-x-0 h-px bg-black/[0.05]" style={{ top: '89%' }} />
    </div>
  )
}

export function ServicesListSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const nameRefs = useRef<(HTMLSpanElement | null)[]>([])
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const vh = window.innerHeight

      /* ── Initial states (service 0 active) ── */
      nameRefs.current.forEach(
        (el, i) => el && gsap.set(el, { color: i === 0 ? '#111111' : 'rgba(0,0,0,0.1)' })
      )
      numRefs.current.forEach((el, i) => el && gsap.set(el, { opacity: i === 0 ? 0.6 : 0.18 }))
      cardRefs.current.forEach(
        (el, i) => el && gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 12 })
      )

      /* ── Activate a service (left highlight + right crossfade) ── */
      const activate = (index: number) => {
        nameRefs.current.forEach(
          (el, i) =>
            el &&
            gsap.to(el, {
              color: i === index ? '#111111' : 'rgba(0,0,0,0.1)',
              duration: 0.45,
              ease: 'power2.out',
            })
        )
        numRefs.current.forEach(
          (el, i) =>
            el &&
            gsap.to(el, { opacity: i === index ? 0.6 : 0.18, duration: 0.4, ease: 'power2.out' })
        )
        cardRefs.current.forEach(
          (el, i) =>
            el &&
            gsap.to(el, {
              opacity: i === index ? 1 : 0,
              y: i === index ? 0 : 12,
              duration: 0.55,
              ease: 'power2.out',
            })
        )
      }

      /* ── One ScrollTrigger per service ── */
      for (let i = 0; i < N; i++) {
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: () => `top+=${i * vh}px top`,
          end: () => `top+=${(i + 1) * vh}px top`,
          onEnter: () => activate(i),
          onEnterBack: () => activate(i),
          invalidateOnRefresh: true,
        })
      }
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ height: `${(N + 1) * 100}vh`, marginTop: '16vh' }}>
      <div ref={sectionRef} className="sticky top-0 h-screen overflow-hidden bg-white">
        <GridLines />

        {/* ── Top bar ── */}
        <div
          className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between"
          style={{ padding: 'clamp(1.8rem,3.2vh,2.8rem) clamp(2rem,5vw,5rem)' }}
        >
          <span className="font-body text-[10px] tracking-[0.32em] text-black uppercase select-none">
            (Services)
          </span>

          {/* Two decorative dots — sit on the top horizontal grid line */}
          <div className="hidden items-center gap-[220px] md:flex">
            <div className="h-[7px] w-[7px] rounded-full bg-black/22" />
            <div className="h-[7px] w-[7px] rounded-full bg-black/22" />
          </div>

          <Link
            href="/booking"
            className="font-body inline-flex items-center gap-[6px] rounded-full bg-black text-[11px] tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#B6F500] hover:text-black"
            style={{ padding: '10px 24px' }}
            data-cursor="hover"
          >
            Reserve now <ArrowUpRight size={10} />
          </Link>
        </div>

        {/* ── Main two-column layout ── */}
        <div className="absolute inset-0 flex" style={{ paddingTop: 'clamp(5rem,9vh,8rem)' }}>
          {/* ── LEFT: service name list ── */}
          <div
            className="flex shrink-0 flex-col justify-center"
            style={{
              width: '57%',
              paddingLeft: 'clamp(2rem,5vw,5.5rem)',
              paddingRight: '2rem',
              gap: 'clamp(0.5rem,1.6vh,1.8rem)',
            }}
          >
            {SERVICES.map((s, i) => (
              <div
                key={s.number}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
              >
                <span
                  ref={(el) => {
                    nameRefs.current[i] = el
                  }}
                  className="font-body block leading-[0.9] font-normal tracking-[-0.025em] will-change-transform"
                  style={{ fontSize: 'clamp(2.6rem,5vw,6.5rem)', color: 'rgba(0,0,0,0.1)' }}
                >
                  <span
                    ref={(el) => {
                      numRefs.current[i] = el
                    }}
                    className="font-body text-[10px] tracking-[0.22em] uppercase"
                    style={{ verticalAlign: 'super', marginRight: '5px', color: 'rgba(0,0,0,0.8)' }}
                  >
                    ({s.number})
                  </span>
                  {s.name}
                </span>
              </div>
            ))}
          </div>

          {/* ── RIGHT: crossfading image card ── */}
          <div className="relative flex flex-1 items-center">
            {SERVICES.map((s, i) => (
              <div
                key={s.number}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="absolute inset-0 flex flex-col items-end justify-start will-change-transform"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  paddingTop: 'clamp(7rem, 14vh, 11rem)',
                  paddingRight: 'clamp(2rem,5vw,5.5rem)',
                }}
              >
                {/* Image */}
                <div
                  className="relative mb-5 overflow-hidden rounded-2xl shadow-sm"
                  style={{
                    width: 'clamp(240px,26vw,400px)',
                    aspectRatio: '16 / 10',
                  }}
                >
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 400px"
                    priority={i === 0}
                  />
                </div>

                {/* Description */}
                <p
                  className="font-body text-[13px] leading-relaxed text-black/45"
                  style={{ maxWidth: 'clamp(240px,26vw,400px)' }}
                >
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
