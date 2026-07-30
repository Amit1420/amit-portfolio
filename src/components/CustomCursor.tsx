'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(true) // start hidden, reveal on mousemove

  useEffect(() => {
    // Hide on touch devices
    const checkTouch = () => setIsTouch(true)
    window.addEventListener('touchstart', checkTouch, { once: true, passive: true })

    let activated = false
    const onFirstMove = () => {
      if (!activated) {
        activated = true
        setIsTouch(false)
      }
    }
    window.addEventListener('mousemove', onFirstMove, { once: true, passive: true })

    return () => {
      window.removeEventListener('touchstart', checkTouch)
      window.removeEventListener('mousemove', onFirstMove)
    }
  }, [])

  useEffect(() => {
    if (isTouch) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let hovering = false
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const setHover = (v: boolean) => () => { hovering = v }

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

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', setHover(true))
        el.addEventListener('mouseleave', setHover(false))
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    addListeners()
    raf = requestAnimationFrame(tick)
    const interval = setInterval(addListeners, 2000)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      clearInterval(interval)
    }
  }, [isTouch])

  if (isTouch) return null

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
