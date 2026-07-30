'use client'

import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import { Calendar, Zap, TrendingUp } from 'lucide-react'

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="py-28 px-6 dot-bg relative overflow-hidden">
      <div className="section-divider" />
      <div aria-hidden className="absolute top-1/2 right-0 w-[500px] h-[500px] pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="section-eyebrow mb-3">Portfolio</p>
          <h2 className="section-title">Projects</h2>
          <div className="section-bar" />
          <p className="mt-5 text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Enterprise and cloud-native projects across SAP BTP, AWS, and hybrid cloud environments.
          </p>
        </motion.div>

        {/* Featured project — full width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: 'easeOut' }}
          className="card p-8 mb-5 relative overflow-hidden group"
          style={{ borderTop: '2px solid rgba(99,102,241,0.5)' }}
        >
          {/* Corner glow */}
          <div aria-hidden className="absolute top-0 right-0 w-72 h-72 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'radial-gradient(circle at top right, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />
          <div aria-hidden className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
            style={{ background: 'radial-gradient(circle at bottom left, rgba(6,182,212,0.04) 0%, transparent 70%)' }} />

          <div className="grid md:grid-cols-[1fr_auto] gap-8 relative z-10">
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide"
                  style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
                  ★ Featured Project
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-600">
                  <Calendar size={10} />{featured.period}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-1">{featured.name}</h3>
              <p className="text-sm text-slate-500 font-medium mb-5">{featured.fullName}</p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {featured.techStack.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>

              <ul className="space-y-2.5">
                {featured.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                    <span className="text-indigo-500 shrink-0 mt-0.5 text-[10px] font-black">▸</span>{b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Metric callout */}
            <div className="flex md:flex-col items-center justify-start md:justify-center gap-3 shrink-0">
              <div className="flex flex-col items-center justify-center w-40 h-32 rounded-2xl border text-center px-3"
                style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <TrendingUp size={18} className="text-indigo-400 mb-2" />
                <p className="text-xs font-bold text-indigo-300 leading-snug">{featured.highlight}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Remaining 3 projects — grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {rest.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="card p-6 flex flex-col group relative overflow-hidden">
              <div aria-hidden className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at top right, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-black text-white text-sm tracking-tight leading-snug">{p.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{p.fullName}</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-slate-600 shrink-0 mt-0.5">
                  <Calendar size={10} />{p.period.split('–')[0].trim()}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-4 w-fit"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
                <Zap size={10} className="text-amber-400" />
                <span className="text-[10px] font-bold text-amber-400">{p.highlight}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.techStack.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
                {p.techStack.length > 4 && (
                  <span className="tag">+{p.techStack.length - 4}</span>
                )}
              </div>
              <ul className="space-y-1.5 mt-auto">
                {p.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                    <span className="text-indigo-500 shrink-0 mt-0.5 text-[10px] font-bold">▸</span>{b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
