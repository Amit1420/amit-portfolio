'use client'

import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import { Calendar, Zap } from 'lucide-react'

export default function Projects() {
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

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="card p-6 flex flex-col group relative overflow-hidden">
              <div aria-hidden className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at top right, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-black text-white text-base tracking-tight leading-snug">{p.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{p.fullName}</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-slate-600 shrink-0 mt-0.5">
                  <Calendar size={10} />{p.period}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-4 w-fit"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
                <Zap size={10} className="text-amber-400" />
                <span className="text-[10px] font-bold text-amber-400">{p.highlight}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.techStack.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <ul className="space-y-2 mt-auto">
                {p.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
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
