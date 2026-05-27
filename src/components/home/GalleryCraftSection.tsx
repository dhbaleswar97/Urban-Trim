'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/animations/gsap.config'
import { ArrowUpRight } from 'lucide-react'
import { IMAGES } from '@/config/images'

/*
 * GalleryCraftSection — draggable 19-image canvas gallery.
 *
 * Transform stack (4 layers, no conflicts):
 *   craft-cell  → GSAP: reveal (opacity, scale, y) + z-tilt oscillation
 *   craft-float → GSAP: y-oscillation (float depth) | CSS: perspective context
 *   craft-3d    → GSAP: rotateY or rotateX slow 3D flip loop
 *   inner div   → CSS:  hover scale + overflow:hidden
 *
 * CTA: fixed to wrapper (not canvas) — stays centred during drag.
 * Layout: magazine-spread scatter; minimum ~390px centre-to-centre.
 * New images 14-18 sit in the four canvas corners + bottom-centre,
 *   rewarding exploration by drag.
 */

const CANVAS_W = 3000
const CANVAS_H = 1400

const IMAGE_POOL: string[] = [
  /* 0-7  */ ...IMAGES.gallery,
  /* 8    */ IMAGES.services.haircut,
  /* 9    */ IMAGES.services.beard,
  /* 10   */ IMAGES.services.color,
  /* 11   */ IMAGES.services.treatment,
  /* 12   */ IMAGES.services.styling,
  /* 13   */ IMAGES.services.shave,
  /* 14   */ IMAGES.stylists.one,
  /* 15   */ IMAGES.stylists.two,
  /* 16   */ IMAGES.stylists.three,
  /* 17   */ IMAGES.about,
  /* 18   */ IMAGES.aboutPortrait,
]

interface CellCfg {
  left: number
  top: number
  w: number
  h: number
  rot: number
  dir: 1 | -1
}

/*
 * 19 cells — editorial magazine-scatter.
 * Each cell has ≥390px centre-to-centre clearance from its neighbours.
 * Tilt angles (rot) lean toward canvas centre — creating inward visual flow.
 * Cells 0-1: off-screen left    | 6, 11: off-screen right
 * Cells 3-5: in-viewport top    | 14-17: four canvas corners (exploration)
 * Cells 7-10: flanking the CTA  | 18: bottom-centre (exploration)
 * Cells 12-13: below fold
 */
const CELLS: CellCfg[] = [
  /* off-screen left ─────────────────────────────────────────────────────── */
  { left: 410, top: 285, w: 240, h: 310, rot: -11, dir: 1 }, //  0
  { left: 235, top: 740, w: 330, h: 240, rot: 6, dir: -1 }, //  1  landscape

  /* in-viewport top strip ───────────────────────────────────────────────── */
  { left: 800, top: 310, w: 240, h: 310, rot: -9, dir: 1 }, //  2  left anchor
  { left: 1178, top: 130, w: 205, h: 265, rot: 6, dir: -1 }, //  3  small, high
  { left: 1570, top: 160, w: 260, h: 335, rot: -7, dir: 1 }, //  4  tall
  { left: 1963, top: 250, w: 275, h: 355, rot: 12, dir: -1 }, //  5  right anchor

  /* off-screen right, top ───────────────────────────────────────────────── */
  { left: 2363, top: 180, w: 255, h: 330, rot: 14, dir: 1 }, //  6

  /* in-viewport middle band (flanking fixed CTA) ────────────────────────── */
  { left: 645, top: 740, w: 330, h: 240, rot: 5, dir: 1 }, //  7  landscape
  { left: 1088, top: 770, w: 225, h: 290, rot: -9, dir: -1 }, //  8  left of CTA
  { left: 1678, top: 670, w: 245, h: 315, rot: 8, dir: 1 }, //  9  right of CTA
  { left: 2030, top: 660, w: 260, h: 335, rot: -11, dir: -1 }, // 10

  /* off-screen right, middle ────────────────────────────────────────────── */
  { left: 2443, top: 650, w: 235, h: 305, rot: -8, dir: 1 }, // 11

  /* below fold ──────────────────────────────────────────────────────────── */
  { left: 835, top: 1070, w: 230, h: 300, rot: 7, dir: -1 }, // 12
  { left: 1675, top: 1030, w: 250, h: 325, rot: -9, dir: 1 }, // 13

  /* four canvas corners — discovered by dragging ─────────────────────────── */
  { left: 40, top: 20, w: 200, h: 260, rot: -15, dir: 1 }, // 14  top-left corner
  { left: 2755, top: 15, w: 210, h: 270, rot: 17, dir: -1 }, // 15  top-right corner
  { left: 38, top: 1110, w: 215, h: 280, rot: 12, dir: 1 }, // 16  bottom-left corner
  { left: 2733, top: 1100, w: 225, h: 290, rot: -14, dir: -1 }, // 17  bottom-right corner
  { left: 1265, top: 1200, w: 270, h: 190, rot: 4, dir: 1 }, // 18  bottom-centre landscape
]

