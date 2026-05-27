'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Scissors,
  CheckCircle2,
} from 'lucide-react'
import { SectionBadge } from '@/components/common/SectionBadge'
import { TextReveal } from '@/components/common/TextReveal'
import { IMAGES } from '@/config/images'

/* ── Schema ── */
const schema = z.object({
  service: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  stylist: z.string().min(1),
  name: z.string().min(2, 'At least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Invalid phone'),
  notes: z.string().optional(),
})
type FormData = z.infer<typeof schema>

/* ── Data ── */
const services = [
  { id: 'haircut', name: 'Signature Haircut', price: '$65', duration: '60 min' },
  { id: 'beard', name: 'Beard Sculpting', price: '$45', duration: '45 min' },
  { id: 'color', name: 'Colour & Highlights', price: '$120', duration: '90 min' },
  { id: 'treatment', name: 'Scalp Treatment', price: '$80', duration: '60 min' },
  { id: 'styling', name: 'Style & Finish', price: '$50', duration: '45 min' },
  { id: 'shave', name: 'Royal Shave', price: '$55', duration: '50 min' },
]

const stylists = [
  { id: 'marcus', name: 'Marcus Reid', title: 'Creative Director', image: IMAGES.stylists.one },
  { id: 'sofia', name: 'Sofia Laurent', title: 'Colour Specialist', image: IMAGES.stylists.two },
  { id: 'james', name: 'James Chen', title: 'Senior Stylist', image: IMAGES.stylists.three },
]

const getDates = () => {
  const dates: { value: string; display: string; day: string }[] = []
  const now = new Date()
  for (let i = 1; i <= 14; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    if (d.getDay() !== 0) {
      dates.push({
        value: d.toISOString().split('T')[0],
        display: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      })
    }
  }
  return dates
}

const times = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
]

const STEPS = [
  { id: 1, label: 'Service', icon: Scissors },
  { id: 2, label: 'Date & Time', icon: Calendar },
  { id: 3, label: 'Stylist', icon: User },
  { id: 4, label: 'Details', icon: User },
]

/* ── Slide variants ── */
const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 50 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -50 }),
}

