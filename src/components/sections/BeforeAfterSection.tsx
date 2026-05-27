'use client'

import { useCallback, useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionBadge } from '@/components/common/SectionBadge'
import { TextReveal } from '@/components/common/TextReveal'
import { IMAGES } from '@/config/images'

const pairs = [
  {
    before: IMAGES.beforeAfter.before,
    after: IMAGES.beforeAfter.after,
    label: 'Precision Fade',
    description: 'From overgrown to architecturally sharp in 60 minutes.',
  },
  {
    before: IMAGES.beforeAfter.before2,
    after: IMAGES.beforeAfter.after2,
    label: 'Colour Transformation',
    description: 'Dimensional highlights that breathe new life into every strand.',
  },
]

function BASlider({ before, after }: { before: string; after: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(50)
  const dragging = useRef(false)

  const updatePct = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const p = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPct(p)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    updatePct(e.clientX)
  }
  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true
    updatePct(e.touches[0].clientX)
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) updatePct(e.clientX)
    }
    const onTouchMove = (e: TouchEvent) => {
      if (dragging.current) updatePct(e.touches[0].clientX)
    }
    const onUp = () => {
      dragging.current = false
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [updatePct])

  return (
    <div
      ref={containerRef}
      className="ba-slider aspect-[4/5] w-full select-none md:aspect-[3/4]"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* Before image (full width) */}
      <div className="absolute inset-0">
        <Image src={before} alt="Before" fill className="object-cover" sizes="50vw" />
        <div className="font-body bg-ut-black/60 absolute bottom-4 left-4 px-2 py-1 text-[10px] tracking-[0.25em] text-white/70 uppercase">
          Before
        </div>
      </div>

      {/* After image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <div className="absolute inset-0" style={{ width: `${(100 / pct) * 100}%` }}>
          <Image src={after} alt="After" fill className="object-cover" sizes="50vw" />
        </div>
        <div className="font-body bg-ut-black/60 absolute bottom-4 left-4 px-2 py-1 text-[10px] tracking-[0.25em] text-white/70 uppercase">
          After
        </div>
      </div>

      {/* Handle */}
      <div className="ba-handle" style={{ left: `${pct}%` }}>
        <div className="ba-handle-circle">
          <ChevronLeft size={11} className="text-ut-black" />
          <ChevronRight size={11} className="text-ut-black" />
        </div>
      </div>
    </div>
  )
}

export function BeforeAfterSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="before-after" className="section-pad bg-ut-surface relative overflow-hidden">
      <div className="container-wide">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <SectionBadge label="Transformations" number="06" className="mb-6" />
            <h2 className="font-display text-ut-cream text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] font-light italic">
              <TextReveal text="See the" />
              <br />
              <TextReveal text="Difference." delay={0.15} className="text-ut-gold" />
            </h2>
          </div>
          <p className="font-body text-ut-muted max-w-xs text-[14px] leading-relaxed">
            Drag the slider to reveal the transformation. Every result is a work of art.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Slider */}
          <div>
            <BASlider before={pairs[active].before} after={pairs[active].after} />
          </div>

          {/* Info panel */}
          <div className="flex h-full flex-col justify-between gap-8 pt-2">
            {/* Pair selector tabs */}
            <div className="flex gap-4">
              {pairs.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`font-body border px-5 py-2.5 text-[12px] tracking-[0.15em] uppercase transition-all duration-300 ${
                    i === active
                      ? 'border-ut-gold bg-ut-gold text-ut-black'
                      : 'border-ut-border text-ut-muted hover:border-ut-gold/50 hover:text-ut-cream'
                  }`}
                  data-cursor="hover"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div>
              <h3 className="font-display text-ut-gold mb-3 text-3xl italic md:text-4xl">
                {pairs[active].label}
              </h3>
              <p className="font-body text-ut-muted mb-8 text-[15px] leading-relaxed">
                {pairs[active].description}
              </p>

              {/* Process steps */}
              {[
                'Initial Consultation',
                'Precision Execution',
                'Signature Finish',
                'Style Coaching',
              ].map((step, i) => (
                <motion.div
                  key={step}
                  className="border-ut-border flex items-center gap-4 border-b py-4 last:border-b-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <span className="font-body text-ut-gold w-6 text-[10px] tracking-[0.2em]">
                    0{i + 1}
                  </span>
                  <span className="gold-line w-6 shrink-0" />
                  <span className="font-body text-ut-muted hover:text-ut-cream text-[14px] transition-colors">
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() =>
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="border-ut-gold text-ut-gold font-body hover:bg-ut-gold hover:text-ut-black self-start border px-8 py-3.5 text-[12px] tracking-[0.2em] uppercase transition-all duration-300"
              data-cursor="hover"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Your Transformation
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
