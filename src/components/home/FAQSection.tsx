'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { gsap } from '@/animations/gsap.config'
import { team } from '@/data/team'

/*
 * FAQ section — Monof template parity.
 *
 * Layout:
 *   ┌─ (FAQ) ────●────────────●────────────●──┐
 *   │  2 × 2 accordion grid                    │
 *   │  Avatar stack + CTA                      │
 *   └──────────────────────────────────────────┘
 *
 * Accordion: GSAP height 0 ↔ scrollHeight, opacity 0 ↔ 1.
 * Guard (isAnimating ref) prevents rapid-click artifacts.
 */

const FAQS = [
  {
    id: '01',
    question: 'What services do you offer?',
    answer:
      'We offer precision haircuts, beard sculpting, straight-razor Royal Shaves, colour treatments, deep scalp therapy, and professional style & finish sessions — all delivered by master stylists in our studio.',
  },
  {
    id: '02',
    question: 'Do I need to book an appointment?',
    answer:
      'Yes — we are appointment-only to ensure each client receives our full attention and artisan-level service. Walk-ins are welcome subject to availability. We recommend booking at least 24 hours in advance.',
  },
  {
    id: '03',
    question: 'How long does a typical session take?',
    answer:
      'Sessions range from 45 minutes for a beard sculpt to 90 minutes for a full grooming experience. The Royal Shave ritual runs approximately 50 minutes. We never rush — every detail receives the attention it deserves.',
  },
  {
    id: '04',
    question: 'What products do you use?',
    answer:
      'We exclusively use professional-grade products from carefully selected artisan brands, chosen for performance, scent, and skin compatibility. Your stylist will recommend personalised take-home options during your session.',
  },
]

/* ─────────────────────────────────────────────────── */

function ElasticUnderlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    const svg = svgRef.current
    if (!wrap || !path || !svg) return

    const Y0 = 2 // baseline y within SVG (px from top)
    const MAX_DY = 18 // max vertical deflection in px

    let width = wrap.offsetWidth
    let lineY = 0 // absolute Y of the line within the wrapper (updated by positionSvg)
    const spring = { cx: width / 2, cy: 0 }

    const drawPath = () => {
      if (!width) return
      path.setAttribute(
        'd',
        `M 0,${Y0} Q ${spring.cx.toFixed(2)},${(Y0 + spring.cy).toFixed(2)} ${width},${Y0}`
      )
    }

    gsap.ticker.add(drawPath)
    drawPath()

    const anchor = wrap.querySelector('a') as HTMLAnchorElement | null

    // Pin the SVG so its Y0 baseline sits exactly 1.5px below the text bottom edge
    const positionSvg = () => {
      if (!anchor) return
      const anchorH = anchor.offsetHeight
      svg.style.top = `${anchorH + 1.5}px`
      lineY = anchorH + 1.5 + Y0
    }
    positionSvg()

    const onMouseEnter = () => {
      path.style.stroke = '#B6F500'
      if (anchor) anchor.style.color = '#888888'
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      const newCx = Math.max(0, Math.min(width, e.clientX - rect.left))
      // Measure cursor Y relative to the actual line position (rect.top + lineY)
      const newCy = Math.max(-MAX_DY, Math.min(MAX_DY, (e.clientY - (rect.top + lineY)) * 0.9))
      gsap.to(spring, {
        cx: newCx,
        cy: newCy,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const onMouseLeave = () => {
      gsap.to(spring, {
        cx: width / 2,
        cy: 0,
        duration: 1.4,
        ease: 'elastic.out(1, 0.28)',
        overwrite: 'auto',
      })
      path.style.stroke = '#111111'
      if (anchor) anchor.style.color = '#111111'
    }

    const ro = new ResizeObserver(() => {
      width = wrap.offsetWidth
      positionSvg()
    })
    ro.observe(wrap)

    wrap.addEventListener('mouseenter', onMouseEnter)
    wrap.addEventListener('mousemove', onMouseMove)
    wrap.addEventListener('mouseleave', onMouseLeave)

    return () => {
      gsap.ticker.remove(drawPath)
      wrap.removeEventListener('mouseenter', onMouseEnter)
      wrap.removeEventListener('mousemove', onMouseMove)
      wrap.removeEventListener('mouseleave', onMouseLeave)
      ro.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative inline-block select-none" style={{ paddingBottom: 22 }}>
      <Link
        href={href}
        className="font-body text-[13px] tracking-[0.04em]"
        style={{ color: '#111111', transition: 'color 0.35s' }}
        data-cursor="hover"
      >
        {children}
      </Link>
      <svg
        ref={svgRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0, // overridden in useEffect to anchor.offsetHeight + 1.5px
          width: '100%',
          height: 8, // small bbox; overflow:visible handles deformation range
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="#111111"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ transition: 'stroke 0.35s' }}
        />
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────── */

function FaqItem({ item, delay }: { item: (typeof FAQS)[number]; delay: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const [isOpen, setIsOpen] = useState(false)
  const isInView = useInView(wrapperRef as React.RefObject<Element>, {
    once: true,
    margin: '-40px',
  })

  const toggle = () => {
    const el = contentRef.current
    if (!el || isAnimating.current) return
    isAnimating.current = true

    if (isOpen) {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.32,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsOpen(false)
          isAnimating.current = false
        },
      })
    } else {
      const naturalH = el.scrollHeight
      gsap.to(el, {
        height: naturalH,
        opacity: 1,
        duration: 0.38,
        ease: 'power2.out',
        onComplete: () => {
          setIsOpen(true)
          isAnimating.current = false
        },
      })
    }
  }

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header row */}
      <button
        onClick={toggle}
        className="group flex w-full items-center gap-5 rounded-2xl bg-[#f2f2f2] px-6 py-[18px] text-left transition-colors duration-250 hover:bg-[#ebebeb]"
        aria-expanded={isOpen}
      >
        <span className="font-body flex-shrink-0 text-[11px] tracking-[0.16em] text-[#bbb] select-none">
          {item.id}
        </span>
        <span className="font-body flex-1 text-[14px] leading-snug font-medium text-black">
          {item.question}
        </span>
        {/* + icon — rotates 45° to × when open */}
        <span
          className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path
              d="M6.5 1v11M1 6.5h11"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {/* Expandable content */}
      <div ref={contentRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div className="px-6 pt-4 pb-5">
          <p className="font-body text-[13px] leading-[1.85] text-[#666]">{item.answer}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────── */

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  })

  return (
    <section ref={sectionRef} className="section-pad bg-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        {/* ── Top bar: (FAQ) label + decorative dot-line ── */}
        <motion.div
          className="mb-14 flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="font-body text-[10px] tracking-[0.32em] whitespace-nowrap text-[#a0a0a0] uppercase">
            (FAQ)
          </span>
          {/* Horizontal rule with 3 evenly-spaced dots */}
          <div className="relative h-px flex-1 bg-[#e8e8e8]">
            {[25, 50, 75].map((pct, i) => (
              <span
                key={i}
                className="absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                style={{ left: `${pct}%` }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── 2 × 2 FAQ grid ── */}
        <div className="mb-20 grid grid-cols-1 gap-3 md:grid-cols-2">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.id} item={faq} delay={i * 0.07} />
          ))}
        </div>

        {/* ── Bottom CTA: avatar stack + heading + link ── */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Overlapping avatar circles */}
          <div className="mb-5 flex -space-x-3">
            {team.map((member) => (
              <div
                key={member.slug}
                className="h-11 w-11 overflow-hidden rounded-full border-[2.5px] border-white ring-1 ring-black/10"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <p className="font-body mb-3 text-[10px] tracking-[0.24em] text-[#aaa] uppercase">
            (Looking for more?)
          </p>

          <p className="font-body mb-6 max-w-[380px] text-[1.1rem] leading-[1.45] font-semibold">
            Explore the full range of Urban Trim services and grooming experiences.
          </p>

          <ElasticUnderlineLink href="/services">View All Services</ElasticUnderlineLink>
        </motion.div>
      </div>
    </section>
  )
}
