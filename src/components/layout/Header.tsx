'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, X } from 'lucide-react'
import { VID_CDN } from '@/lib/cdn'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

/* ── Magnetic video logo ── */
function MagneticLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 24, mass: 0.5 })
  const y = useSpring(my, { stiffness: 220, damping: 24, mass: 0.5 })

  const onMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.3)
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.3)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
    setHovered(false)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ padding: 14, margin: -14, display: 'inline-block' }}
    >
      <motion.div
        style={{ x, y, width: 30, height: 30 }}
        animate={{ scale: hovered ? 40 / 30 : 1 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={`${VID_CDN}/assets/videos/Gradient-BG.mp4`} type="video/mp4" />
        </video>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: '#B6F500', mixBlendMode: 'darken' }}
        />
        <span
          className="font-body pointer-events-none absolute inset-0 z-10 flex items-center justify-center font-black text-white select-none"
          style={{ fontSize: 9, letterSpacing: '0.06em' }}
        >
          UT
        </span>
      </motion.div>
    </div>
  )
}

/* ── Per-character swap-text on hover ── */
function SwapText({
  text,
  className = '',
  stagger = 0.025,
}: {
  text: string
  className?: string
  stagger?: number
}) {
  const [hovered, setHovered] = useState(false)
  const chars = text.split('')

  return (
    <span
      className={`relative inline-flex overflow-hidden leading-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={text}
    >
      {/* Row A — slides up out on hover */}
      <span className="flex" aria-hidden="true">
        {chars.map((char, i) => (
          <motion.span
            key={`a-${i}`}
            className="inline-block"
            animate={{ y: hovered ? '-110%' : '0%' }}
            transition={{
              duration: 0.38,
              delay: i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </span>

      {/* Row B — slides in from below on hover */}
      <span className="absolute inset-0 flex" aria-hidden="true">
        {chars.map((char, i) => (
          <motion.span
            key={`b-${i}`}
            className="inline-block"
            animate={{ y: hovered ? '0%' : '110%' }}
            transition={{
              duration: 0.38,
              delay: i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </span>
    </span>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  /*
   * Scroll-synced nav: the header Y is driven directly by scroll progress
   * so the reveal feels physically tied to the hero returning to the
   * viewport edge — not a time-based toggle.
   *
   * Map scrollY 0 → 72px  :  headerY  0% → -100%  (slides out)
   * Clamped: stays at -100% for the entire rest of the page.
   * When scrolling back up, the inverse mapping pulls it back in only
   * as scroll approaches 0 — i.e. exactly when the hero panel is
   * re-touching the top canvas edge.
   *
   * useSpring adds a light physical lag so the reveal feels premium
   * rather than a rigid pixel-for-pixel track.
   */
  const rawHide = useTransform(scrollY, [0, 72], [0, 1], { clamp: true })
  const springHide = useSpring(rawHide, { stiffness: 180, damping: 28, mass: 0.4 })
  const headerY = useTransform(springHide, [0, 1], ['0%', '-100%'])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <motion.header className="fixed top-0 right-0 left-0 z-[100]" style={{ y: headerY }}>
        <div className="flex items-center justify-between px-6 py-5 md:px-10 lg:px-14">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/" aria-label="Urban Trim — Home" data-cursor="hover">
              <MagneticLogo />
            </Link>
          </motion.div>

          {/* Center nav — lg+ desktop */}
          <motion.nav
            className="hidden items-center gap-14 lg:flex"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-body text-[13px] transition-colors duration-300 ${
                  isActive(link.href) ? 'text-black' : 'text-[#888]'
                }`}
                data-cursor="hover"
              >
                <SwapText text={link.label} stagger={0.02} />
              </Link>
            ))}
          </motion.nav>

          {/* Hamburger — animates to X when open */}
          <motion.button
            onClick={() => setMenuOpen((o) => !o)}
            className="relative flex flex-col gap-[5px] p-1"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-cursor="hover"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.span
              className="block h-[1.5px] w-[26px] origin-center bg-black"
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="block h-[1.5px] w-[26px] origin-center bg-black"
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.button>
        </div>
      </motion.header>

      {/* ── Off-canvas right panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dim backdrop */}
            <motion.div
              className="fixed inset-0 z-[150]"
              style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[151] flex flex-col overflow-y-auto bg-black"
              style={{ width: 'clamp(300px, 36vw, 500px)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close circle — sits on left edge, vertically centered */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-1/2 -left-[22px] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black text-white transition-all duration-300 hover:border-[#B6F500] hover:bg-[#B6F500] hover:text-black"
                aria-label="Close menu"
                data-cursor="hover"
              >
                <X size={16} />
              </button>

              {/* Inline close row at top of panel */}
              <div className="flex shrink-0 items-center justify-between px-10 pt-8 pb-2 lg:px-14">
                <span className="font-body text-[10px] tracking-[0.28em] text-white/30 uppercase">
                  Navigation
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-white/60 hover:text-white"
                  aria-label="Close"
                  data-cursor="hover"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-1 flex-col justify-center gap-0 px-10 py-8 lg:px-14">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.12 + i * 0.055,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between py-5"
                      onClick={() => setMenuOpen(false)}
                      data-cursor="hover"
                    >
                      <SwapText
                        text={link.label}
                        stagger={0.03}
                        className="font-display text-[clamp(1.75rem,3.5vw,3rem)] text-white transition-colors duration-300 group-hover:text-[#B6F500]"
                      />
                      <motion.div
                        className="ml-4 shrink-0 text-white/20 transition-colors duration-300 group-hover:text-[#B6F500]"
                        whileHover={{ rotate: 45, scale: 1.2 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ArrowUpRight size={16} />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom — CTA + copyright */}
              <motion.div
                className="shrink-0 border-t border-white/10 px-10 pt-6 pb-10 lg:px-14"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link
                  href="/booking"
                  className="font-body mb-8 inline-flex items-center gap-2 rounded-full bg-[#B6F500] px-6 py-3 text-[13px] font-medium tracking-[0.03em] text-black transition-colors duration-300 hover:bg-white"
                  onClick={() => setMenuOpen(false)}
                  data-cursor="hover"
                >
                  Book a Session <ArrowUpRight size={13} />
                </Link>
                <p className="font-body text-[11px] tracking-[0.18em] text-white/25 uppercase">
                  © 2026 Urban Trim Studio
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
