'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '@/lib/data'

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Awards', id: 'awards' },
  { label: 'Appreciation', id: 'appreciation' },
  { label: 'Contact', id: 'contact' },
]

const MENU_ANIM_MS = 250

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' })
}

// Keep native link behaviour (new tab, copy link) but smooth-scroll on a plain click
function onNavClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  scrollToSection(id)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = window.location.pathname.replace(/^\//, '').split('/')[0]
    if (id && navLinks.find(l => l.id === id)) {
      const t = setTimeout(() => scrollToSection(id), 400)
      return () => clearTimeout(t)
    }
  }, [])

  // Cheap scroll listener: only flips two booleans (React skips renders when unchanged)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      if (window.scrollY < 80) setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking without per-scroll layout reads
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && window.scrollY >= 80) setActive(entry.target.id)
        }
      },
      { rootMargin: '-130px 0px -60% 0px' },
    )
    navLinks.forEach(l => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Reflect the active section in the URL (rewrites in next.config.ts serve /<section>)
  useEffect(() => {
    window.history.replaceState(null, '', active ? `/${active}` : '/')
  }, [active])

  useEffect(() => {
    if (!active || !navRef.current) return
    const el = navRef.current.querySelector(`[data-section="${active}"]`) as HTMLElement
    if (!el) return
    const parent = navRef.current.getBoundingClientRect()
    const rect = el.getBoundingClientRect()
    setPillStyle({ left: rect.left - parent.left, width: rect.width, opacity: 1 })
  }, [active])

  return (
    <header className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
            AK
          </div>
          <span className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors hidden sm:block">
            Amit Kumar
          </span>
        </button>

        <div ref={navRef} className="hidden md:flex items-center gap-0.5 relative">
          <motion.div
            className="absolute top-0 bottom-0 rounded-lg pointer-events-none"
            animate={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            style={{ background: 'rgba(255,255,255,0.07)' }}
          />
          {navLinks.map((l) => {
            const isActive = active === l.id
            return (
              <a key={l.id} data-section={l.id} href={`/${l.id}`}
                onClick={(e) => onNavClick(e, l.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-150 z-10 ${
                  isActive ? 'text-white' : 'text-slate-500 hover:text-slate-200'
                }`}>
                {l.label}
                {isActive && (
                  <motion.span layoutId="nav-underline"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </a>
            )
          })}
          <a href={`mailto:${profile.email}`}
            className="ml-3 px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all hover:-translate-y-px"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 3px 12px rgba(99,102,241,0.35)' }}>
            Hire Me
          </a>
        </div>

        <button
          className="md:hidden w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)} aria-label="Toggle menu"
          aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: MENU_ANIM_MS / 1000 }}
            id="mobile-menu"
            className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#050508]/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-0.5">
              {navLinks.map((l) => (
                <a key={l.id} href={`/${l.id}`}
                  aria-current={active === l.id ? 'location' : undefined}
                  className={`flex items-center w-full px-3 py-2.5 rounded-xl text-sm transition-all ${
                    active === l.id ? 'text-white bg-indigo-500/10 font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                    e.preventDefault()
                    setOpen(false)
                    // Closing the menu cancels an in-flight smooth scroll, so scroll after the exit animation
                    setTimeout(() => scrollToSection(l.id), MENU_ANIM_MS)
                  }}>
                  {l.label}
                </a>
              ))}
              <div className="pt-2">
                <a href={`mailto:${profile.email}`}
                  className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-bold text-white transition-colors"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                  onClick={() => setOpen(false)}>
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
