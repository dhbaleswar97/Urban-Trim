'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface UTButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'dark' | 'lime' | 'outline'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  external?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function UTButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size,
  className,
  external,
  type = 'button',
  disabled,
}: UTButtonProps) {
  const variantClass = {
    primary: 'ut-btn-primary',
    dark: 'ut-btn-dark',
    lime: 'ut-btn-lime',
    outline: 'ut-btn-outline',
  }[variant]

  const sizeClass = size === 'sm' ? 'ut-btn-sm' : size === 'lg' ? 'ut-btn-lg' : ''
  const cls = cn('ut-btn', variantClass, sizeClass, className)

  const inner = (
    <>
      <span className="ut-btn-fill" aria-hidden="true" />
      <span className="ut-btn-text">{children}</span>
    </>
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
        >
          {inner}
        </a>
      )
    }
    return (
      <Link href={href} className={cls} data-cursor="hover">
        {inner}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={cls} type={type} disabled={disabled} data-cursor="hover">
      {inner}
    </button>
  )
}
