'use client'

import { motion } from 'framer-motion'
import { skillGroups } from '@/lib/data'

const ACCENT: Record<string, { border: string; iconBg: string; iconColor: string }> = {
  'SAP BTP':               { border: '#6366f1', iconBg: 'rgba(99,102,241,0.12)',  iconColor: '#a5b4fc' },
  'Backend':               { border: '#10b981', iconBg: 'rgba(16,185,129,0.12)',  iconColor: '#6ee7b7' },
  'Cloud & Infrastructure':{ border: '#06b6d4', iconBg: 'rgba(6,182,212,0.12)',   iconColor: '#67e8f9' },
  'Databases':             { border: '#8b5cf6', iconBg: 'rgba(139,92,246,0.12)',  iconColor: '#c4b5fd' },
  'Messaging':             { border: '#f59e0b', iconBg: 'rgba(245,158,11,0.12)',  iconColor: '#fcd34d' },
  'Security':              { border: '#ef4444', iconBg: 'rgba(239,68,68,0.12)',   iconColor: '#fca5a5' },
  'DevOps':                { border: '#ec4899', iconBg: 'rgba(236,72,153,0.12)',  iconColor: '#f9a8d4' },
  'Methodology':           { border: '#06b6d4', iconBg: 'rgba(6,182,212,0.12)',   iconColor: '#67e8f9' },
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 relative overflow-hidden dot-bg">
      <div className="section-divider" />
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="section-eyebrow mb-3">Tech Stack</p>
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-bar" />
          <p className="mt-5 text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Spanning SAP BTP, cloud-native Java, AWS, and modern DevOps — built on 3+ years of enterprise delivery.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillGroups.map((group, i) => {
            const accent = ACCENT[group.category] ?? { border: '#6366f1', iconBg: 'rgba(99,102,241,0.12)', iconColor: '#a5b4fc' }
            return (
              <motion.div key={group.category}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.45, ease: 'easeOut' }}
                className="card p-5 group"
                style={{ borderLeft: `3px solid ${accent.border}` }}
              >
                <div className="skill-card-header">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 transition-colors"
                    style={{ background: accent.iconBg, color: accent.iconColor }}>
                    {group.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-200 tracking-tight">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
