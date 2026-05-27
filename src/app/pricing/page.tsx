'use client'

import { motion } from 'framer-motion'
import { PricingSection } from '@/components/home/PricingSection'
import { FAQSection } from '@/components/home/FAQSection'
import { StatsSection } from '@/components/home/StatsSection'

export default function PricingPage() {
  return (
    <main>
      {/* ═══════════════════════════════════════════════════════════════════════
          §1  PAGE HERO
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1400px] px-6 pt-40 pb-20 md:px-10 lg:px-14">
        <motion.div
          className="mb-10 flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="h-px w-8 bg-[#B6F500]" />
          <span className="font-body text-[10px] tracking-[0.32em] text-[#a0a0a0] uppercase">
            Pricing
          </span>
        </motion.div>

        <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.55fr]">
          <motion.h1
            className="font-display text-[clamp(3.5rem,8vw,9rem)] leading-[0.88]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Invest in the
            <br />
            <span style={{ color: 'black' }}>extraordinary.</span>
          </motion.h1>
          <motion.p
            className="font-body mb-2 max-w-xs text-[15px] leading-relaxed text-[#555]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Every session is a tailored experience. Choose the level that matches your lifestyle and
            expectations.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          §2  PRICING — reused home component (cycling headline + 2 plan cards)
          ═══════════════════════════════════════════════════════════════════════ */}
      <PricingSection />

      {/* ═══════════════════════════════════════════════════════════════════════
          §3  FAQ — reused home component
          ═══════════════════════════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ═══════════════════════════════════════════════════════════════════════
          §4  STATS — reused home component
          ═══════════════════════════════════════════════════════════════════════ */}
      <StatsSection />
    </main>
  )
}