export function BookingSection() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [confirmed, setConfirmed] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: '',
      date: '',
      time: '',
      stylist: '',
      name: '',
      email: '',
      phone: '',
      notes: '',
    },
  })

  const values = watch()
  const dates = getDates()

  const goTo = (s: number) => {
    setDirection(s > step ? 1 : -1)
    setStep(s)
  }
  const next = () => goTo(step + 1)
  const back = () => goTo(step - 1)

  const canProceed = () => {
    if (step === 1) return !!values.service
    if (step === 2) return !!(values.date && values.time)
    if (step === 3) return !!values.stylist
    return true
  }

  const onSubmit = (data: FormData) => {
    setConfirmed(true)
  }

  const selectedService = services.find((s) => s.id === values.service)
  const selectedStylist = stylists.find((s) => s.id === values.stylist)

  if (confirmed) {
    return (
      <section id="booking" className="section-pad bg-ut-surface relative overflow-hidden">
        <div className="container-wide flex min-h-[60vh] items-center justify-center">
          <motion.div
            className="max-w-md text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="border-ut-gold mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle2 size={36} className="text-ut-gold" />
            </motion.div>
            <h2 className="font-display text-ut-cream mb-3 text-4xl italic">Booking Confirmed</h2>
            <p className="font-body text-ut-muted mb-2 text-[14px]">
              Your session with <span className="text-ut-gold">{selectedStylist?.name}</span> is
              reserved.
            </p>
            <p className="font-body text-ut-muted mb-8 text-[14px]">
              We&apos;ve sent confirmation details to{' '}
              <span className="text-ut-cream">{values.email}</span>
            </p>
            <div className="border-ut-border mb-8 space-y-3 border p-6 text-left">
              <div className="flex justify-between">
                <span className="font-body text-ut-muted text-[12px] tracking-[0.15em] uppercase">
                  Service
                </span>
                <span className="font-body text-ut-cream text-[14px]">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-ut-muted text-[12px] tracking-[0.15em] uppercase">
                  Date
                </span>
                <span className="font-body text-ut-cream text-[14px]">{values.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-ut-muted text-[12px] tracking-[0.15em] uppercase">
                  Time
                </span>
                <span className="font-body text-ut-cream text-[14px]">{values.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-ut-muted text-[12px] tracking-[0.15em] uppercase">
                  Stylist
                </span>
                <span className="font-body text-ut-cream text-[14px]">{selectedStylist?.name}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setConfirmed(false)
                setStep(1)
              }}
              className="border-ut-border text-ut-muted font-body hover:border-ut-gold hover:text-ut-gold border px-8 py-3 text-[12px] tracking-[0.2em] uppercase transition-all duration-300"
              data-cursor="hover"
            >
              Book Another
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="section-pad bg-ut-surface relative overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <SectionBadge label="Book Now" number="08" className="mb-6" />
            <h2 className="font-display text-ut-cream text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] font-light italic">
              <TextReveal text="Reserve Your" />
              <br />
              <TextReveal text="Session." delay={0.15} className="text-ut-gold" />
            </h2>
          </div>
          {/* Summary panel */}
          {(values.service || values.date || values.stylist) && (
            <motion.div
              className="border-ut-border max-w-xs border p-5 text-right"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {selectedService && (
                <p className="font-body text-ut-cream mb-1 text-[13px]">{selectedService.name}</p>
              )}
              {values.date && values.time && (
                <p className="font-body text-ut-muted text-[12px]">
                  {values.date} · {values.time}
                </p>
              )}
              {selectedStylist && (
                <p className="font-body text-ut-gold mt-1 text-[12px]">{selectedStylist.name}</p>
              )}
            </motion.div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-10 flex items-center gap-0 md:mb-14">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center">
              <button
                onClick={() => step > s.id && goTo(s.id)}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  step >= s.id ? 'text-ut-gold' : 'text-ut-muted'
                } ${step > s.id ? 'cursor-pointer' : 'cursor-default'}`}
                disabled={step <= s.id}
                data-cursor={step > s.id ? 'hover' : undefined}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center border text-[11px] transition-all duration-300 ${
                    step > s.id
                      ? 'border-ut-gold bg-ut-gold text-ut-black'
                      : step === s.id
                        ? 'border-ut-gold text-ut-gold'
                        : 'border-ut-muted/30 text-ut-muted/40'
                  }`}
                >
                  {step > s.id ? <Check size={12} /> : s.id}
                </span>
                <span className="font-body hidden text-[11px] tracking-[0.15em] uppercase sm:block">
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-3 h-px flex-1 transition-all duration-500 ${step > s.id ? 'bg-ut-gold/40' : 'bg-ut-border'}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="relative min-h-[380px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* Step 1: Service */}
              {step === 1 && (
                <div>
                  <p className="font-body text-ut-muted mb-6 text-[13px]">
                    Select the service you&apos;d like to book
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setValue('service', s.id)}
                        className={`group border p-5 text-left transition-all duration-300 ${
                          values.service === s.id
                            ? 'border-ut-gold bg-ut-card'
                            : 'border-ut-border hover:border-ut-gold/40'
                        }`}
                        data-cursor="hover"
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <span
                            className={`font-body text-[13px] font-medium transition-colors ${values.service === s.id ? 'text-ut-cream' : 'text-ut-muted group-hover:text-ut-cream'}`}
                          >
                            {s.name}
                          </span>
                          {values.service === s.id && (
                            <Check size={14} className="text-ut-gold shrink-0" />
                          )}
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-ut-muted text-[12px]">{s.duration}</span>
                          <span className="font-body text-ut-gold text-[14px]">{s.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <p className="font-body text-ut-muted mb-4 flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase">
                      <Calendar size={13} className="text-ut-gold" /> Choose a Date
                    </p>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                      {dates.map((d) => (
                        <button
                          key={d.value}
                          onClick={() => setValue('date', d.value)}
                          className={`flex flex-col items-center border px-2 py-3 transition-all duration-300 ${
                            values.date === d.value
                              ? 'border-ut-gold bg-ut-card text-ut-gold'
                              : 'border-ut-border text-ut-muted hover:border-ut-gold/40 hover:text-ut-cream'
                          }`}
                          data-cursor="hover"
                        >
                          <span className="font-body text-[9px] tracking-[0.1em] uppercase">
                            {d.day}
                          </span>
                          <span className="font-body mt-0.5 text-[13px] font-medium">
                            {d.display.split(' ')[1]}
                          </span>
                          <span className="font-body text-[9px] opacity-60">
                            {d.display.split(' ')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-body text-ut-muted mb-4 flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase">
                      <Clock size={13} className="text-ut-gold" /> Choose a Time
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {times.map((t) => (
                        <button
                          key={t}
                          onClick={() => setValue('time', t)}
                          className={`font-body border px-3 py-2.5 text-center text-[13px] transition-all duration-300 ${
                            values.time === t
                              ? 'border-ut-gold bg-ut-card text-ut-gold'
                              : 'border-ut-border text-ut-muted hover:border-ut-gold/40 hover:text-ut-cream'
                          }`}
                          data-cursor="hover"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Stylist */}
              {step === 3 && (
                <div>
                  <p className="font-body text-ut-muted mb-6 text-[13px]">
                    Choose your preferred stylist
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {stylists.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setValue('stylist', s.id)}
                        className={`group relative overflow-hidden border text-left transition-all duration-300 ${
                          values.stylist === s.id
                            ? 'border-ut-gold'
                            : 'border-ut-border hover:border-ut-gold/40'
                        }`}
                        data-cursor="hover"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <Image
                            src={s.image}
                            alt={s.name}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            sizes="300px"
                          />
                          {values.stylist === s.id && (
                            <div className="bg-ut-gold absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full">
                              <Check size={12} className="text-ut-black" />
                            </div>
                          )}
                        </div>
                        <div className="bg-ut-card p-4">
                          <p className="font-body text-ut-cream text-[14px] font-medium">
                            {s.name}
                          </p>
                          <p className="font-body text-ut-gold mt-0.5 text-[11px]">{s.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Details */}
              {step === 4 && (
                <form onSubmit={handleSubmit(onSubmit)} id="booking-form">
                  <p className="font-body text-ut-muted mb-6 text-[13px]">
                    Fill in your contact details to complete the booking
                  </p>
                  <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="font-body text-ut-muted mb-2 block text-[11px] tracking-[0.15em] uppercase">
                        Full Name *
                      </label>
                      <input
                        {...register('name')}
                        placeholder="Your full name"
                        className="ut-input"
                      />
                      {errors.name && (
                        <p className="font-body mt-1 text-[11px] text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="font-body text-ut-muted mb-2 block text-[11px] tracking-[0.15em] uppercase">
                        Email *
                      </label>
                      <input
                        {...register('email')}
                        placeholder="your@email.com"
                        className="ut-input"
                        type="email"
                      />
                      {errors.email && (
                        <p className="font-body mt-1 text-[11px] text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="font-body text-ut-muted mb-2 block text-[11px] tracking-[0.15em] uppercase">
                        Phone *
                      </label>
                      <input
                        {...register('phone')}
                        placeholder="+1 (000) 000-0000"
                        className="ut-input"
                        type="tel"
                      />
                      {errors.phone && (
                        <p className="font-body mt-1 text-[11px] text-red-400">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-body text-ut-muted mb-2 block text-[11px] tracking-[0.15em] uppercase">
                        Notes (optional)
                      </label>
                      <textarea
                        {...register('notes')}
                        placeholder="Any special requests or notes..."
                        className="ut-input h-24 resize-none"
                      />
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="border-ut-border mt-8 flex items-center justify-between border-t pt-6">
          <button
            onClick={back}
            disabled={step === 1}
            className="font-body text-ut-muted hover:text-ut-cream flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase transition-colors duration-300 disabled:pointer-events-none disabled:opacity-30"
            data-cursor="hover"
          >
            <ChevronLeft size={14} /> Back
          </button>

          {step < 4 ? (
            <motion.button
              onClick={next}
              disabled={!canProceed()}
              className="bg-ut-gold text-ut-black font-body hover:bg-ut-gold-light flex items-center gap-2 px-8 py-3.5 text-[12px] tracking-[0.2em] uppercase transition-colors duration-300 disabled:pointer-events-none disabled:opacity-40"
              data-cursor="hover"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue <ChevronRight size={14} />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              form="booking-form"
              className="bg-ut-gold text-ut-black font-body hover:bg-ut-gold-light flex items-center gap-2 px-8 py-3.5 text-[12px] tracking-[0.2em] uppercase transition-colors duration-300"
              data-cursor="hover"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Confirm Booking <Check size={14} />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  )
}
