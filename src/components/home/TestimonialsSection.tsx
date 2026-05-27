'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'
import { IMAGES } from '@/config/images'

/*
 * Cinematic testimonials — Monof-style split-reveal + 3-D card flip.
 *
 * Animation physics:
 *   Each departing card rotates off using a CORNER as its pivot,
 *   producing a true "flip-away" rather than a diagonal slide.
 *
 *   Cards 1 & 3 exit toward top-right:
 *     transformOrigin = 'bottom left'
 *     rotateX: +62  (top edge tips away from viewer)
 *     rotateY: -58  (right side swings toward viewer)
 *     rotateZ: +16  (slight clockwise tilt)
 *     scale → 0.5, blur → 8px, opacity → 0
 *
 *   Card 2 exits toward bottom-left:
 *     transformOrigin = 'top right'
 *     rotateX: -62  (bottom tips away)
 *     rotateY: +58  (left swings toward viewer)
 *     rotateZ: -16
 *     scale → 0.5, blur → 8px, opacity → 0
 *
 *   Parent container has perspective: 780px so rotations project
 *   into true 3-D space.
 *
 * Scroll budget:
 *   end: '+=700%' → 7 extra viewports.
 *   Timeline total ≈ 10.6 units → 1 unit ≈ 66 vh of scroll.
 */

/* ─── Data ─────────────────────────────────────────────────────── */

interface Testimonial {
  quote: string
  name: string
  role: string
  image: string
  type: 'text' | 'image'
  bg?: string
}

const SPLIT_SRC = '/assets/images/Background-grid%20(12).jpg'

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Marcus understood exactly what I wanted before I even finished explaining. The precision of the fade is unmatched.',
    name: 'Noel Hodge',
    role: 'Creative Director',
    image: '/assets/images/Teams/Noel%20Hodge.jpg',
    type: 'text',
  },
  {
    quote:
      "Sofia's colour work is exceptional. She transformed my hair while making it look completely natural. I've never received so many compliments.",
    name: 'Priya Mehta',
    role: 'Fashion Editor',
    image: IMAGES.testimonials.two,
    type: 'image',
    bg: '/assets/images/Urban-trim-web-Gallery/Extra-converted/service-thumbnail-image%20(3).jpg',
  },
  {
    quote:
      "Best barber experience in NYC, period. The attention to detail and the atmosphere — there's nothing like it.",
    name: 'James Nakamura',
    role: 'Architect',
    image: IMAGES.testimonials.three,
    type: 'text',
  },
  {
    quote:
      'Worth every penny. Urban Trim has redefined what a grooming visit should feel like — I leave looking, and feeling, elevated.',
    name: 'Gabriel Santos',
    role: 'Product Designer',
    image: IMAGES.testimonials.four,
    type: 'text',
  },
]

const TOTAL = TESTIMONIALS.length

/*
 * Per-card exit config.
 * transformOrigin is applied via gsap.set BEFORE the timeline starts
 * so scrub interpolation never "jumps" the pivot mid-animation.
 */
const EXITS = [
  {
    origin: 'bottom left', // card 0 → top-right
    rotateX: 62,
    rotateY: -58,
    rotateZ: 16,
    scale: 0.48,
    opacity: 0,
    filter: 'blur(9px)',
    ease: 'power2.inOut',
    duration: 1.1,
  },
  {
    origin: 'top right', // card 1 → bottom-left
    rotateX: -62,
    rotateY: 58,
    rotateZ: -16,
    scale: 0.48,
    opacity: 0,
    filter: 'blur(9px)',
    ease: 'power2.inOut',
    duration: 1.1,
  },
  {
    origin: 'bottom left', // card 2 → top-right
    rotateX: 62,
    rotateY: -58,
    rotateZ: 16,
    scale: 0.48,
    opacity: 0,
    filter: 'blur(9px)',
    ease: 'power2.inOut',
    duration: 1.1,
  },
] as const

/* ─── Sub-components ─────────────────────────────────────────────── */

