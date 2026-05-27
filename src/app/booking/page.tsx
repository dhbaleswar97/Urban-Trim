'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, Check, Clock, User, Mail, Phone, FileText } from 'lucide-react'
import { services } from '@/data/services'
import { team } from '@/data/team'
import { IMAGES } from '@/config/images'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TIMES_AM = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30']
const TIMES_PM = ['12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']
const TIMES_EVE = ['18:00', '18:30', '19:00']

const DATES = Array.from({ length: 21 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i + 1)
  return {
    date: d,
    dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
    dayNum: d.getDate(),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    iso: d.toISOString().split('T')[0],
  }
}).filter((d) => d.date.getDay() !== 0)

const STEP_LABELS = ['Service', 'Artist', 'Schedule', 'Details', 'Review'] as const

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Booking = {
  service: string
  stylist: string
  date: string
  dateLabel: string
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  selected,
  onSelect,
}: {
  service: (typeof services)[0]
  selected: boolean
  onSelect: () => void
}) {
  return (
    <motion.button
      onClick={onSelect}
      className="group relative w-full overflow-hidden rounded-2xl text-left"
      style={{
        background: selected ? '#000' : '#fff',
        border: selected ? '2px solid #B6F500' : '2px solid #e8e8e8',
        boxShadow: selected
          ? '0 0 0 1px rgba(182,245,0,0.3), 0 24px 60px rgba(182,245,0,0.10)'
          : '0 2px 20px rgba(0,0,0,0.04)',
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="hover"
    >
      {/* Image strip */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={service.image}
          alt={service.name}
          fill
          className={`object-cover transition-all duration-700 ${
            selected ? 'scale-105' : 'grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0'
          }`}
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            selected ? 'bg-black/45' : 'bg-black/20 group-hover:bg-black/10'
          }`}
        />

        {/* Number badge */}
        <div className="absolute top-3.5 left-3.5">
          <span
            className="font-body rounded-full px-3 py-[5px] text-[9px] font-medium tracking-[0.2em]"
            style={{
              color: selected ? '#B6F500' : 'rgba(255,255,255,0.75)',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {service.number}
          </span>
        </div>

        {/* Check badge */}
        {selected && (
          <motion.div
            className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-full"
            style={{ background: '#B6F500' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Check size={11} strokeWidth={3} />
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3
          className="font-display mb-2.5 text-[1.25rem] leading-tight"
          style={{ color: selected ? '#fff' : '#000' }}
        >
          {service.name}
        </h3>
        <div className="flex items-center gap-3">
          <span
            className="flex items-center gap-1.5"
            style={{ color: selected ? 'rgba(255,255,255,0.45)' : '#a0a0a0' }}
          >
            <Clock size={10} />
            <span className="font-body text-[11px]">{service.duration}</span>
          </span>
          <span style={{ color: selected ? 'rgba(255,255,255,0.2)' : '#d0d0d0' }}>·</span>
          <span
            className="font-body text-[12px] font-semibold"
            style={{ color: selected ? '#B6F500' : '#000' }}
          >
            {service.price}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

// ─── ARTIST CARD ──────────────────────────────────────────────────────────────

function ArtistCard({
  member,
  selected,
  onSelect,
}: {
  member: (typeof team)[0]
  selected: boolean
  onSelect: () => void
}) {
  return (
    <motion.button
      onClick={onSelect}
      className="group relative w-full overflow-hidden rounded-2xl text-left"
      style={{
        border: selected ? '2px solid #B6F500' : '2px solid #e8e8e8',
        boxShadow: selected
          ? '0 0 0 1px rgba(182,245,0,0.3), 0 24px 60px rgba(182,245,0,0.10)'
          : 'none',
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="hover"
    >
      {/* Portrait */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={`object-cover transition-all duration-700 ${
            selected
              ? 'scale-105 grayscale-0'
              : 'grayscale group-hover:scale-105 group-hover:grayscale-0'
          }`}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Check */}
        {selected && (
          <motion.div
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: '#B6F500' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Check size={13} strokeWidth={3} />
          </motion.div>
        )}

        {/* Experience badge */}
        <div
          className="font-body absolute bottom-4 left-4 rounded-full px-3 py-[5px] text-[10px] text-white/75"
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          {member.experience} exp.
        </div>
      </div>

      {/* Info */}
      <div className="bg-white p-5">
        <p className="font-display mb-[3px] text-[1.2rem] leading-tight">{member.name}</p>
        <p className="font-body text-[10px] tracking-[0.16em] text-[#a0a0a0] uppercase">
          {member.specialty}
        </p>
      </div>
    </motion.button>
  )
}

// ─── TIME SLOT GROUP ──────────────────────────────────────────────────────────

function TimeGroup({
  label,
  times,
  selected,
  onSelect,
}: {
  label: string
  times: string[]
  selected: string
  onSelect: (t: string) => void
}) {
  return (
    <div className="mb-7">
      <p className="font-body mb-3 text-[9px] tracking-[0.22em] text-black/28 uppercase">{label}</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {times.map((time) => {
          const sel = selected === time
          return (
            <motion.button
              key={time}
              onClick={() => onSelect(time)}
              className="font-body rounded-xl py-3 text-[12px] transition-colors duration-250"
              style={{
                background: sel ? '#000' : '#fff',
                border: sel ? '2px solid #B6F500' : '2px solid #e8e8e8',
                color: sel ? '#fff' : '#000',
              }}
              whileTap={{ scale: 0.96 }}
              data-cursor="hover"
            >
              {time}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function BookingPage() {
  const [step, setStep] = useState(0)
  const [booking, setBooking] = useState<Booking>({
    service: '',
    stylist: '',
    date: '',
    dateLabel: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  /* right panel subtle scroll drift */
  const { scrollY } = useScroll()
  const rightImgY = useTransform(scrollY, [0, 2000], ['0%', '-12%'])

  const selectedService = services.find((s) => s.slug === booking.service)
  const selectedStylist = team.find((t) => t.slug === booking.stylist)

  const canProceed = () => {
    if (step === 0) return !!booking.service
    if (step === 1) return !!booking.stylist
    if (step === 2) return !!booking.date && !!booking.time
    if (step === 3) return !!booking.name && !!booking.email
    return true
  }

  const reset = () => {
    setSubmitted(false)
    setStep(0)
    setBooking({
      service: '',
      stylist: '',
      date: '',
      dateLabel: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      notes: '',
    })
  }

  // ── Success screen ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 py-24">
        <motion.div
          className="w-full max-w-[520px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated check */}
          <motion.div
            className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: '#B6F500' }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Check size={34} strokeWidth={2.5} />
          </motion.div>

          <motion.p
            className="font-body mb-5 text-center text-[9px] tracking-[0.34em] text-black/35 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            (Booking Confirmed)
          </motion.p>

          <motion.h1
            className="font-display mb-5 text-center leading-[0.92] text-black"
            style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            See you soon,
            <br />
            {booking.name.split(' ')[0] || 'friend'}.
          </motion.h1>

          <motion.p
            className="font-body mb-10 text-center text-[13px] leading-relaxed text-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            A confirmation has been sent to {booking.email}.
          </motion.p>

          {/* Receipt card */}
          <motion.div
            className="mb-10 overflow-hidden rounded-2xl"
            style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header strip */}
            {selectedService && (
              <div className="relative overflow-hidden" style={{ height: '140px' }}>
                <Image
                  src={selectedService.image}
                  alt={selectedService.name}
                  fill
                  className="object-cover opacity-40"
                  sizes="520px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                  {selectedStylist && (
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[#B6F500]">
                      <Image
                        src={selectedStylist.image}
                        alt={selectedStylist.name}
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-body text-[13px] leading-snug font-medium text-white">
                      {selectedStylist?.name ?? '—'}
                    </p>
                    <p className="font-body text-[10px] text-white/40">
                      {selectedStylist?.title ?? ''}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-b border-white/[0.06] px-6 py-5">
              <p className="font-body text-[9px] tracking-[0.26em] text-white/25 uppercase">
                (Booking Receipt)
              </p>
            </div>

            <div className="space-y-3.5 px-6 py-5">
              {[
                { label: 'Service', value: selectedService?.name ?? '—' },
                { label: 'Date', value: booking.dateLabel || '—' },
                { label: 'Time', value: booking.time || '—' },
                { label: 'Duration', value: selectedService?.duration ?? '—' },
                { label: 'Name', value: booking.name || '—' },
                { label: 'Email', value: booking.email || '—' },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                  style={{
                    paddingBottom: i < arr.length - 1 ? '14px' : 0,
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <span className="font-body text-[11px] text-white/30">{item.label}</span>
                  <span className="font-body text-[12px] font-medium text-white">{item.value}</span>
                </div>
              ))}

              {/* Total */}
              <div
                className="mt-1 flex items-center justify-between pt-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
              >
                <span className="font-body text-[11px] text-white/30">Estimated Total</span>
                <span className="font-display text-2xl" style={{ color: '#B6F500' }}>
                  {selectedService?.price ?? '—'}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={reset}
              className="font-body text-[10px] tracking-[0.20em] text-black/30 uppercase underline underline-offset-4 transition-colors hover:text-black"
            >
              Make another booking
            </button>
          </motion.div>
        </motion.div>
      </main>
    )
  }

  // ── Main page ────────────────────────────────────────────────────────────────
  return (
    <main>
      {/* ══════════════════════════════════════════════════════════════════════
          §1  HERO — clean white, centered text
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white" style={{ minHeight: '65vh' }}>
        {/* Hero content */}
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{ minHeight: '65vh', paddingTop: '130px', paddingBottom: '70px' }}
        >
          <motion.p
            className="font-body mb-8 text-[9px] tracking-[0.38em] text-black/35 uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            (Reserve your session)
          </motion.p>

          <motion.h1
            className="font-display text-black"
            style={{
              fontSize: 'clamp(3.8rem, 10vw, 11rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Book Your
            <br />
            Experience.
          </motion.h1>

          <motion.p
            className="font-body mt-7 max-w-[320px] text-[13px] leading-[1.8] text-black/40"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            Five steps to your next Urban Trim session — crafted for precision, delivered with care.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          §2  BOOKING FLOW — left form + right sticky panel
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#f0f0f0' }}>
        <div className="mx-auto grid min-h-screen max-w-[1400px] items-start lg:grid-cols-[1fr_400px]">
          {/* ── LEFT: form area ───────────────────────────────────────────── */}
          <div className="px-6 pt-16 pb-28 md:px-10 lg:px-14">
            {/* Progress header */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="mb-6 flex items-end justify-between">
                {/* Step counter */}
                <div className="flex items-end gap-2">
                  <span
                    className="font-body leading-none font-black"
                    style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', color: '#000' }}
                  >
                    {String(step + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-body mb-1 leading-none"
                    style={{ fontSize: 'clamp(1.2rem,2.5vw,2rem)', color: '#ccc' }}
                  >
                    / {String(STEP_LABELS.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Step pill navigation */}
                <div className="hidden items-center gap-[6px] md:flex">
                  {STEP_LABELS.map((label, i) => (
                    <button
                      key={label}
                      onClick={() => i < step && setStep(i)}
                      disabled={i >= step}
                      className="cursor-default transition-all duration-300 disabled:cursor-not-allowed"
                      title={i < step ? `Back to ${label}` : label}
                    >
                      <span
                        className="font-body block rounded-full px-3 py-[5px] text-[9px] tracking-[0.18em] uppercase transition-all duration-300"
                        style={{
                          background:
                            i === step ? '#000' : i < step ? '#B6F500' : 'rgba(0,0,0,0.08)',
                          color: i === step ? '#fff' : i < step ? '#000' : '#a0a0a0',
                        }}
                      >
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Thin animated progress bar */}
              <div
                className="h-[2px] overflow-hidden rounded-full"
                style={{ background: 'rgba(0,0,0,0.10)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: '#B6F500' }}
                  animate={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>

            {/* Step content — animated transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* ── STEP 0: Service ─────────────────────────────────────────── */}
                {step === 0 && (
                  <div>
                    <h2
                      className="font-display mb-3 leading-[0.92] text-black"
                      style={{ fontSize: 'clamp(2rem,4.5vw,4.5rem)' }}
                    >
                      Choose your service.
                    </h2>
                    <p className="font-body mb-10 text-[13px] leading-relaxed text-[#777]">
                      Select the treatment that best fits your needs.
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {services.map((service) => (
                        <ServiceCard
                          key={service.slug}
                          service={service}
                          selected={booking.service === service.slug}
                          onSelect={() => setBooking({ ...booking, service: service.slug })}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* ── STEP 1: Artist ──────────────────────────────────────────── */}
                {step === 1 && (
                  <div>
                    <h2
                      className="font-display mb-3 leading-[0.92] text-black"
                      style={{ fontSize: 'clamp(2rem,4.5vw,4.5rem)' }}
                    >
                      Choose your artist.
                    </h2>
                    <p className="font-body mb-10 text-[13px] leading-relaxed text-[#777]">
                      Each of our artists brings a unique mastery to the chair.
                    </p>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      {team.map((member) => (
                        <ArtistCard
                          key={member.slug}
                          member={member}
                          selected={booking.stylist === member.slug}
                          onSelect={() => setBooking({ ...booking, stylist: member.slug })}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Schedule ────────────────────────────────────────── */}
                {step === 2 && (
                  <div>
                    <h2
                      className="font-display mb-3 leading-[0.92] text-black"
                      style={{ fontSize: 'clamp(2rem,4.5vw,4.5rem)' }}
                    >
                      Select date & time.
                    </h2>
                    <p className="font-body mb-10 text-[13px] leading-relaxed text-[#777]">
                      We are open Monday through Saturday, 09:00 — 19:00.
                    </p>

                    {/* Date horizontal scroll strip */}
                    <div className="mb-10">
                      <p className="font-body mb-5 text-[9px] tracking-[0.28em] text-black/30 uppercase">
                        (Date)
                      </p>
                      <div
                        className="flex gap-3 pb-4"
                        style={
                          {
                            overflowX: 'auto',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                          } as React.CSSProperties
                        }
                      >
                        {DATES.map((d) => {
                          const sel = booking.date === d.iso
                          return (
                            <motion.button
                              key={d.iso}
                              onClick={() =>
                                setBooking({ ...booking, date: d.iso, dateLabel: d.label })
                              }
                              className="flex flex-shrink-0 flex-col items-center rounded-2xl transition-all duration-300"
                              style={{
                                padding: '14px 16px',
                                background: sel ? '#000' : '#fff',
                                border: sel ? '2px solid #B6F500' : '2px solid #e8e8e8',
                                minWidth: '68px',
                              }}
                              whileTap={{ scale: 0.96 }}
                              data-cursor="hover"
                            >
                              <span
                                className="font-body mb-1.5 text-[8px] leading-none tracking-[0.18em] uppercase"
                                style={{ color: sel ? '#B6F500' : '#a0a0a0' }}
                              >
                                {d.dayName}
                              </span>
                              <span
                                className="font-body leading-none font-black"
                                style={{ fontSize: '1.6rem', color: sel ? '#fff' : '#000' }}
                              >
                                {d.dayNum}
                              </span>
                              <span
                                className="font-body mt-1.5 text-[8px] leading-none"
                                style={{ color: sel ? 'rgba(255,255,255,0.40)' : '#a0a0a0' }}
                              >
                                {d.month}
                              </span>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Time slots */}
                    <div>
                      <p className="font-body mb-6 text-[9px] tracking-[0.28em] text-black/30 uppercase">
                        (Time)
                      </p>
                      <TimeGroup
                        label="Morning"
                        times={TIMES_AM}
                        selected={booking.time}
                        onSelect={(t) => setBooking({ ...booking, time: t })}
                      />
                      <TimeGroup
                        label="Afternoon"
                        times={TIMES_PM}
                        selected={booking.time}
                        onSelect={(t) => setBooking({ ...booking, time: t })}
                      />
                      <TimeGroup
                        label="Evening"
                        times={TIMES_EVE}
                        selected={booking.time}
                        onSelect={(t) => setBooking({ ...booking, time: t })}
                      />
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Details ─────────────────────────────────────────── */}
                {step === 3 && (
                  <div>
                    <h2
                      className="font-display mb-3 leading-[0.92] text-black"
                      style={{ fontSize: 'clamp(2rem,4.5vw,4.5rem)' }}
                    >
                      Your details.
                    </h2>
                    <p className="font-body mb-10 text-[13px] leading-relaxed text-[#777]">
                      We keep your information private and secure.
                    </p>

                    <div className="max-w-[520px]">
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div
                          className="pt-6 pb-5 sm:pr-6"
                          style={{ borderBottom: '1px solid rgba(0,0,0,0.10)' }}
                        >
                          <label className="font-body mb-3 flex items-center gap-2 text-[9px] tracking-[0.28em] text-black/35 uppercase select-none">
                            <User size={9} />
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={booking.name}
                            onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                            className="font-body w-full bg-transparent text-[14px] text-black caret-black outline-none placeholder:text-black/20"
                            placeholder="Your name"
                          />
                        </div>
                        <div
                          className="pt-6 pb-5"
                          style={{
                            borderBottom: '1px solid rgba(0,0,0,0.10)',
                            borderLeft: 'none',
                            paddingLeft: 0,
                          }}
                          // on sm+ screens add left border
                          data-field="email"
                        >
                          <label className="font-body mb-3 flex items-center gap-2 text-[9px] tracking-[0.28em] text-black/35 uppercase select-none sm:pl-6">
                            <Mail size={9} />
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={booking.email}
                            onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                            className="font-body w-full bg-transparent text-[14px] text-black caret-black outline-none placeholder:text-black/20 sm:pl-6"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div
                        className="pt-6 pb-5"
                        style={{ borderBottom: '1px solid rgba(0,0,0,0.10)' }}
                      >
                        <label className="font-body mb-3 flex items-center gap-2 text-[9px] tracking-[0.28em] text-black/35 uppercase select-none">
                          <Phone size={9} />
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          value={booking.phone}
                          onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                          className="font-body w-full bg-transparent text-[14px] text-black caret-black outline-none placeholder:text-black/20"
                          placeholder="+1 (212) 000-0000"
                        />
                      </div>

                      {/* Notes */}
                      <div
                        className="pt-6 pb-5"
                        style={{ borderBottom: '1px solid rgba(0,0,0,0.10)' }}
                      >
                        <label className="font-body mb-3 flex items-center gap-2 text-[9px] tracking-[0.28em] text-black/35 uppercase select-none">
                          <FileText size={9} />
                          Special Requests (optional)
                        </label>
                        <textarea
                          value={booking.notes}
                          onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                          rows={4}
                          className="font-body w-full resize-none bg-transparent text-[14px] text-black caret-black outline-none placeholder:text-black/20"
                          placeholder="Any requests for your artist..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Review ──────────────────────────────────────────── */}
                {step === 4 && (
                  <div>
                    <h2
                      className="font-display mb-3 leading-[0.92] text-black"
                      style={{ fontSize: 'clamp(2rem,4.5vw,4.5rem)' }}
                    >
                      Review & confirm.
                    </h2>
                    <p className="font-body mb-8 text-[13px] leading-relaxed text-[#777]">
                      Everything looks right? Let&apos;s get you booked.
                    </p>

                    {/* Summary card */}
                    <div
                      className="mb-6 overflow-hidden rounded-2xl"
                      style={{ background: '#0d0d0d', maxWidth: '540px' }}
                    >
                      {/* Image header with stylist info */}
                      {selectedService && (
                        <div className="relative overflow-hidden" style={{ height: '160px' }}>
                          <Image
                            src={selectedService.image}
                            alt={selectedService.name}
                            fill
                            className="object-cover opacity-45"
                            sizes="540px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/20 to-transparent" />
                          <div className="absolute bottom-5 left-6 flex items-center gap-3">
                            {selectedStylist && (
                              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[#B6F500]">
                                <Image
                                  src={selectedStylist.image}
                                  alt={selectedStylist.name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-body text-[13px] leading-snug font-medium text-white">
                                {selectedStylist?.name ?? '—'}
                              </p>
                              <p className="font-body text-[10px] text-white/40">
                                {selectedStylist?.specialty ?? ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="border-b border-white/[0.06] px-6 py-4">
                        <p className="font-body text-[9px] tracking-[0.24em] text-white/25 uppercase">
                          (Booking Summary)
                        </p>
                      </div>

                      <div className="space-y-3.5 px-6 py-5">
                        {[
                          { label: 'Service', value: selectedService?.name ?? '—' },
                          { label: 'Date', value: booking.dateLabel || '—' },
                          { label: 'Time', value: booking.time || '—' },
                          { label: 'Duration', value: selectedService?.duration ?? '—' },
                          { label: 'Name', value: booking.name || '—' },
                          { label: 'Email', value: booking.email || '—' },
                        ].map((item, i, arr) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between"
                            style={{
                              paddingBottom: i < arr.length - 1 ? '14px' : 0,
                              borderBottom:
                                i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                            }}
                          >
                            <span className="font-body text-[11px] text-white/30">
                              {item.label}
                            </span>
                            <span className="font-body text-[12px] text-white">{item.value}</span>
                          </div>
                        ))}

                        <div
                          className="mt-1 flex items-center justify-between pt-4"
                          style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
                        >
                          <span className="font-body text-[11px] text-white/30">
                            Estimated Total
                          </span>
                          <span className="font-display text-2xl" style={{ color: '#B6F500' }}>
                            {selectedService?.price ?? '—'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Policy */}
                    <div
                      className="max-w-[540px] rounded-2xl p-5"
                      style={{
                        background: 'rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.07)',
                      }}
                    >
                      <p className="font-body mb-2 text-[9px] tracking-[0.22em] text-black/28 uppercase">
                        (Cancellation Policy)
                      </p>
                      <p className="font-body text-[12px] leading-relaxed text-[#666]">
                        24-hour advance notice required for cancellations or rescheduling. Late
                        cancellations may incur a $25 fee.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* ── Navigation ── */}
            <div className="mt-14 flex items-center gap-4">
              {step > 0 && (
                <motion.button
                  onClick={() => setStep(step - 1)}
                  className="group font-body inline-flex items-center gap-2 rounded-full bg-white px-6 py-[13px] text-[11px] tracking-[0.06em] transition-all duration-300"
                  style={{ border: '1px solid rgba(0,0,0,0.13)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor="hover"
                >
                  <ArrowLeft
                    size={12}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                  Back
                </motion.button>
              )}

              {step < 4 ? (
                <motion.button
                  onClick={() => canProceed() && setStep(step + 1)}
                  disabled={!canProceed()}
                  className="font-body inline-flex items-center gap-2 rounded-full px-9 py-[14px] text-[11px] tracking-[0.06em] transition-all duration-300"
                  style={{
                    background: canProceed() ? '#000' : 'rgba(0,0,0,0.10)',
                    color: canProceed() ? '#fff' : 'rgba(0,0,0,0.25)',
                    cursor: canProceed() ? 'none' : 'not-allowed',
                  }}
                  whileHover={
                    canProceed() ? { backgroundColor: '#B6F500', color: '#000', scale: 1.02 } : {}
                  }
                  whileTap={canProceed() ? { scale: 0.97 } : {}}
                  data-cursor="hover"
                >
                  Continue
                  <ArrowUpRight size={13} />
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => setSubmitted(true)}
                  className="font-body inline-flex items-center gap-2 rounded-full px-10 py-[15px] text-[12px] tracking-[0.05em]"
                  style={{ background: '#000', color: '#fff' }}
                  whileHover={{ backgroundColor: '#B6F500', color: '#000', scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor="hover"
                >
                  <Check size={13} strokeWidth={2.5} />
                  Confirm Booking
                </motion.button>
              )}
            </div>
          </div>

          {/* ── RIGHT: sticky summary panel ─────────────────────────────────── */}
          <div
            className="sticky top-0 hidden h-screen flex-col overflow-hidden lg:flex"
            style={{ borderLeft: '1px solid rgba(0,0,0,0.07)' }}
          >
            {/* Background image with scroll drift */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div className="absolute" style={{ inset: 0, y: rightImgY }}>
                <Image
                  src={IMAGES.booking}
                  alt="Urban Trim"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/68" />
            </div>

            {/* Panel content */}
            <div className="relative z-10 flex h-full flex-col p-8 pt-10">
              {/* Label */}
              <p className="font-body mb-auto text-[8px] tracking-[0.30em] text-white/25 uppercase">
                Urban Trim™ — New York
              </p>

              {/* Live summary glassmorphism card */}
              <div
                className="mb-8 overflow-hidden rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              >
                <div className="border-b border-white/[0.07] px-5 py-4">
                  <p className="font-body text-[8px] tracking-[0.26em] text-white/28 uppercase">
                    (Your booking)
                  </p>
                </div>
                <div className="space-y-3 px-5 py-4">
                  {[
                    { label: 'Service', value: selectedService?.name },
                    { label: 'Artist', value: selectedStylist?.name },
                    { label: 'Date', value: booking.dateLabel || undefined },
                    { label: 'Time', value: booking.time || undefined },
                    { label: 'Name', value: booking.name || undefined },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-3">
                      <span className="font-body shrink-0 text-[10px] text-white/28">{label}</span>
                      <span
                        className="font-body text-right text-[11px] transition-colors duration-300"
                        style={{ color: value ? '#fff' : 'rgba(255,255,255,0.15)' }}
                      >
                        {value ?? '—'}
                      </span>
                    </div>
                  ))}

                  {/* Price line */}
                  <AnimatePresence>
                    {selectedService && (
                      <motion.div
                        className="mt-1 flex items-center justify-between pt-3"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span className="font-body text-[10px] text-white/28">From</span>
                        <span className="font-display text-[1.4rem]" style={{ color: '#B6F500' }}>
                          {selectedService.price}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Quote */}
              <p
                className="font-display leading-[1.15] text-white/55"
                style={{ fontSize: 'clamp(1.2rem,1.6vw,1.5rem)' }}
              >
                Your transformation
                <br />
                begins here.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
