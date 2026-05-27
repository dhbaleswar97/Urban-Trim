'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/* ─── Nav pages ──────────────────────────────────────────────────────── */

const NAV_PAGES = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Booking', href: '/booking' },
  { label: 'Contact', href: '/contact' },
]

const SOCIAL = [
  { label: 'Instagram', glyph: 'IG', href: '#' },
  { label: 'X', glyph: 'X', href: '#' },
  { label: 'TikTok', glyph: '◆', href: '#' },
]

/* ─── Footer ─────────────────────────────────────────────────────────── */

export function Footer() {
  const [newsletter, setNewsletter] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contactEmail, setContactEmail] = useState('')

  return (
    <footer>
      {/* ══════════════════════════════════════════════════════════════════
          PART 1 — Contact CTA: full-bleed image + frosted glass form card
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 520 }}>
        {/* Background image */}
        <Image
          src="/assets/images/Background-grid%20(10).jpg"
          fill
          alt=""
          className="object-cover"
          sizes="100vw"
        />
        {/* Dim overlay */}
        <div className="absolute inset-0 bg-black/48" />

        {/* Glass card */}
        <div className="relative z-10 flex min-h-[520px] items-center px-6 py-20 md:px-10 lg:px-14">
          <div
            className="w-full max-w-[520px] rounded-2xl p-8 lg:p-10"
            style={{
              background: 'rgba(8,8,8,0.62)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p className="font-body mb-5 text-[9px] tracking-[0.28em] text-white/40 uppercase">
              (Contact us)
            </p>

            <div className="mb-8 flex items-start justify-between">
              <h2 className="font-display text-[clamp(2rem,3.8vw,3rem)] leading-[1.0] text-white">
                Let&apos;s talk.
              </h2>
              <span
                className="mt-2 shrink-0 rounded-full"
                style={{ width: 11, height: 11, background: '#B6F500', display: 'block' }}
              />
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="font-body rounded-xl px-4 py-3 text-[13px] text-white transition-colors duration-200 outline-none placeholder:text-white/35"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.10)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="font-body rounded-xl px-4 py-3 text-[13px] text-white transition-colors duration-200 outline-none placeholder:text-white/35"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.10)',
                  }}
                />
              </div>

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="font-body w-full rounded-xl px-4 py-3 text-[13px] text-white transition-colors duration-200 outline-none placeholder:text-white/35"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
              />

              {/* Submit */}
              <button
                type="submit"
                className="font-body w-full rounded-full bg-black py-[13px] text-[13px] font-medium text-white transition-all duration-300 hover:bg-[#B6F500] hover:text-black"
                data-cursor="hover"
              >
                Contact us
              </button>
            </form>

            <p
              className="font-body mt-4 text-[10px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.26)' }}
            >
              By contacting us, you accept our{' '}
              <Link
                href="/contact"
                className="underline underline-offset-2 transition-colors hover:text-white/60"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                href="/contact"
                className="underline underline-offset-2 transition-colors hover:text-white/60"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PART 2 — Footer proper (black)
      ══════════════════════════════════════════════════════════════════ */}
      <div className="bg-black">
        {/* ── Tagline + CTA row ── */}
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 pt-16 pb-10 md:px-10 lg:flex-row lg:items-end lg:px-14">
          <p
            className="font-body leading-[1.55] font-medium text-white"
            style={{ fontSize: 'clamp(1rem,1.9vw,1.4rem)', maxWidth: 560 }}
          >
            Precision grooming. Artistry beyond the cut.
            <br />
            Let&apos;s create an experience worth coming back for.
          </p>
          <Link
            href="/booking"
            className="group font-body relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full border border-white/[0.12] px-7 py-[13px] text-[12px] tracking-[0.05em] transition-[box-shadow,border-color] duration-500 hover:border-[#B6F500]"
            data-cursor="hover"
            style={{
              background: 'rgba(255,255,255,0.05)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 0 22px 4px rgba(182,245,0,0.45), 0 0 48px 8px rgba(182,245,0,0.18)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'
            }}
          >
            {/* Lime fill — slides up on hover */}
            <span
              className="pointer-events-none absolute inset-0 translate-y-full rounded-full group-hover:translate-y-0"
              style={{
                background: '#B6F500',
                transition: 'transform 0.52s cubic-bezier(0.22,1,0.36,1)',
              }}
              aria-hidden="true"
            />
            <span className="relative z-10 flex items-center gap-2 text-white transition-colors duration-300 group-hover:text-black">
              Let&apos;s Collaborate <ArrowUpRight size={12} />
            </span>
          </Link>
        </div>

        {/* ── Full-width divider ── */}
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </div>

        {/* ── Main 2-col grid ── */}
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 py-14 md:px-10 lg:grid-cols-2 lg:px-14">
          {/* ── LEFT: logo + newsletter + copyright ── */}
          <div className="flex flex-col">
            {/* Logo mark */}
            <div className="mb-10 flex items-center gap-3">
              <span
                className="shrink-0 rounded-full"
                style={{
                  width: 36,
                  height: 36,
                  display: 'block',
                  background:
                    'conic-gradient(from 180deg, #B6F500 0%, #e8ff80 30%, #00cfba 60%, #B6F500 100%)',
                }}
              />
              <span
                className="font-body font-black tracking-[-0.01em] text-white"
                style={{ fontSize: 16 }}
              >
                Urban Trim™
              </span>
            </div>

            {/* Newsletter */}
            <p
              className="font-body mb-4 text-[9px] tracking-[0.28em] uppercase"
              style={{ color: 'rgba(255,255,255,0.30)' }}
            >
              (Newsletter)
            </p>
            <p className="font-body mb-6 max-w-[300px] text-[15px] leading-snug font-medium text-white">
              Be the first to know what&apos;s new.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mb-4 flex max-w-[360px] items-center overflow-hidden rounded-full"
              style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <input
                type="email"
                placeholder="E-mail"
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.value)}
                className="font-body min-w-0 flex-1 bg-transparent px-5 py-3 text-[12px] text-white outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                className="font-body m-[3px] shrink-0 rounded-full bg-white px-5 py-[9px] text-[11px] font-medium text-black transition-colors duration-300 hover:bg-[#B6F500]"
                data-cursor="hover"
              >
                Subscribe
              </button>
            </form>

            <p
              className="font-body mb-auto flex items-center gap-2 text-[10px]"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#B6F500]" />
              No noise. Just curated updates.
            </p>

            {/* Copyright */}
            <p className="font-body mt-12 text-[10px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
              © {new Date().getFullYear()} Urban Trim™ Studio — New York City
            </p>
          </div>

          {/* ── RIGHT: pages + contact + location + social ── */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {/* Pages */}
            <div>
              <p
                className="font-body mb-5 text-[9px] tracking-[0.28em] uppercase"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                (Pages)
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-[10px]">
                {NAV_PAGES.map((p) => (
                  <Link
                    key={p.label}
                    href={p.href}
                    className="font-body text-[12px] transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.50)' }}
                    data-cursor="hover"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact blocks */}
            <div className="space-y-7">
              <div>
                <p
                  className="font-body mb-3 text-[9px] tracking-[0.28em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  (New Bookings / Business)
                </p>
                <a
                  href="mailto:booking@urbantrim.com"
                  className="font-body mb-[6px] block text-[12px] transition-colors duration-200 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.50)' }}
                  data-cursor="hover"
                >
                  booking@urbantrim.com
                </a>
                <a
                  href="tel:+12125550100"
                  className="font-body block text-[12px] transition-colors duration-200 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.50)' }}
                  data-cursor="hover"
                >
                  (+1) 212 555 0100
                </a>
              </div>

              <div>
                <p
                  className="font-body mb-3 text-[9px] tracking-[0.28em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  (General Inquiries)
                </p>
                <a
                  href="mailto:studio@urbantrim.com"
                  className="font-body block text-[12px] transition-colors duration-200 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.50)' }}
                  data-cursor="hover"
                >
                  studio@urbantrim.com
                </a>
              </div>

              <div>
                <p
                  className="font-body mb-3 text-[9px] tracking-[0.28em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  (Location)
                </p>
                <p
                  className="font-body text-[12px] leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.50)' }}
                >
                  Williamsburg, Brooklyn — Floor 2<br />
                  New York City (11211)
                </p>
              </div>

              <div>
                <p
                  className="font-body mb-3 text-[9px] tracking-[0.28em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  (Social)
                </p>
                <div className="flex items-center gap-2">
                  {SOCIAL.map(({ label, glyph, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="font-body flex items-center justify-center rounded-full text-[10px] font-semibold transition-all duration-200 hover:text-white"
                      style={{
                        width: 36,
                        height: 36,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.55)',
                      }}
                      data-cursor="hover"
                    >
                      {glyph}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