function Dots({ active, light }: { active: number; light?: boolean }) {
  return (
    <div className="flex items-center gap-[5px]">
      {TESTIMONIALS.map((_, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: i === active ? 8 : 6,
            height: i === active ? 8 : 6,
            borderRadius: '50%',
            flexShrink: 0,
            background: light
              ? i === active
                ? '#fff'
                : 'rgba(255,255,255,0.28)'
              : i === active
                ? '#111'
                : 'rgba(0,0,0,0.14)',
          }}
        />
      ))}
    </div>
  )
}

function TextCard({ t, idx }: { t: Testimonial; idx: number }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_28px_80px_rgba(0,0,0,0.10)]">
      <div className="flex items-start justify-between p-7 pb-0">
        <span className="text-[20px] leading-none text-black/10 select-none">✦</span>
        <Dots active={idx} />
      </div>

      {idx === 0 ? (
        <div
          className="relative mx-6 mt-5 flex-1 overflow-hidden rounded-xl"
          style={{ minHeight: 80 }}
        >
          <Image
            src="/assets/images/web-img%20(1).png"
            fill
            alt={t.name}
            className="object-cover"
            sizes="450px"
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div className="px-7 pt-5 pb-7">
        <p className="font-body mb-7 text-[14px] leading-[1.9] font-normal text-black">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
            <Image src={t.image} fill alt={t.name} className="object-cover" sizes="40px" />
          </div>
          <div>
            <p className="font-body text-[12px] font-semibold tracking-[0.02em] text-black">
              {t.name}
            </p>
            <p className="font-body text-[11px] text-[#999]">{t.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImageCard({ t, idx }: { t: Testimonial; idx: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.20)]">
      <Image src={t.bg!} fill alt="" className="object-cover" sizes="480px" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/25 to-black/10" />

      <div className="absolute inset-0 flex flex-col p-7">
        <div className="flex items-start justify-between">
          <span className="text-[20px] leading-none text-white/20 select-none">✦</span>
          <Dots active={idx} light />
        </div>

        <div className="flex-1" />

        <p className="font-body mb-7 text-[14px] leading-[1.9] text-white">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-white/25">
            <Image src={t.image} fill alt={t.name} className="object-cover" sizes="40px" />
          </div>
          <div>
            <p className="font-body text-[12px] font-semibold tracking-[0.02em] text-white">
              {t.name}
            </p>
            <p className="font-body text-[11px] text-white/55">{t.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main section ───────────────────────────────────────────────── */

export function TestimonialsSection() {
  const outerRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current as HTMLDivElement[]

      /*
       * Pre-set each exiting card's transform-origin BEFORE the timeline
       * begins — this prevents any "jump" when the tween starts inside scrub.
       * Also pre-set blur to '0px' so GSAP can interpolate toward 'blur(9px)'.
       */
      cards.forEach((c, i) => {
        gsap.set(c, {
          transformOrigin: i < EXITS.length ? EXITS[i].origin : '50% 50%',
          filter: 'blur(0px)',
          willChange: 'transform, opacity, filter',
        })
      })

      /*
       * Timeline positions (units):
       *   0   – 1.5  : split image opens
       *   1.5 – 3.2  : card 0 readable
       *   3.2 – 4.3  : card 0 FLIPS away → card 1 revealed
       *   4.3 – 5.8  : card 1 readable
       *   5.8 – 6.9  : card 1 FLIPS away → card 2 revealed
       *   6.9 – 8.4  : card 2 readable
       *   8.4 – 9.5  : card 2 FLIPS away → card 3 revealed
       *   9.5 – 10.6 : card 3 readable
       *
       * Timeline total ≈ 10.6 units (scrub maps 700vh of scroll to this).
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: '+=700%',
          scrub: 1.5,
          pin: stickyRef.current,
          pinSpacing: true,
          onUpdate(self) {
            if (!counterRef.current) return
            const p = self.progress
            // Thresholds aligned to when each exit ENDS (card N+1 fully revealed)
            const n = p < 4.3 / 10.6 ? 1 : p < 6.9 / 10.6 ? 2 : p < 9.5 / 10.6 ? 3 : 4
            counterRef.current.textContent = String(n).padStart(2, '0')
          },
        },
      })

      /* ── 1. Split image opens ── */
      tl.to(leftRef.current, { xPercent: -100, ease: 'power2.inOut', duration: 1.5 }, 0).to(
        rightRef.current,
        { xPercent: 100, ease: 'power2.inOut', duration: 1.5 },
        0
      )

      /* ── 2. Card flip exits ──
         Each card rotates from its pre-set corner origin.
         No x/y translation — the pivot + high rotation angle naturally
         carries the card off-screen while creating a perspective "peel" effect. */
      ;[0, 1, 2].forEach((i) => {
        const pos = [3.2, 5.8, 8.4][i]
        const exit = EXITS[i]
        tl.to(
          cards[i],
          {
            rotateX: exit.rotateX,
            rotateY: exit.rotateY,
            rotateZ: exit.rotateZ,
            scale: exit.scale,
            opacity: exit.opacity,
            filter: exit.filter,
            ease: exit.ease,
            duration: exit.duration,
          },
          pos
        )
      })

      /* ── 3. Hold card 4 at end ── */
      tl.to({}, { duration: 0.6 }, 10.0)
    }, outerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={outerRef}>
      <div ref={stickyRef} className="relative h-screen overflow-hidden bg-[#f2f2f2]">
        {/* ── Split image — left half ──
            Inner wrapper is 200% of the 50%-wide container = full viewport width.
            overflow:hidden clips it to show only the left half of the image. */}
        <div
          ref={leftRef}
          className="absolute inset-y-0 left-0 z-20 overflow-hidden"
          style={{ width: '50%' }}
        >
          <div style={{ position: 'absolute', inset: 0, width: '200%', left: 0 }}>
            <Image src={SPLIT_SRC} fill alt="" priority sizes="100vw" className="object-cover" />
          </div>
        </div>

        {/* ── Split image — right half ──
            Inner wrapper anchored to the right, so it shows the right half. */}
        <div
          ref={rightRef}
          className="absolute inset-y-0 right-0 z-20 overflow-hidden"
          style={{ width: '50%' }}
        >
          <div style={{ position: 'absolute', inset: 0, width: '200%', right: 0, left: 'auto' }}>
            <Image src={SPLIT_SRC} fill alt="" priority sizes="100vw" className="object-cover" />
          </div>
        </div>

        {/* ── Testimonials content ── */}
        <div className="relative flex h-full items-center justify-center">
          <p className="font-body pointer-events-none absolute left-8 text-[10px] tracking-[0.28em] text-[#b0b0b0] uppercase select-none lg:left-14">
            (Testimonials)
          </p>

          <p className="font-body pointer-events-none absolute right-8 text-[11px] font-normal tracking-[0.04em] text-black tabular-nums select-none lg:right-14">
            <span ref={counterRef}>01</span>
            <span> /04</span>
          </p>

          <p className="font-body pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.26em] text-[#bbb] uppercase select-none">
            (Scroll for more)
          </p>

          {/*
           * Cards stack at the same absolute position.
           * Rendered in REVERSE DOM order → card 0 is last sibling → highest
           * CSS stacking context → card 0 is on top without explicit z-index.
           *
           * Parent has perspective: 780px which projects the GSAP rotateX/Y
           * of direct children into real 3-D space.
           */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(310px, 32vw, 450px)',
              height: 'clamp(410px, 50vh, 530px)',
              perspective: '780px',
            }}
          >
            {[...TESTIMONIALS].reverse().map((t, revIdx) => {
              const idx = TOTAL - 1 - revIdx
              return (
                <div
                  key={idx}
                  ref={(el) => {
                    cardRefs.current[idx] = el
                  }}
                  className="absolute inset-0"
                >
                  {t.type === 'image' ? (
                    <ImageCard t={t} idx={idx} />
                  ) : (
                    <TextCard t={t} idx={idx} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
