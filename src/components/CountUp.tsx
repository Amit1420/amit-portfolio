'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: string   // e.g. "3+", "15+", "99.9%", "2"
  className?: string
}

function parseTarget(value: string): { num: number; suffix: string; isFloat: boolean } {
  const clean = value.replace(/[^0-9.]/g, '')
  const suffix = value.replace(/[0-9.]/g, '')
  const num = parseFloat(clean)
  return { num, suffix, isFloat: clean.includes('.') }
}

export default function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  // Start at the real value so crawlers, no-JS and screen readers never see "0"
  const [displayed, setDisplayed] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const { num, suffix, isFloat } = parseTarget(value)
    const duration = 1600
    const steps = 50
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = step / steps
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * num
      const formatted = isFloat ? current.toFixed(1) : Math.floor(current).toString()
      setDisplayed(formatted + suffix)
      if (step >= steps) {
        setDisplayed(value)
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{displayed}</span>
    </span>
  )
}
