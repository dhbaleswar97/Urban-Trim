'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Clock, Check } from 'lucide-react'
import type { Service } from '@/data/services'

interface Props {
  service: Service
  otherServices: Service[]
}

export function ServiceDetail({ service, otherServices }: Props) {
  const contentRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLElement>(null)
  const otherRef = useRef<HTMLElement>(null)

  const contentInView = useInView(contentRef as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  })
  const stepsInView = useInView(stepsRef as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  })
  const otherInView = useInView(otherRef as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  })

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={service.image} alt={service.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-40 pb-20 md:px-10 lg:px-14"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 flex items-center gap-4">
            <Link
              href="/services"
              className="font-body text-[10px] tracking-[0.28em] text-white/50 uppercase transition-colors hover:text-white"
              data-cursor="hover"
            >
              Services
            </Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-[10px] tracking-[0.28em] text-white/70 uppercase">
              {service.name}
            </span>
          </div>

          <p
            className="font-body mb-4 text-[10px] tracking-[0.32em] uppercase"
            style={{ color: service.accentColor }}
          >
            {service.number}
          </p>
          <h1 className="font-display mb-4 text-[clamp(3.5rem,8vw,9rem)] leading-[0.88] text-white italic">
            {service.name}
          </h1>
          <p className="font-display text-xl text-white/60 italic">{service.tagline}</p>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-white/40" />
              <span className="font-body text-[13px] text-white/60">{service.duration}</span>
            </div>
            <span className="text-white/20">·</span>
            <span className="font-display text-2xl text-white italic">{service.price}</span>
          </div>
        </motion.div>
      </section>

      {/* ─── CONTENT ─── */}
      <section
        ref={contentRef}
        className="section-pad mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14"
      >
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <div className="mb-10 flex items-center gap-4">
              <span className="block h-px w-8" style={{ backgroundColor: service.accentColor }} />
              <span className="font-body text-[10px] tracking-[0.32em] text-[#a0a0a0] uppercase">
                The Experience
              </span>
            </div>
            <motion.p
              className="font-body mb-6 text-[16px] leading-relaxed text-[#444]"
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {service.longDescription}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {service.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="bg-[#f5f5f5] p-10"
            initial={{ opacity: 0, x: 30 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body mb-8 text-[10px] tracking-[0.28em] text-[#a0a0a0] uppercase">
              Booking Details
            </p>
            <div className="mb-10 space-y-5">
              <div className="flex items-center justify-between border-b border-[#e8e8e8] pb-4">
                <span className="font-body text-[13px] text-[#555]">Duration</span>
                <span className="font-body text-[14px] font-medium">{service.duration}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#e8e8e8] pb-4">
                <span className="font-body text-[13px] text-[#555]">Starting Price</span>
                <span className="font-display text-2xl italic">{service.price}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#e8e8e8] pb-4">
                <span className="font-body text-[13px] text-[#555]">Includes Consultation</span>
                <Check size={16} style={{ color: service.accentColor }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-[13px] text-[#555]">Product Finish</span>
                <Check size={16} style={{ color: service.accentColor }} />
              </div>
            </div>
            <Link
              href="/booking"
              className="ut-btn ut-btn-dark w-full justify-center"
              data-cursor="hover"
            >
              <span className="ut-btn-fill" aria-hidden="true" />
              <span className="ut-btn-text flex items-center gap-2">
                Book This Service <ArrowUpRight size={13} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── PROCESS STEPS ─── */}
      <section ref={stepsRef} className="section-pad bg-black text-white">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
          <div className="mb-12 flex items-center gap-4">
            <span className="font-body text-[10px] tracking-[0.32em] text-white/30 uppercase">
              Process
            </span>
            <span className="block h-px w-12 bg-white/20" />
            <span className="font-body text-[10px] tracking-[0.32em] text-white/30 uppercase">
              Step by Step
            </span>
          </div>
          <motion.h2
            className="font-display mb-16 text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95] text-white italic"
            initial={{ opacity: 0, y: 30 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            How it unfolds.
          </motion.h2>
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="border-l border-white/10 pb-8 pl-8 lg:pb-0"
                initial={{ opacity: 0, y: 30 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="font-display mb-6 text-[4rem] leading-none italic opacity-20"
                  style={{ color: service.accentColor }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display mb-3 text-2xl text-white italic">{step.title}</h3>
                <p className="font-body text-[13px] leading-relaxed text-white/50">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OTHER SERVICES ─── */}
      <section ref={otherRef} className="section-pad mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        <div className="mb-14 flex items-center justify-between gap-8">
          <h2 className="font-display text-[clamp(2rem,4vw,4rem)] italic">Other services.</h2>
          <Link href="/services" className="ut-btn ut-btn-outline" data-cursor="hover">
            <span className="ut-btn-fill" aria-hidden="true" />
            <span className="ut-btn-text flex items-center gap-2">
              View All <ArrowUpRight size={13} />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {otherServices.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={otherInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/services/${s.slug}`} className="group block" data-cursor="view">
                <div className="relative mb-4 overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display mb-1 text-xl italic">{s.name}</h3>
                    <p className="font-body text-[12px] text-[#a0a0a0]">{s.price}</p>
                  </div>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: s.accentColor }}
                  >
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
