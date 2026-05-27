'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Camera, ArrowUpRight } from 'lucide-react'
import { gsap } from '@/animations/gsap.config'
import { TextReveal } from '@/components/common/TextReveal'
import { SectionBadge } from '@/components/common/SectionBadge'
import { IMAGES } from '@/config/images'

const stylists = [
  {
    name: 'Marcus Reid',
    title: 'Creative Director',
    specialty: 'Precision Cuts & Fades',
    experience: '14 years',
    clients: '3,200+',
    image: IMAGES.stylists.one,
    instagram: '@marcusreid',
    bio: 'Trained at the Vidal Sassoon Academy. Marcus brings architectural precision to every cut.',
  },
  {
    name: 'Sofia Laurent',
    title: 'Color Specialist',
    specialty: 'Color & Hair Artistry',
    experience: '10 years',
    clients: '2,800+',
    image: IMAGES.stylists.two,
    instagram: '@sofialaurent',
    bio: 'A former Parisian colorist, Sofia transforms hair with dimensional, light-catching color.',
  },
  {
    name: 'James Chen',
    title: 'Senior Stylist',
    specialty: 'Modern Texture & Style',
    experience: '9 years',
    clients: '2,100+',
    image: IMAGES.stylists.three,
    instagram: '@jameschen_hair',
    bio: 'James fuses Eastern techniques with contemporary style — texture and movement are his signatures.',
  },
]

export function StylistsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stylist-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stylists-grid',
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="stylists"
      ref={sectionRef}
      className="section-pad bg-ut-black relative overflow-hidden"
    >
      {/* Decorative line */}
      <div className="via-ut-gold/20 absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent to-transparent" />

      <div className="container-wide">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <SectionBadge label="Our Team" number="03" className="mb-6" />
            <h2 className="font-display text-ut-cream text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] font-light italic">
              <TextReveal text="Meet the" />
              <br />
              <TextReveal text="Artists." delay={0.15} className="text-ut-gold" />
            </h2>
          </div>
          <p className="font-body text-ut-muted max-w-xs text-[14px] leading-relaxed">
            Our team of master craftspeople are not just stylists — they are architects of personal
            expression.
          </p>
        </div>

        <div className="stylists-grid bg-ut-border grid grid-cols-1 gap-px md:grid-cols-3">
          {stylists.map((stylist, i) => (
            <motion.div
              key={stylist.name}
              className="stylist-card group bg-ut-black relative overflow-hidden opacity-0"
              whileHover="hovered"
              data-cursor="hover"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  variants={{ hovered: { scale: 1.07 } }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={stylist.image}
                    alt={stylist.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={85}
                  />
                </motion.div>

                {/* Overlay */}
                <motion.div
                  className="from-ut-black via-ut-black/60 absolute inset-0 bg-gradient-to-t to-transparent"
                  variants={{
                    hovered: { opacity: 1 },
                  }}
                  initial={{ opacity: 0.6 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Hover bio */}
                <motion.div
                  className="absolute inset-x-6 top-6"
                  initial={{ opacity: 0, y: -10 }}
                  variants={{ hovered: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <p className="font-body text-ut-cream/80 text-[13px] leading-relaxed">
                    {stylist.bio}
                  </p>
                </motion.div>

                {/* Number badge */}
                <div className="font-body text-ut-gold/60 absolute top-4 right-4 text-[11px] tracking-[0.2em]">
                  0{i + 1}
                </div>
              </div>

              {/* Info */}
              <div className="border-ut-border border-t p-6">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-ut-cream mb-0.5 text-2xl italic">
                      {stylist.name}
                    </h3>
                    <p className="font-body text-ut-gold text-[11px] tracking-[0.15em] uppercase">
                      {stylist.title}
                    </p>
                  </div>
                  <motion.a
                    href="#booking"
                    className="border-ut-border text-ut-muted hover:border-ut-gold hover:text-ut-gold flex h-9 w-9 items-center justify-center border transition-all duration-300"
                    data-cursor="hover"
                    variants={{ hovered: { borderColor: '#c9a96e', color: '#c9a96e' } }}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <ArrowUpRight size={14} />
                  </motion.a>
                </div>

                <p className="font-body text-ut-muted mb-4 text-[13px]">{stylist.specialty}</p>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="font-display text-ut-gold text-xl italic">{stylist.experience}</p>
                    <p className="font-body text-ut-muted text-[10px] tracking-[0.15em] uppercase">
                      Experience
                    </p>
                  </div>
                  <div className="bg-ut-border h-8 w-px" />
                  <div>
                    <p className="font-display text-ut-gold text-xl italic">{stylist.clients}</p>
                    <p className="font-body text-ut-muted text-[10px] tracking-[0.15em] uppercase">
                      Clients
                    </p>
                  </div>
                  <div className="text-ut-muted hover:text-ut-gold ml-auto flex items-center gap-1.5 transition-colors duration-300">
                    <Camera size={13} />
                    <span className="font-body text-[11px]">{stylist.instagram}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
