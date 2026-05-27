'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { SectionBadge } from '@/components/common/SectionBadge'
import { TextReveal } from '@/components/common/TextReveal'

const faqs = [
  {
    q: 'How do I book an appointment?',
    a: 'You can book directly through our website using the booking section above, or call us at (212) 555-0180. We recommend booking at least 48 hours in advance to secure your preferred stylist and time.',
  },
  {
    q: 'What should I expect during my first visit?',
    a: 'Your first visit begins with a complimentary consultation where we discuss your style goals, hair type, and lifestyle. This ensures your stylist understands exactly what you want before a single scissor moves.',
  },
  {
    q: 'Do you offer same-day appointments?',
    a: 'Same-day appointments are available subject to stylist availability. We recommend calling us directly for last-minute bookings. Members on our Signature and Elite plans receive priority scheduling.',
  },
  {
    q: 'What products do you use?',
    a: 'We exclusively use professional-grade, luxury products from Oribe, Kerastase, and Bumble and Bumble — chosen for their performance, hair health benefits, and sustainability credentials.',
  },
  {
    q: 'Can I request a specific stylist?',
    a: 'Absolutely. Every booking allows you to select your preferred stylist. Members on our Elite tier have a dedicated stylist assigned exclusively to them for all visits.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'We ask for 24 hours notice for cancellations or rescheduling. Late cancellations (under 6 hours) or no-shows may incur a 50% service fee. Membership clients receive one free late-cancellation per month.',
  },
  {
    q: 'Do you offer services for women?',
    a: 'While our brand identity leans toward the modern gentleman, we welcome all genders. Our Colour & Highlights, Scalp Treatment, and Style & Finish services are enjoyed by all our clients.',
  },
  {
    q: 'Where are you located?',
    a: 'Urban Trim is located in the Lower East Side of Manhattan, New York City. Our studio is open Monday through Saturday, 9am–7pm, and Sunday 10am–5pm.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="section-pad bg-ut-black relative overflow-hidden">
      <div className="container-wide max-w-4xl">
        <SectionBadge label="FAQ" number="09" className="mb-8" />
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <h2 className="font-display text-ut-cream text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] font-light italic">
            <TextReveal text="Common" />
            <br />
            <TextReveal text="Questions." delay={0.15} className="text-ut-gold" />
          </h2>
          <p className="font-body text-ut-muted max-w-xs text-[14px] leading-relaxed">
            Everything you need to know before your first (or next) visit.
          </p>
        </div>

        <div className="border-ut-border space-y-0 border-t">
          {faqs.map((faq, i) => (
            <div key={i} className="border-ut-border border-b">
              <button
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                data-cursor="hover"
              >
                <div className="flex items-start gap-4">
                  <span className="font-body text-ut-gold mt-0.5 shrink-0 text-[11px] tracking-[0.2em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-body text-[15px] font-medium transition-colors duration-300 ${open === i ? 'text-ut-gold' : 'text-ut-cream group-hover:text-ut-gold'}`}
                  >
                    {faq.q}
                  </span>
                </div>
                <motion.div
                  className="text-ut-muted group-hover:text-ut-gold mt-0.5 shrink-0 transition-colors duration-300"
                  animate={{ rotate: open === i ? 90 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-ut-muted max-w-2xl pb-6 pl-9 text-[14px] leading-[1.9]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="border-ut-border mt-12 border p-8 text-center">
          <p className="font-body text-ut-muted mb-4 text-[14px]">
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="mailto:hello@urbantrim.com"
            className="font-display text-ut-gold hover:text-ut-gold-light text-xl italic transition-colors duration-300"
            data-cursor="hover"
          >
            hello@urbantrim.com
          </a>
        </div>
      </div>
    </section>
  )
}