/* ─── Component ─────────────────────────────────────────────────────────────── */

export function GalleryCraftSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  })

  /* ── Split-char heading reveal ────────────────────────────────────────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const heading = headingRef.current
    if (!heading) return

    const raw = heading.textContent ?? ''
    heading.innerHTML = raw
      .split('')
      .map((ch) =>
        ch === ' '
          ? `<span class="inline-block">&nbsp;</span>`
          : `<span class="split-ch inline-block">${ch}</span>`
      )
      .join('')

    const chars = Array.from(heading.querySelectorAll<HTMLElement>('.split-ch'))
    gsap.set(chars, { opacity: 0, y: 48 })
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      stagger: 0.026,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: heading, start: 'top 83%' },
    })
  }, [])

  /* ── Draggable canvas + all cell animations ───────────────────────────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return

    const wW = wrapper.offsetWidth
    const wH = wrapper.offsetHeight
    const initX = (wW - CANVAS_W) / 2
    const initY = (wH - CANVAS_H) / 2
    gsap.set(canvas, { x: initX, y: initY })

    const minX = wW - CANVAS_W
    const maxX = 0
    const minY = wH - CANVAS_H
    const maxY = 0
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

    let cx = initX,
      cy = initY
    let isDrag = false
    let startPX = 0,
      startPY = 0,
      startCX = 0,
      startCY = 0
    let velX = 0,
      velY = 0,
      lastPX = 0,
      lastPY = 0,
      lastT = 0

    const onPD = (e: PointerEvent) => {
      isDrag = true
      cx = gsap.getProperty(canvas, 'x') as number
      cy = gsap.getProperty(canvas, 'y') as number
      startPX = e.clientX
      startPY = e.clientY
      startCX = cx
      startCY = cy
      lastPX = e.clientX
      lastPY = e.clientY
      lastT = performance.now()
      velX = velY = 0
      gsap.killTweensOf(canvas)
      wrapper.setPointerCapture(e.pointerId)
      wrapper.style.cursor = 'grabbing'
    }

    const onPM = (e: PointerEvent) => {
      if (!isDrag) return
      const now = performance.now()
      const dt = now - lastT
      if (dt > 0) {
        velX = ((e.clientX - lastPX) / dt) * 1000
        velY = ((e.clientY - lastPY) / dt) * 1000
      }
      cx = clamp(startCX + (e.clientX - startPX), minX, maxX)
      cy = clamp(startCY + (e.clientY - startPY), minY, maxY)
      gsap.set(canvas, { x: cx, y: cy })
      lastPX = e.clientX
      lastPY = e.clientY
      lastT = now
    }

    const onPU = () => {
      if (!isDrag) return
      isDrag = false
      wrapper.style.cursor = 'grab'
      const momentum = { x: cx, y: cy }
      gsap.to(momentum, {
        x: clamp(cx + velX * 0.38, minX, maxX),
        y: clamp(cy + velY * 0.38, minY, maxY),
        duration: 1.15,
        ease: 'power3.out',
        onUpdate: () => gsap.set(canvas, { x: momentum.x, y: momentum.y }),
      })
    }

    const onPC = () => {
      isDrag = false
      wrapper.style.cursor = 'grab'
    }

    wrapper.addEventListener('pointerdown', onPD)
    wrapper.addEventListener('pointermove', onPM)
    wrapper.addEventListener('pointerup', onPU)
    wrapper.addEventListener('pointercancel', onPC)

    const ctx = gsap.context(() => {
      const cells = Array.from(canvas.querySelectorAll<HTMLElement>('.craft-cell'))
      const floaters = Array.from(canvas.querySelectorAll<HTMLElement>('.craft-float'))
      const rotators = Array.from(canvas.querySelectorAll<HTMLElement>('.craft-3d'))

      /* ── 1. Z-tilt oscillation on craft-cell ── */
      cells.forEach((cell, i) => {
        const cfg = CELLS[i]
        if (!cfg) return
        gsap.set(cell, { rotation: cfg.rot })
        gsap.to(cell, {
          rotation: cfg.rot + cfg.dir * 10,
          duration: 8 + (i % 5) * 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      /* ── 2. Scroll-triggered reveal ── */
      gsap.fromTo(
        cells,
        { opacity: 0, scale: 0.82, y: 28 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: { each: 0.052, from: 'random' },
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: wrapper, start: 'top 75%' },
        }
      )

      /* ── 3. Y-float on craft-float ── */
      floaters.forEach((el, i) => {
        gsap.to(el, {
          y: `+=${8 + (i % 3) * 4}`,
          duration: 2.8 + (i % 5) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.18,
        })
      })

      /* ── 4. Slow 3D flip loop on craft-3d ──
            Even indices → rotateY (horizontal card flip)
            Divisible by 3 → rotateX (vertical card flip)
            Speed: 15–24 s per full revolution — imperceptibly slow.        ── */
      rotators.forEach((el, i) => {
        const axis = i % 3 === 0 ? 'rotateX' : 'rotateY'
        const dur = 15 + (i % 7) * 1.4
        gsap.to(el, {
          [axis]: '+=360',
          duration: dur,
          repeat: -1,
          ease: 'none',
        })
      })
    }, canvas)

    return () => {
      wrapper.removeEventListener('pointerdown', onPD)
      wrapper.removeEventListener('pointermove', onPM)
      wrapper.removeEventListener('pointerup', onPU)
      wrapper.removeEventListener('pointercancel', onPC)
      ctx.revert()
    }
  }, [])

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <section ref={sectionRef} className="bg-white pt-24 md:pt-32 lg:pt-40">
      {/* ── Header ── */}
      <div className="mx-auto mb-14 max-w-[1400px] px-6 md:px-10 lg:px-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <motion.p
              className="font-body mb-5 text-[10px] tracking-[0.32em] text-[#a0a0a0] uppercase"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              (Our Craft Shot)
            </motion.p>

            {/* Overflow clip — chars rise up from below into frame */}
            <div className="overflow-hidden pb-3">
              <h2
                ref={headingRef}
                className="font-body leading-[0.9] font-normal tracking-[-0.025em] md:whitespace-nowrap"
                style={{ fontSize: 'clamp(2.6rem, 5.8vw, 7rem)' }}
              >
                Every cut, a statement.
              </h2>
            </div>

            <motion.p
              className="font-body mt-4 max-w-[300px] text-[13px] leading-relaxed text-[#a0a0a0]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A curated collection of our finest sessions — every image a story, every cut a craft.
            </motion.p>
          </div>

          <motion.div
            className="flex shrink-0 flex-col items-start gap-3 md:items-end"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <span className="font-body text-[10px] tracking-[0.28em] text-[#c0c0c0] uppercase">
              (19 images)
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Draggable gallery ── */}
      <div
        ref={wrapperRef}
        className="relative cursor-grab overflow-hidden select-none"
        style={{ height: '80vh' }}
      >
        {/* Canvas — images only, translates with drag */}
        <div
          ref={canvasRef}
          className="absolute"
          style={{ width: CANVAS_W, height: CANVAS_H, top: 0, left: 0, willChange: 'transform' }}
        >
          {CELLS.map((cell, i) => (
            <div
              key={i}
              className="craft-cell absolute"
              style={{ left: cell.left, top: cell.top, width: cell.w, height: cell.h }}
            >
              {/* craft-float: y-oscillation + perspective context for child 3D */}
              <div className="craft-float group absolute inset-0" style={{ perspective: '900px' }}>
                {/* craft-3d: slow 3D rotateY / rotateX flip loop */}
                <div
                  className="craft-3d h-full w-full"
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                >
                  {/* inner: hover scale + overflow clip */}
                  <div className="relative h-full w-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
                    <Image
                      src={IMAGE_POOL[i]}
                      alt={`Urban Trim craft ${i + 1}`}
                      fill
                      draggable={false}
                      className="pointer-events-none object-cover"
                      sizes="340px"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — anchored to wrapper, stays fixed during canvas drag */}
        <div
          className="pointer-events-auto absolute z-20"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <Link
            href="/gallery"
            className="font-body inline-flex items-center gap-[7px] rounded-full bg-black px-7 py-[13px] text-[12px] tracking-[0.06em] text-white shadow-[0_10px_40px_rgba(0,0,0,0.28)] transition-all duration-300 hover:bg-[#B6F500] hover:text-black hover:shadow-[0_10px_40px_rgba(182,245,0,0.3)]"
            data-cursor="hover"
          >
            View Gallery <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      <div className="pb-24 md:pb-32 lg:pb-40" />
    </section>
  )
}
