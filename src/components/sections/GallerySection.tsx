'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from '@/animations/gsap.config'
import { TextReveal } from '@/components/common/TextReveal'
import { SectionBadge } from '@/components/common/SectionBadge'
import { MarqueeText } from '@/components/common/MarqueeText'
import { IMAGES } from '@/config/images'

const galleryItems = [
  { src: IMAGES.gallery[0], label: 'Signature Cuts', span: 'col-span-2 row-span-2' },
  { src: IMAGES.gallery[1], label: 'Beard Art', span: 'col-span-1 row-span-2' },
  { src: IMAGES.gallery[2], label: 'Colour Work', span: 'col-span-1 row-span-1' },
  { src: IMAGES.gallery[3], label: 'Studio Life', span: 'col-span-1 row-span-1' },
  { src: IMAGES.gallery[4], label: 'Precision Fade', span: 'col-span-1 row-span-2' },
  { src: IMAGES.gallery[5], label: 'Luxury Interior', span: 'col-span-2 row-span-1' },
  { src: IMAGES.gallery[6], label: 'Ritual & Care', span: 'col-span-1 row-span-1' },
  { src: IMAGES.gallery[7], label: 'Finishing Touch', span: 'col-span-1 row-span-1' },
]

const marqueeLabels = [
  '— Haircut',
  '— Beard',
  '— Colour',
  '— Shave',
  '— Treatment',
  '— Style',
  '— Texture',
  '— Finish',
]

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: {
            each: 0.1,
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-pad bg-ut-surface relative overflow-hidden"
    >
      <div className="container-wide mb-12 md:mb-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionBadge label="Our Work" number="04" className="mb-6" />
            <h2 className="font-display text-ut-cream text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] font-light italic">
              <TextReveal text="The Art" />
              <br />
              <TextReveal text="We Create." delay={0.15} className="text-ut-gold" />
            </h2>
          </div>
          <p className="font-body text-ut-muted max-w-xs text-[14px] leading-relaxed">
            Every photograph is a testament to craft. Every result, a story of transformation.
          </p>
        </div>
      </div>

      {/* Bento grid */}
      <div className="container-wide">
        <div className="gallery-grid grid h-[600px] grid-cols-4 grid-rows-4 gap-2 md:h-[800px] md:gap-3 lg:h-[900px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              className={`gallery-item group relative overflow-hidden opacity-0 ${item.span}`}
              data-cursor="hover"
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={80}
                />
              </motion.div>

              {/* Overlay on hover */}
              <motion.div
                className="bg-ut-black/60 absolute inset-0 flex items-end p-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-body text-ut-gold border-ut-gold/40 border-b pb-0.5 text-[11px] tracking-[0.2em] uppercase">
                  {item.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="border-ut-border mt-12 overflow-hidden border-y py-3">
        <MarqueeText
          items={marqueeLabels}
          duration={20}
          className="font-display text-ut-cream/30 text-[clamp(1.5rem,3vw,2.5rem)] italic"
          separator="·"
        />
      </div>
    </section>
  )
}
