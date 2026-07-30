'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { profile, stats } from '@/lib/data'
import { Mail, MapPin, ArrowDown, Copy, Check, Download } from 'lucide-react'
import CountUp from './CountUp'
import HeroParticles from './HeroParticles'

function LinkedinIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const TITLES = ['Software Engineer II', 'SAP BTP Specialist', 'Java Cloud Developer', 'SAP CAP Consultant']

function TypewriterTitle() {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true) }, 2000)
      return () => clearTimeout(t)
    }
    const target = TITLES[idx]
    if (!deleting) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
        return () => clearTimeout(t)
      } else { setPaused(true) }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setIdx((i) => (i + 1) % TITLES.length)
      }
    }
  }, [displayed, deleting, idx, paused])

  return (
    <span className="gradient-text">
      {displayed}
      <span className="animate-pulse text-indigo-400">|</span>
    </span>
  )
}

function EmailChip() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true)
      window.dispatchEvent(new Event('email-copied'))
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button onClick={handleCopy}
      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.07] text-slate-400 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/[0.06] transition-all group">
      {copied ? <Check size={12} className="text-emerald-400" /> : <Mail size={12} className="text-indigo-400" />}
      <span>{copied ? 'Copied!' : profile.email}</span>
      <Copy size={10} className="text-slate-600 group-hover:text-indigo-400 transition-colors ml-0.5" />
    </button>
  )
}

const fu = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: 'easeOut' as const },
})

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden grid-bg">
      <HeroParticles />
      <div aria-hidden className="absolute -top-32 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 60%)', filter: 'blur(80px)' }} />
      <div aria-hidden className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)', filter: 'blur(80px)' }} />
      <div aria-hidden className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      <div aria-hidden className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(139,92,246,0.2), transparent)' }} />

      <div className="relative z-10 max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <motion.div {...fu(0)} className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #8b5cf6, #6366f1)', filter: 'blur(5px)' }} />
              <div className="absolute -inset-1.5 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #8b5cf6, #6366f1)', opacity: 0.4 }} />
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-white/10 bg-[#0d0d18]">
                <Image src="/profile.jpeg" alt={profile.name} width={176} height={176}
                  className="w-full h-full object-cover object-top" priority />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0d0d18] rounded-full px-3 py-1.5 border border-white/10 whitespace-nowrap shadow-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400">Open to work</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap justify-center">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03]">
                  <span className="text-sm font-black gradient-text">{s.value}</span>
                  <span className="text-[10px] text-slate-600 font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex-1 text-center lg:text-left">
            <motion.div {...fu(0.1)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 border"
              style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.2)', color: '#6ee7b7' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for New Opportunities
            </motion.div>

            <motion.h1 {...fu(0.15)}
              className="font-black leading-[1.02] tracking-[-0.04em] text-white mb-4"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>
              {profile.name}
            </motion.h1>

            <motion.div {...fu(0.2)} className="mb-5 h-10 flex items-center justify-center lg:justify-start">
              <span className="text-2xl md:text-3xl font-bold">
                <TypewriterTitle />
              </span>
            </motion.div>

            <motion.p {...fu(0.25)} className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mb-7">
              {profile.tagline}
            </motion.p>

            <motion.div {...fu(0.3)} className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              <EmailChip />
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.07] text-slate-400">
                <MapPin size={12} className="text-indigo-400" />{profile.location}
              </span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.07] text-slate-400 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/[0.06] transition-all">
                <LinkedinIcon size={12} /><span className="text-indigo-400">LinkedIn</span>
              </a>
            </motion.div>

            <motion.div {...fu(0.35)} className="flex flex-wrap justify-center lg:justify-start gap-3">
              <a href="#experience" className="btn-primary">View Experience</a>
              <a href="#contact" className="btn-secondary"><Mail size={14} /> Get in Touch</a>
              <a href="/Amit_Kumar_Resume.docx" download
                className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold border border-white/[0.1] bg-white/[0.03] text-slate-400 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/[0.07] transition-all">
                <Download size={13} className="text-emerald-400" /> Download CV
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div {...fu(0.45)} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="text-3xl font-black gradient-text leading-none mb-2">
                <CountUp value={s.value} />
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div {...fu(0.6)} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#about" className="flex flex-col items-center gap-2 text-slate-700 hover:text-indigo-400 transition-colors">
          <span className="text-[9px] tracking-[0.2em] uppercase font-bold">Scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}
