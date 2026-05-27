'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { gsap } from '@/animations/gsap.config'
import { TextReveal } from '@/components/common/TextReveal'
import { SectionBadge } from '@/components/common/SectionBadge'

const plans = [
  {
    name: 'Essential',
    tagline: 'The Foundation',
    price: '$79',
    period: '/month',
    description: 'Perfect for the gentleman who values consistency and care.',
    features: [
      '2 Haircuts per month',
      'Beard maintenance',
      'Scalp consultation',
      'Priority booking',
      '10% off retail products',
    ],
    cta: 'Start Essential',
    popular: false,
  },
  {
    name: 'Signature',
    tagline: 'The Experience',
    price: '$149',
    period: '/month',
    description: 'Our most celebrated membership — the full Urban Trim ritual.',
    features: [
      '3 Haircuts per month',
      'Beard sculpting included',
      'Monthly scalp treatment',
      'Dedicated stylist',
      '20% off retail products',
      'Complimentary style consult',
      'Guest passes (2/month)',
    ],
    cta: 'Join Signature',
    popular: true,
  },
  {
    name: 'Elite',
    tagline: 'The Pinnacle',
    price: '$299',
    period: '/month',
    description: 'Unlimited access. Priority everything. The rarest tier.',
    features: [
      'Unlimited visits',
      'All services included',
      'Dedicated stylist (always)',
      'At-home visit option',
      '30% off all retail',
      'Annual style profile',
      'VIP event invitations',
      'Concierge booking line',
    ],
    cta: 'Enquire Elite',
    popular: false,
  },
]

export function MembershipSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.plan-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.plans-grid',
            start: 'top 78%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="membership"
      ref={sectionRef}
      className="section-pad bg-ut-black relative overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-ut-gold/3 absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
      </div>

      <div className="container-wide relative z-10">
        <div className="mb-14 text-center md:mb-20">
          <SectionBadge label="Membership" number="07" className="mx-auto mb-6" />
          <h2 className="font-display text-ut-cream mb-4 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] font-light italic">
            <TextReveal text="Choose Your" />
            <br />
            <TextReveal text="Ritual." delay={0.15} className="text-ut-gold" />
          </h2>
          <p className="font-body text-ut-muted mx-auto mt-4 max-w-md text-[14px] leading-relaxed">
            Each membership is a commitment to yourself. Curated to suit every lifestyle, priced to
            honour your investment.
          </p>
        </div>

        <div className="plans-grid bg-ut-border grid grid-cols-1 gap-px md:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`plan-card group relative flex flex-col p-8 opacity-0 transition-all duration-500 md:p-10 ${
                plan.popular ? 'bg-ut-card' : 'bg-ut-surface hover:bg-ut-card'
              }`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="bg-ut-gold text-ut-black font-body absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase">
                  <Sparkles size={10} />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <p className="font-body text-ut-gold mb-2 text-[11px] tracking-[0.2em] uppercase">
                  {plan.tagline}
                </p>
                <h3 className="font-display text-ut-cream mb-3 text-3xl italic">{plan.name}</h3>
                <p className="font-body text-ut-muted text-[13px] leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 flex items-end gap-1">
                <span className="font-display text-ut-gold text-[clamp(3rem,6vw,4.5rem)] leading-none font-light italic">
                  {plan.price}
                </span>
                <span className="font-body text-ut-muted mb-2 text-[13px]">{plan.period}</span>
              </div>

              {/* Divider */}
              <div className="bg-ut-border mb-8 h-px w-full" />

              {/* Features */}
              <ul className="mb-10 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={13} className="text-ut-gold mt-0.5 shrink-0" />
                    <span className="font-body text-ut-muted group-hover:text-ut-cream/80 text-[13px] transition-colors duration-300">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                onClick={() =>
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`font-body w-full py-4 text-[12px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  plan.popular
                    ? 'bg-ut-gold text-ut-black hover:bg-ut-gold-light'
                    : 'border-ut-border text-ut-muted hover:border-ut-gold hover:text-ut-gold border'
                }`}
                data-cursor="hover"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <p className="font-body text-ut-muted mt-8 text-center text-[12px]">
          All memberships include a complimentary first consultation. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
