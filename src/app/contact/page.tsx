'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { IMG_CDN } from '@/lib/cdn'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'New Booking',
  'General Inquiry',
  'Corporate / Private Event',
  'Press & Media',
  'Partnerships',
]

// ─── STAR ICON ─────────────────────────────────────────────────────────────────

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 1l1.55 3.14L12 4.63l-2.5 2.44.59 3.44L7 8.77l-3.09 1.74.59-3.44L2 4.63l3.45-.49z"
        fill="rgba(255,255,255,0.92)"
      />
    </svg>
  )
}

// ─── UNDERLINE FIELD ───────────────────────────────────────────────────────────

function Field({
  label,
  children,
  borderLeft = false,
  paddingRight = false,
}: {
  label: string
  children: React.ReactNode
  borderLeft?: boolean
  paddingRight?: boolean
}) {
  return (
    <div
      className="pt-6 pb-5"
      style={{
        borderBottom: '1px solid rgba(0,0,0,0.11)',
        borderLeft: borderLeft ? '1px solid rgba(0,0,0,0.11)' : 'none',
        paddingLeft: borderLeft ? '28px' : 0,
        paddingRight: paddingRight ? '28px' : 0,
      }}
    >
      <label className="font-body mb-3 block text-[10px] tracking-[0.28em] text-black/40 uppercase select-none">
        {label}
      </label>
      {children}
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  })

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }))

  const inputCls =
    'w-full bg-transparent font-body text-[14px] text-black outline-none placeholder:text-transparent caret-black'

  return (
    <main>
      {/* ══════════════════════════════════════════════════════════════════════
          §1  HERO — light gray, vertical grid lines, dot, arch bottom
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: '#f0f0f0',
          minHeight: '68vh',
          borderRadius: '0 0 50vw 50vw / 0 0 80px 80px',
          zIndex: 1,
        }}
      >
        {/* Hero content — vertically centered */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center"
          style={{ minHeight: '68vh', paddingTop: '120px', paddingBottom: '60px' }}
        >
          <motion.p
            className="font-body mb-8 text-[10px] tracking-[0.36em] text-black/40 uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            (Contact)
          </motion.p>

          <motion.h1
            className="font-body font-black text-black"
            style={{
              fontSize: 'clamp(4rem, 11vw, 12rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s Connect
          </motion.h1>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          §2  FORM SECTION — testimonial card (left) + contact form (right)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-24 md:px-10 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* ── LEFT — testimonial card ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '3 / 4', background: '#1c1c1c' }}
            >
              {/* Portrait photo */}
              <Image
                src={`${IMG_CDN}/assets/images/Testimonial/Houcine.jpg`}
                alt="Urban Trim client"
                fill
                className="object-cover object-center opacity-65"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />

              {/* Top row: logo mark + stars */}
              <div className="absolute top-5 right-5 left-5 z-10 flex items-start justify-between">
                {/* Conic-gradient sphere logo */}
                <div
                  className="shrink-0 rounded-full"
                  style={{
                    width: 42,
                    height: 42,
                    background:
                      'conic-gradient(from 180deg, #B6F500 0%, #e8ff80 30%, #00cfba 60%, #B6F500 100%)',
                  }}
                />
                {/* 5-star rating */}
                <div className="flex items-center gap-[3px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              </div>

              {/* Bottom gradient + quote */}
              <div
                className="absolute inset-x-0 bottom-0 z-10 p-7"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)',
                  paddingTop: 90,
                }}
              >
                <p className="font-body mb-5 text-[13px] leading-[1.80] text-white">
                  &ldquo;The most refined grooming experience I&apos;ve had in New York. Every
                  session feels deeply personal, precise, and completely worth it.&rdquo;
                </p>
                <p className="font-body text-[13px] leading-snug font-semibold text-white">
                  Houcine Ncib
                </p>
                <p className="font-body mt-[3px] text-[11px] text-white/45">Creative Director</p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT — contact form ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body mb-10 text-[10px] tracking-[0.32em] text-black/38 uppercase">
              (Fill the form)
            </p>

            {submitted ? (
              /* ── Success state ─────────────────────────────────────────── */
              <motion.div
                className="flex flex-col gap-6 py-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: '#B6F500' }}
                >
                  <ArrowUpRight size={22} />
                </div>
                <h2 className="font-display text-[2.5rem] leading-none">Message sent.</h2>
                <p className="font-body max-w-[400px] text-[14px] leading-relaxed text-black/45">
                  Thank you for reaching out. We&apos;ll be in touch within one business day.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', email: '', subject: '', category: '', message: '' })
                  }}
                  className="font-body w-fit text-[11px] tracking-[0.18em] text-black/38 uppercase underline underline-offset-4 transition-colors hover:text-black"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              /* ── Form fields ───────────────────────────────────────────── */
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="space-y-0"
              >
                {/* Row 1 — NAME + EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <Field label="Name*" paddingRight>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email*" borderLeft>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Row 2 — SUBJECT + CATEGORY */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <Field label="Subject" paddingRight>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={set('subject')}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Category" borderLeft>
                    <div className="relative">
                      <select
                        value={form.category}
                        onChange={set('category')}
                        className="font-body w-full cursor-pointer appearance-none bg-transparent pr-6 text-[14px] text-black outline-none"
                        style={{ color: form.category === '' ? 'rgba(0,0,0,0.28)' : 'black' }}
                      >
                        <option value="" style={{ color: 'rgba(0,0,0,0.4)' }}>
                          Select one...
                        </option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat} style={{ color: 'black' }}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {/* Custom dropdown arrow */}
                      <svg
                        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          stroke="rgba(0,0,0,0.35)"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Field>
                </div>

                {/* Row 3 — MESSAGE */}
                <Field label="Message">
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    rows={5}
                    className="font-body w-full resize-none bg-transparent text-[14px] text-black outline-none"
                  />
                </Field>

                {/* CTA */}
                <div className="pt-12">
                  <button
                    type="submit"
                    className="group font-body relative inline-flex items-center overflow-hidden rounded-full bg-black px-10 py-[15px] text-[13px] tracking-[0.05em] text-white transition-all duration-400 hover:bg-[#B6F500] hover:text-black"
                    data-cursor="hover"
                  >
                    Contact Us
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
