'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

// ─── PHOTO DATA ────────────────────────────────────────────────────────────────

const G = '/assets/images/Urban-trim-web-Gallery'

const PHOTOS = [
  {
    src: `${G}/Precision%20Haircut%20%26%20Styling/Precision%20Haircut%20%26%20Styling%20(1).jpg`,
    category: 'Precision Haircut',
    tall: true,
  },
  {
    src: `${G}/Luxury%20Beard%20Sculpting/Luxury%20Beard%20Sculpting%20(1).jpg`,
    category: 'Beard Sculpting',
    tall: false,
  },
  {
    src: `${G}/Hair%20Coloring%20%26%20Highlights/Hair%20Coloring%20%26%20Highlights%20(1).jpg`,
    category: 'Colour & Highlights',
    tall: false,
  },
  {
    src: `${G}/Advanced%20Hair%20Spa%20Therapy/Advanced%20Hair%20Spa%20Therapy%20(1).jpg`,
    category: 'Hair Spa Therapy',
    tall: false,
  },
  {
    src: `${G}/Smooth%20Blowout%20Styling/Smooth%20Blowout%20Styling%20(2).jpg`,
    category: 'Blowout Styling',
    tall: true,
  },
  {
    src: `${G}/Precision%20Haircut%20%26%20Styling/Precision%20Haircut%20%26%20Styling%20(3).jpg`,
    category: 'Precision Haircut',
    tall: false,
  },
  {
    src: `${G}/Luxury%20Beard%20Sculpting/Luxury%20Beard%20Sculpting%20(3).jpg`,
    category: 'Beard Sculpting',
    tall: false,
  },
  {
    src: `${G}/Hair%20Coloring%20%26%20Highlights/Hair%20Coloring%20%26%20Highlights%20(2).jpg`,
    category: 'Colour & Highlights',
    tall: true,
  },
  {
    src: `${G}/Advanced%20Hair%20Spa%20Therapy/Advanced%20Hair%20Spa%20Therapy%20(2).jpg`,
    category: 'Hair Spa Therapy',
    tall: false,
  },
  {
    src: `${G}/Smooth%20Blowout%20Styling/Smooth%20Blowout%20Styling%20(3).jpg`,
    category: 'Blowout Styling',
    tall: false,
  },
  {
    src: `${G}/Precision%20Haircut%20%26%20Styling/Precision%20Haircut%20%26%20Styling%20(10).jpg`,
    category: 'Precision Haircut',
    tall: false,
  },
  {
    src: `${G}/Luxury%20Beard%20Sculpting/Luxury%20Beard%20Sculpting%20(10).jpg`,
    category: 'Beard Sculpting',
    tall: true,
  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  return (
    <main>
      {/* ═══════════════════════════════════════════════════════════════════════
          §1  HERO — white bg, newspaper layout, arch bottom into grid
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-white"
        style={{
          minHeight: '62vh',
          paddingBottom: '70px',
          borderRadius: '0 0 50vw 50vw / 0 0 72px 72px',
          zIndex: 1,
        }}
      >
        {/* Top-left column dot */}
        <div
          className="absolute hidden lg:block"
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'black',
            left: 48,
            top: 72,
          }}
        />

        {/* Top-right: label + description */}
        <div className="absolute top-24 right-8 max-w-[280px] md:right-14">
          <motion.p
            className="font-body mb-4 text-[9px] tracking-[0.30em] text-black/35 uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            (Archive 16–26©)
          </motion.p>
          <motion.p
            className="font-body text-[13px] leading-[1.8] font-medium text-black/45"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            Every frame, a moment of craft. The complete Urban Trim visual archive.
          </motion.p>
        </div>

        {/* Bottom-left: large heading */}
        <div className="absolute bottom-24 left-8 md:left-14">
          <motion.h1
            className="font-display text-black"
            style={{
              fontSize: 'clamp(3rem, 8.5vw, 9.5rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.03em',
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            The Archive
            <sup
              className="font-body font-normal text-black/28"
              style={{
                fontSize: '0.2em',
                verticalAlign: 'super',
                marginLeft: '0.5em',
                letterSpacing: '0.02em',
              }}
            >
              ({PHOTOS.length})
            </sup>
          </motion.h1>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          §2  PHOTO GRID — masonry-style CSS columns, hover reveals category
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="px-4 pt-4 pb-20 md:px-6"
        style={{ backgroundColor: '#f0f0f0', marginTop: -2 }}
      >
        <div className="columns-2 lg:columns-3" style={{ columnGap: '12px' }}>
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              className="group relative mb-3 cursor-pointer overflow-hidden rounded-xl"
              style={{
                breakInside: 'avoid',
                aspectRatio: photo.tall ? '3 / 4' : '4 / 3',
                display: 'block',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={photo.src}
                alt={photo.category}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Hover category overlay */}
              <div className="absolute inset-0 flex items-end bg-black/0 p-5 transition-colors duration-400 group-hover:bg-black/42">
                <span
                  className="font-body translate-y-2 text-[11px] tracking-[0.14em] text-white uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ transitionDelay: '0.04s' }}
                >
                  {photo.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
