'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '@/animations/gsap.config'
import { TextReveal } from '@/components/common/TextReveal'
import { SectionBadge } from '@/components/common/SectionBadge'
import { IMAGES } from '@/config/images'

const services = [
  {
    id: '01',
    name: 'Signature Haircut',
    tagline: 'Architecture for the Modern Gentleman',
    price: 'from $65',
    duration: '60 min',
    image: IMAGES.services.haircut,
    tags: ['Consultation', 'Cut', 'Style', 'Finish'],
  },
  {
    id: '02',
    name: 'Beard Sculpting',
    tagline: 'Define Your Edge with Surgical Precision',
    price: 'from $45',
    duration: '45 min',
    image: IMAGES.services.beard,
    tags: ['Shape', 'Line-up', 'Hot Towel', 'Conditioning'],
  },
  {
    id: '03',
    name: 'Color & Highlights',
    tagline: 'Dimensional Colour, Curated for You',
    price: 'from $120',
    duration: '90 min',
    image: IMAGES.services.color,
    tags: ['Consultation', 'Colour', 'Toning', 'Gloss'],
  },
  {
    id: '04',
    name: 'Scalp Treatment',
    tagline: 'Restore, Nourish, Revitalise',
    price: 'from $80',
    duration: '60 min',
    image: IMAGES.services.treatment,
    tags: ['Analysis', 'Treatment', 'Massage', 'Mask'],
  },
  {
    id: '05',
    name: 'Style & Finish',
    tagline: 'The Final Act of Transformation',
    price: 'from $50',
    duration: '45 min',
    image: IMAGES.services.styling,
    tags: ['Wash', 'Blowout', 'Texture', 'Set'],
  },
  {
    id: '06',
    name: 'Royal Shave',
    tagline: 'A Ritual Passed Through Generations',
    price: 'from $55',
    duration: '50 min',
    image: IMAGES.services.shave,
    tags: ['Steam', 'Straight Razor', 'Hot Towel', 'Balm'],
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-row',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-list',
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setImagePos({ x: e.clientX, y: e.clientY })
  }

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-pad bg-ut-surface relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating image (follows cursor) */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="pointer-events-none fixed z-50 aspect-[3/4] w-[280px] overflow-hidden md:w-[340px]"
            style={{
              left: imagePos.x + 24,
              top: imagePos.y - 120,
            }}
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.85, rotate: -3 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={services[activeIndex].image}
              alt={services[activeIndex].name}
              fill
              className="object-cover"
              sizes="340px"
            />
            <div className="from-ut-black/50 absolute inset-0 bg-gradient-to-t to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-wide">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <SectionBadge label="Services" number="02" className="mb-6" />
            <h2 className="font-display text-ut-cream text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] font-light italic">
              <TextReveal text="Crafted" />
              <br />
              <TextReveal text="Experiences." delay={0.15} className="text-ut-gold" />
            </h2>
          </div>
          <p className="font-body text-ut-muted max-w-xs text-[14px] leading-relaxed">
            Every service is a considered ritual — meticulously designed, flawlessly executed.
          </p>
        </div>

        {/* Services list */}
        <div className="services-list border-ut-border border-t">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className="service-row group border-ut-border relative flex cursor-none flex-col gap-4 border-b py-6 opacity-0 sm:flex-row sm:items-center md:py-8"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              data-cursor="hover"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Number */}
              <span className="font-body text-ut-muted w-8 shrink-0 text-[11px] tracking-[0.2em]">
                {service.id}
              </span>

              {/* Name */}
              <div className="flex-1">
                <h3 className="font-display text-ut-cream group-hover:text-ut-gold text-[clamp(1.4rem,3vw,2.2rem)] font-light italic transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="font-body text-ut-muted mt-0.5 hidden text-[13px] sm:block">
                  {service.tagline}
                </p>
              </div>

              {/* Tags */}
              <div className="hidden max-w-xs flex-wrap items-center gap-2 md:flex">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-ut-muted border-ut-border group-hover:border-ut-gold/30 border px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Duration */}
              <span className="font-body text-ut-muted hidden w-20 text-right text-[12px] lg:block">
                {service.duration}
              </span>

              {/* Price */}
              <span className="font-body text-ut-gold w-24 shrink-0 text-right text-[14px] font-medium">
                {service.price}
              </span>

              {/* Arrow */}
              <ArrowUpRight
                size={16}
                className="text-ut-gold shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center md:mt-16">
          <motion.button
            onClick={scrollToBooking}
            className="group border-ut-gold text-ut-gold font-body hover:bg-ut-gold hover:text-ut-black flex items-center gap-4 border px-10 py-4 text-[12px] tracking-[0.2em] uppercase transition-all duration-400"
            data-cursor="hover"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Your Experience
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
