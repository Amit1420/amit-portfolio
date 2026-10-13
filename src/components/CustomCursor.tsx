'use client'

import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, [role="button"]'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  // Only on precise pointers (mouse/trackpad) and when the user allows motion
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !reduced.matches)
    update()
    fine.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('custom-cursor')

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let hovering = false
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    // Event delegation: one listener covers elements added later
    const onOver = (e: MouseEvent) => {
      hovering = !!(e.target as Element | null)?.closest?.(INTERACTIVE)
    }

    const tick = () => {
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      const scale = hovering ? 1.7 : 1
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px) scale(${scale})`
      ring.style.opacity = hovering ? '0.7' : '0.35'
      ring.style.borderColor = hovering ? 'rgba(99,102,241,0.9)' : 'rgba(99,102,241,0.5)'
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{ background: '#818cf8', boxShadow: '0 0 6px rgba(129,140,248,0.8)', willChange: 'transform' }}
        aria-hidden />
      <div ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] border-2 transition-[border-color,opacity] duration-200"
        style={{ borderColor: 'rgba(99,102,241,0.5)', willChange: 'transform' }}
        aria-hidden />
    </>
  )
}
