'use client'

import { useRef, useCallback } from 'react'

export interface MouseVector {
  x: number
  y: number
  speed: number
}

export function useMouseVector() {
  const prev = useRef<{ x: number; y: number } | null>(null)

  return useCallback((clientX: number, clientY: number, rect: DOMRect): MouseVector => {
    const x = clientX - rect.left
    const y = clientY - rect.top

    if (!prev.current) {
      prev.current = { x, y }
      return { x, y, speed: 0 }
    }

    const dx = x - prev.current.x
    const dy = y - prev.current.y
    const speed = Math.sqrt(dx * dx + dy * dy)
    prev.current = { x, y }
    return { x, y, speed }
  }, [])
}
