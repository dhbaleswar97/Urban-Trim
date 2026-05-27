'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'view' | 'drag' | 'click' | 'hidden'

const SPRING_DOT = { stiffness: 2000, damping: 80, mass: 0.1 }

export function CustomCursor() {
  const [state, setState] = useState<CursorState>('default')
  const [label, setLabel] = useState('')
  const stateRef = useRef<CursorState>('default')

  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  const dotX = useSpring(mouseX, SPRING_DOT)
  const dotY = useSpring(mouseY, SPRING_DOT)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null
      if (cursorEl) {
        const type = cursorEl.getAttribute('data-cursor') ?? 'hover'
        if (type === 'magnetic') {
          stateRef.current = 'hidden'
          setState('hidden')
          setLabel('')
          return
        }
        if (type === 'view') {
          stateRef.current = 'view'
          setState('view')
          setLabel('VIEW')
          return
        }
        if (type === 'drag') {
          stateRef.current = 'drag'
          setState('drag')
          setLabel('DRAG')
          return
        }
        stateRef.current = 'hover'
        setState('hover')
        setLabel('')
        return
      }

      if (target.closest('a, button, input, textarea, select, [role="button"], label')) {
        stateRef.current = 'hover'
        setState('hover')
        setLabel('')
        return
      }

      stateRef.current = 'default'
      setState('default')
      setLabel('')
    }

    const onDown = () => {
      const prev = stateRef.current
      if (prev !== 'view' && prev !== 'drag') {
        stateRef.current = 'click'
        setState('click')
      }
    }

    const onUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null
      if (cursorEl) {
        const type = cursorEl.getAttribute('data-cursor') ?? 'hover'
        if (type === 'view') {
          stateRef.current = 'view'
          setState('view')
          setLabel('VIEW')
        } else if (type === 'drag') {
          stateRef.current = 'drag'
          setState('drag')
          setLabel('DRAG')
        } else {
          stateRef.current = 'hover'
          setState('hover')
          setLabel('')
        }
      } else if (target.closest('a, button, input, textarea, select, [role="button"]')) {
        stateRef.current = 'hover'
        setState('hover')
        setLabel('')
      } else {
        stateRef.current = 'default'
        setState('default')
        setLabel('')
      }
    }

    const onLeave = () => {
      stateRef.current = 'default'
      setState('default')
    }
    const onEnter = () => {
      stateRef.current = 'default'
      setState('default')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY])

  const isView = state === 'view'
  const isDrag = state === 'drag'
  const isHover = state === 'hover'
  const isClick = state === 'click'
  const isHidden = state === 'hidden'
  const isExpanded = isView || isDrag

  return (
    <motion.div
      className="custom-cursor-el pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full bg-white"
      style={{
        x: dotX,
        y: dotY,
        translateX: '-50%',
        translateY: '-50%',
        mixBlendMode: 'difference',
      }}
      animate={{
        width: isExpanded ? 110 : isHover ? 30 : isClick ? 14 : 20,
        height: isExpanded ? 110 : isHover ? 30 : isClick ? 14 : 20,
        opacity: isHidden ? 0 : 1,
        scale: isHidden ? 0.2 : isClick ? 0.8 : 1,
      }}
      transition={{
        width: { duration: isExpanded ? 0.45 : 0.2, ease: [0.22, 1, 0.36, 1] },
        height: { duration: isExpanded ? 0.45 : 0.2, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.22, ease: 'easeOut' },
        scale: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.span
            key={label}
            className="pointer-events-none text-black select-none"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
            initial={{ opacity: 0, scale: 0.5, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -4 }}
            transition={{ duration: 0.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
