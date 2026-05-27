'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { IMAGES } from '@/config/images'

import { MarqueeText } from '@/components/common/MarqueeText'
import { CinematicHero } from '@/components/home/CinematicHero'
import { PartnersSection } from '@/components/home/PartnersSection'
import { StickyServicesSection } from '@/components/home/StickyServicesSection'
import { EditorialAboutSection } from '@/components/home/EditorialAboutSection'
import { VisionSection } from '@/components/home/VisionSection'
import { ShowreelSection } from '@/components/home/ShowreelSection'
import { PricingSection } from '@/components/home/PricingSection'
import { FAQSection } from '@/components/home/FAQSection'
import { ServicesListSection } from '@/components/home/ServicesListSection'
import { GalleryCraftSection } from '@/components/home/GalleryCraftSection'
import { ArtisansGallery } from '@/components/ui/gallery'
import { StatsSection } from '@/components/home/StatsSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CinematicTextSection } from '@/components/home/CinematicTextSection'

export default function HomePage() {
  return (
    <main>
      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero />

      {/* ─── PARTNERS ─── */}
      <PartnersSection />

      {/* ─── MARQUEE STRIP ─── */}
      <div className="overflow-hidden border-y border-black/10 bg-[#B6F500] py-4">
        <MarqueeText
          items={[
            'Signature Haircut',
            'Beard Sculpting',
            'Colour & Highlights',
            'Royal Shave',
            'Scalp Treatment',
            'Style & Finish',
          ]}
          duration={20}
          className="font-body text-[12px] font-medium tracking-[0.22em] text-black uppercase"
          separator="✦"
        />
      </div>

      {/* ─── STICKY SERVICES ─── */}
      <StickyServicesSection />

      {/* ─── EDITORIAL ABOUT ─── */}
      <EditorialAboutSection />

      {/* ─── SERVICES LIST ─── */}
      <ServicesListSection />

      {/* ─── OUR VISION ─── */}
      <VisionSection />

      {/* ─── SHOWREEL ─── */}
      <ShowreelSection />

      {/* ─── PRICING ─── */}
      <PricingSection />

      {/* ─── FAQ ─── */}
      <FAQSection />

      {/* ─── GALLERY CRAFT SHOT ─── */}
      <GalleryCraftSection />

      {/* ─── ARTISANS ─── */}
      <section className="section-pad bg-black text-white">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
          <ArtisansGallery />
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialsSection />

      {/* ─── STATS ─── */}
      <StatsSection />

      {/* ─── CINEMATIC TEXT — sticky storytelling, exits upward into CTA ─── */}
      <CinematicTextSection />

      {/* ─── CTA BANNER — z-index:2 slides up over the departing white panel ─── */}
      <section className="relative flex h-screen overflow-hidden" style={{ zIndex: 2 }}>
        {/* Left — lime content */}
        <div className="flex flex-1 flex-col justify-center bg-[#B6F500] px-8 py-16 md:px-12 lg:px-20">
          <p className="font-body mb-6 text-[10px] font-medium tracking-[0.30em] text-black/45 uppercase">
            Ready for your transformation?
          </p>
          <h2
            className="font-display mb-12 leading-[0.92] text-black"
            style={{ fontSize: 'clamp(2.8rem,6.5vw,7.5rem)' }}
          >
            Book your
            <br />
            session today.
          </h2>

          {/* Outline → black-fill rounded button */}
          <div>
            <Link
              href="/booking"
              className="group font-body relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-black px-8 py-[14px] text-[12px] tracking-[0.05em]"
              data-cursor="hover"
            >
              <span
                className="pointer-events-none absolute inset-0 translate-y-full rounded-full bg-black group-hover:translate-y-0"
                style={{ transition: 'transform 0.52s cubic-bezier(0.22,1,0.36,1)' }}
                aria-hidden="true"
              />
              <span className="relative z-10 flex items-center gap-2 text-black transition-colors duration-300 group-hover:text-white">
                Reserve Now <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        {/* Right — cover image */}
        <div className="relative hidden w-[45%] shrink-0 lg:block">
          <Image
            src={IMAGES.gallery[6]}
            fill
            alt="Urban Trim studio"
            className="object-cover"
            sizes="45vw"
          />
        </div>
      </section>
    </main>
  )
}
